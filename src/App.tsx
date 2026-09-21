import { useState, useEffect, useRef } from 'react';
import logoSrc from './assets/logo-new.png';

const NAV_LINKS = ['Fahrzeuge', 'Ankauf', 'Service', 'Über uns', 'Kontakt'];

const CARS = [
  {
    id: 1,
    brand: 'BMW',
    model: '5er Touring',
    year: 2023,
    km: '18.400 km',
    fuel: 'Diesel',
    power: '286 PS',
    gearbox: 'Automatik',
    doors: 5,
    color: 'Alpinweiß',
    price: '54.900',
    tag: 'Neu eingetroffen',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=700&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der BMW 5er Touring in der Ausstattungslinie M Sport — sportlich, elegant und außergewöhnlich praktisch. Mit dem kraftvollen 3,0-Liter-Reihensechszylinder-Diesel und der 8-Gang-Automatik ist er der perfekte Begleiter für lange Strecken und den Alltag.',
    features: ['M Sport Paket', 'Panoramadach', 'Harman Kardon Sound', 'Head-Up Display', 'Sitzheizung vorn/hinten', 'Adaptives Fahrwerk', 'Driving Assistant Pro', 'Live Cockpit Professional', 'Anhängerkupplung', 'Parking Assistant Plus'],
    mfk: '06/2026',
    warranty: '24 Monate Garantie',
    vin: 'WBA5T21060G123456',
  },
  {
    id: 2,
    brand: 'Mercedes-Benz',
    model: 'GLE 400d',
    year: 2022,
    km: '32.100 km',
    fuel: 'Diesel',
    power: '330 PS',
    gearbox: 'Automatik 9G',
    doors: 5,
    color: 'Obsidianschwarz',
    price: '72.400',
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=700&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Das Mercedes-Benz GLE 400d Coupé verbindet SUV-Komfort mit coupétypischer Eleganz. Die Luftfederung AIRMATIC sorgt für einen schwebenden Fahrkomfort, während 330 PS für dynamische Fahrleistungen garantieren.',
    features: ['AMG Line Exterieur', 'MBUX Infotainment', 'Burmester 3D Sound', 'AIRMATIC Luftfederung', '360°-Kamera', 'Multibeam LED', 'Active Brake Assist', 'Sitzbelüftung', 'Energetisierende Komfortsteuerung', 'Memory-Paket'],
    mfk: '03/2026',
    warranty: '24 Monate Garantie',
    vin: 'WDC1673231A456789',
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'Q5 Sportback',
    year: 2023,
    km: '9.700 km',
    fuel: 'Hybrid',
    power: '299 PS',
    gearbox: 'S tronic 7-Gang',
    doors: 5,
    color: 'Mythosschwarz',
    price: '61.800',
    tag: 'Jungebraucht',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=700&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der Audi Q5 Sportback 55 TFSI e quattro ist ein Plug-in-Hybrid der Extraklasse. Mit rein elektrischer Reichweite von bis zu 62 km und quattro-Allradantrieb ist er das ideale Fahrzeug für umweltbewusstes, dynamisches Fahren.',
    features: ['S line Sportpaket', 'Matrix LED', 'Virtual Cockpit Plus', 'B&O Sound System', 'quattro Allrad', 'Massage-Vordersitze', 'Head-Up Display', 'Standheizung', 'Panoramadach', 'Plug-in Hybrid 17,9 kWh'],
    mfk: '09/2026',
    warranty: '12 Monate Audi Garantie',
    vin: 'WAUZZZFY0PA012345',
  },
  {
    id: 4,
    brand: 'Volkswagen',
    model: 'Tiguan R-Line',
    year: 2022,
    km: '41.200 km',
    fuel: 'Benzin',
    power: '190 PS',
    gearbox: 'DSG 7-Gang',
    doors: 5,
    color: 'Silbergrau',
    price: '38.500',
    tag: null,
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=700&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der VW Tiguan 2.0 TSI R-Line mit 190 PS und DSG-Getriebe — sportliches Design trifft auf alltägliche Praktikabilität. Mit R-Line Exterieur- und Interieurpaket ist er optisch eine echte Aussage.',
    features: ['R-Line Exterieur & Interieur', 'IQ.LIGHT LED', 'Discover Pro Navigation', 'Keyless Access', 'Area View 360°', 'Ergo Active Sitze', 'Klimaanlage 3-Zonen', 'Active Info Display', 'Anhängerkupplung', 'Winterpaket'],
    mfk: '11/2025',
    warranty: '12 Monate Garantie',
    vin: 'WVGZZZ5NZPW123456',
  },
  {
    id: 5,
    brand: 'Porsche',
    model: 'Cayenne E-Hybrid',
    year: 2023,
    km: '14.900 km',
    fuel: 'Hybrid',
    power: '462 PS',
    gearbox: 'Tiptronic S 8-Gang',
    doors: 5,
    color: 'Jetblack',
    price: '98.700',
    tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der Porsche Cayenne E-Hybrid vereint Sportwagen-Dynamik mit effizienter Hybridtechnologie. 462 PS Systemleistung und elektrisches Fahren mit bis zu 42 km Reichweite — Fahrdynamik ohne Kompromisse.',
    features: ['Sport Design Paket', 'PASM Luftfederung', 'Bose Surround Sound', 'Panoramadach', 'Night Vision Assistent', '21" RS Spyder Design Felgen', 'Porsche InnoDrive', '4D Chassis Control', 'Ventilierte Sportsitze Plus', 'Sportchrono Paket'],
    mfk: '01/2026',
    warranty: '24 Monate Porsche Approved',
    vin: 'WP1ZZZ9YZPA012345',
  },
  {
    id: 6,
    brand: 'Volvo',
    model: 'XC90 Recharge',
    year: 2023,
    km: '7.300 km',
    fuel: 'Plug-in Hybrid',
    power: '455 PS',
    gearbox: 'Automatik 8-Gang',
    doors: 5,
    color: 'Crystal White',
    price: '84.900',
    tag: 'Sondermodell',
    img: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&h=700&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der Volvo XC90 Recharge T8 Ultimate in der Sonderausstattung „Dark" — 7 Sitze, skandinavisches Design und 455 PS Systemleistung. Mit rein elektrischer Reichweite von 51 km ideal für Stadt und Autobahn.',
    features: ['Ultimate Dark Ausstattung', 'Bowers & Wilkins Audio', '7-Sitzer Konfiguration', 'Luft-Federung', 'Pilot Assist', '360° Surround View', 'Google-Built-In', 'Kristallschaltknauf', 'Massagesitze', 'Head-Up Display'],
    mfk: '07/2026',
    warranty: '24 Monate Volvo Garantie',
    vin: 'YV1LZ82MCQ1123456',
  },
];

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

type Car = typeof CARS[0];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} style={{ width: 16, height: 16, color: '#149BFF', fill: '#149BFF' }} viewBox="0 0 20 20">
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

      {/* Back bar */}
      <div style={{ background: '#0F1520', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#8A9AB8', cursor: 'pointer', fontSize: 14, padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8A9AB8')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Zurück zur Übersicht
          </button>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ fontSize: 14, color: '#8A9AB8' }}>{car.brand} {car.model}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#149BFF' }}>{car.brand.toUpperCase()}</span>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, margin: '6px 0 8px', lineHeight: 1.1 }}>
            {car.model}
            {car.tag && (
              <span style={{ marginLeft: 14, fontSize: 13, fontWeight: 700, background: '#149BFF', color: '#fff', padding: '4px 12px', borderRadius: 3, verticalAlign: 'middle', letterSpacing: '0.06em' }}>
                {car.tag.toUpperCase()}
              </span>
            )}
          </h1>
          <p style={{ fontSize: 14, color: '#8A9AB8', margin: 0 }}>{car.year} · {car.km} · {car.fuel} · {car.power}</p>
        </div>

        {/* Main grid: gallery + sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }} className="detail-grid">

          {/* Left: gallery + details */}
          <div>
            {/* Main image */}
            <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#0F1520', marginBottom: 12, aspectRatio: '16/9' }}>
              <img
                src={car.imgs[activeImg]}
                alt={`${car.brand} ${car.model}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.3s' }}
              />
              {/* Nav arrows */}
              {car.imgs.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + car.imgs.length) % car.imgs.length)}
                    style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(8,12,18,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', backdropFilter: 'blur(4px)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % car.imgs.length)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(8,12,18,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', backdropFilter: 'blur(4px)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </>
              )}
              <div style={{ position: 'absolute', bottom: 12, right: 14, fontSize: 12, color: 'rgba(255,255,255,0.6)', background: 'rgba(8,12,18,0.6)', padding: '4px 10px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
                {activeImg + 1} / {car.imgs.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
              {car.imgs.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{ flex: '1 1 0', aspectRatio: '16/10', borderRadius: 5, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeImg === i ? '#149BFF' : 'transparent'}`, padding: 0, background: 'none', transition: 'border-color 0.2s', opacity: activeImg === i ? 1 : 0.55 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>

            {/* Description */}
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '28px 32px', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 14, marginTop: 0, letterSpacing: '0.04em' }}>FAHRZEUGBESCHREIBUNG</h2>
              <p style={{ fontSize: 15, color: '#C8D4E8', lineHeight: 1.8, margin: 0 }}>{car.desc}</p>
            </div>

            {/* Specs table */}
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '28px 32px', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 20, marginTop: 0, letterSpacing: '0.04em' }}>TECHNISCHE DATEN</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                {specs.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', gridColumn: i === specs.length - 1 && specs.length % 2 !== 0 ? 'span 2' : undefined }}>
                    <span style={{ fontSize: 13, color: '#8A9AB8' }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F4FF', textAlign: 'right', paddingLeft: 12 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '28px 32px' }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 20, marginTop: 0, letterSpacing: '0.04em' }}>AUSSTATTUNG & EXTRAS</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {car.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#149BFF" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: 14, color: '#C8D4E8' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: price + contact sidebar */}
          <div style={{ position: 'sticky', top: 88 }}>
            {/* Price card */}
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '28px 28px 24px', marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#8A9AB8', letterSpacing: '0.08em', marginBottom: 6 }}>KAUFPREIS</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 38, fontWeight: 900, color: '#F0F4FF', lineHeight: 1, marginBottom: 4 }}>€ {car.price}</div>
              <div style={{ fontSize: 12, color: '#8A9AB8', marginBottom: 24 }}>inkl. MwSt. · zzgl. Überführungskosten</div>

              <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
                <button
                  onClick={() => document.getElementById('detail-form')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ background: '#149BFF', color: '#fff', border: 'none', padding: '14px', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', borderRadius: 4, cursor: 'pointer', transition: 'background 0.2s', width: '100%' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}
                >
                  JETZT ANFRAGEN
                </button>
                <a href="tel:+4947211234567"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', color: '#F0F4FF', border: '1px solid rgba(255,255,255,0.15)', padding: '13px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', borderRadius: 4, textDecoration: 'none', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.37 9.81a19.79 19.79 0 01-3.07-8.57A2 2 0 012.27 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  +49 (0) 4721 123 456
                </a>
              </div>

              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 12, color: '#8A9AB8', marginBottom: 10, fontWeight: 600, letterSpacing: '0.06em' }}>FINANZIERUNGSBEISPIEL</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#8A9AB8' }}>Laufzeit</span>
                  <span style={{ fontSize: 13, color: '#F0F4FF', fontWeight: 600 }}>48 Monate</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#8A9AB8' }}>Anzahlung</span>
                  <span style={{ fontSize: 13, color: '#F0F4FF', fontWeight: 600 }}>10.000 €</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8 }}>
                  <span style={{ fontSize: 14, color: '#8A9AB8', fontWeight: 600 }}>Rate ab</span>
                  <span style={{ fontSize: 17, color: '#149BFF', fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}>
                    {Math.round((parseInt(car.price.replace('.', '')) - 10000) / 48)} € / Monat
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#4A5568', marginTop: 8, lineHeight: 1.5 }}>*Repräsentatives Beispiel. Bonität vorausgesetzt.</div>
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '✓', text: 'TÜV-geprüft & HU neu' },
                { icon: '✓', text: car.warranty },
                { icon: '✓', text: 'Finanzierung vor Ort möglich' },
                { icon: '✓', text: 'Inzahlungnahme möglich' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(20,155,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#149BFF', fontWeight: 800, flexShrink: 0 }}>{b.icon}</span>
                  <span style={{ fontSize: 13, color: '#C8D4E8' }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry form */}
        <div id="detail-form" style={{ marginTop: 60, background: '#0F1520', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 'clamp(24px, 4vw, 48px)' }}>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 8 }}>DIREKTE ANFRAGE</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, marginBottom: 8, marginTop: 0 }}>
              Interesse an diesem Fahrzeug?
            </h2>
            <p style={{ fontSize: 14, color: '#8A9AB8', marginBottom: 32, lineHeight: 1.7 }}>
              Schreiben Sie uns direkt — wir antworten innerhalb von 24 Stunden und vereinbaren gerne eine Probefahrt.
            </p>

            {formSent ? (
              <div style={{ background: 'rgba(20,155,255,0.1)', border: '1px solid rgba(20,155,255,0.3)', borderRadius: 6, padding: '24px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Anfrage gesendet!</div>
                <div style={{ fontSize: 14, color: '#8A9AB8' }}>Wir melden uns innerhalb von 24 Stunden bei Ihnen.</div>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setFormSent(true); }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="inquiry-form">
                <input type="hidden" value={`${car.brand} ${car.model} (ID: ${car.id})`} />
                {[
                  { name: 'name', label: 'Name *', type: 'text', placeholder: 'Max Mustermann', full: false, required: true },
                  { name: 'email', label: 'E-Mail *', type: 'email', placeholder: 'max@beispiel.de', full: false, required: true },
                  { name: 'telefon', label: 'Telefon', type: 'tel', placeholder: '+49 ...', full: false, required: false },
                  { name: 'ort', label: 'PLZ / Wohnort', type: 'text', placeholder: '27474 Cuxhaven', full: false, required: false },
                ].map(f => (
                  <div key={f.name} style={{ gridColumn: f.full ? '1 / -1' : undefined }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: '#8A9AB8', marginBottom: 7 }}>{f.label.toUpperCase()}</label>
                    <input type={f.type} placeholder={f.placeholder} required={f.required}
                      style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '11px 14px', color: '#F0F4FF', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: '#8A9AB8', marginBottom: 7 }}>NACHRICHT</label>
                  <textarea rows={4} defaultValue={`Ich interessiere mich für den ${car.brand} ${car.model} (${car.year}, ${car.km}) und bitte um weitere Informationen.`}
                    style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '11px 14px', color: '#F0F4FF', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <button type="submit"
                    style={{ background: '#149BFF', color: '#fff', border: 'none', padding: '14px 36px', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', borderRadius: 4, cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}
                  >
                    ANFRAGE ABSENDEN
                  </button>
                  <span style={{ fontSize: 12, color: '#8A9AB8', lineHeight: 1.5 }}>Mit dem Absenden stimmen Sie unserer <a href="#" style={{ color: '#149BFF', textDecoration: 'none' }}>Datenschutzerklärung</a> zu.</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Related vehicles */}
        <div style={{ marginTop: 72 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 8 }}>ÄHNLICHE FAHRZEUGE</p>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, marginBottom: 32, marginTop: 0 }}>
            Das könnte Sie auch interessieren
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {related.map(c => (
              <div key={c.id}
                onClick={() => onSelectCar(c)}
                style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(20,155,255,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <div style={{ height: 170, overflow: 'hidden', background: '#161D2A' }}>
                  <img src={c.img} alt={`${c.brand} ${c.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#149BFF', marginBottom: 4 }}>{c.brand.toUpperCase()}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{c.model}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#8A9AB8' }}>{c.km} · {c.fuel}</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 900, color: '#149BFF' }}>€ {c.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .inquiry-form { grid-template-columns: 1fr !important; }
          .inquiry-form > div { grid-column: 1 / -1 !important; }
        }
        input::placeholder, textarea::placeholder { color: #4A5568; }
      `}</style>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Alle');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filters = ['Alle', 'Benzin', 'Diesel', 'Hybrid'];
  const filtered = activeFilter === 'Alle' ? CARS : CARS.filter(c => c.fuel.includes(activeFilter));

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedCar(null);
    setTimeout(() => document.getElementById('fahrzeuge')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#080C12', color: '#F0F4FF', minHeight: '100vh' }}>

      {/* NAV */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled || selectedCar ? 'rgba(8,12,18,0.97)' : 'transparent',
        borderBottom: scrolled || selectedCar ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        backdropFilter: scrolled || selectedCar ? 'blur(12px)' : 'none',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <img src={logoSrc} alt="Autowelten Cuxhaven" onClick={() => { setSelectedCar(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ height: 32, width: 'auto', cursor: 'pointer' }} />

          <nav style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="hidden-mobile">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setSelectedCar(null)}
                style={{ color: '#8A9AB8', fontSize: 14, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A9AB8')}
              >{link.toUpperCase()}</a>
            ))}
            <a href="#kontakt"
              style={{ background: '#149BFF', color: '#fff', fontSize: 13, fontWeight: 700, padding: '10px 22px', borderRadius: 4, textDecoration: 'none', letterSpacing: '0.06em', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
              onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}
            >ANFRAGE</a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
            className="show-mobile" aria-label="Menü">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F0F4FF" strokeWidth="2">
              {menuOpen ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></> : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: '#0F1520', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px 28px' }}>
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => { setMenuOpen(false); setSelectedCar(null); }}
                style={{ display: 'block', color: '#8A9AB8', padding: '12px 0', fontSize: 15, fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >{link}</a>
            ))}
            <a href="#kontakt" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', background: '#149BFF', color: '#fff', textAlign: 'center', padding: '12px', marginTop: 16, borderRadius: 4, fontWeight: 700, textDecoration: 'none' }}
            >ANFRAGE STELLEN</a>
          </div>
        )}
      </header>

      {/* Detail page or main page */}
      {selectedCar ? (
        <div style={{ paddingTop: 72 }}>
          <DetailPage car={selectedCar} onBack={handleBack} onSelectCar={handleSelectCar} />
        </div>
      ) : (
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
                <a href="#fahrzeuge" style={{ background: '#149BFF', color: '#fff', padding: '16px 36px', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', textDecoration: 'none', borderRadius: 3, transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}
                >FAHRZEUGE ENTDECKEN</a>
                <a href="#kontakt" style={{ background: 'transparent', color: '#F0F4FF', padding: '16px 36px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 3 }}>KONTAKT</a>
              </div>
              <div id="stats-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40, width: '100%', justifyContent: 'center' }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{ flex: '1 1 140px', paddingRight: 40 }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#149BFF', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 13, color: '#8A9AB8', marginTop: 6, letterSpacing: '0.04em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAHRZEUGE */}
          <section id="fahrzeuge" style={{ padding: 'clamp(60px,8vw,120px) 24px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div id="fahrzeuge-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 12 }}>UNSER ANGEBOT</p>
                  <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
                    AKTUELLE<br /><span style={{ color: '#149BFF' }}>FAHRZEUGE</span>
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {filters.map(f => (
                    <button key={f} onClick={() => setActiveFilter(f)}
                      style={{ padding: '8px 20px', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', border: '1px solid', borderRadius: 3, cursor: 'pointer', transition: 'all 0.2s', background: activeFilter === f ? '#149BFF' : 'transparent', borderColor: activeFilter === f ? '#149BFF' : 'rgba(255,255,255,0.15)', color: activeFilter === f ? '#fff' : '#8A9AB8' }}
                    >{f}</button>
                  ))}
                </div>
              </div>

              <div id="car-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {filtered.map(car => (
                  <div key={car.id}
                    style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden', transition: 'transform 0.2s, border-color 0.2s', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(20,155,255,0.3)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
                  >
                    <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: '#161D2A' }}>
                      <img src={car.img} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                      {car.tag && <span style={{ position: 'absolute', top: 14, left: 14, background: '#149BFF', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 2 }}>{car.tag.toUpperCase()}</span>}
                      <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(8,12,18,0.8)', color: '#8A9AB8', fontSize: 12, padding: '4px 10px', borderRadius: 2 }}>{car.year}</span>
                    </div>
                    <div style={{ padding: '20px 22px 22px' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: '#149BFF', marginBottom: 6 }}>{car.brand.toUpperCase()}</div>
                      <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>{car.model}</h3>
                      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                        {[car.km, car.fuel, car.power].map((spec, i) => (
                          <span key={i} style={{ fontSize: 13, color: '#8A9AB8', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#149BFF', display: 'inline-block', opacity: 0.7 }} />
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
                        <div>
                          <div style={{ fontSize: 11, color: '#8A9AB8', marginBottom: 2 }}>Preis</div>
                          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 900, color: '#F0F4FF' }}>€ {car.price}</div>
                        </div>
                        <button onClick={() => handleSelectCar(car)}
                          style={{ background: 'transparent', border: '1px solid #149BFF', color: '#149BFF', padding: '8px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', borderRadius: 3, cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#149BFF'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#149BFF'; }}
                        >DETAILS</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 56 }}>
                <a href="#kontakt" style={{ display: 'inline-block', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#F0F4FF', padding: '14px 40px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textDecoration: 'none', borderRadius: 3 }}>
                  ALLE 300+ FAHRZEUGE ANZEIGEN →
                </a>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="service" style={{ padding: 'clamp(60px,8vw,120px) 24px', background: '#0A0F18', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(20,155,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,155,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 12 }}>LEISTUNGEN</p>
                <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, margin: 0 }}>ALLES AUS <span style={{ color: '#149BFF' }}>EINER HAND</span></h2>
              </div>
              <div id="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
                {SERVICES.map((s, i) => (
                  <div key={i} style={{ background: '#0F1520', padding: '40px 32px', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(20,155,255,0.25)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: 4, background: 'rgba(20,155,255,0.1)', border: '1px solid rgba(20,155,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#149BFF', marginBottom: 24 }}>{s.icon}</div>
                    <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 800, marginBottom: 12 }}>{s.title}</h3>
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
                <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>SEIT 2006 IN <span style={{ color: '#149BFF' }}>CUXHAVEN</span></h2>
                <p style={{ fontSize: 15, color: '#8A9AB8', lineHeight: 1.8, marginBottom: 20 }}>Was als kleines Autohaus mit fünf Fahrzeugen begann, ist heute eine der bekanntesten Fahrzeugadressen an der Nordseeküste. Wir leben Autos — mit Leidenschaft, Ehrlichkeit und echtem Fachwissen.</p>
                <p style={{ fontSize: 15, color: '#8A9AB8', lineHeight: 1.8, marginBottom: 36 }}>Unser Team berät Sie persönlich und findet das passende Fahrzeug für Ihre Bedürfnisse — ohne Druck, ohne versteckte Kosten.</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 4, minHeight: 60, background: 'linear-gradient(to bottom, #149BFF, transparent)', borderRadius: 2 }} />
                  <div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4, color: '#F0F4FF' }}>„Ihr Vertrauen ist unser Antrieb."</p>
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
              <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 12 }}>KUNDENSTIMMEN</p>
                <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, margin: 0 }}>WAS UNSERE <span style={{ color: '#149BFF' }}>KUNDEN SAGEN</span></h2>
              </div>
              <div id="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '32px 28px' }}>
                    <StarRating count={t.stars} />
                    <p style={{ fontSize: 15, color: '#C8D4E8', lineHeight: 1.75, margin: '16px 0 24px', fontStyle: 'italic' }}>„{t.text}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(20,155,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, color: '#149BFF', fontSize: 16 }}>{t.name[0]}</div>
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
                <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 32 }}>WIR SIND <span style={{ color: '#149BFF' }}>FÜR SIE DA</span></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    { icon: '📍', label: 'Adresse', value: 'Hafenstraße 42, 27474 Cuxhaven' },
                    { icon: '📞', label: 'Telefon', value: '+49 (0) 4721 123 456' },
                    { icon: '✉️', label: 'E-Mail', value: 'info@autowelten-cuxhaven.de' },
                    { icon: '🕐', label: 'Öffnungszeiten', value: 'Mo–Fr 9:00–18:00 | Sa 10:00–16:00' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ width: 44, height: 44, background: 'rgba(20,155,255,0.1)', border: '1px solid rgba(20,155,255,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#8A9AB8', marginBottom: 4 }}>{item.label.toUpperCase()}</div>
                        <div style={{ fontSize: 15, color: '#F0F4FF' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="kontakt-form" style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '40px 36px' }}>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 28, marginTop: 0 }}>ANFRAGE STELLEN</h3>
                <form onSubmit={e => { e.preventDefault(); alert('Vielen Dank! Wir melden uns in Kürze.'); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { name: 'name', label: 'Name', type: 'text', placeholder: 'Max Mustermann' },
                    { name: 'email', label: 'E-Mail', type: 'email', placeholder: 'max@beispiel.de' },
                    { name: 'telefon', label: 'Telefon (optional)', type: 'tel', placeholder: '+49 ...' },
                  ].map(field => (
                    <div key={field.name}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: '#8A9AB8', marginBottom: 8 }}>{field.label.toUpperCase()}</label>
                      <input type={field.type} placeholder={field.placeholder}
                        style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, padding: '12px 14px', color: '#F0F4FF', fontSize: 14, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                        onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: '#8A9AB8', marginBottom: 8 }}>NACHRICHT</label>
                    <textarea rows={4} placeholder="Ihr Anliegen oder Interesse an einem Fahrzeug..."
                      style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, padding: '12px 14px', color: '#F0F4FF', fontSize: 14, outline: 'none', resize: 'vertical', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>
                  <button type="submit"
                    style={{ background: '#149BFF', color: '#fff', border: 'none', padding: '14px', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer', marginTop: 8, transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0E78C9')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#149BFF')}
                  >NACHRICHT SENDEN</button>
                </form>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: '#050810', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 24px 32px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div id="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
                <div>
                  <img src={logoSrc} alt="Autowelten Cuxhaven" style={{ height: 32, width: 'auto', marginBottom: 16, display: 'block' }} />
                  <p style={{ fontSize: 13, color: '#8A9AB8', lineHeight: 1.7, maxWidth: 240 }}>Ihr zuverlässiger Fahrzeugpartner an der Nordseeküste seit 2006.</p>
                </div>
                {[
                  { title: 'Fahrzeuge', links: ['Aktuelle Angebote', 'Neuwagen', 'Gebrauchtwagen', 'Elektrofahrzeuge'] },
                  { title: 'Service', links: ['Ankauf', 'Finanzierung', 'Garantie', 'Inzahlungnahme'] },
                  { title: 'Unternehmen', links: ['Über uns', 'Team', 'Karriere', 'Impressum'] },
                ].map(col => (
                  <div key={col.title}>
                    <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#F0F4FF', marginBottom: 16, marginTop: 0 }}>{col.title.toUpperCase()}</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {col.links.map(link => (
                        <li key={link}><a href="#" style={{ fontSize: 14, color: '#8A9AB8', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#8A9AB8')}
                        >{link}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div id="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#8A9AB8' }}>© 2026 Autowelten Cuxhaven GmbH. Alle Rechte vorbehalten.</span>
                <div style={{ display: 'flex', gap: 24 }}>
                  {['Datenschutz', 'Impressum', 'AGB'].map(l => (
                    <a key={l} href="#" style={{ fontSize: 13, color: '#8A9AB8', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#149BFF')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8A9AB8')}
                    >{l}</a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        input::placeholder, textarea::placeholder { color: #4A5568; }

        @media (max-width: 640px) {
          header img { height: 26px !important; }
          #hero-inner { padding-top: 100px !important; padding-left: 16px !important; padding-right: 16px !important; }
          #stats-bar { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 28px !important; margin-top: 48px !important; }
          #stats-bar > div { padding-right: 0 !important; text-align: center !important; }
          #hero-buttons { flex-direction: column !important; width: 100% !important; }
          #hero-buttons a { text-align: center !important; width: 100% !important; }
          #car-grid { grid-template-columns: 1fr !important; }
          #fahrzeuge-header { flex-direction: column !important; align-items: flex-start !important; }
          #ueber-deco { display: none !important; }
          #ueber-badge { bottom: -12px !important; right: -4px !important; padding: 14px 16px !important; }
          #kontakt-form { padding: 28px 20px !important; }
          #footer-bottom { flex-direction: column !important; align-items: flex-start !important; }
          #services-grid { grid-template-columns: 1fr !important; }
          #testimonials-grid { grid-template-columns: 1fr !important; }
          #kontakt-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          #footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </div>
  );
}
