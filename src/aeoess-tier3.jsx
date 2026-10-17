// aeoess-tier3.jsx, Protocol architecture (full), Status page.
// Restrained system. Reuses SubHeader, Footer, SectionEyebrow, sectionH2, ArchitectureMock.

const T3_MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

function T3Crumb({ palette: P, label }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8, fontSize:12,
      color:P.ink5, fontFamily:T3_MONO, marginBottom:22, letterSpacing:'0.02em',
    }}>
      <a href="#" style={{ color:P.ink5, textDecoration:'none' }}>aeoess</a>
      <span>/</span>
      <span style={{ color:P.ink3 }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PROTOCOL ARCHITECTURE, full page (the live site at /protocol-architecture)
// ─────────────────────────────────────────────────────────────────
function AeoessArchitecture({ palette }) {
  const P = palette;
  const pad = 40;
  const { SubHeader, Footer, SectionEyebrow, primaryBtn, secondaryBtn, sectionH2, ArchitectureMock } = window;

  const LAYERS = [
    { id:'L0', name:'Identity',     desc:'did:key, did:web, SPIFFE SVID, OAuth bridge. Every actor is a passport with verifiable keys.', refs:'rfc 8032 · w3c did' },
    { id:'L1', name:'Delegation',   desc:'Capability tokens with monotonic narrowing. Scope cannot expand. TTL cannot extend.',           refs:'paper 4 · paper 5' },
    { id:'L2', name:'Enforcement',  desc:'The gateway runs four-gate evaluation on every intent. Sub-2ms p99. Fail-fast denial.',          refs:'paper 7 · spec §4' },
    { id:'L3', name:'Receipts',     desc:'Action, custody, and contestability receipts. RFC 8785 canonicalization. Ed25519 signatures.',  refs:'paper 6 · spec §6' },
    { id:'L4', name:'Aggregation',  desc:'APSBundle aggregates receipts under a Merkle root. Dispute window. Cascade revocation.',          refs:'paper 9 · spec §8' },
    { id:'L5', name:'Governance',   desc:'aps.txt, HTML embeds, HTTP headers. Signed terms blocks travel with the artifact.',                refs:'paper 11 · spec §10' },
  ];

  const PRIMITIVES = [
    { k:'Passport',         v:'Long-lived identity. Holds the root delegation. Issues all child delegations.' },
    { k:'Delegation',       v:'A scoped, time-bounded capability. Can only narrow downstream.' },
    { k:'Action receipt',   v:'A signed record of one operation under one delegation.' },
    { k:'Custody receipt',  v:'Binds the inputs the agent saw at decision time. Merkle-rooted.' },
    { k:'Contestability',   v:'A structured dispute against any prior receipt. Triggers a defined response window.' },
    { k:'APSBundle',        v:'Merkle aggregation of receipts. The unit of audit.' },
    { k:'Governance block', v:'Signed terms a publisher attaches to an artifact, served at well-known paths.' },
    { k:'TrustBundle',      v:'The set of issuer keys, vocabularies, and crosswalks the gateway considers valid.' },
  ];

  const FLOW = [
    { n:'1', a:'agent', b:'gateway', label:'submit intent (commerce.checkout, $248)', sig:'signed by agt:7c1f' },
    { n:'2', a:'gateway', b:'gateway', label:'four-gate evaluation', sig:'1.21ms p50' },
    { n:'3', a:'gateway', b:'agent', label:'allow', sig:'returns countersigned action receipt' },
    { n:'4', a:'agent', b:'merchant', label:'execute', sig:'side effect occurs' },
    { n:'5', a:'agent', b:'gateway', label:'submit custody receipt', sig:'inputs Merkle root' },
    { n:'6', a:'gateway', b:'aggregator', label:'aggregate', sig:'APSBundle root → audit feed' },
  ];

  return (
    <div data-aeoess-page="1" style={{ background:P.paper, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      <section style={{ padding:`72px ${pad}px 32px` }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <T3Crumb palette={P} label="Protocol architecture"/>
          <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.05, letterSpacing:'-0.025em', fontWeight:500, margin:0, color:P.ink, maxWidth:920 }}>
            The protocol, in one page.
          </h1>
          <p style={{ fontSize:17, lineHeight:1.6, color:P.ink3, marginTop:18, maxWidth:680 }}>
            Six layers, eight primitives, one enforcement boundary. Every other page on this site is built from what is on this one.
          </p>
        </div>
      </section>

      {/* Live architecture viz */}
      <section style={{ padding:`24px ${pad}px 56px`, borderTop:`1px solid ${P.ruleLight}` }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div style={{ height:480 }}>
            <ArchitectureMock palette={P} height="100%"/>
          </div>
          <p style={{ fontSize:12.5, color:P.ink5, marginTop:14, fontStyle:'italic' }}>
            Hover the nodes to see the two signing paths. The full interactive viz lives at /protocol-architecture.html.
          </p>
        </div>
      </section>

      {/* Layers */}
      <section style={{ padding:`72px ${pad}px`, borderTop:`1px solid ${P.ruleLight}`, background:P.bg }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <SectionEyebrow palette={P}>Layers</SectionEyebrow>
          <h2 style={sectionH2(P)}>From identity to governance.</h2>
          <div style={{ marginTop:32, border:`1px solid ${P.ruleLight}`, borderRadius:6, background:P.paper, overflow:'hidden' }}>
            {LAYERS.map((l, i) => (
              <div key={l.id} style={{
                padding:'22px 28px', borderTop: i ? `1px solid ${P.ruleLight}` : 'none',
                display:'grid', gridTemplateColumns:'80px 200px 1fr 180px', gap:24, alignItems:'baseline',
              }}>
                <div style={{ fontFamily:T3_MONO, fontSize:12, color:P.ink5, letterSpacing:'0.06em' }}>{l.id}</div>
                <div style={{ fontSize:16, fontWeight:600, color:P.ink, letterSpacing:'-0.008em' }}>{l.name}</div>
                <div style={{ fontSize:14, color:P.ink3, lineHeight:1.55 }}>{l.desc}</div>
                <div style={{ fontFamily:T3_MONO, fontSize:11.5, color:P.ink5, letterSpacing:'0.04em', textAlign:'right' }}>{l.refs}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primitives */}
      <section style={{ padding:`72px ${pad}px`, borderTop:`1px solid ${P.ruleLight}` }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <SectionEyebrow palette={P}>Primitives</SectionEyebrow>
          <h2 style={sectionH2(P)}>Eight things. That is the surface.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0,1fr))', gap:0, marginTop:32, border:`1px solid ${P.ruleLight}`, borderRadius:6, background:P.paper, overflow:'hidden' }}>
            {PRIMITIVES.map((p, i) => (
              <div key={p.k} style={{
                padding:'22px 26px',
                borderTop: i >= 2 ? `1px solid ${P.ruleLight}` : 'none',
                borderLeft: i % 2 === 1 ? `1px solid ${P.ruleLight}` : 'none',
              }}>
                <div style={{ fontSize:14.5, fontWeight:600, color:P.ink, letterSpacing:'-0.005em' }}>{p.k}</div>
                <div style={{ fontSize:13.5, color:P.ink3, marginTop:8, lineHeight:1.6 }}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-end flow */}
      <section style={{ padding:`72px ${pad}px`, borderTop:`1px solid ${P.ruleLight}`, background:P.bg }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <SectionEyebrow palette={P}>End-to-end</SectionEyebrow>
          <h2 style={sectionH2(P)}>One transaction, fully traced.</h2>
          <div style={{ marginTop:32, border:`1px solid ${P.ruleLight}`, borderRadius:6, background:P.paper, overflow:'hidden' }}>
            {FLOW.map((f, i) => (
              <div key={f.n} style={{
                padding:'18px 26px', borderTop: i ? `1px solid ${P.ruleLight}` : 'none',
                display:'grid', gridTemplateColumns:'40px 240px 1fr 200px', gap:18, alignItems:'baseline',
              }}>
                <div style={{ fontFamily:T3_MONO, fontSize:12, color:P.ink5 }}>{f.n}.</div>
                <div style={{ fontFamily:T3_MONO, fontSize:12, color:P.ink3 }}>
                  <span style={{ color:P.ink2 }}>{f.a}</span>
                  <span style={{ color:P.ink5, margin:'0 8px' }}>→</span>
                  <span style={{ color:P.ink2 }}>{f.b}</span>
                </div>
                <div style={{ fontSize:14, color:P.ink2, lineHeight:1.5 }}>{f.label}</div>
                <div style={{ fontFamily:T3_MONO, fontSize:11.5, color:P.ink5, textAlign:'right' }}>{f.sig}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STATUS, service health
// ─────────────────────────────────────────────────────────────────
function AeoessStatus({ palette }) {
  const P = palette;
  const pad = 40;
  const { SubHeader, Footer, SectionEyebrow, primaryBtn, secondaryBtn, sectionH2 } = window;

  // 90 days of uptime. 0 = green, 1 = yellow, 2 = red.
  const series = (seed, redIdxs = [], yellowIdxs = []) => {
    const out = Array(90).fill(0);
    redIdxs.forEach(i => { out[i] = 2; });
    yellowIdxs.forEach(i => { out[i] = 1; });
    return out;
  };

  const SERVICES = [
    { name:'Gateway · us-east',  status:'operational', uptime:'not published', dots: series('a') },
    { name:'Gateway · eu-west',  status:'operational', uptime:'not published', dots: series('b', [], [42]) },
    { name:'Trust feed',         status:'operational', uptime:'not published', dots: series('c') },
    { name:'Receipt aggregator', status:'operational', uptime:'not published', dots: series('d', [11], []) },
    { name:'JWKS (gateway-v1)',  status:'operational', uptime:'not published', dots: series('e') },
    { name:'aps.dev (portal)',   status:'operational', uptime:'not published', dots: series('f', [], [3, 28]) },
    { name:'docs.aeoess.com',    status:'operational', uptime:'not published', dots: series('g', [], [55]) },
    { name:'Vocabulary registry',status:'operational', uptime:'not published', dots: series('h') },
  ];

  const INCIDENTS = [
    { d:'Apr 18', t:'14:02 UTC', sev:'minor', title:'EU-West gateway elevated p99 latency', dur:'18 min', body:'Resolved. Cause: cold cache on rotated policy bundle. Mitigation: pre-warm step added to deploy.' },
    { d:'Mar 22', t:'09:41 UTC', sev:'minor', title:'aps.dev portal sign-in delay', dur:'7 min', body:'Resolved. Upstream OIDC issuer slow path. Failover engaged automatically.' },
    { d:'Feb 09', t:'20:11 UTC', sev:'minor', title:'docs deploy stalled', dur:'12 min', body:'Resolved. CDN purge race. Caching headers tightened.' },
  ];

  const dotColor = (v) => v === 0 ? P.green : (v === 1 ? '#d97706' : P.red);
  const sevColor = (s) => s === 'major' ? P.red : (s === 'minor' ? '#d97706' : P.ink5);

  return (
    <div style={{ background:P.bg, color:P.ink, fontFamily:'-apple-system, "Inter", system-ui, sans-serif', minHeight:'100%' }}>
      <SubHeader palette={P} pad={pad}/>

      {/* Status banner */}
      <section style={{ padding:`56px ${pad}px 32px`, background:P.paper, borderBottom:`1px solid ${P.ruleLight}` }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <T3Crumb palette={P} label="Status"/>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:24, flexWrap:'wrap' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight:1.05, letterSpacing:'-0.022em', fontWeight:500, margin:0, color:P.ink }}>
                All systems operational.
              </h1>
              <p style={{ fontSize:15, color:P.ink3, marginTop:12 }}>
                Last 90 days. Updates in real time. Subscribe for incident notifications by email or webhook.
              </p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, color:P.ink2 }}>
                <span style={{ width:10, height:10, borderRadius:'50%', background:P.green, boxShadow:`0 0 0 5px ${P.green}22` }}/>
                Operational
              </span>
              <a href="#" style={primaryBtn(P)}>Subscribe</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding:`32px ${pad}px 56px` }}>
        <div style={{ maxWidth:1180, margin:'0 auto', background:P.paper, border:`1px solid ${P.ruleLight}`, borderRadius:6, overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', borderBottom:`1px solid ${P.ruleLight}`, display:'grid', gridTemplateColumns:'1fr 1fr 130px', gap:16 }}>
            <div style={{ fontSize:11, color:P.ink5, fontFamily:T3_MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>Service</div>
            <div style={{ fontSize:11, color:P.ink5, fontFamily:T3_MONO, letterSpacing:'0.08em', textTransform:'uppercase' }}>Last 90 days</div>
            <div style={{ fontSize:11, color:P.ink5, fontFamily:T3_MONO, letterSpacing:'0.08em', textTransform:'uppercase', textAlign:'right' }}>Uptime</div>
          </div>
          {SERVICES.map((s, i) => (
            <div key={s.name} style={{
              padding:'18px 20px', borderTop: i ? `1px solid ${P.ruleLight}` : 'none',
              display:'grid', gridTemplateColumns:'1fr 1fr 130px', gap:16, alignItems:'center',
            }}>
              <div>
                <div style={{ fontSize:14, fontWeight:500, color:P.ink }}>{s.name}</div>
                <div style={{ fontSize:11.5, color:P.ink5, fontFamily:T3_MONO, letterSpacing:'0.04em', marginTop:3, textTransform:'uppercase' }}>{s.status}</div>
              </div>
              <div style={{ display:'flex', gap:2, alignItems:'center', height:30 }}>
                {s.dots.map((v, j) => (
                  <span key={j} style={{
                    flex:'1 1 0', height:24, background:dotColor(v), borderRadius:1, opacity: v === 0 ? 0.85 : 1,
                  }}/>
                ))}
              </div>
              <div style={{ fontFamily:T3_MONO, fontSize:13, color:P.ink2, textAlign:'right', fontWeight:500 }}>{s.uptime}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Incident history */}
      <section style={{ padding:`56px ${pad}px`, borderTop:`1px solid ${P.ruleLight}` }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <SectionEyebrow palette={P}>Incident history</SectionEyebrow>
          <h2 style={sectionH2(P)}>Last 90 days.</h2>
          <div style={{ marginTop:28, background:P.paper, border:`1px solid ${P.ruleLight}`, borderRadius:6, overflow:'hidden' }}>
            {INCIDENTS.map((inc, i) => (
              <div key={i} style={{
                padding:'22px 26px', borderTop: i ? `1px solid ${P.ruleLight}` : 'none',
                display:'grid', gridTemplateColumns:'120px 1fr', gap:24, alignItems:'baseline',
              }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:P.ink }}>{inc.d}</div>
                  <div style={{ fontFamily:T3_MONO, fontSize:11.5, color:P.ink5, marginTop:2 }}>{inc.t}</div>
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:14 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:P.ink, letterSpacing:'-0.005em' }}>{inc.title}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <span style={{
                        padding:'2px 8px', fontSize:10.5, fontFamily:T3_MONO, fontWeight:600, letterSpacing:'0.06em',
                        textTransform:'uppercase', borderRadius:3, background:`${sevColor(inc.sev)}1f`, color:sevColor(inc.sev),
                      }}>{inc.sev}</span>
                      <span style={{ fontFamily:T3_MONO, fontSize:11.5, color:P.ink5 }}>{inc.dur}</span>
                    </div>
                  </div>
                  <p style={{ fontSize:13.5, color:P.ink3, margin:'10px 0 0', lineHeight:1.6 }}>{inc.body}</p>
                </div>
              </div>
            ))}
            <div style={{ padding:'18px 26px', borderTop:`1px solid ${P.ruleLight}`, fontSize:13, color:P.ink5 }}>
              Older incidents in the <a href="#" style={{ color:P.accentColor, textDecoration:'none' }}>archive</a>.
            </div>
          </div>
        </div>
      </section>

      <Footer palette={P} pad={pad}/>
    </div>
  );
}

Object.assign(window, { AeoessArchitecture, AeoessStatus });
