import { useState } from 'react';
import { site } from '../config/site';

export function Brand() {
  const [failed, setFailed] = useState(false);
  return <div className="logo-slot">
    {site.logo && !failed
      ? <img className="brand-image" src={site.logo} alt={site.brand} width="120" height="120" decoding="async" fetchPriority="high" onError={() => setFailed(true)} />
      : <span className="logo-placeholder" role="img" aria-label="Espacio para el logotipo oficial de JaaDs Global">Logotipo</span>}
  </div>;
}
