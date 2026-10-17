// Direction 02 — "Glass" — part 2: protocol, verify, developers,
// enterprise, use cases, CTA, footer, GlassLanding root.

// ── Local helpers (formerly imported from Aurora) ──────────────────────────────

function GLColorize(src) {
  const parts = src.split(/(".*?"|`.*?`|\/\/.*|#.*|\b(?:import|from|const|new|async|await|app|post|return|if|status|verdict|aps|APS|verify|configure|curl|def|abort|process|req|res)\b)/g);
  return parts.map((p, i) => {
    if (!p) return null;
    if (/^["`]/.test(p)) return <span key={i} style={{ color: PX.mint }}>{p}</span>;
    if (/^(\/\/|#)/.test(p)) return <span key={i} style={{ color: PX.inkFaint, fontStyle: 'italic' }}>{p}</span>;
    if (/^(import|from|const|new|async|await|return|if|else|def|abort)$/.test(p)) return <span key={i} style={{ color: PX.lavender, fontWeight: 600 }}>{p}</span>;
    if (/^(aps|APS|verify|configure|app|curl)$/.test(p)) return <span key={i} style={{ color: GL.primary, fontWeight: 600 }}>{p}</span>;
    if (/^(verdict|status|req|res|process)$/.test(p)) return <span key={i} style={{ color: GL.accent, fontWeight: 600 }}>{p}</span>;
    return <span key={i}>{p}</span>;
  });
}

function GLVerifyRow({ label, children, d, verdict, last }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), d); return () => clearTimeout(t); }, [d]);
  if (!show) return <div style={{ height: 44 }} />;
  const v = verdict;
  const tagColor = v === 'fail' || v === 'deny' ? GL.rose : (v === 'pending' ? PX.inkFaint : GL.mint);
  const tagBg = v === 'fail' || v === 'deny' ? 'rgba(217,138,138,0.12)' : (v === 'pending' ? PX.paperBlue : 'rgba(125,201,176,0.14)');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 96px', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: last ? 'none' : `1px solid ${PX.border}`, fontFamily: PX.mono, fontSize: 13, opacity: 0, animation: 'gl-row .35s forwards' }}>
      <style>{`@keyframes gl-row{to{opacity:1}}`}</style>
      <span style={{ color: PX.inkDim, letterSpacing: '0.04em' }}>{label}</span>
      <span style={{ color: PX.ink }}>{children}</span>
      {v && (
        <span style={{ justifySelf: 'end', fontSize: 10, padding: '4px 10px', borderRadius: 999, fontWeight: 600, letterSpacing: '0.18em', background: tagBg, color: tagColor }}>
          {String(v).toUpperCase()}
        </span>
      )}
    </div>
  );
}

function GLUseCaseViz({ kind }) {
  if (kind === 'pay') return (
    <svg width="100%" height="100%" viewBox="0 0 320 200" fill="none">
      <rect x="30" y="50" width="100" height="100" rx="14" fill={PX.paperCyan} stroke={PX.border} />
      <rect x="190" y="50" width="100" height="100" rx="14" fill={PX.paperLavender} stroke={PX.border} />
      <text x="80" y="78" fill={PX.ink} fontFamily={PX.sansDisplay} fontSize="13" fontWeight="600" textAnchor="middle" letterSpacing="0.06em">AGENT</text>
      <text x="80" y="106" fill={GL.primary} fontFamily={PX.sansDisplay} fontSize="22" fontWeight="500" textAnchor="middle">$250.00</text>
      <text x="80" y="124" fill={PX.inkDim} fontFamily={PX.mono} fontSize="9" textAnchor="middle" letterSpacing="0.16em">SCOPED</text>
      <text x="240" y="78" fill={PX.ink} fontFamily={PX.sansDisplay} fontSize="13" fontWeight="600" textAnchor="middle" letterSpacing="0.06em">MERCHANT</text>
      <text x="240" y="106" fill={PX.inkDim} fontFamily={PX.mono} fontSize="11" textAnchor="middle">acquirer</text>
      <line x1="130" y1="100" x2="190" y2="100" stroke={GL.primary} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
      <circle r="4" fill={GL.primary}><animate attributeName="cx" from="130" to="190" dur="2s" repeatCount="indefinite" /><animate attributeName="cy" from="100" to="100" dur="2s" repeatCount="indefinite" /></circle>
      <text x="160" y="180" fill={GL.primary} fontFamily={PX.mono} fontSize="10" textAnchor="middle" letterSpacing="0.2em">PASSPORT ✓</text>
    </svg>
  );
  if (kind === 'web') return (
    <svg width="100%" height="100%" viewBox="0 0 320 200" fill="none">
      <rect x="20" y="20" width="280" height="160" rx="14" fill={PX.paperLavender} stroke={PX.border} />
      <rect x="20" y="20" width="280" height="28" rx="14" fill="rgba(91,122,240,0.06)" />
      <circle cx="36" cy="34" r="3" fill="#f1d3d4" /><circle cx="46" cy="34" r="3" fill="#f3e1c2" /><circle cx="56" cy="34" r="3" fill="#cce7d8" />
      <text x="36" y="76" fontFamily={PX.mono} fontSize="10" fill={GL.mint}>200</text>
      <text x="74" y="76" fontFamily={PX.mono} fontSize="11" fill={PX.ink}>verified agent · whitelisted</text>
      <text x="36" y="102" fontFamily={PX.mono} fontSize="10" fill={GL.mint}>200</text>
      <text x="74" y="102" fontFamily={PX.mono} fontSize="11" fill={PX.ink}>indexed · rate-limit raised</text>
      <text x="36" y="128" fontFamily={PX.mono} fontSize="10" fill={GL.rose}>403</text>
      <text x="74" y="128" fontFamily={PX.mono} fontSize="11" fill={PX.inkSoft}>no passport · anonymous ua</text>
      <text x="36" y="154" fontFamily={PX.mono} fontSize="10" fill={GL.rose}>429</text>
      <text x="74" y="154" fontFamily={PX.mono} fontSize="11" fill={PX.inkSoft}>unknown agent · throttled</text>
    </svg>
  );
  if (kind === 'cart') return (
    <svg width="100%" height="100%" viewBox="0 0 320 200" fill="none">
      <circle cx="160" cy="40" r="16" fill={PX.cyanTint} stroke={GL.primary} strokeWidth="1.5" />
      <circle cx="160" cy="40" r="5" fill={GL.primary} />
      <text x="160" y="22" fill={GL.primary} fontFamily={PX.mono} fontSize="9" textAnchor="middle" letterSpacing="0.2em">ONE PASSPORT</text>
      {[60, 160, 260].map((x, i) => (
        <g key={i}>
          <rect x={x - 40} y="80" width="80" height="92" rx="12" fill={PX.paperCyan} stroke={PX.border} />
          <text x={x} y="100" fill={PX.ink} fontFamily={PX.sansDisplay} fontSize="12" fontWeight="600" textAnchor="middle" letterSpacing="0.06em">VENDOR · {String.fromCharCode(65 + i)}</text>
          <text x={x} y="126" fill={GL.primary} fontFamily={PX.sansDisplay} fontSize="22" fontWeight="500" textAnchor="middle">★ {(4.7 + i * 0.1).toFixed(1)}</text>
          <text x={x} y="148" fill={PX.inkDim} fontFamily={PX.mono} fontSize="10" textAnchor="middle">{[2483, 1217, 891][i]} txns</text>
          <line x1="160" y1="56" x2={x} y2="80" stroke={GL.primary} strokeWidth="0.6" strokeDasharray="2 3" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
  return null;
}

// ── Protocol — vertical stack of glass plates ──────────────────────────────────
function GLProtocol() {
  const steps = [
    { n: '01', t: 'Identify', d: 'A legal entity registers on the network. Their domain is bound to the network via DNS-TXT.', side: 'left' },
    { n: '02', t: 'Issue',    d: 'The owner mints a passport for each agent. Scope, expiry and policy signed in at issuance.', side: 'right' },
    { n: '03', t: 'Verify',   d: 'A counterparty calls /verify on inbound traffic. The network returns a signed verdict in under 1 ms.', side: 'left' },
    { n: '04', t: 'Audit',    d: 'Every check is logged. Revoke or rotate scope without redeploying the agent.', side: 'right' },
  ];
  return (
    <PXGradientBg variant="glass" grid={true} gridOpacity={0.4}>
      <div style={{ padding: '160px 64px' }}>
        <div style={{ marginBottom: 24, textAlign: 'center' }}><div style={{ display: 'inline-block' }}><PXSpec n="02" k="The Protocol" /></div></div>
        <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 96, fontWeight: 400, lineHeight: 0.95, letterSpacing: '0.005em', color: PX.ink, margin: '0 auto 80px', maxWidth: 900, textAlign: 'center' }}>
          Four <span style={{ color: GL.primary }}>parties.</span> One signed exchange.
        </h2>

        {/* Stacked plates */}
        <div style={{ maxWidth: 980, margin: '0 auto', position: 'relative' }}>
          {/* Connecting line down the center */}
          <div style={{ position: 'absolute', top: 60, bottom: 60, left: '50%', width: 1, background: `linear-gradient(180deg, transparent, ${PX.borderStrong} 12%, ${PX.borderStrong} 88%, transparent)`, transform: 'translateX(-50%)' }} />

          {steps.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', justifyContent: s.side === 'left' ? 'flex-start' : 'flex-end', marginBottom: 32 }}>
              <PXTranslucentCard hue={i % 2 === 0 ? 'cyan' : 'blue'} style={{ width: '46%', padding: 32, position: 'relative' }}>
                {/* Stem to center line */}
                <div style={{
                  position: 'absolute', top: '50%',
                  [s.side === 'left' ? 'right' : 'left']: -32,
                  width: 32, height: 1, background: PX.borderStrong, transform: 'translateY(-50%)',
                }} />
                {/* Node on center line */}
                <div style={{
                  position: 'absolute', top: '50%',
                  [s.side === 'left' ? 'right' : 'left']: -42,
                  width: 20, height: 20, borderRadius: '50%',
                  background: PX.white, border: `1px solid ${GL.primary}`,
                  transform: 'translateY(-50%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: GL.primary }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                  <span style={{ fontFamily: PX.mono, fontSize: 11, color: GL.primary, letterSpacing: '0.22em', fontWeight: 600 }}>{s.n}</span>
                  <span style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.2em' }}>STEP · {s.n}</span>
                </div>
                <h3 style={{ fontFamily: PX.sansDisplay, fontSize: 48, fontWeight: 500, color: PX.ink, lineHeight: 1, letterSpacing: '0.005em', margin: 0 }}>{s.t}</h3>
                <p style={{ fontFamily: PX.sans, fontSize: 15, lineHeight: 1.6, color: PX.inkSoft, marginTop: 14, marginBottom: 0 }}>{s.d}</p>
              </PXTranslucentCard>
            </div>
          ))}
        </div>
      </div>
    </PXGradientBg>
  );
}

// ── Live verify demo ──────────────────────────────────────────────
function GLVerifyDemo() {
  const [phase, setPhase] = React.useState('idle');
  const [agent, setAgent] = React.useState('anthrocopter-treasury-bot');
  const PRESETS = [
    { id: 'anthrocopter-treasury-bot', label: 'Anthrocopter · Treasury Bot', owner: 'Stripe Treasury, Inc.', verdict: 'ok' },
    { id: 'shopify-cart-assistant', label: 'Shopify · Cart Assistant', owner: 'Shopify Commerce', verdict: 'ok' },
    { id: 'unknown-scraper-9f01', label: 'Unknown · Scraper-9f01', owner: '— unverified —', verdict: 'denied' },
  ];
  const active = PRESETS.find(p => p.id === agent);
  const run = () => {
    setPhase('checking');
    const v = PRESETS.find(p => p.id === agent)?.verdict || 'denied';
    setTimeout(() => setPhase(v), 1900);
  };

  return (
    <PXGradientBg variant="soft" grid={false}>
      <div style={{ padding: '160px 64px' }}>
        <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: 24 }}><PXSpec n="03" k="Live verification" /></div>
            <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 88, fontWeight: 400, lineHeight: 0.95, letterSpacing: '0.005em', color: PX.ink, margin: 0 }}>
              Pick an agent. <span style={{ color: GL.primary }}>Verify it now.</span>
            </h2>
          </div>
          <div style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkFaint, letterSpacing: '0.2em', maxWidth: 280, textAlign: 'right' }}>
            VERDICTS ARE SIGNED AND TIMESTAMPED BY THE NETWORK.
          </div>
        </div>

        <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr' }}>
            <div style={{ padding: 40, borderRight: `1px solid ${PX.border}` }}>
              <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em', marginBottom: 20 }}>SELECT AN AGENT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {PRESETS.map(p => (
                  <button key={p.id} onClick={() => { setAgent(p.id); setPhase('idle'); }} style={{
                    textAlign: 'left', padding: '16px 20px', borderRadius: 14,
                    border: `1px solid ${agent === p.id ? GL.primary : PX.border}`,
                    background: agent === p.id ? 'rgba(110,197,217,0.08)' : PX.white,
                    color: PX.ink, fontFamily: PX.sans, fontSize: 14, cursor: 'pointer',
                  }}>
                    <div style={{ fontWeight: 600 }}>{p.label}</div>
                    <div style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkDim, marginTop: 4, letterSpacing: '0.06em' }}>owner: {p.owner}</div>
                  </button>
                ))}
              </div>
              <button onClick={run} disabled={phase === 'checking'} style={{
                marginTop: 28, width: '100%', background: PX.ink, color: PX.white, border: 'none',
                padding: '16px 22px', fontFamily: PX.sans, fontSize: 14, fontWeight: 500,
                borderRadius: 999, cursor: phase === 'checking' ? 'wait' : 'pointer', opacity: phase === 'checking' ? 0.7 : 1, letterSpacing: '0.01em',
              }}>{phase === 'checking' ? 'Verifying…' : 'Verify →'}</button>
            </div>

            <div style={{ padding: 40, background: PX.white }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkFaint, letterSpacing: '0.18em' }}>POST /v1/verify · gateway.aeoess.com</div>
                {phase === 'ok' && <PXPill color={GL.mint} bg="rgba(125,201,176,0.14)">● ALLOW · 822µs</PXPill>}
                {phase === 'denied' && <PXPill color={GL.rose} bg="rgba(217,138,138,0.14)">● DENY · revoked</PXPill>}
                {phase === 'checking' && <PXPill color={PX.inkDim} bg={PX.paperBlue}>● checking…</PXPill>}
              </div>
              {phase === 'idle' && (
                <div style={{ padding: '80px 0', textAlign: 'center', fontFamily: PX.sans, color: PX.inkFaint, fontSize: 15 }}>
                  Click <span style={{ color: PX.ink, fontWeight: 600 }}>Verify</span> to run a live check.
                </div>
              )}
              {phase !== 'idle' && (
                <div>
                  <GLVerifyRow d={0} label="Resolving">{`aps://${active.id}`}</GLVerifyRow>
                  <GLVerifyRow d={300} label="DNS issuer" verdict="found">{`_aps.${active.id.split('-')[0]}.com`}</GLVerifyRow>
                  <GLVerifyRow d={600} label="Signature" verdict={phase === 'denied' ? 'pending' : 'valid'}>ED25519 · 3f2a9b71c8e4…</GLVerifyRow>
                  <GLVerifyRow d={900} label="Revocation" verdict={phase === 'denied' ? 'fail' : 'clean'}>{phase === 'denied' ? 'Listed · 2026-05-22' : 'Clean'}</GLVerifyRow>
                  <GLVerifyRow d={1200} label="Scope check" verdict={phase === 'denied' ? 'fail' : 'pass'}>payments:write ≤ $5k/d</GLVerifyRow>
                  <GLVerifyRow d={1500} label="Verdict" verdict={phase === 'denied' ? 'deny' : 'allow'} last>
                    <span style={{ fontWeight: 600, fontFamily: PX.sans, color: phase === 'denied' ? GL.rose : GL.mint }}>
                      {phase === 'denied' ? 'DENY · revoked by issuer' : 'ALLOW · proceed'}
                    </span>
                  </GLVerifyRow>
                </div>
              )}
            </div>
          </div>
        </PXTranslucentCard>
      </div>
    </PXGradientBg>
  );
}

// ── Developers ──────────────────────────────────────────────
function GLDevelopers() {
  const [tab, setTab] = React.useState('node');
  const snippets = {
    node: `import { verify } from "agent-passport-system";
configure({ apiKey: process.env.APS_KEY });

app.post("/checkout", async (req, res) => {
  const verdict = await verify({
    passport: req.headers["x-aps-passport"],
    scope: "payments:write",
    amount: req.body.amount,
  });
  if (verdict.status !== "allow") return res.status(403).json(verdict);
  // result.principal is the verified principal
});`,
    python: `import agent_passport_system as aps
aps.configure(api_key=os.environ["APS_KEY"])

@app.post("/checkout")
def checkout(req):
    verdict = verify(
        passport=req.headers["x-aps-passport"],
        scope="payments:write",
        amount=req.json["amount"],
    )
    if verdict.status != "allow":
        return abort(403, verdict)
    # verdict.agent.owner is trusted`,
    curl: `curl https://gateway.aeoess.com/v1/verify \\
  -H "Authorization: Bearer $APS_KEY" \\
  -d '{
    "passport": "aps:8F22A:ed25519:3f2a…",
    "scope": "payments:write",
    "amount": 250.00
  }'
# → { "status": "allow", "agent": {...}, "ms": 47 }`,
  };
  return (
    <PXGradientBg variant="glass" grid={true} gridOpacity={0.4}>
      <div style={{ padding: '160px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 100, alignItems: 'center' }}>
          <div>
            <div style={{ marginBottom: 24 }}><PXSpec n="04" k="For developers" /></div>
            <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 88, fontWeight: 400, lineHeight: 0.95, letterSpacing: '0.005em', color: PX.ink, margin: 0 }}>
              Five lines.<br />
              <span style={{ color: GL.primary }}>A governance layer.</span>
            </h2>
            <p style={{ fontFamily: PX.sans, fontSize: 18, lineHeight: 1.55, color: PX.inkSoft, marginTop: 28, maxWidth: 460 }}>
              SDKs for Node, Python, Go and Rust. A plain HTTP endpoint for everything else.
              Verify at the edge, in your gateway, or in the application layer.
            </p>
            <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '64px 1fr', gap: '14px 24px', fontFamily: PX.mono, fontSize: 13, alignItems: 'baseline' }}>
              <span style={{ color: GL.primary, fontWeight: 600 }}>npm</span><span>npm install agent-passport-system</span>
              <span style={{ color: GL.primary, fontWeight: 600 }}>pip</span><span>pip install agent-passport-system</span>
              <span style={{ color: GL.primary, fontWeight: 600 }}>go</span><span>go get github.com/aeoess/agent-passport-system-go</span>
              
            </div>
            <div style={{ marginTop: 36, display: 'flex', gap: 10 }}>
              <PXButton variant="primary">API reference →</PXButton>
              <PXButton variant="ghost">Quickstart guide</PXButton>
            </div>
          </div>

          <PXTranslucentCard hue="cyan" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ borderBottom: `1px solid ${PX.border}`, display: 'flex', alignItems: 'center', padding: '10px 14px' }}>
              <div style={{ display: 'flex', gap: 6, marginRight: 16 }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f1d3d4' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f3e1c2' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#cce7d8' }} />
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {Object.keys(snippets).map(k => (
                  <button key={k} onClick={() => setTab(k)} style={{
                    background: tab === k ? PX.white : 'transparent',
                    color: tab === k ? PX.ink : PX.inkDim,
                    border: `1px solid ${tab === k ? PX.border : 'transparent'}`,
                    padding: '6px 14px', fontFamily: PX.mono, fontSize: 11, fontWeight: 500, borderRadius: 8, cursor: 'pointer', letterSpacing: '0.04em',
                  }}>{k === 'node' ? 'verify.ts' : k === 'python' ? 'verify.py' : 'verify.sh'}</button>
                ))}
              </div>
            </div>
            <pre style={{ margin: 0, padding: '28px 32px', fontFamily: PX.mono, fontSize: 13.5, lineHeight: 1.7, color: PX.ink, overflow: 'auto', minHeight: 380, background: PX.white }}>
              <code>{GLColorize(snippets[tab])}</code>
            </pre>
          </PXTranslucentCard>
        </div>
      </div>
    </PXGradientBg>
  );
}

// ── Enterprise (reuse Aurora's structure with Glass colors) ──────────────────────────────────
function GLEnterprise() {
  return (
    <PXGradientBg variant="soft" grid={false}>
      <div style={{ padding: '160px 64px' }}>
        <div style={{ marginBottom: 24 }}><PXSpec n="05" k="For enterprise" /></div>
        <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 88, fontWeight: 400, lineHeight: 0.95, letterSpacing: '0.005em', color: PX.ink, margin: '0 0 28px', maxWidth: 1100 }}>
          Govern your agents <span style={{ fontStyle: 'italic', fontWeight: 300, color: PX.inkSoft }}>like</span> you govern your <span style={{ color: GL.primary }}>employees</span>.
        </h2>
        <p style={{ fontFamily: PX.sans, fontSize: 18, lineHeight: 1.55, color: PX.inkSoft, margin: '0 0 56px', maxWidth: 660 }}>
          Inventory, scope, audit and revoke through a single console — designed for what
          regulators are about to ask for.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>
          <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px 28px', borderBottom: `1px solid ${PX.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em' }}>AGENT INVENTORY</div>
                <div style={{ fontFamily: PX.sansDisplay, fontSize: 22, fontWeight: 500, color: PX.ink, marginTop: 4, letterSpacing: '0.01em' }}>Stripe Treasury · 184 active</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <PXButton variant="soft" size="sm">Filter</PXButton>
                <PXButton variant="primary" size="sm">+ Issue</PXButton>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: PX.sans, fontSize: 13 }}>
              <thead>
                <tr style={{ background: PX.paperCyan }}>
                  {['Agent', 'Owner', 'Scope', 'Last verify', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 20px', fontFamily: PX.mono, fontSize: 10, fontWeight: 600, color: PX.inkFaint, letterSpacing: '0.18em', borderBottom: `1px solid ${PX.border}` }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['treasury-bot-prod', 'L. Patel', 'payments:write ≤ $5k/d', '12s ago', 'active'],
                  ['treasury-bot-staging', 'L. Patel', 'payments:read', '2m ago', 'active'],
                  ['fraud-classifier-v3', 'A. Rao', 'fraud:flag', '8s ago', 'active'],
                  ['scraper-research-bot', 'M. Cho', 'web:read', '4h ago', 'active'],
                  ['cust-support-claude', 'J. Kim', 'cs:read · cs:write', '34s ago', 'active'],
                  ['intern-test-1', 'expired', '—', '6d ago', 'revoked'],
                  ['internal-vendor-bot', 'L. Patel', 'vendor:write ≤ $1k', '1m ago', 'active'],
                ].map(([a, o, s, t, st], i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${PX.borderSoft}` }}>
                    <td style={{ padding: '14px 20px', fontFamily: PX.mono, fontSize: 12, color: PX.ink }}>aps://{a}</td>
                    <td style={{ padding: '14px 20px', color: PX.inkSoft }}>{o}</td>
                    <td style={{ padding: '14px 20px', fontFamily: PX.mono, fontSize: 12, color: PX.inkDim }}>{s}</td>
                    <td style={{ padding: '14px 20px', color: PX.inkSoft }}>{t}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        fontFamily: PX.mono, fontSize: 10, letterSpacing: '0.16em', fontWeight: 600,
                        padding: '3px 10px', borderRadius: 999,
                        background: st === 'active' ? 'rgba(125,201,176,0.14)' : 'rgba(217,138,138,0.14)',
                        color: st === 'active' ? GL.mint : GL.rose,
                      }}>● {st.toUpperCase()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PXTranslucentCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <PXTranslucentCard hue="blue" style={{ padding: '24px 26px' }}>
              <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.2em' }}>VERIFICATIONS · 24H</div>
              <div style={{ fontFamily: PX.sansDisplay, fontSize: 48, fontWeight: 500, color: PX.ink, marginTop: 6, letterSpacing: '0.005em', lineHeight: 1 }}>184,210</div>
              <div style={{ fontFamily: PX.sans, fontSize: 13, color: GL.mint, marginTop: 4 }}>↑ 8.4% vs. yesterday</div>
              <div style={{ marginTop: 16, height: 50 }}>
                <PXSignalWave color={GL.primary} height={50} amplitude={10} frequency={0.04} opacity={0.6} strokeWidth={1.2} />
              </div>
            </PXTranslucentCard>
            {[
              ['P50 LATENCY', '0.8 ms', '↓ 8% w/w'],
              ['DENIED · 24H', '1,284', '0.001% of total'],
              ['REVOCATIONS', '47', '3 critical · auto'],
            ].map(([k, v, sub]) => (
              <PXTranslucentCard key={k} hue="cyan" style={{ padding: '20px 26px', display: 'flex', alignItems: 'baseline', gap: 14, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.2em' }}>{k}</div>
                  <div style={{ fontFamily: PX.sansDisplay, fontSize: 32, fontWeight: 500, color: PX.ink, marginTop: 4, letterSpacing: '0.005em', lineHeight: 1 }}>{v}</div>
                </div>
                <div style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkDim, letterSpacing: '0.1em' }}>{sub}</div>
              </PXTranslucentCard>
            ))}
          </div>
        </div>

        <PXTranslucentCard hue="blue" style={{ marginTop: 32, padding: '26px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em' }}>COMPLIANCE & CONTROLS</div>
            <div style={{ fontFamily: PX.sansDisplay, fontSize: 22, fontWeight: 500, color: PX.ink, marginTop: 4, letterSpacing: '0.01em' }}>Built for what regulators are about to ask for.</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['EU AI Act', 'NIST AI RMF'].map(t => (
              <span key={t} style={{ padding: '7px 14px', background: PX.white, border: `1px solid ${PX.border}`, borderRadius: 999, fontFamily: PX.sans, fontSize: 12, fontWeight: 500, color: PX.ink }}>{t}</span>
            ))}
          </div>
        </PXTranslucentCard>
      </div>
    </PXGradientBg>
  );
}

// ── Use cases ──────────────────────────────────────────────
function GLUseCases() {
  const cases = [
    { k: 'I', t: 'Payments', d: 'Agentic checkout banks can underwrite. Bind passports to spending limits — settle in milliseconds with proof of identity, ownership and scope.', stat: 'open protocol · public benchmarks · Q1 2026', viz: 'pay', hue: 'cyan' },
    { k: 'II', t: 'Browsing', d: 'Sites that greet your agents. Replace user-agent strings with cryptographic identity. Whitelist real agents, throttle the rest.', stat: '16–36M ops/sec sustained', viz: 'web', hue: 'blue' },
    { k: 'III', t: 'Commerce', d: 'Reputation that travels with the agent. Track behavior across marketplaces with one persistent passport. Build trust. Block bad actors.', stat: '1,200+ agents recorded', viz: 'cart', hue: 'lavender' },
  ];
  return (
    <PXGradientBg variant="glass" grid={true} gridOpacity={0.4}>
      <div style={{ padding: '160px 64px' }}>
        <div style={{ marginBottom: 24 }}><PXSpec n="06" k="Use cases" /></div>
        <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 88, fontWeight: 400, lineHeight: 0.95, letterSpacing: '0.005em', color: PX.ink, margin: '0 0 64px', maxWidth: 800 }}>
          Where <span style={{ color: GL.primary }}>governance</span> matters.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {cases.map(c => (
            <PXTranslucentCard key={c.k} hue={c.hue} style={{ padding: 32, minHeight: 520, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: PX.mono, fontSize: 11, color: GL.primary, letterSpacing: '0.2em', fontWeight: 600 }}>FOLIO · {c.k}</span>
                <span style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.2em' }}>{c.k}</span>
              </div>
              <h3 style={{ fontFamily: PX.sansDisplay, fontSize: 52, fontWeight: 500, color: PX.ink, lineHeight: 1, letterSpacing: '0.005em', margin: '20px 0 0' }}>{c.t}</h3>
              <div style={{ height: 200, marginTop: 22, borderRadius: 14, background: PX.white, border: `1px solid ${PX.border}`, position: 'relative', overflow: 'hidden' }}>
                <GLUseCaseViz kind={c.viz} />
              </div>
              <p style={{ fontFamily: PX.sans, fontSize: 15, lineHeight: 1.55, color: PX.inkSoft, marginTop: 18 }}>{c.d}</p>
              <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: `1px solid ${PX.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: PX.mono, fontSize: 11, color: PX.ink, letterSpacing: '0.14em', fontWeight: 600 }}>{c.stat}</span>
                <a style={{ fontFamily: PX.sans, fontSize: 13, color: GL.primary, fontWeight: 500 }}>Case study →</a>
              </div>
            </PXTranslucentCard>
          ))}
        </div>
      </div>
    </PXGradientBg>
  );
}

// ── CTA + footer ──────────────────────────────────────────────
function GLCTA() {
  return (
    <PXGradientBg variant="glass" grid={false}>
      <div style={{ padding: '160px 64px', position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: '40%', transform: 'translateY(-50%)', opacity: 0.5 }}>
          <PXSignalWave color={GL.primary} height={300} amplitude={50} frequency={0.006} opacity={0.4} strokeWidth={1.2} />
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'center' }}>
            <PXPill color={GL.primary} bg="rgba(110,197,217,0.12)">
              <PXBreathingDot color={GL.primary} size={7} /> &nbsp;GATEWAY OPERATIONAL · ACCEPTING ISSUERS
            </PXPill>
          </div>
          <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 168, fontWeight: 400, lineHeight: 0.9, letterSpacing: '0.005em', color: PX.ink, margin: 0 }}>
            Build on the<br /><span style={{ color: GL.primary }}>governance layer.</span>
          </h2>
          <p style={{ fontFamily: PX.sans, fontSize: 22, color: PX.inkSoft, marginTop: 36 }}>
            Free tier: 100,000 verifications a month. No credit card. Production in ten minutes.
          </p>
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <PXButton variant="primary" size="lg" onClick={() => { window.location.href = '/opensource.html'; }}>Start building →</PXButton>
            <PXButton variant="ghost" size="lg" onClick={() => { window.location.href = '/contact.html'; }}>Talk to engineering</PXButton>
          </div>
        </div>
      </div>
    </PXGradientBg>
  );
}

function GLFooter() {
  const cols = [
    ['Protocol', ['Specification', 'Passport schema', 'Verifier API', 'Issuer registry', 'Release notes']],
    ['Product', ['Pilot', 'For enterprise', 'For developers', 'Status', 'Security']],
    ['Network', ['Partners', 'Standards', 'Roadmap', 'Threat model', 'Compliance']],
    ['Company', ['About', 'Manifesto', 'Press', 'Careers', 'Contact']],
  ];
  return (
    <div style={{ background: PX.white, padding: '72px 64px 32px', borderTop: `1px solid ${PX.border}` }}>
      <div data-kya-footer-grid style={{ display: 'grid', gridTemplateColumns: '1.3fr repeat(4, 1fr)', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="/assets/images/aeoess_logo-05.png" alt="AEOESS" style={{ height: 36, width: 'auto', display: 'block' }} />
          </div>
          <p style={{ fontFamily: PX.sans, fontSize: 14, lineHeight: 1.55, color: PX.inkSoft, marginTop: 20, maxWidth: 280 }}>
            Governance infrastructure for the agentic economy. Verifiable, portable, revocable.
          </p>
          <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.18em', marginTop: 28 }}>© 2026 · TYMOFII PIDLISNYI (AGENT PASSPORT SYSTEM)</div>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em', marginBottom: 18 }}>{h.toUpperCase()}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft }}>
              {items.map(i => <a key={i} style={{ color: 'inherit' }}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div data-kya-footer-bottom style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${PX.border}`, display: 'flex', justifyContent: 'space-between', fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.18em' }}>
        <span>OPEN SOURCE · APACHE 2.0</span>
        <span>SHA 8F22A9B71C · BUILD 2026.05.26</span>
      </div>
    </div>
  );
}

function GlassLanding() {
  return (
    <div style={{ background: PX.white, color: PX.ink, fontFamily: PX.sans, minHeight: '100%' }}>
      <GLNav />
      <GLHero />
      <GLTrust />
      <GLPassport />
      <GLProtocol />
      <GLVerifyDemo />
      <GLDevelopers />
      <GLEnterprise />
      <GLUseCases />
      <GLCTA />
      <GLFooter />
    </div>
  );
}

Object.assign(window, {
  GLProtocol, GLVerifyDemo, GLDevelopers, GLEnterprise, GLUseCases, GLCTA, GLFooter, GlassLanding,
});
