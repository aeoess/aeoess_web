// KYA / AEOESS — Resources Part 2: Blog, FAQ, Compare, Contact.

// ─────────────────────────────────────────────────────
// BlogPage
// ─────────────────────────────────────────────────────
function BlogPage({ onNavigate }) {
  const posts = [
    { date: '2026·05·15', cat: 'engineering', title: 'Stream A: shipping a Rust verifier with 191 tests.', excerpt: 'The Rust verifier is the third independent implementation of the APS receipt format. 191 tests covering signature verification, canonicalization, and edge cases against the conformance suite. Why three implementations matter for byte parity.', read: '8 min' },
    { date: '2026·05·10', cat: 'governance', title: 'PR-MERGE-PROTOCOL v0.3: how AEOESS reviews protocol changes.', excerpt: 'Track A artifacts go to maintainer call. Track B definition changes need Consilium pass + signoff. The structured review process that scales adversarial review without scaling the team.', read: '6 min' },
    { date: '2026·04·28', cat: 'standards', title: 'draft-pidlisnyi-aps: submitting an Internet-Draft to the IETF.', excerpt: 'Six months of design notes, one idnits-clean draft, individual submission to the datatracker. What is in draft-01, and what the community has been pushing back on.', read: '9 min' },
    { date: '2026·04·15', cat: 'ecosystem', title: 'Microsoft Agent Governance Toolkit: 3 PRs merged.', excerpt: 'Three PRs landed in microsoft/agent-governance-toolkit (#274, #598, #1328). What the integration looks like, and why APS composes with Microsoft roadmap items instead of competing with them.', read: '5 min' },
    { date: '2026·03·24', cat: 'governance', title: 'The open contribution doctrine: how we treat outside contributors.', excerpt: 'Unknown is not hostile. Unverified is not canonical. Contribution is how trust is earned. The three-surface model — Commons, Candidate, Core — that turns the protocol into how we run the project.', read: '7 min' },
  ];
  return (
    <>
      <PageHero
        eyebrow="THE BULLETIN · FIELD NOTES"
        title="Notes from"
        titleAccent="the protocol."
        lede="Engineering, governance, and standards work — by the people building KYA. Long-form, honest, and signed."
        ctas={['Subscribe →']}
      />

      <PageBody variant="soft">
        {/* Featured post */}
        <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden', marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', gap: 0 }}>
            <div style={{ padding: 48 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
                <PXPill color={GL.primary} bg="rgba(110,197,217,0.12)">FEATURED</PXPill>
                <span style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkFaint, letterSpacing: '0.16em' }}>{posts[0].date.toUpperCase()} · {posts[0].cat.toUpperCase()}</span>
              </div>
              <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 52, fontWeight: 500, color: PX.ink, lineHeight: 1, letterSpacing: '0.005em', margin: 0 }}>{posts[0].title}</h2>
              <p style={{ fontFamily: PX.sans, fontSize: 17, lineHeight: 1.55, color: PX.inkSoft, marginTop: 18, marginBottom: 0 }}>{posts[0].excerpt}</p>
              <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
                <a style={{ fontFamily: PX.sans, fontSize: 14, color: GL.primary, fontWeight: 600 }}>Read the post →</a>
                <span style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkFaint, letterSpacing: '0.14em' }}>{posts[0].read}</span>
              </div>
            </div>
            <div style={{ alignSelf: 'stretch', position: 'relative', background: `linear-gradient(135deg, ${PX.paperCyan}, ${PX.paperLavender})`, minHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PXIdentityOrbit size={300} palette="glass" nucleus="DRAFT" subline="draft-pidlisnyi-aps-01" labels={['§1','§2','§3','§4','§5']} />
            </div>
          </div>
        </PXTranslucentCard>

        {/* Post grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {posts.slice(1).map((p, i) => (
            <PXTranslucentCard key={p.title} hue={i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'blue' : 'lavender'} style={{ padding: 28, display: 'flex', flexDirection: 'column', minHeight: 280 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: PX.mono, fontSize: 10, color: GL.primary, letterSpacing: '0.2em', fontWeight: 600 }}>{p.cat.toUpperCase()}</span>
                <span style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.18em' }}>{p.date}</span>
              </div>
              <h3 style={{ fontFamily: PX.sansDisplay, fontSize: 26, fontWeight: 500, color: PX.ink, lineHeight: 1.1, letterSpacing: '0.005em', margin: '14px 0 0' }}>{p.title}</h3>
              <p style={{ fontFamily: PX.sans, fontSize: 14, lineHeight: 1.55, color: PX.inkSoft, marginTop: 12, marginBottom: 0 }}>{p.excerpt}</p>
              <div style={{ marginTop: 'auto', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a style={{ fontFamily: PX.sans, fontSize: 13, color: GL.primary, fontWeight: 500 }}>Read →</a>
                <span style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkFaint, letterSpacing: '0.12em' }}>{p.read}</span>
              </div>
            </PXTranslucentCard>
          ))}
        </div>
      </PageBody>

      <PageCTA
        title="Get the bulletin"
        accent="in your inbox."
        lede="One email a week. Engineering and policy notes, signed."
        primary="Subscribe →"
        secondary="View RSS"
        onPrimary={() => onNavigate('contact')}
        onSecondary={() => onNavigate('contact')}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────
// FAQPage
// ─────────────────────────────────────────────────────
function FAQPage({ onNavigate }) {
  const sections = [
    {
      h: 'Protocol',
      items: [
        ['Is APS an identity provider?', 'No. APS composes with your existing identity — did:key, did:web, SPIFFE, OAuth. We add the missing piece: cryptographic delegation, enforcement, and signed receipts for agent actions on top of whatever identity layer you already trust.'],
        ['Why DIDs?', 'Decentralized identifiers let an agent prove who it is without a central registry. Pick did:key for standalone keys, did:web for domain-bound discoverability, or SPIFFE for service-mesh workloads. Same passport format underneath.'],
        ['How is a receipt verifiable without trusting aeoess?', 'Every receipt is JCS-canonicalized (RFC 8785), hashed with SHA-256, and ed25519-signed by the gateway. Auditors verify against the public keys we publish at aeoess.com/v1/keys. We could not forge a receipt without your verifier catching it.'],
      ],
    },
    {
      h: 'Engineering',
      items: [
        ['What\'s the latency cost?', 'p99 policy evaluation stays under 1 ms against the full five-gate stack (signature, scope, spend, freshness, revocation) at sustained 403 ops/sec on commodity hardware.'],
        ['Where do I deploy it?', 'Anywhere. Single binary or Docker image. Common: as an edge worker, an L7 proxy in your service mesh, a sidecar, or call gateway.aeoess.com for the managed tier. Same wire format and SDKs everywhere.'],
        ['Which SDKs are first-class?', 'TypeScript and Python ship together with byte-parity receipts. Go, Rust, and Swift SDKs are community-maintained against the same conformance suite. Anything with WebCrypto or libsodium can implement the protocol.'],
      ],
    },
    {
      h: 'Access & open source',
      items: [
        ['Is it really free to self-host?', 'Yes. Apache 2.0, no usage limits, no telemetry, no upsell. You can run the gateway, SDKs, and CLI without ever talking to aeoess. The managed gateway, for teams who prefer not to run it themselves, is in research pilot.'],
        ['Can I fork it?', 'Please do. The Working Group is public; we accept upstream PRs from anyone, and we encourage organizations to maintain their own builds. The conformance suite ensures forks stay interoperable.'],
        ['What\'s the catch?', 'There isn\'t one. The bet: an open protocol wins because every counterparty has to implement it, and we monetize the convenience of not running infrastructure yourself.'],
      ],
    },
    {
      h: 'Compliance',
      items: [
        ['Which frameworks does APS map to?', 'EU AI Act (Art. 9–15), NIST AI RMF 1.0, ISO 42001, and SR 11-7 for model risk. The eight governance primitives in the protocol cover identity, authority, purpose, boundary, audit, revocation, reconciliation, and verifiability — the categorical surface every framework asks for.'],
        ['Does APS process PII?', 'No PII is required for a passport — an agent is identified by a cryptographic key, not a person. When you bind a passport to a human via OAuth, the PII stays in your IdP; AEOESS records only the binding fact.'],
        ['Is there a SOC 2 report?', 'No. There is no SOC 2 or ISO 27001 report. The protocol, SDKs and MCP server are open source, so you can review the code that handles your data.'],
      ],
    },
    {
      h: 'Operations & support',
      items: [
        ['How do I get started?', 'Three paths. Self-host the gateway under Apache 2.0 for zero cost and zero signup. The managed gateway is available through the Model Citizen research pilot, by application at aeoess.com/model-citizen. Quickstart docs at /docs.'],
        ['Is there a free tier?', 'The self-hosted gateway is free forever under Apache 2.0. The managed gateway runs as a research pilot; terms are set per engagement.'],
        ['What is the SLA on the Production tier?', 'The managed gateway is pilot-stage; no contractual SLA is sold today. The protocol itself is fail-closed by design — if the gateway is unreachable, agents deny by default. No silent allow.'],
        ['Where is my data stored? Can I get EU data residency?', 'The hosted gateway is pilot-stage and makes no data residency commitment. If data location matters, self-host the open source gateway and the data stays on your own infrastructure.'],
        ['How do I export my receipts and audit log?', 'Anytime, via the gateway API or portal. Receipts export to Parquet, JSON Lines, or S3. The signed audit log is JCS-canonicalized (RFC 8785) and verifiable byte-for-byte against the public key set — auditors can verify without trusting AEOESS.'],
        ['How do we get access to the managed gateway?', 'Access is through the Model Citizen research pilot, by application. The protocol and SDKs are Apache 2.0 and free to self-host.'],
        ['What happens to my data if I cancel?', 'You can export everything (receipts, delegations, policy config) in standard formats at any time. Your agent keys are yours — AEOESS never holds private keys.'],
        ['What support do you offer at each tier?', 'Open Source: community support via GitHub issues and the public Working Group. Production: email support during business hours (US/EU coverage). Enterprise: priority email plus dedicated Slack channel, named CSM, and quarterly business reviews.'],
        ['Who is behind AEOESS?', 'AEOESS is led by Tymofii Pidlisnyi (founder). The protocol is Apache 2.0, with 8 peer-reviewed papers on Zenodo (ORCID 0009-0002-4700-3594), an active IETF Internet-Draft (draft-pidlisnyi-aps), three merged contributions to Microsoft Agent Governance Toolkit (#274, #598, #1328), and acknowledged input to NIST CAISI and NCCoE. The protocol is designed to outlive any single vendor.'],
        ['Can I see a demo?', 'Yes. The /verify demo on the homepage is real — it runs an actual five-gate preflight against a demo passport. For a guided walk-through, email signal@aeoess.com or open the portal to issue your first passport in under five minutes.'],
      ],
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="FAQ · COMMON QUESTIONS"
        title="Questions we hear"
        titleAccent="most."
        lede="A protocol-level governance system is unfamiliar territory. Here's what people ask in the first five minutes — and what the long answers look like."
        ctas={['Ask the engineering team →']}
      />

      <PageBody variant="soft">
        {sections.map((sec, si) => (
          <div key={sec.h} style={{ marginBottom: 56 }}>
            <SectionHead n={`0${si + 1}`} k={sec.h} title={null} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {sec.items.map(([q, a], i) => <FAQItem key={q} q={q} a={a} startOpen={si === 0 && i === 0} />)}
            </div>
          </div>
        ))}
      </PageBody>

      <PageCTA
        title="Have a"
        accent="different question?"
        lede="Engineering reads every email. Answers within a day."
        primary="Email engineering →"
        secondary="Browse the spec"
        onPrimary={() => onNavigate('contact')}
        onSecondary={() => onNavigate('protocol')}
      />
    </>
  );
}

function FAQItem({ q, a, startOpen }) {
  const [open, setOpen] = React.useState(!!startOpen);
  return (
    <PXTranslucentCard hue={open ? 'cyan' : 'blue'} style={{ padding: 0, overflow: 'hidden', transition: 'all .2s' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '22px 28px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
      >
        <span style={{ fontFamily: PX.sansDisplay, fontSize: 22, fontWeight: 500, color: PX.ink, letterSpacing: '0.005em', lineHeight: 1.2 }}>{q}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" style={{ flex: 'none', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .25s' }}>
          <line x1="4" y1="10" x2="16" y2="10" stroke={GL.primary} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="10" y1="4" x2="10" y2="16" stroke={GL.primary} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div style={{ padding: '0 28px 26px', fontFamily: PX.sans, fontSize: 15.5, lineHeight: 1.65, color: PX.inkSoft }}>
          {a}
        </div>
      )}
    </PXTranslucentCard>
  );
}

// ─────────────────────────────────────────────────────
// ComparePage
// ─────────────────────────────────────────────────────
function ComparePage({ onNavigate }) {
  const rows = [
    ['Identity binding',         { kya: 'Cryptographic DID',     stripe: 'Card number',          oauth: 'User token',          vc: 'Issuer-signed claim' }],
    ['Scope enforcement',        { kya: 'Pre-flight, signed',     stripe: 'Spending controls',    oauth: 'Token scopes',        vc: 'Off-chain policy' }],
    ['Revocation latency',       { kya: '< 1 second',             stripe: 'Hours',                oauth: 'Minutes (introspect)', vc: 'Off-chain CRL' }],
    ['Receipt verifiability',    { kya: 'Byte-for-byte',          stripe: 'Trust Stripe',         oauth: 'Trust IdP',           vc: 'Issuer-attested' }],
    ['Per-call budget',          { kya: 'Yes · $/call',           stripe: 'Yes',                  oauth: 'No',                  vc: 'No' }],
    ['Audit log format',         { kya: 'RFC 8785 · ed25519',     stripe: 'Proprietary',          oauth: 'Vendor-defined',      vc: 'JSON-LD' }],
    ['Cross-vendor portable',    { kya: 'Yes · open protocol',    stripe: 'No',                   oauth: 'Partly (OIDC)',       vc: 'Yes' }],
    ['Open source · Apache 2.0', { kya: '✓',                      stripe: '—',                    oauth: 'Spec only',           vc: 'Most impls' }],
  ];
  return (
    <>
      <PageHero
        eyebrow="COMPARE · APS vs. THE ALTERNATIVES"
        title="What APS gives you"
        titleAccent="that nothing else does."
        lede="Stripe Issuing locks you to one rail. OAuth doesn't bind to agents. Verifiable Credentials assume an issuer you may not have. APS is the only protocol-level layer that pairs identity, scope, enforcement, and receipts — at the wire level — for autonomous agents."
        ctas={['View on GitHub →', 'Read the spec']}
      />

      <PageBody variant="soft">
        <PXTranslucentCard hue="cyan" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: PX.sans }}>
            <thead>
              <tr style={{ background: PX.paperCyan }}>
                <th style={{ textAlign: 'left', padding: '20px 28px', fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.18em', borderBottom: `1px solid ${PX.border}` }}>CAPABILITY</th>
                <th style={{ textAlign: 'left', padding: '20px 28px', fontFamily: PX.sansDisplay, fontSize: 18, fontWeight: 600, color: PX.ink, letterSpacing: '0.04em', borderBottom: `2px solid ${GL.primary}`, background: 'rgba(110,197,217,0.06)' }}>KYA</th>
                <th style={{ textAlign: 'left', padding: '20px 28px', fontFamily: PX.sansDisplay, fontSize: 16, fontWeight: 500, color: PX.inkSoft, letterSpacing: '0.02em', borderBottom: `1px solid ${PX.border}` }}>Stripe Issuing</th>
                <th style={{ textAlign: 'left', padding: '20px 28px', fontFamily: PX.sansDisplay, fontSize: 16, fontWeight: 500, color: PX.inkSoft, letterSpacing: '0.02em', borderBottom: `1px solid ${PX.border}` }}>OAuth · OIDC</th>
                <th style={{ textAlign: 'left', padding: '20px 28px', fontFamily: PX.sansDisplay, fontSize: 16, fontWeight: 500, color: PX.inkSoft, letterSpacing: '0.02em', borderBottom: `1px solid ${PX.border}` }}>Verifiable Credentials</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([cap, v], i) => (
                <tr key={cap} style={{ borderBottom: `1px solid ${PX.borderSoft}` }}>
                  <td style={{ padding: '16px 28px', fontFamily: PX.sans, fontSize: 14, color: PX.inkDim, fontWeight: 500 }}>{cap}</td>
                  <td style={{ padding: '16px 28px', fontFamily: PX.sans, fontSize: 14, color: PX.ink, fontWeight: 600, background: 'rgba(110,197,217,0.04)' }}>{v.kya}</td>
                  <td style={{ padding: '16px 28px', fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft }}>{v.stripe}</td>
                  <td style={{ padding: '16px 28px', fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft }}>{v.oauth}</td>
                  <td style={{ padding: '16px 28px', fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft }}>{v.vc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PXTranslucentCard>
      </PageBody>

      <PageBody variant="glass" grid={true}>
        <SectionHead n="01" k="Where each one fits" title={<>Composes, doesn't <span style={{ color: GL.primary }}>replace.</span></>} lede="Use what you already have. APS wraps OAuth tokens, settles atop Stripe Issuing, and emits VC-compatible attestations. The point of an open protocol is to play with what's already there." />
        <FeatureGrid cols={2} items={[
          { badge: 'WITH OAUTH', title: 'Bind passports to a human session.', body: 'Your IdP holds the user. APS holds the agent. A delegation links them — when the user signs out, the agent\'s passport revokes.', hue: 'cyan' },
          { badge: 'WITH STRIPE ISSUING', title: 'Issue a card, gate every charge.', body: 'Use Stripe Issuing for the card; use APS preflight for the authorization decision. Settled card, signed reason, one log.', hue: 'blue' },
          { badge: 'WITH VC', title: 'Wrap VCs in the receipt format.', body: 'A Verifiable Credential can be the input to an APS delegation. The receipt format adds the action-side proof VC alone doesn\'t carry.', hue: 'lavender' },
          { badge: 'WITH SPIFFE', title: 'Workload identity for the agent runtime.', body: 'SPIFFE binds the host; APS binds the agent on top. Same trust root, different question being answered.', hue: 'cyan' },
        ]} />
      </PageBody>

      <PageCTA
        title="Stack APS"
        accent="on what you have."
        primary="Read the integration guides →"
        secondary="Talk to engineering"
        onPrimary={() => onNavigate('protocol')}
        onSecondary={() => onNavigate('contact')}
      />
    </>
  );
}

Object.assign(window, { BlogPage, FAQPage, FAQItem, ComparePage });
