// Site chrome for the KYA / AEOESS Glass-design site.
// Hash routing, nav with dropdowns, footer, shared page primitives.

// ─────────────────────────────────────────────────────
// useRoute — tiny hash router. Routes look like #/payments
// ─────────────────────────────────────────────────────
function useRoute() {
  const parse = () => (location.hash.slice(1).replace(/^\//, '') || 'home');
  const [route, setRoute] = React.useState(parse);
  React.useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'auto' : 'auto' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const go = (r) => { location.hash = '/' + r; };
  return [route, go];
}

// Route href helper — standalone mode points to .html files,
// SPA mode uses hash routing.
const href = (r) => {
  if (typeof window !== 'undefined' && window.__standalone) {
    if (r === 'home') return '/kya/';
    if (r === 'pricing') return '/model-citizen/';
    if (r === 'threatmodel') return '/threat-model.html';
    return '/' + r + '.html';
  }
  return '#/' + r;
};

// ─────────────────────────────────────────────────────
// SiteNav — sticky, glass, with dropdowns
// ─────────────────────────────────────────────────────
const NAV_STRUCTURE = [
  { label: 'Protocol', external: 'https://agent-passport.org/' },
  {
    label: 'Solutions', dropdown: [
      { label: 'Payments',   route: 'payments',   desc: 'Agentic checkout banks can underwrite.' },
      { label: 'Content',    route: 'content',    desc: 'Provenance, not disclaimers.' },
      { label: 'Compliance', route: 'compliance', desc: 'Auditor-verifiable receipts.' },
      { label: 'Enterprise', route: 'enterprise', desc: 'The agent control plane.' },
    ],
  },
  {
    label: 'Resources', dropdown: [
      { label: 'Open Source', route: 'opensource', desc: 'Apache 2.0 · GitHub · SDKs.' },
      { label: 'Pilot',       route: 'pricing',    desc: 'Research pilot. Access by application.' },
      { label: 'Blog',        route: 'blog',       desc: 'Field notes from the protocol.' },
      { label: 'FAQ',         route: 'faq',        desc: 'Questions we hear most.' },
      { label: 'Compare',     route: 'compare',    desc: 'KYA vs. the alternatives.' },
    ],
  },
  { label: 'Contact', route: 'contact' },
];

function SiteNav({ currentRoute, onNavigate }) {
  const [openMenu, setOpenMenu] = React.useState(null);
  const closeTimer = React.useRef(null);

  const openMenuNow = (label) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${PX.border}`,
      padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: PX.sans, color: PX.ink,
    }}>
      <a href={href('home')} onClick={(e) => { e.preventDefault(); onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: 'inherit', flex: 'none' }}>
        <img src="/assets/images/aeoess_logo-05.png" alt="aeoess Model Citizen" style={{ height: 32, width: 'auto', display: 'block' }} />
      </a>

      <nav data-kya-nav-links style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 14, fontWeight: 500 }}>
        {NAV_STRUCTURE.map(item => {
          const active = item.dropdown
            ? item.dropdown.some(d => d.route === currentRoute)
            : item.route === currentRoute;
          const isOpen = openMenu === item.label;
          return (
            <div
              key={item.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => item.dropdown && openMenuNow(item.label)}
              onMouseLeave={() => item.dropdown && scheduleClose()}
            >
              <a
                href={item.external || (item.route ? href(item.route) : '#')}
                onClick={(e) => {
                  if (item.external) return;
                  if (!item.route) { e.preventDefault(); openMenuNow(isOpen ? null : item.label); }
                  else { e.preventDefault(); onNavigate(item.route); }
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '8px 16px', borderRadius: 999,
                  color: active ? PX.ink : PX.inkDim,
                  background: active ? PX.paperCyan : 'transparent',
                  textDecoration: 'none', cursor: 'pointer', transition: 'background .15s, color .15s',
                }}
              >
                {item.label}
                {item.dropdown && (
                  <svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }}>
                    <path d="M2 4 L5 7 L8 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                )}
              </a>
              {item.dropdown && isOpen && (
                <div
                  onMouseEnter={() => openMenuNow(item.label)}
                  onMouseLeave={scheduleClose}
                  style={{
                    position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)',
                    minWidth: 320, padding: 10,
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${PX.border}`, borderRadius: 18,
                    boxShadow: '0 30px 60px -20px rgba(45,67,130,0.18)',
                    animation: 'kya-drop .18s ease-out',
                  }}
                >
                  <style>{`@keyframes kya-drop{from{opacity:0;transform:translate(-50%, -6px)}to{opacity:1;transform:translate(-50%, 0)}}`}</style>
                  {/* Caret */}
                  <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 12, height: 12, background: 'rgba(255,255,255,0.92)', borderLeft: `1px solid ${PX.border}`, borderTop: `1px solid ${PX.border}` }} />
                  {item.dropdown.map(d => (
                    <a
                      key={d.route}
                      href={href(d.route)}
                      onClick={(e) => { e.preventDefault(); onNavigate(d.route); setOpenMenu(null); }}
                      style={{
                        display: 'block', padding: '12px 16px', borderRadius: 12,
                        color: PX.ink, textDecoration: 'none',
                        background: d.route === currentRoute ? PX.paperCyan : 'transparent',
                        transition: 'background .15s',
                      }}
                      onMouseEnter={(e) => { if (d.route !== currentRoute) e.currentTarget.style.background = PX.paperBlue; }}
                      onMouseLeave={(e) => { if (d.route !== currentRoute) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div style={{ fontFamily: PX.sansDisplay, fontSize: 16, fontWeight: 600, letterSpacing: '0.02em' }}>{d.label}</div>
                      <div style={{ fontFamily: PX.sans, fontSize: 13, color: PX.inkDim, marginTop: 2 }}>{d.desc}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 'none' }}>
        <a data-kya-nav-cta-secondary href={href('portal')} onClick={(e) => { e.preventDefault(); onNavigate('portal'); }} style={{ fontSize: 14, color: PX.ink, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Sign in</a>
        <button onClick={() => { window.location.href = '/model-citizen/'; }}
          onClick={() => onNavigate('contact')}
          style={{
            background: PX.ink, color: PX.white, border: 'none',
            padding: '10px 18px', fontFamily: PX.sans, fontSize: 13, fontWeight: 500,
            borderRadius: 999, cursor: 'pointer', letterSpacing: '0.005em', whiteSpace: 'nowrap',
          }}
        >Join the pilot →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SiteFooter — shared across all pages
// ─────────────────────────────────────────────────────
function SiteFooter({ onNavigate }) {
  const cols = [
    { h: 'Solutions',   items: [
      ['Payments', 'payments'],
      ['Content', 'content'],
      ['Compliance', 'compliance'],
      ['Enterprise', 'enterprise'],
    ]},
    { h: 'Resources',   items: [
      ['Protocol', 'protocol'],
      ['Pilot', 'pricing'],
      ['Blog', 'blog'],
      ['FAQ', 'faq'],
      ['Compare', 'compare'],
    ]},
    { h: 'Company',     items: [
      ['Contact', 'contact'],
      ['Portal', 'portal'],
      ['Docs', 'docs'],
      ['Sitemap', 'sitemap'],
    ]},
  ];
  return (
    <div style={{ background: PX.white, padding: '80px 64px 36px', borderTop: `1px solid ${PX.border}` }}>
      <div data-kya-footer-grid style={{ display: 'grid', gridTemplateColumns: '1.3fr repeat(3, 1fr)', gap: 40 }}>
        <div>
          <a href={href('home')} onClick={(e) => { e.preventDefault(); onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: 'inherit' }}>
            <img src="/assets/images/aeoess_logo-05.png" alt="AEOESS" style={{ height: 36, width: 'auto', display: 'block' }} />
          </a>
          <p style={{ fontFamily: PX.sans, fontSize: 14, lineHeight: 1.55, color: PX.inkSoft, marginTop: 20, maxWidth: 300 }}>
            Enforcement infrastructure for AI agents. Built on the open Agent Passport System protocol.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
            <span style={{ padding: '4px 10px', borderRadius: 999, background: PX.paperCyan, color: PX.ink, fontFamily: PX.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.16em' }}>APACHE 2.0</span>
            <span style={{ padding: '4px 10px', borderRadius: 999, background: PX.paperLavender, color: PX.ink, fontFamily: PX.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.16em' }}>OPEN PROTOCOL</span>
          </div>
        </div>
        {cols.map(col => (
          <div key={col.h}>
            <div style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.22em', marginBottom: 18 }}>{col.h.toUpperCase()}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: PX.sans, fontSize: 14, color: PX.inkSoft }}>
              {col.items.map(([label, route, external]) => (
                <a key={label} href={external || href(route)} onClick={(e) => { if (external) return; e.preventDefault(); onNavigate(route); }} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>{label}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div data-kya-footer-bottom style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${PX.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: PX.mono, fontSize: 10, color: PX.inkFaint, letterSpacing: '0.18em' }}>
        <span>© 2026 · TYMOFII PIDLISNYI (AGENT PASSPORT SYSTEM)</span>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <a href={href('terms')} onClick={(e) => { e.preventDefault(); onNavigate('terms'); }} style={{ color: 'inherit', textDecoration: 'none' }}>TERMS</a>
          <a href={href('privacy')} onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }} style={{ color: 'inherit', textDecoration: 'none' }}>PRIVACY</a>
          <a href={href('sitemap')} onClick={(e) => { e.preventDefault(); onNavigate('sitemap'); }} style={{ color: 'inherit', textDecoration: 'none' }}>SITEMAP</a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PageShell — wraps a page with nav + footer + bg
// ─────────────────────────────────────────────────────
function PageShell({ children, route, onNavigate, bgVariant = 'glass' }) {
  return (
    <div style={{ background: PX.white, color: PX.ink, fontFamily: PX.sans, minHeight: '100vh' }}>
      <SiteNav currentRoute={route} onNavigate={onNavigate} />
      {children}
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PageHero — title + lede + optional eyebrow + buttons
// ─────────────────────────────────────────────────────
function PageHero({ eyebrow, title, titleAccent, lede, ctas, right, variant = 'glass', minH = 520 }) {
  return (
    <PXGradientBg variant={variant} grid={true} gridOpacity={0.6}>
      <div style={{ padding: '88px 64px 100px', position: 'relative', minHeight: minH }}>
        <div style={{ display: 'grid', gridTemplateColumns: right ? '1.15fr 1fr' : '1fr', gap: 80, alignItems: 'center' }}>
          <div>
            {eyebrow && (
              <div style={{ marginBottom: 28 }}>
                <PXPill color={GL.primary} bg="rgba(110,197,217,0.12)"><PXBreathingDot color={GL.primary} size={6} /> &nbsp;{eyebrow}</PXPill>
              </div>
            )}
            <h1 style={{ fontFamily: PX.sansDisplay, fontSize: 96, fontWeight: 400, lineHeight: 0.95, letterSpacing: '0.005em', color: PX.ink, margin: 0, maxWidth: right ? 600 : 1100 }}>
              {title}{titleAccent && <> <span style={{ color: GL.primary }}>{titleAccent}</span></>}
            </h1>
            {lede && (
              <p style={{ fontFamily: PX.sans, fontSize: 20, lineHeight: 1.5, color: PX.inkSoft, margin: '32px 0 0', maxWidth: right ? 540 : 720, fontWeight: 400 }}>
                {lede}
              </p>
            )}
            {ctas && (
              <div data-kya-cta-row style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {ctas.map((c, i) => (
                  <PXButton key={i} variant={i === 0 ? 'primary' : 'ghost'} size="lg">{c}</PXButton>
                ))}
              </div>
            )}
          </div>
          {right && <div>{right}</div>}
        </div>
      </div>
    </PXGradientBg>
  );
}

// ─────────────────────────────────────────────────────
// SectionLabel + heading helpers
// ─────────────────────────────────────────────────────
function SectionHead({ n, k, title, lede, align = 'left' }) {
  return (
    <div style={{ textAlign: align, marginBottom: 56 }}>
      <div style={{ marginBottom: 24, display: align === 'center' ? 'flex' : 'block', justifyContent: 'center' }}>
        <div style={{ display: 'inline-block' }}><PXSpec n={n} k={k} /></div>
      </div>
      <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 72, fontWeight: 400, lineHeight: 0.98, letterSpacing: '0.005em', color: PX.ink, margin: '0 auto', maxWidth: align === 'center' ? 920 : '100%' }}>
        {title}
      </h2>
      {lede && (
        <p style={{ fontFamily: PX.sans, fontSize: 18, lineHeight: 1.55, color: PX.inkSoft, margin: align === 'center' ? '24px auto 0' : '24px 0 0', maxWidth: 720, fontWeight: 400 }}>
          {lede}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FeatureGrid — card grid; takes [{title, body, badge?, accent?}]
// ─────────────────────────────────────────────────────
function FeatureGrid({ items, cols = 3, hue = 'cyan' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>
      {items.map((it, i) => (
        <PXTranslucentCard key={i} hue={it.hue || hue} style={{ padding: 28, minHeight: 220, display: 'flex', flexDirection: 'column' }}>
          {it.badge && (
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontFamily: PX.mono, fontSize: 10, color: GL.primary, letterSpacing: '0.2em', fontWeight: 600 }}>{it.badge}</span>
            </div>
          )}
          {it.icon && <div style={{ marginBottom: 14 }}>{it.icon}</div>}
          <h3 style={{ fontFamily: PX.sansDisplay, fontSize: 28, fontWeight: 500, color: PX.ink, lineHeight: 1.1, letterSpacing: '0.005em', margin: 0 }}>{it.title}</h3>
          {it.body && (
            <p style={{ fontFamily: PX.sans, fontSize: 14.5, lineHeight: 1.55, color: PX.inkSoft, marginTop: 12, marginBottom: 0 }}>{it.body}</p>
          )}
          {it.tags && (
            <div style={{ marginTop: 'auto', paddingTop: 18, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {it.tags.map(t => (
                <span key={t} style={{ fontFamily: PX.mono, fontSize: 10, color: PX.inkDim, letterSpacing: '0.14em', padding: '4px 10px', borderRadius: 999, background: PX.white, border: `1px solid ${PX.border}` }}>{t}</span>
              ))}
            </div>
          )}
        </PXTranslucentCard>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PageCTA — bottom CTA strip
// ─────────────────────────────────────────────────────
function PageCTA({ title, accent, lede, primary = 'Join the pilot →', secondary = 'Talk to engineering', onPrimary, onSecondary }) {
  return (
    <PXGradientBg variant="glass" grid={false}>
      <div style={{ padding: '120px 64px', position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: '40%', transform: 'translateY(-50%)', opacity: 0.4 }}>
          <PXSignalWave color={GL.primary} height={260} amplitude={42} frequency={0.006} opacity={0.4} strokeWidth={1.2} />
        </div>
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: PX.sansDisplay, fontSize: 104, fontWeight: 400, lineHeight: 0.92, letterSpacing: '0.005em', color: PX.ink, margin: 0 }}>
            {title}{accent && <> <span style={{ color: GL.primary }}>{accent}</span></>}
          </h2>
          {lede && <p style={{ fontFamily: PX.sans, fontSize: 20, color: PX.inkSoft, marginTop: 30 }}>{lede}</p>}
          <div data-kya-cta-row style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={onPrimary} style={{ background: PX.ink, color: PX.white, border: 'none', padding: '16px 28px', fontFamily: PX.sans, fontSize: 15, fontWeight: 500, borderRadius: 999, cursor: 'pointer' }}>{primary}</button>
            <button onClick={onSecondary} style={{ background: 'transparent', color: PX.ink, border: `1px solid ${PX.borderStrong}`, padding: '16px 28px', fontFamily: PX.sans, fontSize: 15, fontWeight: 500, borderRadius: 999, cursor: 'pointer' }}>{secondary}</button>
          </div>
        </div>
      </div>
    </PXGradientBg>
  );
}

// ─────────────────────────────────────────────────────
// PageBody — consistent padding wrapper for prose-y content
// ─────────────────────────────────────────────────────
function PageBody({ children, variant = 'soft', grid = false, padding = '120px 64px' }) {
  return (
    <PXGradientBg variant={variant} grid={grid} gridOpacity={0.4}>
      <div style={{ padding }}>{children}</div>
    </PXGradientBg>
  );
}

Object.assign(window, {
  useRoute, href, NAV_STRUCTURE, SiteNav, SiteFooter, PageShell,
  PageHero, SectionHead, FeatureGrid, PageCTA, PageBody,
});
