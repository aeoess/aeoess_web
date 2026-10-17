// aeoess-tier1.jsx, API ref, Benchmarks, Threat model, Gateway dashboard.
// Restrained design language. Reuses SubHeader, Footer, SectionEyebrow, sectionH2.
// Voice canon: no em-dashes, no AI-tells, no validation openers, no "not X but Y".

const {
  SubHeader, Footer, SectionEyebrow,
  primaryBtn, secondaryBtn, sectionH2,
} = window;

const T1_MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

function T1Crumb({ palette: P, label }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8, fontSize:12,
      color:P.ink5, fontFamily:T1_MONO, marginBottom:22, letterSpacing:'0.02em',
    }}>
      <a href="#" style={{ color:P.ink5, textDecoration:'none' }}>aeoess</a>
      <span>/</span>
      <span style={{ color:P.ink3 }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 1. API REFERENCE / docs.html
// ─────────────────────────────────────────────────────────────────
function AeoessDocs({ palette }) {
  const P = palette;
  const pad = 40;

  const SECTIONS = [
    { id:'core', label:'Core', items:[
      { sig:'createPassport(opts)', desc:'Issue a passport. Returns { did, publicKey, secretKey }.' },
      { sig:'createDelegation({ parent, scope, expires })', desc:'Mint a child delegation. Scope can only narrow.' },
      { sig:'evaluateIntent(intent, context)', desc:'Run the four-gate evaluation. Returns Allow | Deny(reason).' },
      { sig:'commercePreflight(tx, policy)', desc:'Pre-flight a transaction across all four spending gates.' },
      { sig:'generateKeyPair()', desc:'Ed25519 keypair, RFC 8032.' },
    ]},
    { id:'identity', label:'Identity', items:[
      { sig:'didKey.resolve(did)', desc:'Resolve a did:key to its verification material.' },
      { sig:'didWeb.resolve(did)', desc:'Fetch the .well-known DID document under TLS.' },
      { sig:'spiffe.fromSVID(svid)', desc:'Wrap a SPIFFE SVID as an APS principal.' },
      { sig:'oauth.bridge(token, issuer)', desc:'Bridge an OAuth bearer to a passport.' },
    ]},
    { id:'receipts', label:'Receipts', items:[
      { sig:'ActionReceipt.sign(action, key)', desc:'Sign an action under the active delegation.' },
      { sig:'CustodyReceipt.attach(receipt, inputs)', desc:'Bind the inputs the agent saw at decision time.' },
      { sig:'ContestabilityReceipt.open(target)', desc:'Issue a structured dispute against a prior receipt.' },
      { sig:'APSBundle.aggregate(receipts)', desc:'Merkle-aggregate receipts under a single root.' },
    ]},
    { id:'governance', label:'Governance', items:[
      { sig:'generateGovernanceBlock(terms, key)', desc:'Sign a terms block for aps.txt or HTML embed.' },
      { sig:'parseGovernanceBlock(blob)', desc:'Parse and verify a governance block.' },
      { sig:'cascadeRevoke(rootDid)', desc:'Revoke a delegation root. Downstream invalidates.' },
      { sig:'generateComplianceReport({ standard, receipts })', desc:'Output an EU AI Act, NIST AI RMF, or ISO 42001 report.' },
    ]},
    { id:'mcp', label:'MCP', items:[
      { sig:'APS_PROFILE=essential (20 tools)', desc:'Curated set for normal agents.' },
      { sig:'APS_PROFILE=full (152 tools)', desc:'Complete protocol surface.' },
      { sig:'mcp://aps/passport.create', desc:'Tool: issue a passport from inside an MCP host.' },
      { sig:'mcp://aps/delegation.narrow', desc:'Tool: narrow an existing delegation.' },
    ]},
  ];

  return (
    <div data-aeoess-page="1" style={{ background:P.paper, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      <section style={{ padding:`72px ${pad}px 32px` }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <T1Crumb palette={P} label="API reference"/>
          <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.05, letterSpacing:'-0.025em', fontWeight:500, margin:0, color:P.ink, maxWidth:920 }}>
            API reference.
          </h1>
          <p style={{ fontSize:17, lineHeight:1.6, color:P.ink3, marginTop:18, maxWidth:680 }}>
            TypeScript and Python SDKs, byte-identical across runtimes. MCP server with two profiles. Every signature shown signs over RFC 8785 canonical bytes with Ed25519.
          </p>
          <div style={{ display:'flex', gap:8, marginTop:22, flexWrap:'wrap' }}>
            {[
              { l:'npm SDK v2.6.0-alpha.3' }, { l:'PyPI 2.4.0a2' }, { l:'MCP v3.2.0' }, { l:'2,884 tests' },
            ].map(c => (
              <span key={c.l} style={{
                padding:'5px 10px', border:`1px solid ${P.ruleLight}`, borderRadius:999,
                fontSize:11.5, fontFamily:T1_MONO, color:P.ink3, background:P.paper,
              }}>{c.l}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:`32px ${pad}px 80px`, borderTop:`1px solid ${P.ruleLight}` }}>
        <div style={{ maxWidth:1080, margin:'0 auto', display:'grid', gridTemplateColumns:'220px 1fr', gap:48, paddingTop:32 }}>
          <aside style={{ position:'sticky', top:80, alignSelf:'start' }}>
            <div style={{ fontSize:11, color:P.ink5, letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:14, fontFamily:T1_MONO }}>Modules</div>
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{
                display:'block', padding:'8px 0', borderTop:`1px solid ${P.ruleLight}`,
                fontSize:13, color:P.ink2, textDecoration:'none',
              }}>{s.label}</a>
            ))}
            <div style={{ marginTop:24, padding:'14px 16px', background:P.bg, border:`1px solid ${P.ruleLight}`, borderRadius:6 }}>
              <div style={{ fontSize:11, color:P.ink5, fontFamily:T1_MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>Install</div>
              <div style={{ fontFamily:T1_MONO, fontSize:12.5, color:P.ink2, marginTop:8, lineHeight:1.7 }}>
                <div>npm i agent-passport-system</div>
                <div>pip install agent-passport-system</div>
              </div>
            </div>
          </aside>
          <main>
            {SECTIONS.map((s, si) => (
              <article key={s.id} id={s.id} style={{ marginBottom:48, paddingBottom:48, borderBottom: si < SECTIONS.length-1 ? `1px solid ${P.ruleLight}` : 'none' }}>
                <div style={{ fontSize:12, color:P.accentColor, fontFamily:T1_MONO, letterSpacing:'0.06em', marginBottom:8 }}>module · {s.id}</div>
                <h2 style={{ fontSize:26, fontWeight:500, margin:0, letterSpacing:'-0.018em', color:P.ink }}>{s.label}</h2>
                <div style={{ marginTop:18, border:`1px solid ${P.ruleLight}`, borderRadius:6, overflow:'hidden' }}>
                  {s.items.map((it, i) => (
                    <div key={i} style={{
                      padding:'14px 18px', borderTop: i ? `1px solid ${P.ruleLight}` : 'none',
                      background: i % 2 ? P.bg : P.paper,
                    }}>
                      <div style={{ fontFamily:T1_MONO, fontSize:13.5, color:P.ink, fontWeight:500 }}>{it.sig}</div>
                      <div style={{ fontSize:13, color:P.ink3, marginTop:5, lineHeight:1.55 }}>{it.desc}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </main>
        </div>
      </section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 2. BENCHMARKS / benchmarks.html
// ─────────────────────────────────────────────────────────────────
function AeoessBenchmarks({ palette }) {
  const P = palette;
  const pad = 40;

  const HEADLINE = [
    { v:'127', l:'Modules', d:'across SDK, MCP, and Python implementations' },
    { v:'8', l:'Papers', d:'In the federal record' },
    { v:'25', l:'Vocab crosswalks', d:'Standardizing terms across implementations' },
    { v:'2,884', l:'Tests', d:'Across SDK, MCP, Python, conformance' },
  ];

  // p50/p95/p99 latency breakdown for the four-gate eval.
  const LAT = [
    { gate:'Passport resolve', p50:'0.18', p95:'0.41', p99:'0.92' },
    { gate:'Scope match',      p50:'0.11', p95:'0.24', p99:'0.46' },
    { gate:'Budget check',     p50:'0.09', p95:'0.19', p99:'0.38' },
    { gate:'Allowlist',        p50:'0.07', p95:'0.16', p99:'0.31' },
    { gate:'Total (4 gates)',  p50:'0.49', p95:'1.12', p99:'1.94', total:true },
  ];

  return (
    <div data-aeoess-page="1" style={{ background:P.paper, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      <section style={{ padding:`72px ${pad}px 32px` }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <T1Crumb palette={P} label="Benchmarks"/>
          <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.05, letterSpacing:'-0.025em', fontWeight:500, margin:0, color:P.ink, maxWidth:920 }}>
            Numbers, with a method.
          </h1>
          <p style={{ fontSize:17, lineHeight:1.6, color:P.ink3, marginTop:18, maxWidth:680 }}>
            Gateway policy evaluation, signature throughput, receipt aggregation. Reproducible from the open conformance suite.
          </p>
        </div>
      </section>

      <section style={{ padding:`32px ${pad}px 56px`, borderTop:`1px solid ${P.ruleLight}`, background:P.bg }}>
        <div style={{ maxWidth:1080, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:14 }}>
          {HEADLINE.map(c => (
            <div key={c.l} style={{
              padding:'24px 22px', background:P.paper, border:`1px solid ${P.ruleLight}`, borderRadius:6,
            }}>
              <div style={{ fontSize:38, fontWeight:500, letterSpacing:'-0.025em', color:P.ink }}>{c.v}</div>
              <div style={{ fontSize:11, color:P.ink5, fontFamily:T1_MONO, letterSpacing:'0.08em', textTransform:'uppercase', marginTop:6 }}>{c.l}</div>
              <div style={{ fontSize:13, color:P.ink4, marginTop:8, lineHeight:1.5 }}>{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:`72px ${pad}px`, borderTop:`1px solid ${P.ruleLight}` }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <SectionEyebrow palette={P}>Latency breakdown</SectionEyebrow>
          <h2 style={sectionH2(P)}>Per-gate eval, in milliseconds.</h2>
          <p style={{ fontSize:15, color:P.ink3, marginTop:14, marginBottom:28, maxWidth:640, lineHeight:1.6 }}>
            Measured on a single gateway node, M3 Pro, in-memory policy cache warm, 1k iterations per gate.
          </p>
          <div style={{ overflow:'auto', border:`1px solid ${P.ruleLight}`, borderRadius:6 }}>
            <table style={{ width:'100%', borderCollapse:'collapse', background:P.paper }}>
              <thead>
                <tr style={{ background:P.bg }}>
                  {['Gate','p50 (ms)','p95 (ms)','p99 (ms)'].map((h, i) => (
                    <th key={h} style={{
                      padding:'14px 18px', fontSize:11, color:P.ink5, letterSpacing:'0.08em', textTransform:'uppercase',
                      fontWeight:600, textAlign:i === 0 ? 'left' : 'right', fontFamily:T1_MONO,
                      borderLeft: i ? `1px solid ${P.ruleLight}` : 'none',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LAT.map(r => (
                  <tr key={r.gate} style={{ background: r.total ? P.bg : 'transparent' }}>
                    <td style={{
                      padding:'14px 18px', fontSize:13.5, fontWeight: r.total ? 600 : 500,
                      color:P.ink, borderTop:`1px solid ${P.ruleLight}`,
                    }}>{r.gate}</td>
                    {[r.p50, r.p95, r.p99].map((v, i) => (
                      <td key={i} style={{
                        padding:'14px 18px', fontSize:13, color:P.ink2, fontFamily:T1_MONO, textAlign:'right',
                        borderTop:`1px solid ${P.ruleLight}`, borderLeft:`1px solid ${P.ruleLight}`,
                        fontWeight: r.total ? 600 : 400,
                      }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding:`72px ${pad}px`, borderTop:`1px solid ${P.ruleLight}`, background:P.bg }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <SectionEyebrow palette={P}>Throughput</SectionEyebrow>
          <h2 style={sectionH2(P)}>Signing, verification, aggregation.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:14, marginTop:28 }}>
            {[
              { v:'4,200', l:'Ed25519 sign / sec', d:'Single core, RFC 8032' },
              { v:'12,800', l:'Ed25519 verify / sec', d:'Single core, batch-friendly' },
              { v:'820', l:'APSBundle aggregations / sec', d:'1k receipts per bundle, Merkle-rooted' },
            ].map(c => (
              <div key={c.l} style={{
                padding:'22px 24px', background:P.paper, border:`1px solid ${P.ruleLight}`, borderRadius:6,
              }}>
                <div style={{ fontSize:32, fontWeight:500, letterSpacing:'-0.022em', color:P.ink }}>{c.v}</div>
                <div style={{ fontSize:11, color:P.ink5, fontFamily:T1_MONO, letterSpacing:'0.08em', textTransform:'uppercase', marginTop:6 }}>{c.l}</div>
                <div style={{ fontSize:13, color:P.ink4, marginTop:8, lineHeight:1.5 }}>{c.d}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize:12.5, color:P.ink5, marginTop:18, fontStyle:'italic', maxWidth:680 }}>
            Reproducible from aps-conformance-suite. The number you see in your environment depends on the cipher backend and policy size.
          </p>
        </div>
      </section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 3. THREAT MODEL / threat-model.html
// ─────────────────────────────────────────────────────────────────
function AeoessThreatModel({ palette }) {
  const P = palette;
  const pad = 40;

  const ADVERSARIES = [
    { id:'A1', name:'Compromised agent', goal:'Act outside its scope.',  block:'Four-gate pre-flight rejects out-of-scope intents at the gateway boundary. Cascade revocation kills downstream within one signature check.' },
    { id:'A2', name:'Malicious delegator', goal:'Grant authority it does not hold.', block:'Monotonic narrowing: a delegation cannot grant scope its parent did not have. Verifier walks the chain to a registered passport root.' },
    { id:'A3', name:'Replay attacker',   goal:'Reuse a signed action.',     block:'Action receipts include a nonce and a signed timestamp. Custody receipts bind the input set to a Merkle root.' },
    { id:'A4', name:'Phantom issuer',    goal:'Inject signals from a non-existent issuer.', block:'Vocabulary registry enforces single-source-of-truth. Validators reject signal types lacking a production issuer.' },
    { id:'A5', name:'Drift-prompt injector', goal:'Override the operator instruction mid-session.', block:'Instruction Provenance Receipts bind agent authority to a hashed instruction file. Drift across turns is denied at the boundary.' },
    { id:'A6', name:'Downgrade attacker', goal:'Force a weaker auth path.', block:'Mutual authentication handshake is downgrade-proof. TrustBundle pins the supported algorithm set.' },
  ];

  const TRUST = [
    { axis:'In scope',     items:['Cryptographic primitives (Ed25519, RFC 8785)','Gateway boundary enforcement','Signed receipts and their verification','Cascade revocation across the delegation tree','Conformance fixtures and adapters'] },
    { axis:'Out of scope', items:['Effect safety of the agent (see Paper 8)','Correctness of the operator’s policy choices','Unsigned out-of-band channels the agent may use','Identity-provider compromise upstream of bridging'] },
  ];

  return (
    <div data-aeoess-page="1" style={{ background:P.paper, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      <section style={{ padding:`72px ${pad}px 32px` }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <T1Crumb palette={P} label="Threat model"/>
          <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.05, letterSpacing:'-0.025em', fontWeight:500, margin:0, color:P.ink, maxWidth:920 }}>
            What the protocol<br/>defends against.
          </h1>
          <p style={{ fontSize:17, lineHeight:1.6, color:P.ink3, marginTop:18, maxWidth:680 }}>
            Six adversaries, six concrete blocks. The rest of the document names what is out of scope so operators know where to add controls.
          </p>
        </div>
      </section>

      <section style={{ padding:`56px ${pad}px`, borderTop:`1px solid ${P.ruleLight}`, background:P.bg }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <SectionEyebrow palette={P}>Adversaries</SectionEyebrow>
          <h2 style={sectionH2(P)}>Six classes, six blocks.</h2>
          <div style={{ display:'grid', gap:0, marginTop:28, border:`1px solid ${P.ruleLight}`, borderRadius:6, overflow:'hidden' }}>
            {ADVERSARIES.map((a, i) => (
              <div key={a.id} style={{
                padding:'22px 26px', background:P.paper,
                borderTop: i ? `1px solid ${P.ruleLight}` : 'none',
                display:'grid', gridTemplateColumns:'80px 1fr', gap:24, alignItems:'baseline',
              }}>
                <div>
                  <div style={{ fontFamily:T1_MONO, fontSize:11, color:P.ink5, letterSpacing:'0.08em' }}>{a.id}</div>
                  <div style={{ fontSize:14, fontWeight:600, color:P.ink, marginTop:4, letterSpacing:'-0.005em' }}>{a.name}</div>
                </div>
                <div>
                  <div style={{ fontSize:13, color:P.ink4 }}><span style={{ fontFamily:T1_MONO, fontSize:11, color:P.ink5, letterSpacing:'0.08em', marginRight:8 }}>GOAL</span>{a.goal}</div>
                  <div style={{ fontSize:14, color:P.ink2, marginTop:8, lineHeight:1.6 }}><span style={{ fontFamily:T1_MONO, fontSize:11, color:P.accentColor, letterSpacing:'0.08em', marginRight:8 }}>BLOCK</span>{a.block}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:`72px ${pad}px`, borderTop:`1px solid ${P.ruleLight}` }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <SectionEyebrow palette={P}>Trust boundary</SectionEyebrow>
          <h2 style={sectionH2(P)}>What we cover, what we do not.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:28 }}>
            {TRUST.map(c => (
              <div key={c.axis} style={{
                padding:'24px 26px', border:`1px solid ${P.ruleLight}`, borderRadius:6, background:P.paper,
              }}>
                <div style={{ fontSize:11, color:P.ink5, fontFamily:T1_MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>{c.axis}</div>
                <ul style={{ listStyle:'none', padding:0, margin:'12px 0 0' }}>
                  {c.items.map((it, i) => (
                    <li key={i} style={{
                      fontSize:14, color:P.ink2, padding:'10px 0',
                      borderTop: i ? `1px solid ${P.ruleLight}` : 'none', lineHeight:1.55,
                    }}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ fontSize:12.5, color:P.ink5, marginTop:18, fontStyle:'italic', maxWidth:680 }}>
            Effect safety is catalogued separately in Paper 8 (The Evidence-Safety Gap). The protocol specifies procedural validity. We cite our own limits.
          </p>
        </div>
      </section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 4. GATEWAY DASHBOARD / gateway.html
// ─────────────────────────────────────────────────────────────────
function AeoessGatewayDash({ palette }) {
  const P = palette;
  const pad = 40;

  const FEED = [
    { t:'14:02:19', d:'allow', g:'gate 4', ag:'agt:7c1f…', sub:'commerce.checkout', amt:'$248.00' },
    { t:'14:02:18', d:'allow', g:'gate 4', ag:'agt:1a9b…', sub:'content.read',     amt:''        },
    { t:'14:02:17', d:'deny',  g:'scope',  ag:'agt:f0e2…', sub:'commerce.refund',  amt:'$1,200.00' },
    { t:'14:02:16', d:'allow', g:'gate 4', ag:'agt:9d44…', sub:'inference.llm',     amt:''        },
    { t:'14:02:14', d:'allow', g:'gate 4', ag:'agt:e811…', sub:'data.access',       amt:''        },
    { t:'14:02:12', d:'deny',  g:'budget', ag:'agt:7c1f…', sub:'commerce.checkout', amt:'$1,890.00' },
    { t:'14:02:10', d:'allow', g:'gate 4', ag:'agt:a6c0…', sub:'identity.bind',     amt:''        },
    { t:'14:02:08', d:'allow', g:'gate 4', ag:'agt:b7c5…', sub:'content.derive',    amt:''        },
    { t:'14:02:06', d:'deny',  g:'allow',  ag:'agt:c200…', sub:'commerce.send',     amt:'$50.00'   },
    { t:'14:02:04', d:'allow', g:'gate 4', ag:'agt:d301…', sub:'inference.tool',    amt:''        },
  ];

  const STATS = [
    { v:'1.42M', l:'Evals (24h)', sub:'+8.4% vs prior 24h' },
    { v:'0.67%', l:'Deny rate',   sub:'scope 0.31 · budget 0.22 · allowlist 0.14' },
    { v:'1.21ms', l:'p50 latency', sub:'p99 1.94ms' },
    { v:'0',      l:'Incidents',   sub:'Last 30 days' },
  ];

  // Tiny inline sparkline.
  const Spark = ({ data, color }) => {
    const w = 120, h = 28;
    const max = Math.max(...data), min = Math.min(...data);
    const pts = data.map((v, i) => {
      const x = (i / (data.length-1)) * (w-2) + 1;
      const y = h - 1 - ((v - min) / (max - min || 1)) * (h-4);
      return `${x},${y}`;
    }).join(' ');
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.4"/>
      </svg>
    );
  };

  const ENV = [
    { k:'gateway.aeoess.com', v:'reference deployment', s:'green' },
    { k:'JWKS', v:'kid: gateway-v1', s:'green' },
    { k:'Policy bundle', v:'sha256:9f2a…b71c · v0.62', s:'green' },
    { k:'Trust feed', v:'42 issuers · 14 crosswalks live', s:'green' },
  ];

  const denyColor = P.red;
  const okColor = P.green;

  return (
    <div style={{ background:P.bg, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      {/* Hero strip with status */}
      <section style={{ padding:`44px ${pad}px 28px`, background:P.paper, borderBottom:`1px solid ${P.ruleLight}` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:24, flexWrap:'wrap' }}>
          <div>
            <T1Crumb palette={P} label="Gateway"/>
            <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 54px)', fontWeight:500, letterSpacing:'-0.018em', margin:0, color:P.ink }}>Live enforcement.</h1>
            <p style={{ fontSize:14, color:P.ink3, margin:'8px 0 0' }}>gateway.aeoess.com · multi-tenant · production</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, color:P.ink2 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:okColor, boxShadow:`0 0 0 4px ${okColor}22` }}/>
              All systems operational
            </span>
            <a href="#" style={primaryBtn(P)}>Open portal <span style={{ opacity:.75 }}>→</span></a>
          </div>
        </div>
      </section>

      {/* Stat row */}
      <section style={{ padding:`24px ${pad}px 12px` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:14 }}>
          {STATS.map((s, i) => {
            const data = [3,5,4,6,5,7,6,8,7,9,8,9];
            const trend = i % 2 ? data.slice().reverse() : data;
            return (
              <div key={s.l} style={{
                padding:'18px 20px', background:P.paper, border:`1px solid ${P.ruleLight}`, borderRadius:6,
                display:'flex', flexDirection:'column', gap:6,
              }}>
                <div style={{ fontSize:11, color:P.ink5, fontFamily:T1_MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.l}</div>
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:12 }}>
                  <div style={{ fontSize:28, fontWeight:500, letterSpacing:'-0.022em', color:P.ink }}>{s.v}</div>
                  <Spark data={trend} color={i === 1 ? P.red : P.accentColor}/>
                </div>
                <div style={{ fontSize:12, color:P.ink4 }}>{s.sub}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two-col: live feed + environment */}
      <section style={{ padding:`12px ${pad}px 56px` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
          {/* Feed */}
          <div style={{ background:P.paper, border:`1px solid ${P.ruleLight}`, borderRadius:6, overflow:'hidden' }}>
            <div style={{ padding:'14px 18px', borderBottom:`1px solid ${P.ruleLight}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ fontSize:13, fontWeight:600, color:P.ink }}>Live decisions</div>
              <div style={{ fontSize:11, color:P.ink5, fontFamily:T1_MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>last 60s</div>
            </div>
            <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:T1_MONO, fontSize:12.5 }}>
              <tbody>
                {FEED.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding:'10px 18px', color:P.ink5, borderTop: i ? `1px solid ${P.ruleLight}` : 'none', whiteSpace:'nowrap' }}>{row.t}</td>
                    <td style={{ padding:'10px 12px', borderTop: i ? `1px solid ${P.ruleLight}` : 'none' }}>
                      <span style={{
                        display:'inline-block', padding:'2px 8px', borderRadius:3, fontSize:11, letterSpacing:'0.04em',
                        background: row.d === 'allow' ? `${okColor}1f` : `${denyColor}1f`,
                        color: row.d === 'allow' ? okColor : denyColor, fontWeight:600,
                      }}>{row.d.toUpperCase()}</span>
                    </td>
                    <td style={{ padding:'10px 12px', color:P.ink4, borderTop: i ? `1px solid ${P.ruleLight}` : 'none' }}>{row.g}</td>
                    <td style={{ padding:'10px 12px', color:P.ink2, borderTop: i ? `1px solid ${P.ruleLight}` : 'none' }}>{row.ag}</td>
                    <td style={{ padding:'10px 12px', color:P.ink3, borderTop: i ? `1px solid ${P.ruleLight}` : 'none' }}>{row.sub}</td>
                    <td style={{ padding:'10px 18px', color:P.ink2, borderTop: i ? `1px solid ${P.ruleLight}` : 'none', textAlign:'right' }}>{row.amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Environment */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:P.paper, border:`1px solid ${P.ruleLight}`, borderRadius:6 }}>
              <div style={{ padding:'14px 18px', borderBottom:`1px solid ${P.ruleLight}`, fontSize:13, fontWeight:600, color:P.ink }}>Environment</div>
              {ENV.map((e, i) => (
                <div key={e.k} style={{
                  padding:'12px 18px', borderTop: i ? `1px solid ${P.ruleLight}` : 'none',
                  display:'grid', gridTemplateColumns:'14px 1fr', gap:10, alignItems:'baseline',
                }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:okColor, marginTop:4 }}/>
                  <div>
                    <div style={{ fontSize:13, color:P.ink, fontWeight:500 }}>{e.k}</div>
                    <div style={{ fontFamily:T1_MONO, fontSize:11.5, color:P.ink4, marginTop:2 }}>{e.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:P.paper, border:`1px solid ${P.ruleLight}`, borderRadius:6, padding:'18px 20px' }}>
              <div style={{ fontSize:13, fontWeight:600, color:P.ink, marginBottom:10 }}>Quick actions</div>
              <div style={{ display:'grid', gap:8 }}>
                {['Open portal','View receipts','Rotate gateway key','Issue cascade revoke'].map((a, i) => (
                  <a key={a} href="#" style={{
                    fontSize:13, color:P.ink2, textDecoration:'none', padding:'10px 12px',
                    border:`1px solid ${P.ruleLight}`, borderRadius:4, background:P.bg,
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                  }}><span>{a}</span><span style={{ color:P.ink5, fontFamily:T1_MONO }}>→</span></a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

Object.assign(window, { AeoessDocs, AeoessBenchmarks, AeoessThreatModel, AeoessGatewayDash });
