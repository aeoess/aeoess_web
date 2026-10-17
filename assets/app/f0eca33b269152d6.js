// KYA / AEOESS — Contact page + App root with hash routing.

// ─────────────────────────────────────────────────────
// ContactPage
// ─────────────────────────────────────────────────────
function ContactPage({ onNavigate }) {
  const [topic, setTopic] = React.useState('eng');
  const [sent, setSent] = React.useState(false);

  const TOPICS = [
    { id: 'eng',     label: 'Engineering',  desc: 'Implementation, integration, protocol questions.',  team: 'signal@aeoess.com' },
    { id: 'sales',   label: 'Sales',        desc: 'Enterprise and pilot questions.',         team: 'signal@aeoess.com' },
    { id: 'press',   label: 'Press',        desc: 'Inquiries, interviews, the working group.',           team: 'signal@aeoess.com' },
    { id: 'security',label: 'Security',     desc: 'Vulnerability reports and threat model questions.',   team: 'security@aeoess.com' },
  ];
  const active = TOPICS.find(t => t.id === topic);

  return (
    <>
      <PageHero
        eyebrow="CONTACT · ENGINEERING READS EVERY EMAIL"
        title="Talk to a"
        titleAccent="human."
        lede="Engineering, sales, press, or security — pick the right inbox and we'll route. We answer within one business day."
      />

      <PageBody variant="soft">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32 }}>
          {/* Left: topic picker + direct info */}
          <div>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em', marginBottom: 18 }}>WHO ARE YOU TRYING TO REACH?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TOPICS.map(t => (
                <button key={t.id} onClick={() => { setTopic(t.id); setSent(false); }} style={{
                  textAlign: 'left', padding: '16px 20px', borderRadius: 14,
                  border: `1px solid ${topic === t.id ? GL.primary : PX.border}`,
                  background: topic === t.id ? 'rgba(110,197,217,0.08)' : PX.white,
                  color: PX.ink, fontFamily: PX.sans, fontSize: 14, cursor: 'pointer',
                }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{t.label}</div>
                  <div style={{ fontFamily: PX.sans, fontSize: 13, color: PX.inkDim, marginTop: 4 }}>{t.desc}</div>
                  <div style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkFaint, marginTop: 6, letterSpacing: '0.06em' }}>{t.team}</div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 28, padding: '24px 26px', borderRadius: 14, background: PX.paperCyan, border: `1px solid ${PX.border}` }}>
              <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.2em' }}>OR ASYNC</div>
              <div style={{ marginTop: 14, fontFamily: PX.mono, fontSize: 13, lineHeight: 2, color: PX.ink }}>
                <div><span style={{ color: PX.inkDim }}>GitHub · </span>github.com/aeoess</div>
                <div><span style={{ color: PX.inkDim }}>Spec · </span>agent-passport.org</div>
                <div><span style={{ color: PX.inkDim }}>Email · </span>signal@aeoess.com</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <PXTranslucentCard hue="cyan" style={{ padding: 36 }}>
            {!sent && (
              <>
                <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em' }}>TO · {active.team.toUpperCase()}</div>
                <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 40, fontWeight: 500, color: PX.ink, marginTop: 6, letterSpacing: '0.005em' }}>{active.label} — what's up?</h2>

                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <ContactField label="Your name">
                    <input required type="text" placeholder="Jane Doe" style={inputStyle} />
                  </ContactField>
                  <ContactField label="Work email">
                    <input required type="email" placeholder="jane@company.com" style={inputStyle} />
                  </ContactField>
                  <ContactField label="Company">
                    <input type="text" placeholder="Acme, Inc." style={inputStyle} />
                  </ContactField>
                  {topic === 'sales' && (
                    <ContactField label="Estimated monthly evaluations">
                      <select style={inputStyle} defaultValue="">
                        <option value="" disabled>— pick a range —</option>
                        <option>Under 500K</option><option>500K – 5M</option><option>5M – 50M</option><option>50M – 500M</option><option>500M+</option>
                      </select>
                    </ContactField>
                  )}
                  {topic === 'security' && (
                    <ContactField label="Severity">
                      <select style={inputStyle} defaultValue="">
                        <option value="" disabled>— pick severity —</option>
                        <option>Low</option><option>Medium</option><option>High</option><option>Critical · please respond ASAP</option>
                      </select>
                    </ContactField>
                  )}
                  <ContactField label="Message">
                    <textarea required rows={5} placeholder={topic === 'security' ? 'Describe the issue. We follow coordinated disclosure.' : 'Tell us what you\'re building.'} style={{ ...inputStyle, resize: 'vertical', minHeight: 120, fontFamily: PX.sans }} />
                  </ContactField>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 8 }}>
                    <span style={{ fontFamily: PX.mono, fontSize: 11, color: PX.inkFaint, letterSpacing: '0.14em' }}>WE RESPOND &lt; 1 BUSINESS DAY · SIGNED BY HUMAN</span>
                    <button type="submit" style={{
                      background: PX.ink, color: PX.white, border: 'none',
                      padding: '14px 24px', fontFamily: PX.sans, fontSize: 14, fontWeight: 500,
                      borderRadius: 999, cursor: 'pointer',
                    }}>Send →</button>
                  </div>
                </form>
              </>
            )}
            {sent && (
              <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: 'rgba(125,201,176,0.18)', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16 L13 21 L24 10" stroke={GL.mint} strokeWidth="2.2" strokeLinecap="round" /></svg>
                </div>
                <h3 style={{ fontFamily: PX.sansDisplay, fontSize: 36, fontWeight: 500, color: PX.ink, marginTop: 16, letterSpacing: '0.005em' }}>Routed to {active.label}.</h3>
                <p style={{ fontFamily: PX.sans, fontSize: 16, color: PX.inkSoft, marginTop: 8 }}>
                  We'll get back to you at the email you provided. Usually faster than a business day.
                </p>
                <button onClick={() => setSent(false)} style={{
                  marginTop: 22, background: 'transparent', border: `1px solid ${PX.borderStrong}`,
                  color: PX.ink, padding: '12px 22px', fontFamily: PX.sans, fontSize: 14, fontWeight: 500,
                  borderRadius: 999, cursor: 'pointer',
                }}>Send another →</button>
              </div>
            )}
          </PXTranslucentCard>
        </div>
      </PageBody>
    </>
  );
}

function ContactField({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.2em' }}>{label.toUpperCase()}</span>
      {children}
    </label>
  );
}
const inputStyle = {
  padding: '12px 16px',
  borderRadius: 12,
  border: `1px solid ${PX.borderStrong}`,
  background: PX.white,
  fontFamily: PX.sans,
  fontSize: 15,
  color: PX.ink,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

// ─────────────────────────────────────────────────────
// Root App with hash routing
// ─────────────────────────────────────────────────────
function KYASite() {
  const [route, setRoute] = useRoute();

  // Map route → page component
  let page;
  switch (route) {
    case 'protocol':     page = <ProtocolPage onNavigate={setRoute} />; break;
    case 'payments':     page = <PaymentsPage onNavigate={setRoute} />; break;
    case 'content':      page = <ContentPage onNavigate={setRoute} />; break;
    case 'compliance':   page = <CompliancePage onNavigate={setRoute} />; break;
    case 'enterprise':   page = <EnterprisePage onNavigate={setRoute} />; break;
    case 'opensource':   page = <OpenSourcePage onNavigate={setRoute} />; break;
    case 'pricing':      page = <PricingPage onNavigate={setRoute} />; break;
    case 'blog':         page = <BlogPage onNavigate={setRoute} />; break;
    case 'faq':          page = <FAQPage onNavigate={setRoute} />; break;
    case 'compare':      page = <ComparePage onNavigate={setRoute} />; break;
    case 'contact':      page = <ContactPage onNavigate={setRoute} />; break;
    case 'roadmap':      page = <RoadmapPage onNavigate={setRoute} />; break;
    case 'threatmodel':  page = <ThreatModelPage onNavigate={setRoute} />; break;
    case 'docs':         page = <DocsPage onNavigate={setRoute} />; break;
    case 'portal':       page = <PortalPage onNavigate={setRoute} />; break;
    case 'terms':        page = <LegalPage kind="terms" onNavigate={setRoute} />; break;
    case 'privacy':      page = <LegalPage kind="privacy" onNavigate={setRoute} />; break;
    case 'sitemap':      page = <SitemapPage onNavigate={setRoute} />; break;
    default:             page = <HomePage onNavigate={setRoute} />;
  }
  return (
    <PageShell route={route === 'home' ? '' : route} onNavigate={setRoute}>
      {page}
    </PageShell>
  );
}

Object.assign(window, { ContactPage, ContactField, inputStyle, KYASite });

// Mount on its own iff this script is loaded directly (kya-site.html)
// Skip when running in standalone mode — page-launcher.jsx handles that.
if (typeof window !== 'undefined' && !window.__standalone && document.getElementById('kya-root')) {
  ReactDOM.createRoot(document.getElementById('kya-root')).render(<KYASite />);
}
