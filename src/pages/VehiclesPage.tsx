import { useState, useMemo } from 'react';
import { CARS, type Car } from '../data/cars';

const BRANDS = ['Alle Marken', ...Array.from(new Set(CARS.map(c => c.brand))).sort()];
const FUELS = ['Alle', 'Benzin', 'Diesel', 'Hybrid', 'Plug-in Hybrid'];
const GEARBOXES = ['Alle', 'Automatik', 'Manuell'];

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Preis aufsteigend' },
  { value: 'price-desc', label: 'Preis absteigend' },
  { value: 'km-asc', label: 'Kilometerstand ↑' },
  { value: 'year-desc', label: 'Baujahr (neu → alt)' },
  { value: 'power-desc', label: 'Leistung ↓' },
];

function parsePrice(p: string) { return parseInt(p.replace(/\./g, ''), 10); }
function parseKm(k: string) { return parseInt(k.replace(/[^\d]/g, ''), 10); }
function parsePower(p: string) { return parseInt(p, 10); }

interface Filters {
  brand: string;
  fuel: string;
  gearbox: string;
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  kmMax: number;
  search: string;
}

const DEFAULT_FILTERS: Filters = {
  brand: 'Alle Marken',
  fuel: 'Alle',
  gearbox: 'Alle',
  priceMin: 0,
  priceMax: 150000,
  yearMin: 2018,
  yearMax: 2024,
  kmMax: 150000,
  search: '',
};

function RangeSlider({ label, min, max, valueMin, valueMax, step = 1000, format, onChangeMin, onChangeMax }: {
  label: string; min: number; max: number; valueMin: number; valueMax: number;
  step?: number; format: (v: number) => string;
  onChangeMin: (v: number) => void; onChangeMax: (v: number) => void;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: '#8A9AB8' }}>{label.toUpperCase()}</span>
        <span style={{ fontSize: 12, color: '#149BFF', fontWeight: 600 }}>{format(valueMin)} – {format(valueMax)}</span>
      </div>
      <div style={{ position: 'relative', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, margin: '12px 0' }}>
        <div style={{
          position: 'absolute', height: '100%', background: '#149BFF', borderRadius: 2,
          left: `${((valueMin - min) / (max - min)) * 100}%`,
          right: `${100 - ((valueMax - min) / (max - min)) * 100}%`,
        }} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="range" min={min} max={max} step={step} value={valueMin}
          onChange={e => { const v = +e.target.value; if (v <= valueMax) onChangeMin(v); }}
          style={{ flex: 1, accentColor: '#149BFF', cursor: 'pointer' }} />
        <input type="range" min={min} max={max} step={step} value={valueMax}
          onChange={e => { const v = +e.target.value; if (v >= valueMin) onChangeMax(v); }}
          style={{ flex: 1, accentColor: '#149BFF', cursor: 'pointer' }} />
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 20, marginBottom: 20 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 14px', color: '#F0F4FF' }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em' }}>{title.toUpperCase()}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#8A9AB8' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && children}
    </div>
  );
}

function ChipSelect({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)}
          style={{
            padding: '6px 12px', fontSize: 12, fontWeight: 600, borderRadius: 3, cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
            background: value === o ? '#149BFF' : 'transparent',
            borderColor: value === o ? '#149BFF' : 'rgba(255,255,255,0.12)',
            color: value === o ? '#fff' : '#8A9AB8',
          }}>{o}</button>
      ))}
    </div>
  );
}

export default function VehiclesPage({ onSelectCar, initialFilter }: { onSelectCar: (car: Car) => void; initialFilter?: string }) {
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS, fuel: initialFilter || 'Alle' });
  const [sort, setSort] = useState('price-asc');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const set = <K extends keyof Filters>(key: K, val: Filters[K]) =>
    setFilters(f => ({ ...f, [key]: val }));

  const activeFilterCount = [
    filters.brand !== 'Alle Marken',
    filters.fuel !== 'Alle',
    filters.gearbox !== 'Alle',
    filters.priceMin > 0,
    filters.priceMax < 150000,
    filters.yearMin > 2018,
    filters.yearMax < 2024,
    filters.kmMax < 150000,
    filters.search !== '',
  ].filter(Boolean).length;

  const results = useMemo(() => {
    let list = CARS.filter(c => {
      if (filters.brand !== 'Alle Marken' && c.brand !== filters.brand) return false;
      if (filters.fuel !== 'Alle' && !c.fuel.toLowerCase().includes(filters.fuel.toLowerCase())) return false;
      if (filters.gearbox !== 'Alle' && !c.gearbox.toLowerCase().includes(filters.gearbox.toLowerCase())) return false;
      const price = parsePrice(c.price);
      if (price < filters.priceMin || price > filters.priceMax) return false;
      if (c.year < filters.yearMin || c.year > filters.yearMax) return false;
      if (parseKm(c.km) > filters.kmMax) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!`${c.brand} ${c.model} ${c.fuel} ${c.color}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      if (sort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
      if (sort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
      if (sort === 'km-asc') return parseKm(a.km) - parseKm(b.km);
      if (sort === 'year-desc') return b.year - a.year;
      if (sort === 'power-desc') return parsePower(b.power) - parsePower(a.power);
      return 0;
    });
    return list;
  }, [filters, sort]);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const Sidebar = () => (
    <div style={{ width: '100%' }}>
      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A9AB8" strokeWidth="2"
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Marke, Modell, Farbe …" value={filters.search}
          onChange={e => set('search', e.target.value)}
          style={{ width: '100%', background: '#080C12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '10px 12px 10px 36px', color: '#F0F4FF', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
          onFocus={e => (e.currentTarget.style.borderColor = '#149BFF')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
      </div>

      <FilterSection title="Marke">
        <ChipSelect options={BRANDS} value={filters.brand} onChange={v => set('brand', v)} />
      </FilterSection>

      <FilterSection title="Kraftstoff">
        <ChipSelect options={FUELS} value={filters.fuel} onChange={v => set('fuel', v)} />
      </FilterSection>

      <FilterSection title="Getriebe">
        <ChipSelect options={GEARBOXES} value={filters.gearbox} onChange={v => set('gearbox', v)} />
      </FilterSection>

      <FilterSection title="Preis">
        <RangeSlider label="" min={0} max={150000} step={2500}
          valueMin={filters.priceMin} valueMax={filters.priceMax}
          format={v => `${(v / 1000).toFixed(0)}k €`}
          onChangeMin={v => set('priceMin', v)} onChangeMax={v => set('priceMax', v)} />
      </FilterSection>

      <FilterSection title="Baujahr">
        <RangeSlider label="" min={2018} max={2024} step={1}
          valueMin={filters.yearMin} valueMax={filters.yearMax}
          format={v => String(v)}
          onChangeMin={v => set('yearMin', v)} onChangeMax={v => set('yearMax', v)} />
      </FilterSection>

      <FilterSection title="Kilometerstand">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: '#8A9AB8' }}>MAX. KM</span>
          <span style={{ fontSize: 12, color: '#149BFF', fontWeight: 600 }}>bis {(filters.kmMax / 1000).toFixed(0)}k km</span>
        </div>
        <input type="range" min={5000} max={150000} step={5000} value={filters.kmMax}
          onChange={e => set('kmMax', +e.target.value)}
          style={{ width: '100%', accentColor: '#149BFF', cursor: 'pointer' }} />
      </FilterSection>

      {activeFilterCount > 0 && (
        <button onClick={resetFilters}
          style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,100,100,0.3)', color: '#FF6B6B', padding: '10px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.2s', marginTop: 8 }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,100,100,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          FILTER ZURÜCKSETZEN ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#080C12', color: '#F0F4FF', fontFamily: "'Inter', sans-serif" }}>

      {/* Page header */}
      <div style={{ background: '#0A0F18', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '40px 24px 36px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#149BFF', marginBottom: 10 }}>UNSER BESTAND</p>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, margin: '0 0 10px', lineHeight: 1.1 }}>
            FAHRZEUGE
          </h1>
          <p style={{ fontSize: 15, color: '#8A9AB8', margin: 0 }}>
            {results.length} von {CARS.length} Fahrzeugen gefunden
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 32, paddingTop: 32, paddingBottom: 80, alignItems: 'flex-start' }}>

          {/* Desktop Sidebar */}
          <aside className="vehicles-sidebar" style={{ width: 260, flexShrink: 0, position: 'sticky', top: 88, background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 800, letterSpacing: '0.06em' }}>FILTER</span>
              {activeFilterCount > 0 && (
                <span style={{ background: '#149BFF', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>{activeFilterCount}</span>
              )}
            </div>
            <Sidebar />
          </aside>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              {/* Mobile filter toggle */}
              <button onClick={() => setSidebarOpen(true)}
                className="mobile-filter-btn"
                style={{ display: 'none', alignItems: 'center', gap: 8, background: '#0F1520', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '9px 16px', color: '#F0F4FF', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
                Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </button>

              <span style={{ fontSize: 14, color: '#8A9AB8' }}>
                <strong style={{ color: '#F0F4FF' }}>{results.length}</strong> Fahrzeuge
              </span>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {/* Sort */}
                <select value={sort} onChange={e => setSort(e.target.value)}
                  style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '8px 12px', color: '#F0F4FF', fontSize: 13, outline: 'none', cursor: 'pointer' }}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>

                {/* View toggle */}
                <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, overflow: 'hidden' }}>
                  {(['grid', 'list'] as const).map(v => (
                    <button key={v} onClick={() => setView(v)}
                      style={{ padding: '8px 12px', background: view === v ? '#149BFF' : 'transparent', border: 'none', cursor: 'pointer', color: view === v ? '#fff' : '#8A9AB8', transition: 'all 0.15s', display: 'flex', alignItems: 'center' }}>
                      {v === 'grid'
                        ? <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                      }
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {filters.brand !== 'Alle Marken' && (
                  <ActiveChip label={filters.brand} onRemove={() => set('brand', 'Alle Marken')} />
                )}
                {filters.fuel !== 'Alle' && (
                  <ActiveChip label={filters.fuel} onRemove={() => set('fuel', 'Alle')} />
                )}
                {filters.gearbox !== 'Alle' && (
                  <ActiveChip label={filters.gearbox} onRemove={() => set('gearbox', 'Alle')} />
                )}
                {(filters.priceMin > 0 || filters.priceMax < 150000) && (
                  <ActiveChip label={`${(filters.priceMin/1000).toFixed(0)}k–${(filters.priceMax/1000).toFixed(0)}k €`} onRemove={() => { set('priceMin', 0); set('priceMax', 150000); }} />
                )}
                {filters.kmMax < 150000 && (
                  <ActiveChip label={`bis ${(filters.kmMax/1000).toFixed(0)}k km`} onRemove={() => set('kmMax', 150000)} />
                )}
                {filters.search && (
                  <ActiveChip label={`"${filters.search}"`} onRemove={() => set('search', '')} />
                )}
              </div>
            )}

            {/* No results */}
            {results.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 24px', background: '#0F1520', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Keine Fahrzeuge gefunden</h3>
                <p style={{ color: '#8A9AB8', marginBottom: 24 }}>Versuchen Sie, die Filterkriterien zu erweitern.</p>
                <button onClick={resetFilters}
                  style={{ background: '#149BFF', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  Filter zurücksetzen
                </button>
              </div>
            )}

            {/* Grid view */}
            {view === 'grid' && results.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {results.map(car => (
                  <CarCard key={car.id} car={car} onClick={() => onSelectCar(car)} />
                ))}
              </div>
            )}

            {/* List view */}
            {view === 'list' && results.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {results.map(car => (
                  <CarListItem key={car.id} car={car} onClick={() => onSelectCar(car)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 300, background: '#0F1520', zIndex: 101, overflowY: 'auto', padding: '24px 20px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800 }}>FILTER</span>
              <button onClick={() => setSidebarOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A9AB8', padding: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <Sidebar />
            <button onClick={() => setSidebarOpen(false)}
              style={{ width: '100%', background: '#149BFF', color: '#fff', border: 'none', padding: '13px', borderRadius: 4, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 16, fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.06em' }}>
              {results.length} FAHRZEUGE ANZEIGEN
            </button>
          </div>
        </>
      )}

      <style>{`
        input[type=range] { height: 4px; }
        select option { background: #0F1520; }
        @media (max-width: 900px) {
          .vehicles-sidebar { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          #vehicles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(20,155,255,0.12)', border: '1px solid rgba(20,155,255,0.25)', borderRadius: 20, padding: '4px 10px 4px 12px', fontSize: 12, color: '#149BFF', fontWeight: 600 }}>
      {label}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#149BFF', padding: 0, display: 'flex', alignItems: 'center', opacity: 0.7, marginLeft: 2 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
  );
}

function CarCard({ car, onClick }: { car: Car; onClick: () => void }) {
  return (
    <div onClick={onClick}
      style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(20,155,255,0.3)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
    >
      <div style={{ position: 'relative', height: 195, overflow: 'hidden', background: '#161D2A' }}>
        <img src={car.img} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
        {car.tag && <span style={{ position: 'absolute', top: 12, left: 12, background: '#149BFF', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 9px', borderRadius: 2 }}>{car.tag.toUpperCase()}</span>}
        <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(8,12,18,0.85)', color: '#8A9AB8', fontSize: 11, padding: '3px 9px', borderRadius: 2 }}>{car.year}</span>
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#149BFF', marginBottom: 4 }}>{car.brand.toUpperCase()}</div>
        <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 800, margin: '0 0 10px', lineHeight: 1.2 }}>{car.model}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
          {[car.km, car.fuel, car.power].map((s, i) => (
            <span key={i} style={{ fontSize: 12, color: '#8A9AB8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#149BFF', display: 'inline-block' }} />{s}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: '#8A9AB8', marginBottom: 2 }}>KAUFPREIS</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 900 }}>€ {car.price}</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#149BFF', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
            DETAILS <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function CarListItem({ car, onClick }: { car: Car; onClick: () => void }) {
  return (
    <div onClick={onClick}
      style={{ background: '#0F1520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', display: 'flex', transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(20,155,255,0.3)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      <div style={{ width: 220, flexShrink: 0, overflow: 'hidden', background: '#161D2A', position: 'relative' }}>
        <img src={car.img} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
        {car.tag && <span style={{ position: 'absolute', top: 10, left: 10, background: '#149BFF', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 8px', borderRadius: 2 }}>{car.tag.toUpperCase()}</span>}
      </div>
      <div style={{ flex: 1, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, minWidth: 0 }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#149BFF', marginBottom: 4 }}>{car.brand.toUpperCase()} · {car.year}</div>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 800, margin: '0 0 12px' }}>{car.model}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {[
              { label: 'Kilometer', val: car.km },
              { label: 'Kraftstoff', val: car.fuel },
              { label: 'Leistung', val: car.power },
              { label: 'Getriebe', val: car.gearbox },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, color: '#8A9AB8', letterSpacing: '0.06em', marginBottom: 2 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F4FF' }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: '#8A9AB8', marginBottom: 4 }}>KAUFPREIS</div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 26, fontWeight: 900, color: '#F0F4FF', marginBottom: 14 }}>€ {car.price}</div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#149BFF', letterSpacing: '0.06em' }}>
            DETAILS <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
