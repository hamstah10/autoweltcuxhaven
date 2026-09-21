import { useState, useEffect, useRef } from 'react';
import logoSrc from './assets/logo-new.png';
import { CARS, type Car } from './data/cars';
import VehiclesPage from './pages/VehiclesPage';

const STATS = [
  { value: '2.400+', label: 'Fahrzeuge verkauft' },
  { value: '18', label: 'Jahre Erfahrung' },
  { value: '4,9', label: 'Kundenbewertung' },
  { value: '100%', label: 'Zufriedenheitsgarantie' },
];

const SERVICES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}><path d="M9 17H5a2 2 0 0 0-2 2v.5M15 17h4a2 2 0 0 1 2 2v.5M3 10V7a2 2 0 0 1 2-2h3M21 10V7a2 2 0 0 0-2-2h-3M7 14H3m18 0h-4M7 10l1-4h8l1 4M7 14v3m10-3v3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Gebrauchtwagenankauf',
    desc: 'Wir kaufen Ihr Fahrzeug zum fairen Marktpreis — schnell, unkompliziert und ohne versteckte Abzüge.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Fahrzeuggarantie',
    desc: 'Alle Fahrzeuge werden technisch geprüft und kommen mit bis zu 24 Monaten Garantie auf Wunsch.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Finanzierung & Leasing',
    desc: 'Flexible Finanzierungslösungen ab 0 % Zinsen — wir finden das passende Modell für Ihr Budget.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Inzahlungnahme',
    desc: 'Geben Sie Ihr altes Fahrzeug in Zahlung und wechseln Sie bequem und fair in Ihr nächstes Auto.',
  },
];

const TESTIMONIALS = [
  { name: 'Markus B.', location: 'Cuxhaven', text: 'Absolut empfehlenswert! Bereits zum zweiten Mal mein Fahrzeug hier gekauft. Kompetente Beratung, faire Preise und ein reibungsloser Ablauf.', stars: 5 },
  { name: 'Sandra K.', location: 'Bremerhaven', text: 'Der Ankauf meines alten Wagens lief schnell und transparent. Sofortige Auszahlung — keine lästige Warterei. Sehr professionell!', stars: 5 },
  { name: 'Thomas H.', location: 'Stade', text: 'Großes Angebot, freundliches Personal und eine top Finanzierungsberatung. Mein neuer Q5 ist ein Traum. Danke Autowelten Cuxhaven!', stars: 5 },
];

type Page = 'home' | 'vehicles' | 'detail';

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} style={{ width: 16, height: 16, fill: '#149BFF' }} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Detail Page ──────────────────────────────────────────────────────────────
function DetailPage({ car, onBack, onSelectCar }: { car: Car; onBack: () => void; onSelectCar: (c: Car) => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveImg(0);
    setFormSent(false);
  }, [car.id]);

  const related = CARS.filter(c => c.id !== car.id).slice(0, 3);

  const specs = [
    { label: 'Kilometerstand', value: car.km },
    { label: 'Erstzulassung', value: `01/${car.year}` },
    { label: 'Kraftstoff', value: car.fuel },
    { label: 'Leistung', value: car.power },
    { label: 'Getriebe', value: car.gearbox },
    { label: 'Türen', value: String(car.doors) },
    { label: 'Farbe', value: car.color },
    { label: 'HU/MFK', value: car.mfk },
    { label: 'Garantie', value: car.warranty },
    { label: 'FIN', value: car.vin },
  ];

  return (
    <div ref={topRef} style={{ minHeight: '100vh', backgroundColor: '#080C12', color: '#F0F4FF', fontFamily: "'Inter', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ background: '#0A0F18', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
          <button onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#8A9AB8', cursor: 'pointer', fontSize: 13, padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8A9AB8')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Fahrzeuge
          </button>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ color: '#8A9AB8' }}>{car.brand} {car.model}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 24px 80px' }}>

        {/* Title */}
        <div style={{ marginBottom: 28 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#149BFF' }}>{car.brand.toUpperCase()}</span>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(24px, 4vw, 46px)', fontWeight: 900, margin: '6px 0 8px', lineHeight: 1.1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            {car.model}
            {car.tag && <span style={{ fontSize: 13, fontWeight: 700, background: '#149BFF', color: '#fff', padding: '4px 12px', borderRadius: 3, verticalAlign: 'middle', letterSpacing: '0.06em' }}>{car.tag.toUpperCase()}</span>}
          </h1>
          <p style={{ fontSize: 14, color: '#8A9AB8', margin: 0 }}>{car.year} · {car.km} · {car.fuel} · {car.power}</p>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }} className="detail-grid">

          <div>
            {/* Gallery */}
            <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#0F1520', marginBottom: 10, aspectRatio: '16/9' }}>
              <img src={car.imgs[activeImg]} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {car.imgs.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + car.imgs.length) % car.imgs.length)}
                    style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(8,12,18,0.75)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', backdropFilter: 'blur(4px)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % car.imgs.length)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(8,12,18,0.75)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', backdropFilter: 'blur(4px)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </>
              )}
              <div style={{ position: 'absolute', bottom: 12, right: 14, fontSize: 12, color: 'rgba(255,255,255,0.6)', background: 'rgba(8,12,18,0.65)', padding: '3px 10px', borderRadius: 20 }}>
                {activeImg + 1} / {car.imgs.length}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
              {car.imgs.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{ flex: '1 1 0', aspectRatio: '16/10', borderRadius: 4, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeImg === i ? '#149BFF' : 'transparent'}`, padding: 0, background: 'none', opacity: activeImg === i ? 1 : 0.5, transition: 'all 0.2s' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>

            {/* Description */}
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '24px 28px', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 800, marginBottom: 12, marginTop: 0, letterSpacing: '0.06em', color: '#8A9AB8' }}>FAHRZEUGBESCHREIBUNG</h2>
              <p style={{ fontSize: 15, color: '#C8D4E8', lineHeight: 1.8, margin: 0 }}>{car.desc}</p>
            </div>

            {/* Specs */}
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '24px 28px', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 800, marginBottom: 18, marginTop: 0, letterSpacing: '0.06em', color: '#8A9AB8' }}>TECHNISCHE DATEN</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }} className="specs-grid">
                {specs.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 13, color: '#8A9AB8' }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F4FF', textAlign: 'right', paddingLeft: 8 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '24px 28px' }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 800, marginBottom: 18, marginTop: 0, letterSpacing: '0.06em', color: '#8A9AB8' }}>AUSSTATTUNG & EXTRAS</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="features-grid">
                {car.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#149BFF" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: 14, color: '#C8D4E8' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 88 }}>
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '24px', marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#8A9AB8', letterSpacing: '0.08em', marginBottom: 4 }}>KAUFPREIS</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 36, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>€ {car.price}</div>
              <div style={{ fontSize: 12, color: '#8A9AB8', marginBottom: 22 }}>inkl. MwSt. · zzgl. Überführung</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <button onClick={() => document.getElementById('detail-form')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ background: '#149BFF', color: '#fff', border: 'none', padding: '13px', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', borderRadius: 4, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}>
                  JETZT ANFRAGEN
                </button>
                <a href="tel:+4947211234567"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', color: '#F0F4FF', border: '1px solid rgba(255,255,255,0.15)', padding: '12px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, borderRadius: 4, textDecoration: 'none', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.37 9.81a19.79 19.79 0 01-3.07-8.57A2 2 0 012.27 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  +49 (0) 4721 123 456
                </a>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 18 }}>
                <div style={{ fontSize: 11, color: '#8A9AB8', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 12 }}>FINANZIERUNG AB</div>
                {[
                  { label: 'Laufzeit', val: '48 Monate' },
                  { label: 'Anzahlung', val: '10.000 €' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#8A9AB8' }}>{r.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F4FF' }}>{r.val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 14, color: '#8A9AB8', fontWeight: 600 }}>Rate ab</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 900, color: '#149BFF' }}>
                    {Math.round((parseInt(car.price.replace(/\./g, '')) - 10000) / 48)} € / Monat
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#4A5568', marginTop: 8, lineHeight: 1.5 }}>*Repräsentatives Beispiel. Bonität vorausgesetzt.</div>
              </div>
            </div>

            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'TÜV-geprüft & HU neu',
                car.warranty,
                'Finanzierung vor Ort möglich',
                'Inzahlungnahme möglich',
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(20,155,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#149BFF', fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: '#C8D4E8' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry form */}
        <div id="detail-form" style={{ marginTop: 56, background: '#0F1520', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 'clamp(24px, 4vw, 48px)' }}>
          <div style={{ maxWidth: 680 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 8 }}>DIREKTE ANFRAGE</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 900, marginBottom: 8, marginTop: 0 }}>Interesse an diesem Fahrzeug?</h2>
            <p style={{ fontSize: 14, color: '#8A9AB8', marginBottom: 28, lineHeight: 1.7 }}>Wir antworten innerhalb von 24 Stunden und vereinbaren gerne eine Probefahrt.</p>

            {formSent ? (
              <div style={{ background: 'rgba(20,155,255,0.1)', border: '1px solid rgba(20,155,255,0.3)', borderRadius: 6, padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Anfrage gesendet!</div>
                <div style={{ fontSize: 14, color: '#8A9AB8' }}>Wir melden uns innerhalb von 24 Stunden.</div>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setFormSent(true); }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="inquiry-form">
                {[
                  { name: 'name', label: 'Name *', type: 'text', placeholder: 'Max Mustermann', required: true },
                  { name: 'email', label: 'E-Mail *', type: 'email', placeholder: 'max@beispiel.de', required: true },
                  { name: 'telefon', label: 'Telefon', type: 'tel', placeholder: '+49 ...', required: false },
                  { name: 'ort', label: 'PLZ / Ort', type: 'text', placeholder: '27474 Cuxhaven', required: false },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#8A9AB8', marginBottom: 7 }}>{f.label.toUpperCase()}</label>
                    <input type={f.type} placeholder={f.placeholder} required={f.required}
                      style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '11px 13px', color: '#F0F4FF', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#8A9AB8', marginBottom: 7 }}>NACHRICHT</label>
                  <textarea rows={3} defaultValue={`Ich interessiere mich für den ${car.brand} ${car.model} (${car.year}, ${car.km}).`}
                    style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '11px 13px', color: '#F0F4FF', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <button type="submit"
                    style={{ background: '#149BFF', color: '#fff', border: 'none', padding: '13px 32px', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', borderRadius: 4, cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}>
                    ANFRAGE ABSENDEN
                  </button>
                  <span style={{ fontSize: 12, color: '#8A9AB8' }}>Mit dem Absenden stimmen Sie unserer <a href="#" style={{ color: '#149BFF', textDecoration: 'none' }}>Datenschutzerklärung</a> zu.</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 900, marginBottom: 24, marginTop: 0 }}>
            Ähnliche Fahrzeuge
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
            {related.map(c => (
              <div key={c.id} onClick={() => onSelectCar(c)}
                style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(20,155,255,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <div style={{ height: 160, overflow: 'hidden', background: '#161D2A' }}>
                  <img src={c.img} alt={`${c.brand} ${c.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#149BFF', letterSpacing: '0.1em', marginBottom: 4 }}>{c.brand.toUpperCase()}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 800, marginBottom: 8 }}>{c.model}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#8A9AB8' }}>{c.km} · {c.fuel}</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 900, color: '#149BFF' }}>€ {c.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) {
          .specs-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .inquiry-form { grid-template-columns: 1fr !important; }
          .inquiry-form > div { grid-column: 1 / -1 !important; }
        }
        input::placeholder, textarea::placeholder { color: #4A5568; }
      `}</style>
    </div>
  );
}

// ── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ onGoToVehicles, onSelectCar }: { onGoToVehicles: () => void; onSelectCar: (c: Car) => void }) {
  const preview = CARS.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&h=1000&fit=crop&auto=format')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.25)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,155,255,0.12) 0%, transparent 60%), linear-gradient(to top, #080C12 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(20,155,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,155,255,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div id="hero-inner" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 56 }}>
            <img src={logoSrc} alt="Autowelten Cuxhaven" style={{ width: 'clamp(240px, 70vw, 680px)', height: 'auto' }} />
          </div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4.5vw, 60px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.01em', maxWidth: 700, textAlign: 'center' }}>
            IHR PARTNER FÜR <span style={{ color: '#149BFF' }}>PREMIUM-FAHRZEUGE</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#8A9AB8', maxWidth: 520, marginBottom: 48, lineHeight: 1.7, textAlign: 'center' }}>
            Über 300 geprüfte Fahrzeuge in Cuxhaven — von kompakt bis Luxusklasse. Faire Preise, transparente Abwicklung, persönliche Beratung.
          </p>
          <div id="hero-buttons" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={onGoToVehicles}
              style={{ background: '#149BFF', color: '#fff', padding: '16px 36px', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', border: 'none', borderRadius: 3, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
              onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}>
              FAHRZEUGE ENTDECKEN
            </button>
            <a href="#kontakt" style={{ background: 'transparent', color: '#F0F4FF', padding: '16px 36px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 3 }}>KONTAKT</a>
          </div>
          <div id="stats-bar" style={{ display: 'flex', flexWrap: 'wrap', marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40, width: '100%', justifyContent: 'center' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ flex: '1 1 140px', paddingRight: 40 }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#149BFF', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: '#8A9AB8', marginTop: 6, letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAHRZEUGE PREVIEW */}
      <section id="fahrzeuge" style={{ padding: 'clamp(60px,8vw,120px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 10 }}>UNSER ANGEBOT</p>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
                AKTUELLE <span style={{ color: '#149BFF' }}>FAHRZEUGE</span>
              </h2>
            </div>
            <button onClick={onGoToVehicles}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#F0F4FF', padding: '10px 24px', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', borderRadius: 3, cursor: 'pointer', transition: 'border-color 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#149BFF')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}>
              Alle 300+ Fahrzeuge →
            </button>
          </div>

          <div id="car-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
            {preview.map(car => (
              <div key={car.id}
                style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(20,155,255,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <div style={{ position: 'relative', height: 210, overflow: 'hidden', background: '#161D2A' }}>
                  <img src={car.img} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                  {car.tag && <span style={{ position: 'absolute', top: 12, left: 12, background: '#149BFF', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 9px', borderRadius: 2 }}>{car.tag.toUpperCase()}</span>}
                  <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(8,12,18,0.85)', color: '#8A9AB8', fontSize: 11, padding: '3px 9px', borderRadius: 2 }}>{car.year}</span>
                </div>
                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#149BFF', marginBottom: 5 }}>{car.brand.toUpperCase()}</div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 800, margin: '0 0 10px', lineHeight: 1.2 }}>{car.model}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                    {[car.km, car.fuel, car.power].map((s, i) => (
                      <span key={i} style={{ fontSize: 12, color: '#8A9AB8', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#149BFF', display: 'inline-block' }} />{s}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#8A9AB8', marginBottom: 2 }}>PREIS</div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 900 }}>€ {car.price}</div>
                    </div>
                    <button onClick={() => onSelectCar(car)}
                      style={{ background: 'transparent', border: '1px solid #149BFF', color: '#149BFF', padding: '7px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', borderRadius: 3, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#149BFF'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#149BFF'; }}>
                      DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={onGoToVehicles}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#F0F4FF', padding: '14px 40px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#149BFF')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}>
              ALLE 300+ FAHRZEUGE MIT FILTER ANZEIGEN →
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="service" style={{ padding: 'clamp(60px,8vw,120px) 24px', background: '#0A0F18', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(20,155,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,155,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 12 }}>LEISTUNGEN</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, margin: 0 }}>ALLES AUS <span style={{ color: '#149BFF' }}>EINER HAND</span></h2>
          </div>
          <div id="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: '#0F1520', padding: '36px 28px', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(20,155,255,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ width: 50, height: 50, borderRadius: 4, background: 'rgba(20,155,255,0.1)', border: '1px solid rgba(20,155,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#149BFF', marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#8A9AB8', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÜBER UNS */}
      <section id="über uns" style={{ padding: 'clamp(60px,8vw,120px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 12 }}>ÜBER UNS</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 22 }}>SEIT 2006 IN <span style={{ color: '#149BFF' }}>CUXHAVEN</span></h2>
            <p style={{ fontSize: 15, color: '#8A9AB8', lineHeight: 1.8, marginBottom: 18 }}>Was als kleines Autohaus mit fünf Fahrzeugen begann, ist heute eine der bekanntesten Fahrzeugadressen an der Nordseeküste. Wir leben Autos — mit Leidenschaft, Ehrlichkeit und echtem Fachwissen.</p>
            <p style={{ fontSize: 15, color: '#8A9AB8', lineHeight: 1.8, marginBottom: 32 }}>Unser Team berät Sie persönlich und findet das passende Fahrzeug — ohne Druck, ohne versteckte Kosten.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 4, minHeight: 56, background: 'linear-gradient(to bottom, #149BFF, transparent)', borderRadius: 2 }} />
              <div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 4, color: '#F0F4FF' }}>„Ihr Vertrauen ist unser Antrieb."</p>
                <p style={{ fontSize: 13, color: '#8A9AB8' }}>— Team Autowelten Cuxhaven</p>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div id="ueber-deco" style={{ position: 'absolute', top: -20, left: -20, right: 20, bottom: 20, border: '1px solid rgba(20,155,255,0.2)', borderRadius: 6, zIndex: 0 }} />
            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop&auto=format" alt="Autowelten Cuxhaven Standort" style={{ width: '100%', borderRadius: 6, display: 'block', position: 'relative', zIndex: 1 }} />
            <div id="ueber-badge" style={{ position: 'absolute', bottom: -20, right: -20, background: '#149BFF', borderRadius: 4, padding: '20px 24px', zIndex: 2 }}>
              <div className="badge-num" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1 }}>300+</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Fahrzeuge auf Lager</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px', background: '#0A0F18' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 12 }}>KUNDENSTIMMEN</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, margin: 0 }}>WAS UNSERE <span style={{ color: '#149BFF' }}>KUNDEN SAGEN</span></h2>
          </div>
          <div id="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '28px 24px' }}>
                <StarRating count={t.stars} />
                <p style={{ fontSize: 15, color: '#C8D4E8', lineHeight: 1.75, margin: '14px 0 20px', fontStyle: 'italic' }}>„{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(20,155,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, color: '#149BFF', fontSize: 15 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F4FF' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#8A9AB8' }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" style={{ padding: 'clamp(60px,8vw,120px) 24px' }}>
        <div id="kontakt-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 12 }}>KONTAKT</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 28 }}>WIR SIND <span style={{ color: '#149BFF' }}>FÜR SIE DA</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                { icon: '📍', label: 'Adresse', value: 'Hafenstraße 42, 27474 Cuxhaven' },
                { icon: '📞', label: 'Telefon', value: '+49 (0) 4721 123 456' },
                { icon: '✉️', label: 'E-Mail', value: 'info@autowelten-cuxhaven.de' },
                { icon: '🕐', label: 'Öffnungszeiten', value: 'Mo–Fr 9:00–18:00 | Sa 10:00–16:00' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, background: 'rgba(20,155,255,0.1)', border: '1px solid rgba(20,155,255,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#8A9AB8', marginBottom: 3 }}>{item.label.toUpperCase()}</div>
                    <div style={{ fontSize: 15, color: '#F0F4FF' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="kontakt-form" style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '36px 32px' }}>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 24, marginTop: 0 }}>ANFRAGE STELLEN</h3>
            <form onSubmit={e => { e.preventDefault(); alert('Vielen Dank! Wir melden uns in Kürze.'); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Max Mustermann' },
                { name: 'email', label: 'E-Mail', type: 'email', placeholder: 'max@beispiel.de' },
                { name: 'telefon', label: 'Telefon (optional)', type: 'tel', placeholder: '+49 ...' },
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#8A9AB8', marginBottom: 7 }}>{field.label.toUpperCase()}</label>
                  <input type={field.type} placeholder={field.placeholder}
                    style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, padding: '11px 13px', color: '#F0F4FF', fontSize: 14, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#8A9AB8', marginBottom: 7 }}>NACHRICHT</label>
                <textarea rows={4} placeholder="Ihr Anliegen oder Interesse an einem Fahrzeug..."
                  style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, padding: '11px 13px', color: '#F0F4FF', fontSize: 14, outline: 'none', resize: 'vertical', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <button type="submit"
                style={{ background: '#149BFF', color: '#fff', border: 'none', padding: '13px', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer', marginTop: 4, transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
                onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}>
                NACHRICHT SENDEN
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#050810', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '44px 24px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div id="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 36, marginBottom: 40 }}>
            <div>
              <img src={logoSrc} alt="Autowelten Cuxhaven" style={{ height: 30, width: 'auto', marginBottom: 14, display: 'block' }} />
              <p style={{ fontSize: 13, color: '#8A9AB8', lineHeight: 1.7, maxWidth: 240 }}>Ihr zuverlässiger Fahrzeugpartner an der Nordseeküste seit 2006.</p>
            </div>
            {[
              { title: 'Fahrzeuge', links: ['Aktuelle Angebote', 'Neuwagen', 'Gebrauchtwagen', 'Elektrofahrzeuge'] },
              { title: 'Service', links: ['Ankauf', 'Finanzierung', 'Garantie', 'Inzahlungnahme'] },
              { title: 'Unternehmen', links: ['Über uns', 'Team', 'Karriere', 'Impressum'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#F0F4FF', marginBottom: 14, marginTop: 0 }}>{col.title.toUpperCase()}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {col.links.map(link => (
                    <li key={link}><a href="#" style={{ fontSize: 13, color: '#8A9AB8', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8A9AB8')}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div id="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#8A9AB8' }}>© 2026 Autowelten Cuxhaven GmbH. Alle Rechte vorbehalten.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Datenschutz', 'Impressum', 'AGB'].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: '#8A9AB8', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#149BFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8A9AB8')}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goHome = () => { setPage('home'); setSelectedCar(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goVehicles = () => { setPage('vehicles'); setSelectedCar(null); window.scrollTo({ top: 0 }); };
  const goDetail = (car: Car) => { setSelectedCar(car); setPage('detail'); window.scrollTo({ top: 0 }); };

  const isOnDetail = page === 'detail';
  const isOnVehicles = page === 'vehicles';
  const navSolid = scrolled || isOnDetail || isOnVehicles;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#080C12', color: '#F0F4FF', minHeight: '100vh' }}>

      {/* NAV */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s',
        background: navSolid ? 'rgba(8,12,18,0.97)' : 'transparent',
        borderBottom: navSolid ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        backdropFilter: navSolid ? 'blur(12px)' : 'none',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
          <img src={logoSrc} alt="Autowelten Cuxhaven" onClick={goHome}
            style={{ height: 30, width: 'auto', cursor: 'pointer' }} />

          <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="hidden-mobile">
            {[
              { label: 'Fahrzeuge', action: goVehicles },
              { label: 'Ankauf', action: () => { goHome(); setTimeout(() => document.getElementById('service')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
              { label: 'Service', action: () => { goHome(); setTimeout(() => document.getElementById('service')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
              { label: 'Über uns', action: () => { goHome(); setTimeout(() => document.getElementById('über uns')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
              { label: 'Kontakt', action: () => { goHome(); setTimeout(() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
            ].map(item => (
              <button key={item.label} onClick={item.action}
                style={{ color: isOnVehicles && item.label === 'Fahrzeuge' ? '#149BFF' : '#8A9AB8', fontSize: 13, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em', padding: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
                onMouseLeave={e => (e.currentTarget.style.color = isOnVehicles && item.label === 'Fahrzeuge' ? '#149BFF' : '#8A9AB8')}>
                {item.label.toUpperCase()}
              </button>
            ))}
            <button onClick={goVehicles}
              style={{ background: '#149BFF', color: '#fff', fontSize: 12, fontWeight: 700, padding: '9px 20px', borderRadius: 4, border: 'none', cursor: 'pointer', letterSpacing: '0.06em', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
              onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}>
              ANFRAGE
            </button>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
            className="show-mobile" aria-label="Menü">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0F4FF" strokeWidth="2">
              {menuOpen ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></> : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: '#0F1520', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px 24px' }}>
            {[
              { label: 'Fahrzeuge', action: goVehicles },
              { label: 'Ankauf', action: goHome },
              { label: 'Service', action: goHome },
              { label: 'Über uns', action: goHome },
              { label: 'Kontakt', action: goHome },
            ].map(item => (
              <button key={item.label} onClick={() => { item.action(); setMenuOpen(false); }}
                style={{ display: 'block', width: '100%', textAlign: 'left', color: '#8A9AB8', padding: '11px 0', fontSize: 15, fontWeight: 500, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => { goVehicles(); setMenuOpen(false); }}
              style={{ display: 'block', width: '100%', background: '#149BFF', color: '#fff', textAlign: 'center', padding: '12px', marginTop: 14, borderRadius: 4, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 14 }}>
              ANFRAGE STELLEN
            </button>
          </div>
        )}
      </header>

      {/* Page content */}
      <div style={{ paddingTop: page === 'home' ? 0 : 70 }}>
        {page === 'home' && <HomePage onGoToVehicles={goVehicles} onSelectCar={goDetail} />}
        {page === 'vehicles' && <VehiclesPage onSelectCar={goDetail} />}
        {page === 'detail' && selectedCar && (
          <DetailPage car={selectedCar} onBack={goVehicles} onSelectCar={goDetail} />
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        input::placeholder, textarea::placeholder { color: #4A5568; }
        @media (max-width: 640px) {
          header img { height: 24px !important; }
          #hero-inner { padding-top: 96px !important; padding-left: 16px !important; padding-right: 16px !important; }
          #stats-bar { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 24px !important; margin-top: 44px !important; }
          #stats-bar > div { padding-right: 0 !important; text-align: center !important; }
          #hero-buttons { flex-direction: column !important; width: 100% !important; }
          #hero-buttons a, #hero-buttons button { text-align: center !important; width: 100% !important; box-sizing: border-box !important; }
          #car-grid { grid-template-columns: 1fr !important; }
          #ueber-deco { display: none !important; }
          #ueber-badge { bottom: -10px !important; right: -4px !important; padding: 12px 14px !important; }
          #kontakt-form { padding: 24px 18px !important; }
          #footer-bottom { flex-direction: column !important; align-items: flex-start !important; }
          #services-grid { grid-template-columns: 1fr !important; }
          #testimonials-grid { grid-template-columns: 1fr !important; }
          #kontakt-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          #footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
