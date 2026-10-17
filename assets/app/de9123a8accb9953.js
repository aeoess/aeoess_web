// KYA / AEOESS — page content. Part 2: Content, Compliance, Enterprise.

// ─────────────────────────────────────────────────────
// ContentPage — provenance, governance blocks, IPR envelopes
// ─────────────────────────────────────────────────────
function ContentPage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · CONTENT"
        title="Provenance,"
        titleAccent="not disclaimers."
        lede="Governance blocks, signed access receipts, instruction-provenance envelopes. Every piece of content an agent touches is bound to who-saw-it, who-wrote-it, and under what authority. Revocation propagates through derivatives."
        ctas={['Read the spec →', 'See use cases']}
        right={(
          <PXTranslucentCard hue="lavender" style={{ padding: 28 }}>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkDim, letterSpacing: '0.22em', marginBottom: 14 }}>IPR ENVELOPE · v1.0</div>
            <div style={{ fontFamily: PX.mono, fontSize: 12, lineHeight: 1.9, color: PX.inkSoft }}>
              <div><span style={{ color: GL.primary }}>"resource"</span>: <span style={{ color: GL.accent }}>"doc:8F22A"</span></div>
              <div><span style={{ color: GL.primary }}>"author"</span>: <span style={{ color: GL.accent }}>"did:web:publisher.example"</span></div>
              <div><span style={{ color: GL.primary }}>"license"</span>: <span style={{ color: GL.accent }}>"non-train-derivatives"</span></div>
              <div><span style={{ color: GL.primary }}>"access"</span>: [</div>
              <div style={{ paddingLeft: 14 }}><span style={{ color: GL.accent }}>"summarize: allow"</span>,</div>
              <div style={{ paddingLeft: 14 }}><span style={{ color: GL.accent }}>"quote ≤ 25w: allow"</span>,</div>
              <div style={{ paddingLeft: 14 }}><span style={{ color: GL.accent }}>"reproduce: deny"</span>,</div>
              <div style={{ paddingLeft: 14 }}><span style={{ color: GL.accent }}>"train: deny"</span></div>
              <div>],</div>
              <div><span style={{ color: GL.primary }}>"sig"</span>: <span style={{ color: GL.accent }}>"ed25519:7f2c…"</span></div>
            </div>
          </PXTranslucentCard>
        )}
      />

      <PageBody variant="soft">
        <SectionHead n="01" k="The Content Layer" title={<>Every read, write, and derivative <span style={{ color: GL.primary }}>signed.</span></>} lede="APS Content extends the passport protocol to publishers. Sites declare a governance block, agents present their delegations, and every access produces a receipt that travels with the output." />
        <FeatureGrid cols={3} items={[
          { badge: 'GOVERNANCE BLOCKS', title: 'Sites declare what agents may do.', body: 'A signed JSON manifest at .well-known/aps.txt defines training, indexing, summarization, and quoting policies. Honoured by APS-aware agents, enforced by the gateway.', hue: 'cyan' },
          { badge: 'ACCESS RECEIPTS', title: 'Every page-view, recorded.', body: 'When a passport-bound agent reads a resource, a signed access receipt is emitted to both parties. Counted, capped, billable.', hue: 'blue' },
          { badge: 'IPR ENVELOPES', title: 'Output carries the input.', body: 'A summary or derivative carries the cryptographic provenance of its sources. Revoke the source — derivatives expire.', hue: 'lavender' },
        ]} />
      </PageBody>

      <PageBody variant="glass" grid={true}>
        <SectionHead n="02" k="Revocation cascade" title={<>Pull a key.<br /><span style={{ color: GL.primary }}>Every derivative goes dark.</span></>} lede="If a publisher revokes its training license tomorrow, every model and every downstream summary that depended on it is marked invalid in the next verification call — without re-crawling, retraining, or lawsuits." />
        <PXTranslucentCard hue="cyan" style={{ padding: 40 }}>
          <ContentCascadeViz />
        </PXTranslucentCard>
      </PageBody>

      <PageBody variant="soft">
        <SectionHead n="03" k="For publishers" title={<>One drop-in <span style={{ color: GL.primary }}>governance block.</span></>} />
        <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 22px', borderBottom: `1px solid ${PX.border}`, fontFamily: PX.mono, fontSize: 11, color: PX.inkDim, letterSpacing: '0.16em', display: 'flex', justifyContent: 'space-between' }}>
            <span>publisher.example/.well-known/aps.txt</span>
            <span style={{ color: GL.mint }}>● SIGNED</span>
          </div>
          <pre style={{ margin: 0, padding: '28px 32px', fontFamily: PX.mono, fontSize: 13, lineHeight: 1.7, color: PX.ink, overflow: 'auto', background: PX.white }}>
{`{
  "publisher": "did:web:publisher.example",
  "policies": {
    "summarize":          "allow",
    "quote-under-25w":    "allow",
    "reproduce-verbatim": "deny",
    "train-derivatives":  "deny-without-license",
    "index-for-rag":      "allow-with-receipt"
  },
  "billing": {
    "per-read": "$0.0004",
    "rate-limit": "60 req/min/agent"
  },
  "expires": "2027-01-01",
  "sig": "ed25519:7f2c…"
}`}
          </pre>
        </PXTranslucentCard>
      </PageBody>

      <PageCTA
        title="Train,"
        accent="receipt in hand."
        primary="Read the IPR spec →"
        secondary="Talk to publishers team"
        onPrimary={() => onNavigate('protocol')}
        onSecondary={() => onNavigate('contact')}
      />
    </>
  );
}

function ContentCascadeViz() {
  return (
    <svg viewBox="0 0 1200 320" width="100%" height="320">
      <defs>
        <marker id="cc-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={GL.primary} />
        </marker>
        <marker id="cc-x" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={GL.rose} />
        </marker>
      </defs>

      {/* Source */}
      <g>
        <rect x="40" y="120" width="180" height="80" rx="14" fill={PX.white} stroke={GL.primary} strokeWidth="1.5" />
        <text x="130" y="146" fontFamily={PX.mono} fontSize="10" fill={PX.inkDim} textAnchor="middle" letterSpacing="0.18em">SOURCE</text>
        <text x="130" y="172" fontFamily={PX.sansDisplay} fontSize="20" fontWeight="500" fill={PX.ink} textAnchor="middle" letterSpacing="0.04em">publisher.example</text>
        <text x="130" y="190" fontFamily={PX.mono} fontSize="9" fill={GL.rose} textAnchor="middle" letterSpacing="0.16em">● REVOKED</text>
      </g>

      {/* Derivatives */}
      {[[430, 30, 'MODEL', 'gpt-trainer-v3'], [430, 130, 'AGENT', 'research-bot-v2'], [430, 230, 'INDEX', 'rag-cluster · prod']].map(([x, y, lab, name], i) => (
        <g key={i}>
          <rect x={x} y={y} width="180" height="60" rx="14" fill={PX.white} stroke={PX.borderStrong} strokeWidth="1" />
          <text x={x + 16} y={y + 22} fontFamily={PX.mono} fontSize="10" fill={PX.inkDim} letterSpacing="0.16em">{lab}</text>
          <text x={x + 16} y={y + 44} fontFamily={PX.sansDisplay} fontSize="16" fontWeight="500" fill={PX.ink} letterSpacing="0.02em">{name}</text>
          {/* Line from source */}
          <path d={`M 220 160 L ${x} ${y + 30}`} stroke={GL.rose} strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#cc-x)" />
        </g>
      ))}

      {/* Final outputs */}
      {[[820, 0, 'output: news-summary'], [820, 60, 'output: research-brief'], [820, 120, 'output: ranked-passages'], [820, 180, 'output: derivative-derivative'], [820, 240, 'output: model-checkpoint-derivative']].map(([x, y, label], i) => (
        <g key={i}>
          <rect x={x} y={y} width="320" height="44" rx="10" fill={PX.paperLavender} stroke={PX.borderSoft} strokeWidth="1" />
          <text x={x + 14} y={y + 28} fontFamily={PX.mono} fontSize="12" fill={PX.inkSoft}>{label}</text>
          <text x={x + 290} y={y + 28} fontFamily={PX.mono} fontSize="10" fill={GL.rose} letterSpacing="0.18em" textAnchor="end">DENY</text>
        </g>
      ))}

      <text x="600" y="306" fontFamily={PX.mono} fontSize="10" fill={PX.inkFaint} textAnchor="middle" letterSpacing="0.22em">REVOCATION CASCADES IN REAL TIME · NO RE-CRAWL · NO RE-TRAIN</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// CompliancePage — 8 governance primitives, regulatory mapping
// ─────────────────────────────────────────────────────
function CompliancePage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · COMPLIANCE"
        title="Receipts an auditor"
        titleAccent="can verify without trusting us."
        lede="Eight governance primitives mapping to EU AI Act, NIST AI RMF, ISO 42001, and SR 11-7. Export a signed log, verify it byte-for-byte against the public spec. In any language."
        ctas={['Map your controls →', 'Read the spec']}
        right={(
          <PXTranslucentCard hue="blue" style={{ padding: 28 }}>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkDim, letterSpacing: '0.22em', marginBottom: 14 }}>REGULATORY MAPPING</div>
            {[
              ['EU AI Act', 'Art. 9–15 · risk + logging', 'mapped'],
              ['NIST AI RMF', '1.0 · GOVERN · MAP · MEASURE · MANAGE', 'mapped'],
              ['ISO 42001', '6.1, 7.5, 8.2, 9.1', 'mapped'],
              ['SR 11-7', 'model risk · validation · audit', 'mapped'],
            ].map(([s, sub, st]) => (
              <div key={s} style={{ display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 12, padding: '12px 0', borderBottom: `1px dotted ${PX.borderSoft}`, alignItems: 'center' }}>
                <span style={{ fontFamily: PX.sansDisplay, fontSize: 14, fontWeight: 600, color: PX.ink, letterSpacing: '0.02em' }}>{s}</span>
                <span style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkDim, letterSpacing: '0.06em' }}>{sub}</span>
                <span style={{ fontFamily: PX.mono, fontSize: 9, color: st === 'mapped' ? GL.mint : PX.inkFaint, letterSpacing: '0.18em', fontWeight: 700 }}>● {st.toUpperCase()}</span>
              </div>
            ))}
          </PXTranslucentCard>
        )}
      />

      <PageBody variant="soft">
        <SectionHead n="01" k="Eight primitives" title={<>Every control regulators ask for, <span style={{ color: GL.primary }}>cryptographic.</span></>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            ['01', 'Identity', 'Cryptographic, not API-key.'],
            ['02', 'Authority', 'Scoped, signed delegations.'],
            ['03', 'Purpose', 'Per-call attestation of intent.'],
            ['04', 'Boundary', 'Spend, geo, time, data caps.'],
            ['05', 'Audit', 'Every decision, signed and logged.'],
            ['06', 'Revocation', 'Pull a key — propagation in <1s.'],
            ['07', 'Reconciliation', 'Receipts compose with rails.'],
            ['08', 'Verifiability', 'Auditor verifies without trusting you.'],
          ].map(([n, t, d]) => (
            <PXTranslucentCard key={n} hue={parseInt(n) % 2 === 0 ? 'lavender' : 'cyan'} style={{ padding: 22 }}>
              <div style={{ fontFamily: PX.mono, fontSize: 11, color: GL.primary, letterSpacing: '0.2em', fontWeight: 600 }}>{n}</div>
              <div style={{ fontFamily: PX.sansDisplay, fontSize: 22, fontWeight: 500, color: PX.ink, marginTop: 8, letterSpacing: '0.005em' }}>{t}</div>
              <div style={{ fontFamily: PX.sans, fontSize: 13, lineHeight: 1.55, color: PX.inkSoft, marginTop: 8 }}>{d}</div>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageBody variant="glass" grid={true}>
        <SectionHead n="02" k="Audit-ready log" title={<>Export. Hash. <span style={{ color: GL.primary }}>Verify.</span></>} lede="The APS audit log is a Merkle-rooted, ed25519-signed, JCS-canonicalized stream of every decision. Export to Parquet, S3, or your SIEM. Auditors verify byte-for-byte against the public spec — no trust in us required." />
        <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 22px', borderBottom: `1px solid ${PX.border}`, fontFamily: PX.mono, fontSize: 11, color: PX.inkDim, letterSpacing: '0.16em', display: 'flex', justifyContent: 'space-between' }}>
            <span>aps verify audit.log --against gateway.aeoess.com/v1/keys</span>
            <span style={{ color: GL.mint }}>● 184,210 events</span>
          </div>
          <pre style={{ margin: 0, padding: '28px 32px', fontFamily: PX.mono, fontSize: 12.5, lineHeight: 1.75, color: PX.ink, overflow: 'auto', background: PX.white }}>
{`$ aps verify audit.log --against gateway.aeoess.com/v1/keys
→ reading 184,210 events …
→ verifying ed25519 signatures   ✓ all 184,210 valid
→ checking merkle inclusion       ✓ root = 7f2c9b71c8e4…
→ rebuilding tenant view          ✓ matches gateway state
→ regulator queries:
    · EU AI Act Art.12 logging    ✓ 100% covered (24 months)
    · NIST AI RMF MANAGE-3        ✓ revocation < 1s
    · ISO 42001 8.2.3             ✓ decision rationale on file
    · SR 11-7 §III B              ✓ model-risk evidence linked
→ verdict: AUDIT_PASS · 1.3s · zero trust in vendor required`}
          </pre>
        </PXTranslucentCard>
      </PageBody>

      <PageCTA
        title="Bring your auditor."
        accent="They'll thank you."
        primary="Get the compliance pack →"
        secondary="Talk to GRC"
        onPrimary={() => onNavigate('contact')}
        onSecondary={() => onNavigate('contact')}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────
// EnterprisePage — agent control plane
// ─────────────────────────────────────────────────────
function EnterprisePage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · ENTERPRISE"
        title="The agent control plane"
        titleAccent="for your org."
        lede="Bring your own identity format. did:key, did:web, SPIFFE, OAuth. Map agents to humans, teams, and vendors. Revoke a key, the agent stops — through every downstream call."
        ctas={['Book a walkthrough →', 'See the pilot']}
        right={(
          <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 22px', borderBottom: `1px solid ${PX.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em' }}>AGENT INVENTORY</div>
                <div style={{ fontFamily: PX.sansDisplay, fontSize: 16, fontWeight: 600, color: PX.ink, marginTop: 2 }}>184 active</div>
              </div>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(125,201,176,0.14)', color: GL.mint, fontFamily: PX.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.18em' }}>● ALL HEALTHY</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: PX.sans, fontSize: 12 }}>
              <thead>
                <tr style={{ background: PX.paperCyan }}>
                  {['Agent', 'Owner', 'Last call'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 16px', fontFamily: PX.mono, fontSize: 9, color: PX.inkFaint, letterSpacing: '0.18em', borderBottom: `1px solid ${PX.border}` }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['invoice-bot-v2', 'L. Patel · Finance', '12s'],
                  ['fraud-classifier', 'A. Rao · Risk', '8s'],
                  ['rag-research', 'M. Cho · R&D', '4h'],
                  ['cs-claude', 'J. Kim · Support', '34s'],
                  ['vendor-ledger', 'Auto · Treasury', '1m'],
                ].map(([a, o, t]) => (
                  <tr key={a} style={{ borderBottom: `1px dotted ${PX.borderSoft}` }}>
                    <td style={{ padding: '10px 16px', fontFamily: PX.mono, fontSize: 11, color: PX.ink }}>did:aps:{a}</td>
                    <td style={{ padding: '10px 16px', color: PX.inkSoft }}>{o}</td>
                    <td style={{ padding: '10px 16px', color: PX.inkDim, fontFamily: PX.mono, fontSize: 11 }}>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PXTranslucentCard>
        )}
      />

      <PageBody variant="soft">
        <SectionHead n="01" k="Identity, your way" title={<>Bring your own <span style={{ color: GL.primary }}>identity format.</span></>} lede="APS doesn't replace your IdP — it composes with it. Map any DID method, SPIFFE workload, or OAuth client to a passport. Use what you already have." />
        <FeatureGrid cols={4} items={[
          { badge: 'DID:KEY', title: 'Standalone keys.', body: 'For agents that hold their own credentials. Stateless, zero-deploy.', hue: 'cyan' },
          { badge: 'DID:WEB', title: 'Domain-bound.', body: 'Discoverable at /.well-known/did.json. Great for vendors and partners.', hue: 'blue' },
          { badge: 'SPIFFE', title: 'Workload identity.', body: 'For agents running in your service mesh. SPIRE-friendly, mTLS-native.', hue: 'lavender' },
          { badge: 'OAUTH', title: 'User-bound.', body: 'For agents acting on a user\'s behalf. Composes with your existing SSO.', hue: 'cyan' },
        ]} />
      </PageBody>

      <PageBody variant="glass" grid={true}>
        <SectionHead n="02" k="Control plane" title={<>Inventory · Scope · Revoke. <span style={{ color: GL.primary }}>One console.</span></>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { t: 'Inventory', d: 'See every agent across every team, every vendor, every cloud. Searchable, filterable, exportable.', hue: 'cyan' },
            { t: 'Scope policy', d: 'Set delegations as code. Reviewable, version-controlled, GitOps-ready.', hue: 'blue' },
            { t: 'Revoke', d: 'Pull a key — the next inbound call denies. Cascades to delegated agents in under a second.', hue: 'lavender' },
          ].map(c => (
            <PXTranslucentCard key={c.t} hue={c.hue} style={{ padding: 30 }}>
              <div style={{ fontFamily: PX.sansDisplay, fontSize: 36, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em' }}>{c.t}</div>
              <p style={{ fontFamily: PX.sans, fontSize: 15, lineHeight: 1.55, color: PX.inkSoft, marginTop: 12, marginBottom: 0 }}>{c.d}</p>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageBody variant="soft">
        <SectionHead n="03" k="Deploy anywhere" title={<>Edge. <span style={{ color: GL.primary }}>Cloud.</span> On-device.</>} lede="The AEOESS Gateway is a single binary. Run it in Cloudflare Workers, in your service mesh, on a Raspberry Pi, or as a managed service. Same protocol. Same receipts." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, fontFamily: PX.mono, fontSize: 12 }}>
          {[
            ['SELF-HOST', '— managed by you', 'docker · helm · binary'],
            ['EDGE', '— under 5ms anywhere', 'workers · lambda · vercel'],
            ['MANAGED', '— gateway.aeoess.com', 'pilot access, by application'],
            ['ON-DEVICE', '— offline-friendly', 'wasm · embedded · cli'],
          ].map(([k, sub, e]) => (
            <PXTranslucentCard key={k} hue="cyan" style={{ padding: 22 }}>
              <div style={{ color: GL.primary, fontWeight: 600, letterSpacing: '0.22em' }}>{k}</div>
              <div style={{ color: PX.inkDim, marginTop: 4, fontSize: 11 }}>{sub}</div>
              <div style={{ color: PX.ink, marginTop: 16, fontSize: 12 }}>{e}</div>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageCTA
        title="Govern every agent."
        accent="Everywhere."
        primary="Book a walkthrough →"
        secondary="See the pilot"
        onPrimary={() => onNavigate('contact')}
        onSecondary={() => onNavigate('pricing')}
      />
    </>
  );
}

Object.assign(window, { ContentPage, ContentCascadeViz, CompliancePage, EnterprisePage });
