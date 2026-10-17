// KYA / AEOESS — Extra pages: Roadmap, Threat Model, Working Group,
// Research, Docs.

// ─────────────────────────────────────────────────────
// RoadmapPage
// ─────────────────────────────────────────────────────
function RoadmapPage({ onNavigate }) {
  const eras = [
    {
      label: 'Shipped',
      sub: 'In production · publicly verifiable',
      tone: 'mint',
      items: [
        { date: '2026·05', title: 'IETF Internet-Draft draft-pidlisnyi-aps-01', body: 'Idnits-clean. Individual submission, in the datatracker.' },
        { date: '2026·04', title: 'Receipt byte-parity across TS + Python', body: 'JCS-canonical, ed25519-signed, byte-parity exercised across independent engines.' },
        { date: '2026·02', title: 'NIST · CAISI input filed', body: 'AI 800-2 public submission filed.' },
        { date: '2026·01', title: 'NCCoE concept-paper comments', body: 'Public comments filed on Software and AI Agent Identity and Authorization.' },
        { date: '2025·11', title: 'Apache 2.0 open-source release', body: 'Protocol modules and SDK tests, public from day one.' },
      ],
    },
    {
      label: 'Building',
      sub: 'Active — current quarter',
      tone: 'primary',
      items: [
        { date: 'Q3 2026', title: 'Go + Rust SDKs', body: 'Same conformance suite. Byte-parity receipts. Community-maintained, AEOESS-attested.' },
        { date: 'Q3 2026', title: 'EU AI Act mapping pack', body: 'Pre-mapped controls for Articles 9–15. Exportable evidence bundles.' },
      ],
    },
    {
      label: 'Next',
      sub: 'Roadmap — research and design phase',
      tone: 'lavender',
      items: [
        { date: 'Q4 2026', title: 'Cascading revocation across federations', body: 'Revoke a key, the propagation reaches every counterparty that ever verified it. Without a phone tree.' },
        { date: 'Q4 2026', title: 'ZK-attested delegations', body: 'Prove "this delegation is in policy" without exposing the policy.' },
        { date: 'Q1 2027', title: 'Native ACP / ERC-8004 receipt bridges', body: 'APS receipts compose into on-chain commerce primitives. One signature, two ledgers.' },
        { date: 'Q1 2027', title: 'Hardware-attested edge', body: 'TPM-signed enforcement decisions for regulated edge environments.' },
      ],
    },
    {
      label: 'Long view',
      sub: 'Where this is going',
      tone: 'soft',
      items: [
        { date: '2027+', title: 'IETF Working Group status', body: 'From individual submission to chartered WG. Co-chairs solicited from industry + academia.' },
        { date: '2027+', title: 'National identity bridges', body: 'APS delegations that bind to eIDAS / mDL / national IDs where regulation requires it.' },
        { date: '2028+', title: 'An open protocol any organization can operate', body: 'The endgame: an open, foundation-stewarded protocol with no single dependency on us.' },
      ],
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="ROADMAP · WHAT WE SHIP, WHEN"
        title="The protocol,"
        titleAccent="quarter by quarter."
        lede="What we've shipped, what's in active development, and where the long-term work points. Updated when commits land — never aspirational."
        ctas={['Subscribe to release notes →', 'View on GitHub']}
      />

      <PageBody variant="soft">
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          {/* Vertical timeline */}
          <div style={{ position: 'absolute', top: 40, bottom: 40, left: 156, width: 1, background: `linear-gradient(180deg, transparent, ${PX.borderStrong} 8%, ${PX.borderStrong} 92%, transparent)` }} />
          {eras.map((era, ei) => (
            <div key={era.label} style={{ marginBottom: ei === eras.length - 1 ? 0 : 80 }}>
              {/* Era header */}
              <div style={{ display: 'grid', gridTemplateColumns: '132px 1fr', gap: 32, marginBottom: 28, alignItems: 'baseline' }}>
                <div>
                  <span style={{
                    display: 'inline-block', padding: '4px 12px', borderRadius: 999, fontFamily: PX.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                    background: era.tone === 'mint' ? 'rgba(125,201,176,0.16)' : era.tone === 'primary' ? 'rgba(110,197,217,0.16)' : era.tone === 'lavender' ? 'rgba(162,152,235,0.16)' : PX.paperBlue,
                    color: era.tone === 'mint' ? GL.mint : era.tone === 'primary' ? GL.primary : era.tone === 'lavender' ? PX.lavender : PX.inkDim,
                  }}>{era.label.toUpperCase()}</span>
                </div>
                <div>
                  <div style={{ fontFamily: PX.sansDisplay, fontSize: 32, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em', lineHeight: 1 }}>{era.label}</div>
                  <div style={{ fontFamily: PX.sans, fontSize: 14, color: PX.inkDim, marginTop: 6 }}>{era.sub}</div>
                </div>
              </div>
              {/* Items */}
              {era.items.map((it, i) => (
                <div key={it.title} style={{ display: 'grid', gridTemplateColumns: '132px 1fr', gap: 32, marginBottom: 14, position: 'relative' }}>
                  <div style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkFaint, letterSpacing: '0.16em', paddingTop: 28, textAlign: 'right', paddingRight: 0 }}>{it.date}</div>
                  <div style={{ position: 'relative' }}>
                    {/* Node */}
                    <div style={{ position: 'absolute', left: -32, top: 32, width: 12, height: 12, borderRadius: '50%', background: PX.white, border: `1.5px solid ${era.tone === 'mint' ? GL.mint : era.tone === 'primary' ? GL.primary : era.tone === 'lavender' ? PX.lavender : PX.inkDim}` }} />
                    <PXTranslucentCard hue={era.tone === 'lavender' ? 'lavender' : era.tone === 'primary' ? 'cyan' : 'blue'} style={{ padding: '22px 26px' }}>
                      <div style={{ fontFamily: PX.sansDisplay, fontSize: 22, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em' }}>{it.title}</div>
                      <div style={{ fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft, marginTop: 8, lineHeight: 1.55 }}>{it.body}</div>
                    </PXTranslucentCard>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </PageBody>

      <PageCTA
        title="Track every"
        accent="release."
        lede="Release notes, breaking changes, RFC drafts — all on the same atom feed."
        primary="Subscribe →"
        secondary="Watch on GitHub"
        onPrimary={() => onNavigate('contact')}
        onSecondary={() => onNavigate('opensource')}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────
// ThreatModelPage
// ─────────────────────────────────────────────────────
function ThreatModelPage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="THREAT MODEL · v1.0 · PUBLIC"
        title="What APS defends against."
        titleAccent="And what it doesn't."
        lede="A protocol is only as honest as its threat model. Below is the full set of adversaries we've designed against, the cryptographic guarantees we make, and the failure modes we explicitly do not cover."
        ctas={['Read the full RFC →', 'Report a vulnerability']}
        right={(
          <PXTranslucentCard hue="blue" style={{ padding: 28 }}>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkDim, letterSpacing: '0.22em', marginBottom: 14 }}>TRUST BOUNDARIES</div>
            <div style={{ fontFamily: PX.mono, fontSize: 12, color: PX.inkSoft, lineHeight: 1.85 }}>
              <div><span style={{ color: GL.mint }}>✓</span> &nbsp;Agent (assumed adversarial)</div>
              <div><span style={{ color: GL.mint }}>✓</span> &nbsp;Operator (compromise tolerated)</div>
              <div><span style={{ color: GL.mint }}>✓</span> &nbsp;Network (active MITM)</div>
              <div><span style={{ color: GL.mint }}>✓</span> &nbsp;Gateway operator (logs verifiable w/o trust)</div>
              <div><span style={{ color: GL.mint }}>✓</span> &nbsp;Counterparty (must verify receipts)</div>
              <div style={{ marginTop: 10 }}><span style={{ color: GL.rose }}>✗</span> &nbsp;Owner with key access (assumed honest)</div>
              <div><span style={{ color: GL.rose }}>✗</span> &nbsp;Physical HSM compromise (out of scope)</div>
            </div>
          </PXTranslucentCard>
        )}
      />

      <PageBody variant="soft">
        <SectionHead n="01" k="Adversaries" title={<>What we <span style={{ color: GL.primary }}>defend against.</span></>} />
        <FeatureGrid cols={2} items={[
          { badge: 'A1 · ROGUE AGENT', title: 'A compromised model wants to exceed scope.', body: 'A jailbroken or hijacked agent attempts to call out-of-policy. Five-gate preflight refuses before signing. No request leaves the gateway.', hue: 'cyan' },
          { badge: 'A2 · MITM', title: 'An attacker rewrites the request mid-flight.', body: 'Every passport, delegation, and action is ed25519-signed. Bit-flip = signature failure = deny. TLS termination is irrelevant to receipt verifiability.', hue: 'blue' },
          { badge: 'A3 · IMPERSONATION', title: 'A bad actor presents a stolen passport.', body: 'Revocation list is consulted in <1s. Stolen-but-revoked = deny. Stolen-not-yet-revoked = bounded by spend and freshness gates.', hue: 'lavender' },
          { badge: 'A4 · DISHONEST GATEWAY', title: 'The gateway lies about what it allowed.', body: 'Auditors verify receipts against published keys. Forgery = a key the public registry would not recognize. We cannot lie undetectably.', hue: 'cyan' },
          { badge: 'A5 · REPLAY', title: 'An attacker re-submits a valid signed request.', body: 'Freshness gate (60s window by default) + nonce binding. Re-submission past the window = deny. Within window = inert (already counted).', hue: 'blue' },
          { badge: 'A6 · LOG TAMPERING', title: 'Attacker rewrites the audit log post-hoc.', body: 'Logs are Merkle-rooted and ed25519-signed at append. Any rewrite invalidates the root. Auditors can detect on first verify.', hue: 'lavender' },
        ]} />
      </PageBody>

      <PageBody variant="glass" grid={true}>
        <SectionHead n="02" k="What we explicitly don't cover" title={<>Out of <span style={{ color: GL.primary }}>scope.</span></>} lede="A protocol that claims to cover everything is the one to be skeptical of. Here's what APS does not protect against — by design — and what to pair it with." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            ['Physical HSM compromise', 'If your root key is extracted from hardware, APS cannot help. Pair with FIPS 140-3 L3+ for that threat.'],
            ['Endpoint malware on the operator', 'A keylogger on the human signing delegations is out of scope. EDR + hardware-keys cover this.'],
            ['Side-channel on the gateway', 'Timing and cache attacks on enforcement decisions are mitigated, not eliminated. Run on isolated tenants for critical workloads.'],
            ['Out-of-band exfiltration', 'APS gates the action; it cannot stop a model from speaking secrets in its reply. Pair with output DLP.'],
            ['Social engineering of the human', 'A user who is tricked into signing a malicious delegation has signed it. Hardware confirmation + 4-eyes mitigate.'],
            ['Quantum break on ed25519', 'Today\'s curves are pre-quantum. PQ-hybrid signing is on the roadmap; not in v1.0.'],
          ].map(([t, body]) => (
            <PXTranslucentCard key={t} hue="lavender" style={{ padding: 24 }}>
              <div style={{ fontFamily: PX.sansDisplay, fontSize: 19, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em' }}>{t}</div>
              <div style={{ fontFamily: PX.sans, fontSize: 14, lineHeight: 1.55, color: PX.inkSoft, marginTop: 10 }}>{body}</div>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageBody variant="soft">
        <SectionHead n="03" k="Disclosure" title={<>Found something? <span style={{ color: GL.primary }}>Tell us.</span></>} lede="Coordinated disclosure window: 90 days. Email us with reproduction steps and impact — we'll respond within one business day." />
        <PXTranslucentCard hue="cyan" style={{ padding: 32, textAlign: 'center' }}>
          <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em' }}>DISCLOSURE EMAIL</div>
          <div style={{ fontFamily: PX.mono, fontSize: 20, color: PX.ink, marginTop: 10 }}>signal@aeoess.com</div>
        </PXTranslucentCard>
      </PageBody>

      <PageCTA
        title="Audit us"
        accent="in the open."
        primary="Report a vulnerability →"
        secondary="Read the RFC"
        onPrimary={() => onNavigate('contact')}
        onSecondary={() => onNavigate('protocol')}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────
// WorkingGroupPage
// ─────────────────────────────────────────────────────
function WorkingGroupPage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="WORKING GROUP · PUBLIC BY DEFAULT"
        title="The Agent Passport"
        titleAccent="Working Group."
        lede="A protocol is only legitimate if everyone affected can shape it. Weekly calls, all-public mailing list, RFC-driven design. If you've shipped agents in production, you should have a seat."
        ctas={['Join the next call →', 'Read the charter']}
        right={(
          <PXTranslucentCard hue="cyan" style={{ padding: 28 }}>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkDim, letterSpacing: '0.22em', marginBottom: 14 }}>NEXT CALL</div>
            <div style={{ fontFamily: PX.sansDisplay, fontSize: 28, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em' }}>Thu · May 28</div>
            <div style={{ fontFamily: PX.sansDisplay, fontSize: 56, fontWeight: 500, color: GL.primary, letterSpacing: '0.005em', lineHeight: 1, marginTop: 6 }}>16:00 UTC</div>
            <div style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkDim, letterSpacing: '0.12em', marginTop: 18 }}>09:00 PT · 12:00 ET · 17:00 BST · 18:00 CET</div>
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${PX.border}`, fontFamily: PX.mono, fontSize: 12, color: PX.inkSoft, lineHeight: 1.85 }}>
              <div><span style={{ color: PX.inkFaint }}>agenda:</span> draft-02 review</div>
              <div><span style={{ color: PX.inkFaint }}>chair:</span> rotating</div>
              <div><span style={{ color: PX.inkFaint }}>zoom:</span> open · recorded</div>
            </div>
          </PXTranslucentCard>
        )}
      />

      <PageBody variant="soft">
        <SectionHead n="01" k="Charter" title={<>Open. Boring. <span style={{ color: GL.primary }}>Public.</span></>} lede="The WG runs on the rules every standards body runs on. No surprises." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            ['Cadence', 'Weekly · Thursdays · 16:00 UTC', 'Recorded · published within 48h. Zoom dial-in posted to the list every Monday.'],
            ['Mailing list', 'aps-wg@ietf.org', 'Archived. Searchable. No private channels for protocol decisions — if it matters, it\'s on-list.'],
            ['RFC process', 'GitHub PR → list discussion → 2-week call', 'Substantive changes need rough consensus on the list and ratification at a WG call. idnits enforced.'],
            ['Code of conduct', 'IETF BCP 25', 'In effect. Chairs and the Ombudsperson enforce. The work is technical, not personal.'],
          ].map(([k, v, body]) => (
            <PXTranslucentCard key={k} hue="cyan" style={{ padding: 28 }}>
              <div style={{ fontFamily: PX.mono, fontSize: 10, color: GL.primary, letterSpacing: '0.22em', fontWeight: 600 }}>{k.toUpperCase()}</div>
              <div style={{ fontFamily: PX.sansDisplay, fontSize: 28, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em', marginTop: 8 }}>{v}</div>
              <div style={{ fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft, lineHeight: 1.55, marginTop: 10 }}>{body}</div>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageBody variant="glass" grid={true}>
        <SectionHead n="02" k="Active proposals" title={<>What's <span style={{ color: GL.primary }}>on the list</span> right now.</>} />
        <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            ['draft-pidlisnyi-aps-02', 'Receipt envelope · revision 02', 'in-review · 14 comments', 'primary'],
            ['draft-aps-revocation-cascade', 'Multi-tenant revocation propagation', 'discussion · open', 'lavender'],
            ['draft-aps-zk-delegation', 'Zero-knowledge delegation proofs', 'concept · early', 'lavender'],
            ['draft-aps-pq-hybrid', 'Post-quantum hybrid signing', 'discussion · open', 'lavender'],
            ['rfc-acp-receipt-bridge', 'ACP / ERC-8004 receipt bridge', 'reviewed · accepted', 'mint'],
          ].map(([id, t, st, tone], i) => (
            <div key={id} style={{
              display: 'grid', gridTemplateColumns: '320px 1fr 220px',
              gap: 24, padding: '20px 28px', alignItems: 'center',
              borderBottom: i === 4 ? 'none' : `1px solid ${PX.borderSoft}`,
            }}>
              <span style={{ fontFamily: PX.mono, fontSize: 13, color: PX.ink, fontWeight: 600 }}>{id}</span>
              <span style={{ fontFamily: PX.sans, fontSize: 15, color: PX.inkSoft }}>{t}</span>
              <span style={{
                fontFamily: PX.mono, fontSize: 11, letterSpacing: '0.16em', fontWeight: 600,
                padding: '4px 12px', borderRadius: 999, textAlign: 'center',
                background: tone === 'mint' ? 'rgba(125,201,176,0.16)' : tone === 'primary' ? 'rgba(110,197,217,0.16)' : 'rgba(162,152,235,0.16)',
                color: tone === 'mint' ? GL.mint : tone === 'primary' ? GL.primary : PX.lavender,
              }}>● {st.toUpperCase()}</span>
            </div>
          ))}
        </PXTranslucentCard>
      </PageBody>

      <PageCTA
        title="Show up"
        accent="for the work."
        lede="Thursday, 16:00 UTC. Open Zoom. Recorded. You don't have to speak — you can just lurk."
        primary="Subscribe to the list →"
        secondary="Read the archives"
        onPrimary={() => onNavigate('contact')}
        onSecondary={() => onNavigate('opensource')}
      />
    </>
  );
}

Object.assign(window, { RoadmapPage, ThreatModelPage, WorkingGroupPage });
