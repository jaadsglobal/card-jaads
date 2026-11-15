import { useState } from 'react';
import { site } from '../config/site';

const assets = import.meta.glob('/public/**/*.{png,jpg,jpeg,svg,webp}', { eager: true, query: '?url', import: 'default' });

export function Brand() {
  const [failed, setFailed] = useState(false);
  const exists = site.logo.startsWith('https://') || `/public${site.logo}` in assets;
  return <div className="logo-slot">
    {site.logo && exists && !failed
      ? <img className="brand-image" src={site.logo} alt={site.brand} onError={() => setFailed(true)} />
      : <span className="logo-placeholder" role="img" aria-label="Espacio para el logotipo oficial de JaaDs Global">Logotipo</span>}
  </div>;
}
