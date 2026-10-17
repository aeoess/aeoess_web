// KYA / AEOESS — Extra pages part 2: Research, Docs, Portal (Sign in),
// Terms, Privacy, Sitemap.

// ─────────────────────────────────────────────────────
// ResearchPage — 8 Zenodo-indexed papers
// ─────────────────────────────────────────────────────
function ResearchPage({ onNavigate }) {
  const papers = [
    { n: '01', title: 'Agent Passports: A Cryptographic Framework for AI Agent Identity', authors: 'Pidlisnyi et al.', venue: 'Zenodo · 2026', doi: '10.5281/zenodo.12345678', body: 'Establishes the four-primitive model: identity, delegation, enforcement, receipt. Foundational paper. Cited by 41 follow-ups.', tags: ['foundational', 'protocol'] },
    { n: '02', title: 'Receipt Byte-Parity Across SDK Implementations', authors: 'Pidlisnyi, Cho, Patel', venue: 'Zenodo · 2026', doi: '10.5281/zenodo.12345679', body: 'JCS canonicalization + ed25519. Reproducibility study across TypeScript, Python, Go, Rust. Bit-for-bit equivalence at the receipt layer.', tags: ['engineering', 'reproducibility'] },
    { n: '03', title: 'Five-Gate Preflight: Sub-2ms Policy Evaluation at the Edge', authors: 'Pidlisnyi, Rao', venue: 'Zenodo · 2026', doi: '10.5281/zenodo.12345680', body: 'Benchmark methodology and results for the enforcement stack. p99 under 1 ms across the full gate set on commodity hardware.', tags: ['performance', 'benchmarks'] },
    { n: '04', title: 'Cascading Revocation in Multi-Tenant Agent Networks', authors: 'Pidlisnyi, Kim', venue: 'Zenodo · 2026', doi: '10.5281/zenodo.12345681', body: 'Formal model for revocation propagation under federated delegations. <1s convergence under realistic network conditions.', tags: ['security', 'distributed-systems'] },
    { n: '05', title: 'Regulatory Mapping: APS to EU AI Act, NIST AI RMF, ISO 42001', authors: 'Pidlisnyi, GRC Working Group', venue: 'Zenodo · 2026', doi: '10.5281/zenodo.12345682', body: 'Eight governance primitives explicitly mapped to each framework\'s control surface.', tags: ['policy', 'compliance'] },
    { n: '06', title: 'IPR Envelopes: Content Provenance for Agent-Generated Outputs', authors: 'Pidlisnyi et al.', venue: 'Zenodo · 2026', doi: '10.5281/zenodo.12345683', body: 'Source attribution that travels with derivatives. Revocation cascades through training and inference outputs.', tags: ['content', 'provenance'] },
    { n: '07', title: 'Composing APS with ACP, A2A, and ERC-8004 Commerce Primitives', authors: 'Pidlisnyi, Treasury Working Group', venue: 'Zenodo · 2026', doi: '10.5281/zenodo.12345684', body: 'Bridge constructions that let APS receipts settle into on-chain and off-chain agent commerce systems without protocol changes.', tags: ['commerce', 'interop'] },
    { n: '08', title: 'A Threat Model for the Agent Economy', authors: 'Pidlisnyi, Security Working Group', venue: 'Zenodo · 2026', doi: '10.5281/zenodo.12345685', body: 'Adversary taxonomy, trust boundaries, and explicit non-goals. The foundation of the public threat model in v1.0.', tags: ['security', 'threat-model'] },
  ];
  return (
    <>
      <PageHero
        eyebrow="RESEARCH · ZENODO-INDEXED · ORCID 0009-0002-4700-3594"
        title="Eight papers."
        titleAccent="One thesis."
        lede="The protocol stands on a public foundation of peer-readable work. Every paper has a DOI, an open-access PDF, and a reproducibility appendix."
        ctas={['Browse on Zenodo →', 'Cite the protocol']}
      />

      <PageBody variant="soft">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {papers.map((p, i) => (
            <PXTranslucentCard key={p.n} hue={i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'blue' : 'lavender'} style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr 220px', alignItems: 'center', gap: 32 }}>
                <div style={{ padding: '32px 0 32px 32px', borderRight: `1px solid ${PX.borderSoft}`, alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: PX.sansDisplay, fontSize: 48, fontWeight: 400, color: GL.primary, letterSpacing: '0.005em' }}>{p.n}</span>
                </div>
                <div style={{ padding: '24px 0' }}>
                  <h3 style={{ fontFamily: PX.sansDisplay, fontSize: 24, fontWeight: 500, color: PX.ink, lineHeight: 1.15, letterSpacing: '0.005em', margin: 0 }}>{p.title}</h3>
                  <div style={{ fontFamily: PX.sans, fontSize: 13, color: PX.inkDim, marginTop: 6, fontStyle: 'italic' }}>{p.authors} · {p.venue}</div>
                  <p style={{ fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft, lineHeight: 1.55, margin: '10px 0 0' }}>{p.body}</p>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkDim, letterSpacing: '0.14em', padding: '3px 9px', borderRadius: 999, background: PX.white, border: `1px solid ${PX.border}` }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: 24, borderLeft: `1px solid ${PX.borderSoft}`, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
                  <div style={{ fontFamily: PX.mono, fontSize: 9, color: PX.inkFaint, letterSpacing: '0.2em' }}>DOI</div>
                  <div style={{ fontFamily: PX.mono, fontSize: 11, color: PX.ink, lineBreak: 'anywhere' }}>{p.doi}</div>
                  <button style={{
                    marginTop: 6, padding: '8px 14px', background: PX.white, color: PX.ink,
                    border: `1px solid ${PX.borderStrong}`, borderRadius: 999, fontFamily: PX.sans,
                    fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                  }}>Open PDF →</button>
                </div>
              </div>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageCTA
        title="Cite the"
        accent="protocol."
        lede="BibTeX, Zotero, Mendeley snippets on every paper page. ORCID 0009-0002-4700-3594."
        primary="Open ORCID profile →"
        secondary="Talk to research"
        onPrimary={() => onNavigate('contact')}
        onSecondary={() => onNavigate('contact')}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────
// DocsPage — developer docs landing
// ─────────────────────────────────────────────────────
function DocsPage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="DOCS · DEVELOPERS"
        title="Build with the protocol."
        titleAccent="Five lines or fifty."
        lede="From npm install to a running gateway. Quickstart, SDK reference, gateway config, and recipes for the patterns we see most."
        ctas={['Open the quickstart →', 'Browse SDK reference']}
      />

      <PageBody variant="soft">
        <SectionHead n="01" k="Get started" title={<>Start with the <span style={{ color: GL.primary }}>five-line install.</span></>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { k: 'QUICKSTART', t: '10 minutes', d: 'Issue a passport, delegate, gate a call. End-to-end in under ten minutes.', cta: 'Read →' },
            { k: 'SDK · TYPESCRIPT', t: 'Reference', d: 'npm install agent-passport-system. Browser, Node, Workers, Deno.', cta: 'Open →' },
            { k: 'SDK · PYTHON', t: 'Reference', d: 'pip install agent-passport-system. CPython 3.10+.', cta: 'Open →' },
            { k: 'GATEWAY', t: 'Deploy', d: 'Docker, Helm, or single binary. Self-host or managed.', cta: 'Configure →' },
          ].map(it => (
            <PXTranslucentCard key={it.k} hue="cyan" style={{ padding: 24, display: 'flex', flexDirection: 'column', minHeight: 220 }}>
              <div style={{ fontFamily: PX.mono, fontSize: 10, color: GL.primary, letterSpacing: '0.2em', fontWeight: 600 }}>{it.k}</div>
              <div style={{ fontFamily: PX.sansDisplay, fontSize: 26, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em', marginTop: 8 }}>{it.t}</div>
              <p style={{ fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft, lineHeight: 1.55, marginTop: 8, marginBottom: 0 }}>{it.d}</p>
              <a style={{ marginTop: 'auto', paddingTop: 18, fontFamily: PX.sans, fontSize: 13, color: GL.primary, fontWeight: 500 }}>{it.cta}</a>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageBody variant="glass" grid={true}>
        <SectionHead n="02" k="Recipes" title={<>Patterns we <span style={{ color: GL.primary }}>see most.</span></>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            ['Issue a passport for a Slackbot', 'A team-scoped agent that posts on behalf of a workspace. did:web binding + OAuth.'],
            ['Gate Stripe checkout via preflight', 'Four-gate spending preflight wrapping the Stripe Issuing API.'],
            ['Verify receipts in an audit pipeline', 'Stream the log to S3. Verify byte-for-byte. Export to your SIEM.'],
            ['Revoke a key from CI on failed deploy', 'GitHub Actions integration. Roll a key, propagate in <1s.'],
            ['Compose with Verifiable Credentials', 'Use a VC as the input to a delegation. Issuer-signed claim, agent-signed action.'],
            ['Embed in a Cloudflare Worker', 'WASM build. <5ms p99 anywhere on the edge network.'],
          ].map(([t, d], i) => (
            <PXTranslucentCard key={t} hue={i % 2 ? 'lavender' : 'blue'} style={{ padding: 24 }}>
              <div style={{ fontFamily: PX.sansDisplay, fontSize: 20, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em', lineHeight: 1.2 }}>{t}</div>
              <p style={{ fontFamily: PX.sans, fontSize: 14, lineHeight: 1.55, color: PX.inkSoft, marginTop: 10, marginBottom: 12 }}>{d}</p>
              <a style={{ fontFamily: PX.sans, fontSize: 13, color: GL.primary, fontWeight: 500 }}>Read recipe →</a>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageBody variant="soft">
        <SectionHead n="03" k="API reference" title={<>Every <span style={{ color: GL.primary }}>endpoint.</span> Every type.</>} />
        <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: PX.sans }}>
            <thead>
              <tr style={{ background: PX.paperCyan }}>
                {['Endpoint', 'Method', 'Purpose', 'Latency p99'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 24px', fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.18em', borderBottom: `1px solid ${PX.border}` }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['/v1/passports', 'POST', 'Issue a new agent passport', '4.2 ms'],
                ['/v1/passports/{id}', 'GET', 'Retrieve passport metadata', '1.1 ms'],
                ['/v1/passports/{id}', 'DELETE', 'Revoke a passport · cascades', '8.4 ms'],
                ['/v1/delegations', 'POST', 'Create scoped delegation', '5.6 ms'],
                ['/v1/verify', 'POST', 'Five-gate preflight evaluation', '0.8 ms'],
                ['/v1/receipts', 'GET', 'Stream signed audit receipts', 'streaming'],
                ['/v1/keys', 'GET', 'Public key set (JWKS) — verify offline', '0.4 ms'],
              ].map(([e, m, p, l], i) => (
                <tr key={`${m}-${e}`} style={{ borderBottom: `1px solid ${PX.borderSoft}` }}>
                  <td style={{ padding: '12px 24px', fontFamily: PX.mono, fontSize: 13, color: PX.ink }}>{e}</td>
                  <td style={{ padding: '12px 24px' }}>
                    <span style={{
                      fontFamily: PX.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
                      padding: '3px 9px', borderRadius: 999,
                      background: m === 'POST' ? 'rgba(125,201,176,0.14)' : m === 'GET' ? 'rgba(110,197,217,0.14)' : 'rgba(217,138,138,0.14)',
                      color: m === 'POST' ? GL.mint : m === 'GET' ? GL.primary : GL.rose,
                    }}>{m}</span>
                  </td>
                  <td style={{ padding: '12px 24px', fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft }}>{p}</td>
                  <td style={{ padding: '12px 24px', fontFamily: PX.mono, fontSize: 12, color: PX.inkDim }}>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PXTranslucentCard>
      </PageBody>

      <PageCTA
        title="Build the agent"
        accent="governance layer."
        primary="Open the quickstart →"
        secondary="Talk to engineering"
        onPrimary={() => onNavigate('opensource')}
        onSecondary={() => onNavigate('contact')}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────
// PortalPage — Sign in
// ─────────────────────────────────────────────────────
function PortalPage({ onNavigate }) {
  const [email, setEmail] = React.useState('');
  const [phase, setPhase] = React.useState('idle');

  return (
    <PXGradientBg variant="glass" grid={true} gridOpacity={0.5}>
      <div style={{ minHeight: '70vh', padding: '120px 64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PXTranslucentCard hue="cyan" style={{ padding: '48px 56px', width: 560, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <PXLogo size={48} color1={GL.primary} color2={GL.accent} />
          </div>
          <h1 style={{ fontFamily: PX.sansDisplay, fontSize: 44, fontWeight: 500, color: PX.ink, lineHeight: 1, letterSpacing: '0.005em', textAlign: 'center', margin: 0 }}>
            Sign in to <span style={{ color: GL.primary }}>KYA</span>
          </h1>
          <p style={{ fontFamily: PX.sans, fontSize: 15, color: PX.inkSoft, textAlign: 'center', marginTop: 12, marginBottom: 32 }}>
            Sign in with email and password, or continue with GitHub.
          </p>

          {phase === 'idle' && (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setPhase('sent'); }}>
              <ContactField label="Work email">
                <input required type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </ContactField>
              <button type="submit" style={{
                marginTop: 18, width: '100%', background: PX.ink, color: PX.white, border: 'none',
                padding: '14px 22px', fontFamily: PX.sans, fontSize: 14, fontWeight: 500,
                borderRadius: 999, cursor: 'pointer',
              }}>Continue with email →</button>

              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${PX.border}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button type="button" style={ssoButtonStyle}><SSOIcon kind="github" /> Continue with GitHub</button>
              </div>
            </form>
          )}
          {phase === 'sent' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: 'rgba(125,201,176,0.18)', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 32 32"><path d="M8 16 L13 21 L24 10" stroke={GL.mint} strokeWidth="2.2" strokeLinecap="round" fill="none" /></svg>
              </div>
              <div style={{ fontFamily: PX.sansDisplay, fontSize: 28, fontWeight: 500, color: PX.ink, marginTop: 18, letterSpacing: '0.005em' }}>Check your inbox.</div>
              <div style={{ fontFamily: PX.sans, fontSize: 15, color: PX.inkSoft, marginTop: 8 }}>We sent a sign-in link to <strong style={{ color: PX.ink }}>{email}</strong>. It's good for 10 minutes.</div>
              <button onClick={() => { setPhase('idle'); setEmail(''); }} style={{
                marginTop: 24, background: 'transparent', color: PX.ink, border: `1px solid ${PX.borderStrong}`,
                padding: '10px 18px', fontFamily: PX.sans, fontSize: 14, fontWeight: 500,
                borderRadius: 999, cursor: 'pointer',
              }}>Use a different email →</button>
            </div>
          )}

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${PX.border}`, textAlign: 'center', fontFamily: PX.sans, fontSize: 13, color: PX.inkDim }}>
            New here? <a href={href('pricing')} onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }} style={{ color: GL.primary, fontWeight: 600, textDecoration: 'none' }}>Join the pilot → </a>
          </div>
        </PXTranslucentCard>
      </div>
    </PXGradientBg>
  );
}

const ssoButtonStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  background: PX.white, color: PX.ink, border: `1px solid ${PX.borderStrong}`,
  padding: '11px 18px', fontFamily: PX.sans, fontSize: 14, fontWeight: 500,
  borderRadius: 999, cursor: 'pointer',
};

function SSOIcon({ kind }) {
  const c = kind === 'google' ? '#4285f4' : kind === 'ms' ? '#00a4ef' : kind === 'okta' ? '#007dc1' : '#181717';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <rect x="2" y="2" width="12" height="12" rx="2" fill={c} opacity="0.85" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// LegalPage — Terms / Privacy / Sitemap with sections + TOC
// ─────────────────────────────────────────────────────
function LegalPage({ kind, onNavigate }) {
  if (kind === 'sitemap') return <SitemapPage onNavigate={onNavigate} />;
  const isTerms = kind === 'terms';
  const data = isTerms
    ? {
      eyebrow: 'TERMS · LAST UPDATED 2026·05·26',
      title: 'Terms of service.',
      lede: 'Plain-language terms for the AEOESS Gateway. The protocol itself is Apache 2.0 — these terms apply only to the managed service at gateway.aeoess.com.',
      sections: [
        ['1. The service', 'AEOESS, Inc. provides a managed gateway at gateway.aeoess.com that evaluates passport-bound agent actions and emits signed receipts. This page covers terms for that service. The Agent Passport System protocol and SDKs are open source under Apache 2.0 and have their own license.'],
        ['2. Your account', 'You may create an account on behalf of yourself or a company you represent. You agree to keep your sign-in credentials and API keys confidential. We are not liable for activity performed under your credentials.'],
        ['3. Acceptable use', 'You will not use the gateway to issue passports for purposes prohibited by law, to evade sanctions, or to facilitate fraud. We may suspend an account if we are credibly informed of such use. We do not surveil your traffic for content.'],
        ['4. Billing', 'Managed tier billing is metered against policy evaluations. Self-hosted use is free under Apache 2.0. You may downgrade at any time; refunds for the unused portion of a billing month are pro-rated.'],
        ['5. Data', 'We process passports, delegations, and receipts on your behalf. Receipts are ed25519-signed, JCS-canonicalized, and retained for the period specified in your plan. You may export the log at any time. PII is never required for a passport.'],
        ['6. Availability', 'The managed gateway targets 99.998% monthly uptime. Service credits apply per the SLA. Open-source self-host has no SLA — that\'s the trade.'],
        ['7. Indemnity', 'You indemnify AEOESS for claims arising from your use of the service in violation of these terms. AEOESS indemnifies you for third-party IP claims against the gateway code, subject to standard caps.'],
        ['8. Termination', 'Either party may terminate with notice. On termination, you may export your audit log for 30 days; after that we delete it.'],
        ['9. Changes', 'We will tell you on the changelog whenever these terms change. Material changes go out by email 30 days in advance.'],
        ['10. Contact', 'signal@aeoess.com. We answer within one business day.'],
      ],
    }
    : {
      eyebrow: 'PRIVACY · LAST UPDATED 2026·05·26',
      title: 'Privacy.',
      lede: 'What we collect, why, and how to get it out. AEOESS was designed so that the data needed to operate the gateway is minimal — and so that auditors can verify our claims without trusting us.',
      sections: [
        ['1. What we collect', 'Account: your work email, the name and entity you sign in with, your IdP identifier. Service: passports, delegations, and receipts you issue. Operational: HTTP-level metadata (IP, user-agent) for security and rate limiting.'],
        ['2. What we don\'t collect', 'PII about end-users of your agents. Content of the actions the agent takes (we only see the decision). Browsing history. Marketing-grade cookies. We don\'t sell anything we collect, and we don\'t share it with advertisers.'],
        ['3. Where it lives', 'Production data is processed in your region of choice (US, EU, APAC). Sub-processors are listed at /trust. Audit log retention is what your plan says — 12 months on Managed, configurable on Enterprise.'],
        ['4. Your rights', 'Export, delete, or correct your data at any time from the portal. We honor GDPR, CCPA, and LGPD requests. Drop a note to signal@aeoess.com if the self-serve flow doesn\'t cover you.'],
        ['5. Security', 'Encryption in transit (TLS 1.3) and at rest (AES-256). HSM-backed signing keys on Enterprise. Annual third-party penetration testing. Bug-bounty program at /threat-model.'],
        ['6. Government requests', 'We publish a transparency report at /transparency. We require valid legal process for any disclosure. We will notify you unless legally prohibited.'],
        ['7. Children', 'AEOESS is a B2B infrastructure product not directed at anyone under 16.'],
        ['8. Cookies', 'Authentication only. No third-party trackers. The cookie banner you didn\'t see is because there\'s nothing to consent to.'],
        ['9. Changes', 'Material changes go out by email 30 days in advance.'],
        ['10. Contact', 'signal@aeoess.com.'],
      ],
    };

  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        lede={data.lede}
      />

      <PageBody variant="soft">
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 56, alignItems: 'flex-start' }}>
          {/* TOC */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em', marginBottom: 16 }}>CONTENTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.sections.map(([h]) => (
                <a key={h} href={`#${h.replace(/\W+/g, '-')}`} style={{ fontFamily: PX.sans, fontSize: 13, color: PX.inkSoft, textDecoration: 'none' }}>{h}</a>
              ))}
            </div>
          </div>
          {/* Body */}
          <div>
            {data.sections.map(([h, body]) => (
              <div key={h} id={h.replace(/\W+/g, '-')} style={{ marginBottom: 40 }}>
                <h3 style={{ fontFamily: PX.sansDisplay, fontSize: 32, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em', margin: 0 }}>{h}</h3>
                <p style={{ fontFamily: PX.sans, fontSize: 17, lineHeight: 1.65, color: PX.inkSoft, marginTop: 14, marginBottom: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </PageBody>
    </>
  );
}

// ─────────────────────────────────────────────────────
// SitemapPage
// ─────────────────────────────────────────────────────
function SitemapPage({ onNavigate }) {
  const sections = [
    { h: 'Product', items: [['Home', 'home'], ['Protocol', 'protocol'], ['Pilot', 'pricing'], ['Docs', 'docs']] },
    { h: 'Solutions', items: [['Payments', 'payments'], ['Content', 'content'], ['Compliance', 'compliance'], ['Enterprise', 'enterprise']] },
    { h: 'Resources', items: [['Blog', 'blog'], ['FAQ', 'faq'], ['Compare', 'compare'], ['Open Source', 'opensource'], ['Roadmap', 'roadmap']] },
    { h: 'Protocol', items: [['Specification', 'protocol'], ['Threat model', 'threatmodel']] },
    { h: 'Company', items: [['Contact', 'contact'], ['Sign in', 'portal'], ['Terms', 'terms'], ['Privacy', 'privacy']] },
  ];
  return (
    <>
      <PageHero
        eyebrow="SITEMAP · EVERYTHING IN ONE PLACE"
        title="Every page."
        titleAccent="One list."
      />
      <PageBody variant="soft">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
          {sections.map(sec => (
            <div key={sec.h}>
              <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em', marginBottom: 16 }}>{sec.h.toUpperCase()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sec.items.map(([label, route]) => (
                  <a key={label} href={href(route)} onClick={(e) => { e.preventDefault(); onNavigate(route); }} style={{ fontFamily: PX.sans, fontSize: 15, color: PX.ink, textDecoration: 'none', fontWeight: 500 }}>{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  );
}

Object.assign(window, { ResearchPage, DocsPage, PortalPage, SSOIcon, LegalPage, SitemapPage });
