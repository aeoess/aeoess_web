// aeoess-solutions.jsx, Payments, Content, Compliance, Enterprise
// Restrained design language. Reuses SubHeader, Footer, SectionEyebrow,
// primaryBtn, secondaryBtn, sectionH2 from aeoess-subpages-1 / aeoess-restrained.
// Voice canon: no em-dashes, no AI-tells, no "not X but Y", no validation openers.
// Public/private boundary respected: gateway is mentioned as a deployment option,
// product intelligence layer is not.

const {
  SubHeader, Footer, SectionEyebrow,
  primaryBtn, secondaryBtn, sectionH2, navLink,
} = window;

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// ── Shared atoms ────────────────────────────────────────────────

function SolBreadcrumb({ palette: P, label }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8, fontSize:12,
      color:P.ink5, fontFamily:MONO, marginBottom:22, letterSpacing:'0.02em',
    }}>
      <a href="#" style={{ color:P.ink5, textDecoration:'none' }}>aeoess</a>
      <span>/</span>
      <a href="#" style={{ color:P.ink5, textDecoration:'none' }}>solutions</a>
      <span>/</span>
      <span style={{ color:P.ink3 }}>{label}</span>
    </div>
  );
}

function HeroBadges({ palette: P }) {
  const chip = {
    display:'inline-flex', alignItems:'center', gap:6, padding:'5px 10px',
    border:`1px solid ${P.ruleLight}`, borderRadius:999,
    fontSize:11.5, fontFamily:MONO, color:P.ink3, letterSpacing:'0.02em',
    background:P.paper,
  };
  return (
    <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:24 }}>
      <span style={chip}><span style={{ width:6, height:6, borderRadius:'50%', background:P.green }}/>Live primitives</span>
      <span style={chip}>Apache-2.0</span>
    </div>
  );
}

function PillarCard({ palette: P, lead, body, refs }) {
  return (
    <div style={{
      padding:'24px 26px', border:`1px solid ${P.ruleLight}`, borderRadius:6,
      background:P.paper, display:'flex', flexDirection:'column', gap:12,
    }}>
      <p style={{
        fontSize:15, lineHeight:1.55, color:P.ink3, margin:0, textWrap:'pretty',
      }}>
        <strong style={{ color:P.ink, fontWeight:600 }}>{lead}</strong> {body}
      </p>
      {refs && (
        <div style={{
          marginTop:'auto', paddingTop:12, borderTop:`1px solid ${P.ruleLight}`,
          fontFamily:MONO, fontSize:11.5, color:P.ink5, lineHeight:1.6,
        }}>
          {refs.map((r, i) => <div key={i}>{r}</div>)}
        </div>
      )}
    </div>
  );
}

function ProofList({ palette: P, items }) {
  return (
    <ul style={{ listStyle:'none', padding:0, margin:0, display:'grid', gap:14 }}>
      {items.map((it, i) => (
        <li key={i} style={{
          display:'grid', gridTemplateColumns:'14px 1fr auto', gap:14, alignItems:'baseline',
          paddingBottom:14, borderBottom: i < items.length-1 ? `1px solid ${P.ruleLight}` : 'none',
        }}>
          <span style={{ color:P.accentColor, fontFamily:MONO, fontSize:11 }}>●</span>
          <div>
            <div style={{ fontSize:14.5, color:P.ink, fontWeight:500, lineHeight:1.45 }}>{it.t}</div>
            {it.d && <div style={{ fontSize:13, color:P.ink4, marginTop:3, lineHeight:1.5 }}>{it.d}</div>}
          </div>
          {it.href && (
            <a href={it.href} style={{
              fontSize:12, fontFamily:MONO, color:P.ink4, textDecoration:'none',
              borderBottom:`1px solid ${P.ruleLight}`, whiteSpace:'nowrap',
            }}>{it.linkLabel || 'verify ↗'}</a>
          )}
        </li>
      ))}
    </ul>
  );
}

function AdjacentCards({ palette: P, items }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:14 }}>
      {items.map((it, i) => (
        <a key={i} href="#" style={{
          padding:'18px 20px', border:`1px solid ${P.ruleLight}`, borderRadius:6,
          textDecoration:'none', color:P.ink, background:P.paper, display:'block',
        }}>
          <div style={{ fontSize:11, color:P.ink5, fontFamily:MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>{it.kind}</div>
          <div style={{ fontSize:16, fontWeight:600, marginTop:6, letterSpacing:'-0.005em' }}>{it.title}</div>
          <div style={{ fontSize:13, color:P.ink4, marginTop:6, lineHeight:1.5 }}>{it.body}</div>
          <div style={{ fontSize:12, color:P.ink5, fontFamily:MONO, marginTop:12 }}>open →</div>
        </a>
      ))}
    </div>
  );
}

function CTAPair({ palette: P, selfLead, selfBody, selfCmd, mgdLead, mgdBody }) {
  const cardBase = {
    padding:'28px 30px', border:`1px solid ${P.ruleLight}`, borderRadius:6,
    background:P.paper, display:'flex', flexDirection:'column', gap:14,
  };
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
      <div style={cardBase}>
        <div style={{ fontSize:11, color:P.ink5, fontFamily:MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>Self-serve</div>
        <h3 style={{ fontSize:20, fontWeight:600, color:P.ink, margin:0, letterSpacing:'-0.01em' }}>{selfLead}</h3>
        <p style={{ fontSize:14, color:P.ink3, margin:0, lineHeight:1.55 }}>{selfBody}</p>
        <div style={{
          padding:'12px 14px', background:P.bg, border:`1px solid ${P.ruleLight}`, borderRadius:4,
          fontFamily:MONO, fontSize:13, color:P.ink2, marginTop:'auto',
        }}>{selfCmd}</div>
      </div>
      <div style={{ ...cardBase, background:P.surface || P.bg }}>
        <div style={{ fontSize:11, color:P.ink5, fontFamily:MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>Managed</div>
        <h3 style={{ fontSize:20, fontWeight:600, color:P.ink, margin:0, letterSpacing:'-0.01em' }}>{mgdLead}</h3>
        <p style={{ fontSize:14, color:P.ink3, margin:0, lineHeight:1.55 }}>{mgdBody}</p>
        <a href="mailto:signal@aeoess.com" style={{
          ...primaryBtn(P), marginTop:'auto', alignSelf:'flex-start',
        }}>signal@aeoess.com <span style={{ opacity:.75 }}>→</span></a>
      </div>
    </div>
  );
}

// Shared section frame: eyebrow + h2 + slot.
function Section({ palette: P, eyebrow, title, lead, children, bg, pad, padY = 60, borderTop = true }) {
  return (
    <section style={{
      padding:`${padY}px ${pad}px`, background: bg || P.paper,
      borderTop: borderTop ? `1px solid ${P.ruleLight}` : 'none',
    }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        {eyebrow && <SectionEyebrow palette={P}>{eyebrow}</SectionEyebrow>}
        {title && <h2 style={{ ...sectionH2(P), maxWidth:780 }}>{title}</h2>}
        {lead && <p style={{ fontSize:16, color:P.ink3, marginTop:14, marginBottom:32, maxWidth:680, lineHeight:1.6 }}>{lead}</p>}
        {!lead && (title || eyebrow) && <div style={{ height:32 }}/>}
        {children}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// 1. PAYMENTS
// ─────────────────────────────────────────────────────────────────
function AeoessPayments({ palette }) {
  const P = palette;
  const pad = 40;
  const padTop = 72;

  const RAILS = [
    { k:'Foundation',     d:'Reference rail for tested wallets' },
    { k:'AP2',            d:'Agent payments protocol' },
    { k:'x402',           d:'HTTP 402 micropayment' },
    { k:'Stripe Issuing', d:'Card-present and card-not-present' },
    { k:'ACP',            d:'Agentic commerce protocol' },
    { k:'MPP',            d:'Multi-party programmable' },
  ];

  const GATES = [
    { n:'1', t:'Passport',   d:'Agent identity resolves to a live, non-revoked DID.' },
    { n:'2', t:'Scope',      d:'Action falls inside the active delegation scope vocabulary.' },
    { n:'3', t:'Budget',     d:'Spend remains under the per-window cap on the chain.' },
    { n:'4', t:'Allowlist',  d:'Merchant or counterparty matches the policy allowlist.' },
  ];

  return (
    <div data-aeoess-page="1" style={{ background:P.bg, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      {/* Hero */}
      <section style={{ padding:`${padTop}px ${pad}px ${padTop-12}px`, background:P.paper }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <SolBreadcrumb palette={P} label="Payments"/>
          <h1 style={{
            fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.04, letterSpacing:'-0.025em',
            fontWeight:500, margin:0, color:P.ink, maxWidth:920,
          }}>
            Payments for agents,<br/>under signed authority.
          </h1>
          <p style={{ fontSize:18, lineHeight:1.55, color:P.ink3, marginTop:24, maxWidth:680 }}>
            Six rails behind one delegation surface. Every transaction carries its authorizing chain, spend cap, and policy decision.
          </p>
          <HeroBadges palette={P}/>
        </div>
      </section>

      {/* ── Visualization: Payment Rails ────────────────────────────── */}
      <section style={{ padding:`72px ${pad}px`, borderTop:`1px solid ${P.ruleLight}`, background:P.bg }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <div style={{ fontSize:11, color:P.ink5, fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace', letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:10 }}>The rails, animated</div>
          <h2 style={{ fontSize:32, fontWeight:500, margin:0, letterSpacing:'-0.02em', color:P.ink }}>Agent pays. Scope narrows. Receipt signs.</h2>
          <p style={{ fontSize:15, color:P.ink3, lineHeight:1.6, marginTop:14, marginBottom:28, maxWidth:680 }}>
            Five rails, x402, AP2, ACP, MPP, Stripe Issuing, share one delegation surface. Spend cap, merchant allow-list, and single-use intent are narrowed at the delegation and enforced at the rail adapter.
          </p>
          <div style={{ border:`1px solid ${P.ruleLight}`, borderRadius:6, overflow:'hidden', background:'#1c1c1e' }}>
            <iframe src="arch-payments.html" title="Payment Rails, visualization" loading="lazy"
              style={{ display:'block', width:'100%', height:560, border:0 }}/>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <Section palette={P} pad={pad} padY={56} bg={P.bg}
        eyebrow="Who this is for"
        title="Fintech, marketplaces, B2B commerce.">
        <p style={{ fontSize:15.5, color:P.ink3, lineHeight:1.65, maxWidth:760, margin:0 }}>
          Your agent triggers refunds, posts charges, runs procurement on company cards, settles invoices. Every transaction needs an answer to four questions, fast: which agent acted, under which delegation, with which spend cap, on which rail. Today the answer lives in text logs. APS makes the answer cryptographic.
        </p>
      </Section>

      {/* Three pillars */}
      <Section palette={P} pad={pad} padY={64} bg={P.paper}
        eyebrow="What ships"
        title="Three things you get the day you install."
        lead="Each pillar is a working module on the public SDK. Module paths shown.">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:14 }}>
          <PillarCard palette={P}
            lead="Six payment rails behind one delegation surface."
            body="Foundation, AP2, x402, Stripe Issuing, ACP, MPP. Same SDK, same governance surface, six adapters. Switching rails does not mean re-wiring identity."
            refs={['src/v2/payment-rails/{foundation,acp,', 'ap2,mpp,stripe-issuing,x402}']}
          />
          <PillarCard palette={P}
            lead="Four-gate spending control."
            body="Every transaction passes passport, scope, budget, merchant allowlist before the rail sees it. Two-tier denial vocabulary separates wrong-scope from rail-rejected."
            refs={['src/v2/commerce/4-gate-preflight.ts']}
          />
          <PillarCard palette={P}
            lead="Agent-to-agent settlement under signed delegation."
            body="Reserve attestations, conformance harness, byte-identical receipts across rails. Every settlement carries a signed authority chain back to the human principal."
            refs={['src/v2/reserve/attestation.ts', 'src/v2/accountability/{action,custody}.ts']}
          />
        </div>
      </Section>

      {/* Architecture: rails grid + 4-gate strip */}
      <Section palette={P} pad={pad} padY={64} bg={P.bg}
        eyebrow="Architecture"
        title="One surface, six adapters, four gates."
        lead="The rail is replaceable. The governance is not.">
        <div style={{
          padding:24, border:`1px solid ${P.ruleLight}`, borderRadius:6, background:P.paper,
        }}>
          <div style={{ fontSize:11, color:P.ink5, fontFamily:MONO, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14 }}>Rails (6)</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:10, marginBottom:24 }}>
            {RAILS.map(r => (
              <div key={r.k} style={{
                padding:'14px 16px', border:`1px solid ${P.ruleLight}`, borderRadius:4, background:P.bg,
              }}>
                <div style={{ fontSize:13.5, fontWeight:600, color:P.ink, fontFamily:MONO }}>{r.k}</div>
                <div style={{ fontSize:12, color:P.ink4, marginTop:4 }}>{r.d}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:11, color:P.ink5, fontFamily:MONO, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14 }}>Pre-flight gates (4)</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:0, border:`1px solid ${P.ruleLight}`, borderRadius:4, overflow:'hidden' }}>
            {GATES.map((g, i) => (
              <div key={g.n} style={{
                padding:'18px 18px', background:P.bg,
                borderRight: i < GATES.length-1 ? `1px solid ${P.ruleLight}` : 'none',
              }}>
                <div style={{ fontFamily:MONO, fontSize:11, color:P.ink5 }}>gate {g.n}</div>
                <div style={{ fontSize:15, fontWeight:600, color:P.ink, marginTop:6 }}>{g.t}</div>
                <div style={{ fontSize:12.5, color:P.ink4, marginTop:6, lineHeight:1.5 }}>{g.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Proof */}
      <Section palette={P} pad={pad} padY={56} bg={P.paper}
        eyebrow="Proof"
        title="Verifiable on the public record.">
        <ProofList palette={P} items={[
          { t:'Six rails shipped.', d:'Phase 4.1 commit 03c19d9 on main. Adapters + conformance fixtures in repo.', linkLabel:'agent-passport-system ↗' },
          { t:'Stripe governance adapter in examples/.', d:'Card issuing under signed delegation, receipt envelopes per transaction.' },
          { t:'MnemoPay composition hook.', d:'Open integration thread on x402 issue #1904.' },
          { t:'abhicris addressed two of four mapped gaps.', d:'Per-agent SpendingPolicy and circuit breaker, in google-agentic-commerce/a2a-x402 #90.' },
        ]}/>
      </Section>

      {/* Adjacent */}
      <Section palette={P} pad={pad} padY={48} bg={P.bg}
        eyebrow="Adjacent">
        <AdjacentCards palette={P} items={[
          { kind:'deep', title:'Wallet anchor on commerce', body:'Multi-chain binding, reserve attestation, two-tier denial.' },
          { kind:'solution', title:'Compliance', body:'Mapping receipts to EU AI Act, NIST AI RMF, ISO 42001.' },
          { kind:'solution', title:'Enterprise', body:'BYO identity, charter governance, multi-tenant isolation.' },
        ]}/>
      </Section>

      {/* CTA pair */}
      <Section palette={P} pad={pad} padY={56} bg={P.paper}>
        <CTAPair palette={P}
          selfLead="Install the SDK."
          selfBody="Wire identity, write a delegation, send a transaction through the four gates. Every primitive is on npm."
          selfCmd="npm install agent-passport-system"
          mgdLead="Managed deployment."
          mgdBody="Hosted gateway, fleet-scale revocation. Pricing on request."
        />
      </Section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 2. CONTENT
// ─────────────────────────────────────────────────────────────────
function AeoessContent({ palette }) {
  const P = palette;
  const pad = 40;
  const padTop = 72;

  return (
    <div data-aeoess-page="1" style={{ background:P.bg, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      {/* Hero */}
      <section style={{ padding:`${padTop}px ${pad}px ${padTop-12}px`, background:P.paper }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <SolBreadcrumb palette={P} label="Content"/>
          <h1 style={{
            fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.04, letterSpacing:'-0.025em',
            fontWeight:500, margin:0, color:P.ink, maxWidth:920,
          }}>
            Terms that travel<br/>with the bytes.
          </h1>
          <p style={{ fontSize:18, lineHeight:1.55, color:P.ink3, marginTop:24, maxWidth:680 }}>
            Sign your governance at the source. Every agent that reads the page can verify what is permitted, what is logged, and what revokes downstream. The chain from access to derivative is reconstructable from primitives.
          </p>
          <HeroBadges palette={P}/>
        </div>
      </section>

      {/* Who this is for */}
      <Section palette={P} pad={pad} padY={56} bg={P.bg}
        eyebrow="Who this is for"
        title="Publishers, data providers, IP owners.">
        <p style={{ fontSize:15.5, color:P.ink3, lineHeight:1.65, maxWidth:760, margin:0 }}>
          Your content is being read by agents at scale, used in training, summarized into derivatives, resold inside larger products. You need three things: terms enforcement at the page level, attribution that follows the data through agent pipelines, and the ability to revoke and have the revocation cascade through everything derived from the original.
        </p>
      </Section>

      {/* Three pillars */}
      <Section palette={P} pad={pad} padY={64} bg={P.paper}
        eyebrow="What ships"
        title="Three primitives, one chain."
        lead="The full surface is open. Module paths shown.">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:14 }}>
          <PillarCard palette={P}
            lead="Signed governance at the source."
            body="aps.txt for site-wide terms, embedded HTML blocks for per-page overrides, HTTP headers for header-only deployments. All Ed25519-signed and content-hashed."
            refs={['generateGovernanceBlock', 'parseGovernanceBlock · verifyGovernanceBlock']}
          />
          <PillarCard palette={P}
            lead="Attribution that follows the data."
            body="Source receipts, access receipts, derivation receipts, decision lineage receipts. The chain from agent read to agent recommendation is reconstructable from signed primitives."
            refs={['DataSourceRegistration → AccessReceipt', '→ DerivationReceipt → DecisionLineageReceipt']}
          />
          <PillarCard palette={P}
            lead="Cascade revocation as enforcement."
            body="Revoke at the source and downstream derivatives invalidate. The revocation is signed, propagating, and replayable. Agents that ignore it are visible in the receipt ledger."
            refs={['Attribution Primitive (D/P/G/C)', 'AMCS spec · six requirements, two layers']}
          />
        </div>
      </Section>

      {/* Architecture: derivation chain code block */}
      <Section palette={P} pad={pad} padY={64} bg={P.bg}
        eyebrow="Architecture"
        title="The chain, end to end."
        lead="Each receipt is signed, content-hashed, and verifiable without the platform that issued it.">
        <div style={{
          padding:'22px 24px', background:P.paper, border:`1px solid ${P.ruleLight}`,
          borderRadius:6, fontFamily:MONO, fontSize:13, lineHeight:1.7, color:P.ink2,
          overflow:'auto',
        }}>
          <div style={{ color:P.ink5 }}># 1. Source. You publish terms once.</div>
          <div><span style={{ color:P.accentColor }}>POST</span> /aps.txt  <span style={{ color:P.ink5 }}># Ed25519-signed governance block</span></div>
          <div style={{ height:10 }}/>
          <div style={{ color:P.ink5 }}># 2. Access. Agent fetches under its passport.</div>
          <div><span style={{ color:P.accentColor }}>GET</span>  /article/123  <span style={{ color:P.ink5 }}># issues AccessReceipt(agent_did, scope, ts)</span></div>
          <div style={{ height:10 }}/>
          <div style={{ color:P.ink5 }}># 3. Derivation. Agent transforms or summarizes.</div>
          <div><span style={{ color:P.accentColor }}>EMIT</span> DerivationReceipt(parent: AccessReceipt, weights: D/P/G/C)</div>
          <div style={{ height:10 }}/>
          <div style={{ color:P.ink5 }}># 4. Decision. Recommendation cites the source.</div>
          <div><span style={{ color:P.accentColor }}>EMIT</span> DecisionLineageReceipt(sources: [DerivationReceipt, ...])</div>
          <div style={{ height:10 }}/>
          <div style={{ color:P.ink5 }}># 5. Revoke. Cascade invalidates downstream.</div>
          <div><span style={{ color:P.red }}>REVOKE</span> source_id  <span style={{ color:P.ink5 }}># every receipt that anchors back is now invalid</span></div>
        </div>
      </Section>

      {/* Proof */}
      <Section palette={P} pad={pad} padY={56} bg={P.paper}
        eyebrow="Proof"
        title="Verifiable on the public record.">
        <ProofList palette={P} items={[
          { t:'AMCS spec live.', d:'Cryptographic news provenance, six requirements across two layers, on aeoess.com/amcs.html.' },
          { t:'VeritasActa cross-layer integrity 10 of 10.', d:'APS DecisionLineageReceipt slots into external_receipts.aps. Verify PR #7.' },
          { t:'Vocabulary registry covers data lifecycle.', d:'Source, access, derivation, content provenance with multiple cross-vendor implementations.' },
          { t:'Attribution Primitive specified.', d:'Four-axis Merkle envelope (D/P/G/C), Build-B fractional weights, Build-C settlement records.' },
        ]}/>
      </Section>

      {/* Adjacent */}
      <Section palette={P} pad={pad} padY={48} bg={P.bg}
        eyebrow="Adjacent">
        <AdjacentCards palette={P} items={[
          { kind:'deep', title:'AMCS spec', body:'Cryptographic provenance for AI-readable journalism.' },
          { kind:'solution', title:'Compliance', body:'Map receipts to EU AI Act, NIST AI RMF, ISO 42001.' },
          { kind:'solution', title:'Enterprise', body:'BYO identity, charter governance, multi-tenant audit.' },
        ]}/>
      </Section>

      {/* CTA pair */}
      <Section palette={P} pad={pad} padY={56} bg={P.paper}>
        <CTAPair palette={P}
          selfLead="Embed aps.txt."
          selfBody="Generate a signed governance block, publish it at the root of your domain, start issuing access receipts. SDK on npm."
          selfCmd="npm install agent-passport-system"
          mgdLead="Managed terms enforcement."
          mgdBody="Hosted issuance, signed governance at scale, cascade revocation across derivatives. Pricing on request."
        />
      </Section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 3. COMPLIANCE
// ─────────────────────────────────────────────────────────────────
function AeoessCompliance({ palette }) {
  const P = palette;
  const pad = 40;
  const padTop = 72;

  // Framework mapping table.
  const ROWS = [
    { framework:'EU AI Act',     article:'Art. 14',         requires:'Human oversight',        primitive:'AuthorityBoundaryReceipt + HumanEscalationFlag' },
    { framework:'EU AI Act',     article:'Art. 26',         requires:'Transparency to deployer', primitive:'ActionReceipt with signed scope chain' },
    { framework:'NIST AI RMF',   article:'GOVERN-1.1',      requires:'Accountability structures',primitive:'Charter + offices, separation of powers' },
    { framework:'NIST AI RMF',   article:'MEASURE-2.7',     requires:'Risk evaluation evidence',  primitive:'CustodyReceipt + ContestabilityReceipt' },
    { framework:'ISO 42001',     article:'A.6.2.6',         requires:'Decision audit trail',     primitive:'DecisionLineageReceipt, replayable' },
    { framework:'ISO 42001',     article:'A.9.2',           requires:'Continuous monitoring',    primitive:'APSBundle Merkle aggregation' },
  ];

  return (
    <div data-aeoess-page="1" style={{ background:P.bg, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      {/* Hero */}
      <section style={{ padding:`${padTop}px ${pad}px ${padTop-12}px`, background:P.paper }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <SolBreadcrumb palette={P} label="Compliance"/>
          <h1 style={{
            fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.04, letterSpacing:'-0.025em',
            fontWeight:500, margin:0, color:P.ink, maxWidth:920,
          }}>
            Audit trails as<br/>cryptographic evidence.
          </h1>
          <p style={{ fontSize:18, lineHeight:1.55, color:P.ink3, marginTop:24, maxWidth:680 }}>
            Replace text logs with signed receipts. Map every action to EU AI Act, NIST AI RMF, ISO 42001 articles. Auditors verify the trail without going through us.
          </p>
          <HeroBadges palette={P}/>
        </div>
      </section>

      {/* Who this is for */}
      <Section palette={P} pad={pad} padY={56} bg={P.bg}
        eyebrow="Who this is for"
        title="Regulated industries, EU operators, compliance leads.">
        <p style={{ fontSize:15.5, color:P.ink3, lineHeight:1.65, maxWidth:760, margin:0 }}>
          A regulator asks for the audit trail behind an agent action. Today the answer is text logs in Datadog or Kibana, with no chain of authority, no signed scope, no contestability surface, no proof of which inputs the agent saw at decision time. APS replaces text logs with cryptographic evidence that holds up under independent verification.
        </p>
      </Section>

      {/* Three pillars */}
      <Section palette={P} pad={pad} padY={64} bg={P.paper}
        eyebrow="What ships"
        title="Three primitives, three frameworks."
        lead="Public modules. Mapped to articles your auditor already reads.">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:14 }}>
          <PillarCard palette={P}
            lead="Cryptographic audit trail mapped to real frameworks."
            body="EU AI Act Articles 14 and 26. NIST AI RMF across Govern, Map, Measure, Manage. ISO 42001 audit requirements. Generated from receipts on disk."
            refs={['src/core/euaiact.ts', 'generateComplianceReport({ standard, receipts })']}
          />
          <PillarCard palette={P}
            lead="Action receipts as evidence, not as logs."
            body="Every receipt is signed, contestable, replayable. Authority-boundary receipts prove what the agent was authorized to do. Custody receipts prove what data the agent saw."
            refs={['src/v2/accountability/{action,authority-boundary,', 'custody,contestability,bundle}.ts']}
          />
          <PillarCard palette={P}
            lead="Cascade revocation as enforcement."
            body="When a delegation is revoked, downstream actions invalidate without a manual log search. The receipt ledger answers is this still authorized in a single signature check."
            refs={['src/v2/cognitive_attestation/*', 'src/v2/instruction_provenance/*']}
          />
        </div>
      </Section>

      {/* Architecture: framework mapping table */}
      <Section palette={P} pad={pad} padY={64} bg={P.bg}
        eyebrow="Architecture"
        title="Mapping primitives to articles.">
        <div style={{ overflow:'auto', border:`1px solid ${P.ruleLight}`, borderRadius:6, background:P.paper }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:P.bg }}>
                <th style={{ padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600, textAlign:'left', fontFamily:MONO }}>Framework</th>
                <th style={{ padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600, textAlign:'left', fontFamily:MONO, borderLeft:`1px solid ${P.ruleLight}` }}>Article</th>
                <th style={{ padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600, textAlign:'left', fontFamily:MONO, borderLeft:`1px solid ${P.ruleLight}` }}>Requires</th>
                <th style={{ padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600, textAlign:'left', fontFamily:MONO, borderLeft:`1px solid ${P.ruleLight}` }}>APS primitive</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding:'14px 18px', fontSize:13.5, color:P.ink, fontWeight:600, borderTop:`1px solid ${P.ruleLight}`, verticalAlign:'top' }}>{r.framework}</td>
                  <td style={{ padding:'14px 18px', fontSize:13, color:P.ink2, fontFamily:MONO, borderTop:`1px solid ${P.ruleLight}`, borderLeft:`1px solid ${P.ruleLight}`, verticalAlign:'top' }}>{r.article}</td>
                  <td style={{ padding:'14px 18px', fontSize:13, color:P.ink3, borderTop:`1px solid ${P.ruleLight}`, borderLeft:`1px solid ${P.ruleLight}`, verticalAlign:'top' }}>{r.requires}</td>
                  <td style={{ padding:'14px 18px', fontSize:13, color:P.ink2, fontFamily:MONO, borderTop:`1px solid ${P.ruleLight}`, borderLeft:`1px solid ${P.ruleLight}`, verticalAlign:'top' }}>{r.primitive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize:12.5, color:P.ink5, marginTop:14, fontStyle:'italic', maxWidth:680 }}>
          The protocol specifies procedural validity. Effect safety is a separate axis, catalogued in Paper 8 (The Evidence-Safety Gap). We cite our own limits.
        </p>
      </Section>

      {/* Proof */}
      <Section palette={P} pad={pad} padY={56} bg={P.paper}
        eyebrow="Proof"
        title="Verifiable on the public record.">
        <ProofList palette={P} items={[
          { t:'NIST CAISI input acknowledged.', d:'Acknowledged in writing by Drew Keller. Email on file.' },
          { t:'Two NCCoE concept-paper comments in federal record.', d:'Filed alongside BSA on the NCCoE site.' },
          { t:'AAIF project proposal #14 in review.', d:'Linux Foundation path for cross-vendor agent interoperability.' },
          { t:'IETF Internet-Draft live.', d:'draft-pidlisnyi-aps-00. Eight Zenodo papers including Paper 8.' },
        ]}/>
      </Section>

      {/* Adjacent */}
      <Section palette={P} pad={pad} padY={48} bg={P.bg}
        eyebrow="Adjacent">
        <AdjacentCards palette={P} items={[
          { kind:'deep', title:'Receipts reference', body:'Action, custody, authority-boundary, contestability.' },
          { kind:'solution', title:'Content', body:'Signed governance, derivation lineage, cascade revoke.' },
          { kind:'solution', title:'Enterprise', body:'BYO identity, charter governance, fleet-scale audit.' },
        ]}/>
      </Section>

      {/* CTA pair */}
      <Section palette={P} pad={pad} padY={56} bg={P.paper}>
        <CTAPair palette={P}
          selfLead="Generate compliance reports."
          selfBody="Issue receipts from your agents, run generateComplianceReport against the framework you operate under, hand the output to your auditor."
          selfCmd="npm install agent-passport-system"
          mgdLead="Managed audit trail."
          mgdBody="Hosted receipt store, framework templates, signed exports for regulators. Pricing on request."
        />
      </Section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 4. ENTERPRISE
// ─────────────────────────────────────────────────────────────────
function AeoessEnterprise({ palette }) {
  const P = palette;
  const pad = 40;
  const padTop = 72;

  const IDS = [
    { method:'did:key',    surface:'Self-issued Ed25519',     auth:'Local keypair',           use:'Prototypes, single-team agents' },
    { method:'did:web',    surface:'Domain-rooted DID',       auth:'TLS + .well-known',       use:'Org-hosted agents, public surface' },
    { method:'did:aps',    surface:'APS-native DID',          auth:'Charter-bound, rotatable', use:'Fleets under aeoess governance' },
    { method:'SPIFFE',     surface:'SVID workload identity',  auth:'mTLS, short-lived',       use:'Service-mesh internal agents' },
    { method:'OAuth',      surface:'Bearer-token bridge',     auth:'IdP redirect flow',       use:'Existing Okta, Auth0, AD setups' },
  ];

  return (
    <div data-aeoess-page="1" style={{ background:P.bg, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      {/* Hero */}
      <section style={{ padding:`${padTop}px ${pad}px ${padTop-12}px`, background:P.paper }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <SolBreadcrumb palette={P} label="Enterprise"/>
          <h1 style={{
            fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.04, letterSpacing:'-0.025em',
            fontWeight:500, margin:0, color:P.ink, maxWidth:920,
          }}>
            Govern internal<br/>agent fleets at scale.
          </h1>
          <p style={{ fontSize:18, lineHeight:1.55, color:P.ink3, marginTop:24, maxWidth:680 }}>
            One governance layer across hundreds of agents and five identity formats, no migration. Charter authority, scoped delegation, signed audit by default.
          </p>
          <HeroBadges palette={P}/>
        </div>
      </section>

      {/* ── Visualization: Gateway Judgement ────────────────────────── */}
      <section style={{ padding:`72px ${pad}px`, borderTop:`1px solid ${P.ruleLight}`, background:P.bg }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <div style={{ fontSize:11, color:P.ink5, fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace', letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:10 }}>The gateway, animated</div>
          <h2 style={{ fontSize:32, fontWeight:500, margin:0, letterSpacing:'-0.02em', color:P.ink }}>Fourteen gates. Fail-closed.</h2>
          <p style={{ fontSize:15, color:P.ink3, lineHeight:1.6, marginTop:14, marginBottom:28, maxWidth:680 }}>
            Every action evaluated against fourteen constraint dimensions: identity, signature, scope, budget, rate, values, reputation, freshness, and six more. 37 + 10 conformance vectors. Missing a check is a deny.
          </p>
          <div style={{ border:`1px solid ${P.ruleLight}`, borderRadius:6, overflow:'hidden', background:'#1c1c1e' }}>
            <iframe src="arch-gateway.html" title="Gateway Judgement, visualization" loading="lazy"
              style={{ display:'block', width:'100%', height:560, border:0 }}/>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <Section palette={P} pad={pad} padY={56} bg={P.bg}
        eyebrow="Who this is for"
        title="Platform teams, internal agent fleets.">
        <p style={{ fontSize:15.5, color:P.ink3, lineHeight:1.65, maxWidth:760, margin:0 }}>
          You run hundreds or thousands of agents across teams. Each team has its own identity provider: Okta, Auth0, SPIFFE, Active Directory. You need a single governance layer that does not force a migration, that scales scoped delegation across the fleet, and that produces a unified audit surface without re-instrumenting every team's stack.
        </p>
      </Section>

      {/* Three pillars */}
      <Section palette={P} pad={pad} padY={64} bg={P.paper}
        eyebrow="What ships"
        title="Three primitives for fleet-scale governance."
        lead="Identity adapters and governance modules are public. Module paths shown.">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:14 }}>
          <PillarCard palette={P}
            lead="Bring your own identity."
            body="did:key, did:web, did:aps, SPIFFE SVID, OAuth. Five adapters shipped, signature round-trips verified across TS and Python. No identity migration required."
            refs={['src/identity/adapters/*', 'src/auth/mutual-handshake.ts + TrustBundle']}
          />
          <PillarCard palette={P}
            lead="Charter and office governance."
            body="Multi-party approval for high-risk actions. Separation of powers across offices. Amendment rules, dissolution policy. The governance is constitutional, not procedural."
            refs={['src/charter/*', 'src/v2/* (32 constitutional modules)']}
          />
          <PillarCard palette={P}
            lead="Hosted gateway with managed deployment."
            body="Mutual authentication handshake. Cascade revocation at fleet scale. Self-host or managed."
            refs={['gateway.aeoess.com', 'reputation-gated authority resolver']}
          />
        </div>
      </Section>

      {/* Architecture: BYO identity adapter table */}
      <Section palette={P} pad={pad} padY={64} bg={P.bg}
        eyebrow="Architecture"
        title="Five adapters, one governance surface."
        lead="Cross-language byte-parity verified across the Wave 1 surface in 27 fixtures.">
        <div style={{ overflow:'auto', border:`1px solid ${P.ruleLight}`, borderRadius:6, background:P.paper }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:P.bg }}>
                <th style={{ padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600, textAlign:'left', fontFamily:MONO }}>Method</th>
                <th style={{ padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600, textAlign:'left', fontFamily:MONO, borderLeft:`1px solid ${P.ruleLight}` }}>Surface</th>
                <th style={{ padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600, textAlign:'left', fontFamily:MONO, borderLeft:`1px solid ${P.ruleLight}` }}>Auth</th>
                <th style={{ padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600, textAlign:'left', fontFamily:MONO, borderLeft:`1px solid ${P.ruleLight}` }}>Typical use</th>
              </tr>
            </thead>
            <tbody>
              {IDS.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding:'14px 18px', fontSize:13.5, color:P.ink, fontFamily:MONO, fontWeight:600, borderTop:`1px solid ${P.ruleLight}`, verticalAlign:'top' }}>{r.method}</td>
                  <td style={{ padding:'14px 18px', fontSize:13, color:P.ink2, borderTop:`1px solid ${P.ruleLight}`, borderLeft:`1px solid ${P.ruleLight}`, verticalAlign:'top' }}>{r.surface}</td>
                  <td style={{ padding:'14px 18px', fontSize:13, color:P.ink3, borderTop:`1px solid ${P.ruleLight}`, borderLeft:`1px solid ${P.ruleLight}`, verticalAlign:'top' }}>{r.auth}</td>
                  <td style={{ padding:'14px 18px', fontSize:13, color:P.ink3, borderTop:`1px solid ${P.ruleLight}`, borderLeft:`1px solid ${P.ruleLight}`, verticalAlign:'top' }}>{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Proof */}
      <Section palette={P} pad={pad} padY={56} bg={P.paper}
        eyebrow="Proof"
        title="Verifiable on the public record.">
        <ProofList palette={P} items={[
          { t:'Microsoft AGT PR #274 merged.', d:'Reputation-gated authority resolver into agent-governance-toolkit upstream.' },
          { t:'Microsoft AGT PR #598 merged.', d:'Fail-closed signature verification, same upstream.' },
          { t:'Five identity methods implemented and tested.', d:'did:key, did:web, did:aps, SPIFFE SVID, OAuth bridge.' },
          { t:'Cross-language byte-parity verified.', d:'27 test scenarios across TS and Python on Wave 1 governance surface.' },
        ]}/>
      </Section>

      {/* Adjacent */}
      <Section palette={P} pad={pad} padY={48} bg={P.bg}
        eyebrow="Adjacent">
        <AdjacentCards palette={P} items={[
          { kind:'deep', title:'Working Group', body:'Cross-vendor charter, offices, separation of powers.' },
          { kind:'solution', title:'Compliance', body:'Mapping receipts to EU AI Act, NIST AI RMF, ISO 42001.' },
          { kind:'solution', title:'Payments', body:'Six rails behind one delegation surface.' },
        ]}/>
      </Section>

      {/* CTA pair */}
      <Section palette={P} pad={pad} padY={56} bg={P.paper}>
        <CTAPair palette={P}
          selfLead="Wire your fleet."
          selfBody="Pick an identity adapter, write a charter, point your gateway at the policy module. Self-host or hosted."
          selfCmd="npm install agent-passport-system"
          mgdLead="Managed gateway deployment."
          mgdBody="Hosted enforcement edge, fleet-scale revocation. Pricing on request."
        />
      </Section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

Object.assign(window, { AeoessPayments, AeoessContent, AeoessCompliance, AeoessEnterprise });
