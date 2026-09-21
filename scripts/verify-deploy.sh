#!/bin/bash
# AEOESS Deployment Verification Script
# Run after ANY push to production repos
# Usage: ./verify-deploy.sh [service]
# Services: all, mcp, gateway, sdk

set -e
PASS=0
FAIL=0

check() {
  local name="$1"
  local result="$2"
  local expected="$3"
  if echo "$result" | grep -q "$expected"; then
    echo "  ✅ $name"
    PASS=$((PASS + 1))
  else
    echo "  ❌ $name — got: $result"
    FAIL=$((FAIL + 1))
  fi
}

SERVICE="${1:-all}"

# Read canonical versions from local package.json files so checks can't rot.
read_pkg_version() {
  python3 -c "import json,sys; print(json.load(open('$1'))['version'])" 2>/dev/null || echo "unknown"
}
SDK_EXPECTED=$(read_pkg_version "$HOME/agent-passport-system/package.json")
MCP_EXPECTED=$(read_pkg_version "$HOME/agent-passport-mcp/package.json")
# mcp.aeoess.com runs the remote server, a separate package with its own version.
# Read it from origin/main so a dirty local checkout cannot move the expectation.
MCP_REMOTE_EXPECTED=$(git -C "$HOME/agent-passport-remote-mcp" show origin/main:package.json 2>/dev/null \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['version'])" 2>/dev/null || echo "unknown")
GATEWAY_EXPECTED=$(read_pkg_version "$HOME/aeoess-gateway/package.json")

echo "═══════════════════════════════════════"
echo "  AEOESS Deploy Verification"
echo "  $(date)"
echo "  Expected: SDK $SDK_EXPECTED, MCP $MCP_EXPECTED, MCP remote $MCP_REMOTE_EXPECTED, Gateway $GATEWAY_EXPECTED"
echo "═══════════════════════════════════════"

if [[ "$SERVICE" == "all" || "$SERVICE" == "mcp" ]]; then
  echo ""
  echo "── MCP Remote (mcp.aeoess.com) ──"
  
  # Health check
  HEALTH=$(curl -s -m 10 https://mcp.aeoess.com/health 2>&1)
  check "Health endpoint responds" "$HEALTH" "status.*ok"
  
  # Version check. /health reports the remote server's own version, not the stdio MCP package's.
  MCP_LIVE=$(echo "$HEALTH" | python3 -c "import json,sys; print(json.load(sys.stdin).get('version', ''))" 2>/dev/null || echo "")
  check "Version is current ($MCP_REMOTE_EXPECTED)" "$MCP_LIVE" "^$MCP_REMOTE_EXPECTED\$"
  MCP_SERVER=$(echo "$HEALTH" | python3 -c "import json,sys; print(json.load(sys.stdin).get('server', ''))" 2>/dev/null || echo "")
  check "Health names the remote server" "$MCP_SERVER" "^agent-passport-remote-mcp\$"

  # Auth is enforced. The server lets every request through when its API key is unset, so an
  # unauthenticated 401 on both transports is what shows a deploy kept its key.
  SSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" -m 6 https://mcp.aeoess.com/sse 2>&1 || true)
  check "SSE rejects an unauthenticated request (401)" "$SSE_CODE" "^401\$"
  MCP_POST_CODE=$(curl -s -o /dev/null -w "%{http_code}" -m 6 -X POST -H "Content-Type: application/json" -d '{}' https://mcp.aeoess.com/mcp 2>&1 || true)
  check "/mcp rejects an unauthenticated request (401)" "$MCP_POST_CODE" "^401\$"

  # Public discovery document is served and reports the same version.
  CARD_VER=$(curl -s -m 10 https://mcp.aeoess.com/.well-known/agent.json | python3 -c "import json,sys; print(json.load(sys.stdin).get('version', ''))" 2>/dev/null || echo "")
  check "agent.json served with current version" "$CARD_VER" "^$MCP_REMOTE_EXPECTED\$"

  # Optional authenticated round trip. Runs only when MCP_REMOTE_API_KEY is set in the
  # environment, and is reported as skipped otherwise, never as passed.
  if [[ -n "${MCP_REMOTE_API_KEY:-}" ]]; then
    INIT=$(curl -s -m 10 -X POST https://mcp.aeoess.com/mcp \
      -H "Authorization: Bearer $MCP_REMOTE_API_KEY" -H "Content-Type: application/json" \
      -H "Accept: application/json, text/event-stream" \
      -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"verify-deploy","version":"1"}}}' 2>&1 || true)
    check "Authenticated initialize returns serverInfo" "$INIT" "serverInfo"
  else
    echo "  ⏭  Authenticated initialize skipped (MCP_REMOTE_API_KEY not set)"
  fi
fi

if [[ "$SERVICE" == "all" || "$SERVICE" == "gateway" ]]; then
  echo ""
  echo "── Gateway (gateway.aeoess.com) ──"
  
  GW_HEALTH=$(curl -s -m 10 https://gateway.aeoess.com/healthz 2>&1)
  check "Health endpoint responds" "$GW_HEALTH" "status.*ok"
  GW_LIVE=$(echo "$GW_HEALTH" | python3 -c "import json,sys; print(json.load(sys.stdin).get('version', ''))" 2>/dev/null || echo "")
  check "Version is current ($GATEWAY_EXPECTED)" "$GW_LIVE" "^$GATEWAY_EXPECTED\$"
  
  # JWKS endpoint
  JWKS=$(curl -s -m 10 https://gateway.aeoess.com/.well-known/jwks.json 2>&1)
  check "JWKS endpoint responds" "$JWKS" "Ed25519"
  
  # Receipt resolution
  RECEIPT=$(curl -s -m 10 https://gateway.aeoess.com/.well-known/receipts/test 2>&1)
  check "Receipt resolution responds" "$RECEIPT" "proofId"
fi

if [[ "$SERVICE" == "all" || "$SERVICE" == "sdk" ]]; then
  echo ""
  echo "── npm Packages ──"
  
  SDK_VER=$(curl -s https://registry.npmjs.org/agent-passport-system/latest | python3 -c "import json,sys; print(json.load(sys.stdin)['version'])" 2>/dev/null)
  check "SDK on npm ($SDK_EXPECTED)" "$SDK_VER" "^$SDK_EXPECTED\$"

  MCP_VER=$(curl -s https://registry.npmjs.org/agent-passport-system-mcp/latest | python3 -c "import json,sys; print(json.load(sys.stdin)['version'])" 2>/dev/null)
  check "MCP on npm ($MCP_EXPECTED)" "$MCP_VER" "^$MCP_EXPECTED\$"
  
  echo ""
  echo "── Website (aeoess.com) ──"
  
  WEB=$(curl -s -o /dev/null -w "%{http_code}" -m 10 https://aeoess.com 2>&1)
  check "Website responds" "$WEB" "200"
fi

if [[ "$SERVICE" == "all" ]]; then
  echo ""
  echo "── Intent Network (api.aeoess.com — Mac Mini) ──"
  
  API=$(curl -s -m 10 https://api.aeoess.com/health 2>&1)
  if echo "$API" | grep -q "ok\|status"; then
    check "Intent API responds" "$API" "ok"
  else
    echo "  ⚠️  Intent API unreachable (Mac Mini may be off)"
  fi
fi

echo ""
echo "═══════════════════════════════════════"
echo "  Results: $PASS passed, $FAIL failed"
if [[ $FAIL -gt 0 ]]; then
  echo "  ⚠️  DEPLOYMENT HAS ISSUES"
  exit 1
else
  echo "  ✅ ALL CHECKS PASSED"
  exit 0
fi
