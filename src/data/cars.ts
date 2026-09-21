export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  km: string;
  fuel: string;
  power: string;
  gearbox: string;
  doors: number;
  color: string;
  price: string;
  tag: string | null;
  img: string;
  imgs: string[];
  desc: string;
  features: string[];
  mfk: string;
  warranty: string;
  vin: string;
}

export const CARS: Car[] = [
  {
    id: 1, brand: 'BMW', model: '5er Touring', year: 2023, km: '18.400 km', fuel: 'Diesel', power: '286 PS',
    gearbox: 'Automatik', doors: 5, color: 'Alpinweiß', price: '54.900', tag: 'Neu eingetroffen',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der BMW 5er Touring in der Ausstattungslinie M Sport — sportlich, elegant und außergewöhnlich praktisch. Mit dem kraftvollen 3,0-Liter-Reihensechszylinder-Diesel und der 8-Gang-Automatik ist er der perfekte Begleiter für lange Strecken und den Alltag.',
    features: ['M Sport Paket', 'Panoramadach', 'Harman Kardon Sound', 'Head-Up Display', 'Sitzheizung vorn/hinten', 'Adaptives Fahrwerk', 'Driving Assistant Pro', 'Live Cockpit Professional', 'Anhängerkupplung', 'Parking Assistant Plus'],
    mfk: '06/2026', warranty: '24 Monate Garantie', vin: 'WBA5T21060G123456',
  },
  {
    id: 2, brand: 'Mercedes-Benz', model: 'GLE 400d', year: 2022, km: '32.100 km', fuel: 'Diesel', power: '330 PS',
    gearbox: 'Automatik 9G', doors: 5, color: 'Obsidianschwarz', price: '72.400', tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Das Mercedes-Benz GLE 400d Coupé verbindet SUV-Komfort mit coupétypischer Eleganz. Die Luftfederung AIRMATIC sorgt für einen schwebenden Fahrkomfort, während 330 PS für dynamische Fahrleistungen garantieren.',
    features: ['AMG Line Exterieur', 'MBUX Infotainment', 'Burmester 3D Sound', 'AIRMATIC Luftfederung', '360°-Kamera', 'Multibeam LED', 'Active Brake Assist', 'Sitzbelüftung', 'Energetisierende Komfortsteuerung', 'Memory-Paket'],
    mfk: '03/2026', warranty: '24 Monate Garantie', vin: 'WDC1673231A456789',
  },
  {
    id: 3, brand: 'Audi', model: 'Q5 Sportback', year: 2023, km: '9.700 km', fuel: 'Hybrid', power: '299 PS',
    gearbox: 'S tronic 7-Gang', doors: 5, color: 'Mythosschwarz', price: '61.800', tag: 'Jungebraucht',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der Audi Q5 Sportback 55 TFSI e quattro ist ein Plug-in-Hybrid der Extraklasse. Mit rein elektrischer Reichweite von bis zu 62 km und quattro-Allradantrieb ist er das ideale Fahrzeug für umweltbewusstes, dynamisches Fahren.',
    features: ['S line Sportpaket', 'Matrix LED', 'Virtual Cockpit Plus', 'B&O Sound System', 'quattro Allrad', 'Massage-Vordersitze', 'Head-Up Display', 'Standheizung', 'Panoramadach', 'Plug-in Hybrid 17,9 kWh'],
    mfk: '09/2026', warranty: '12 Monate Audi Garantie', vin: 'WAUZZZFY0PA012345',
  },
  {
    id: 4, brand: 'Volkswagen', model: 'Tiguan R-Line', year: 2022, km: '41.200 km', fuel: 'Benzin', power: '190 PS',
    gearbox: 'DSG 7-Gang', doors: 5, color: 'Silbergrau', price: '38.500', tag: null,
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der VW Tiguan 2.0 TSI R-Line mit 190 PS und DSG-Getriebe — sportliches Design trifft auf alltägliche Praktikabilität. Mit R-Line Exterieur- und Interieurpaket ist er optisch eine echte Aussage.',
    features: ['R-Line Exterieur & Interieur', 'IQ.LIGHT LED', 'Discover Pro Navigation', 'Keyless Access', 'Area View 360°', 'Ergo Active Sitze', 'Klimaanlage 3-Zonen', 'Active Info Display', 'Anhängerkupplung', 'Winterpaket'],
    mfk: '11/2025', warranty: '12 Monate Garantie', vin: 'WVGZZZ5NZPW123456',
  },
  {
    id: 5, brand: 'Porsche', model: 'Cayenne E-Hybrid', year: 2023, km: '14.900 km', fuel: 'Hybrid', power: '462 PS',
    gearbox: 'Tiptronic S 8-Gang', doors: 5, color: 'Jetblack', price: '98.700', tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der Porsche Cayenne E-Hybrid vereint Sportwagen-Dynamik mit effizienter Hybridtechnologie. 462 PS Systemleistung und elektrisches Fahren mit bis zu 42 km Reichweite — Fahrdynamik ohne Kompromisse.',
    features: ['Sport Design Paket', 'PASM Luftfederung', 'Bose Surround Sound', 'Panoramadach', 'Night Vision Assistent', '21" RS Spyder Design Felgen', 'Porsche InnoDrive', '4D Chassis Control', 'Ventilierte Sportsitze Plus', 'Sportchrono Paket'],
    mfk: '01/2026', warranty: '24 Monate Porsche Approved', vin: 'WP1ZZZ9YZPA012345',
  },
  {
    id: 6, brand: 'Volvo', model: 'XC90 Recharge', year: 2023, km: '7.300 km', fuel: 'Plug-in Hybrid', power: '455 PS',
    gearbox: 'Automatik 8-Gang', doors: 5, color: 'Crystal White', price: '84.900', tag: 'Sondermodell',
    img: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&h=500&fit=crop&auto=format',
    imgs: [
      'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=700&fit=crop&auto=format',
    ],
    desc: 'Der Volvo XC90 Recharge T8 Ultimate in der Sonderausstattung „Dark" — 7 Sitze, skandinavisches Design und 455 PS Systemleistung. Mit rein elektrischer Reichweite von 51 km ideal für Stadt und Autobahn.',
    features: ['Ultimate Dark Ausstattung', 'Bowers & Wilkins Audio', '7-Sitzer Konfiguration', 'Luft-Federung', 'Pilot Assist', '360° Surround View', 'Google-Built-In', 'Kristallschaltknauf', 'Massagesitze', 'Head-Up Display'],
    mfk: '07/2026', warranty: '24 Monate Volvo Garantie', vin: 'YV1LZ82MCQ1123456',
  },
];
