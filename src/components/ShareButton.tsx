import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';
import { site } from '../config/site';

export function ShareButton() {
  const [status, setStatus] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  async function share() {
    const url = site.publicUrl || window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${site.name} | ${site.brand}`, text: 'Conectemos. Tecnología para impulsar tu negocio.', url });
        return;
      }
    } catch (error) { if (error instanceof Error && error.name === 'AbortError') return; }
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Enlace copiado');
      window.setTimeout(() => setStatus(''), 3500);
    } catch { setManualUrl(url); setStatus('Copia el enlace para compartir'); }
  }
  return <div className="share-control"><button className="utility-button" onClick={share} aria-label="Compartir tarjeta">{status === 'Enlace copiado' ? <Check size={17} /> : <Share2 size={17} />}<span>Compartir</span></button><span className="share-status" role="status">{status}</span>{manualUrl && <div className="manual-share"><label htmlFor="share-url">Enlace de la tarjeta</label><input id="share-url" readOnly value={manualUrl} onFocus={event => event.target.select()} /><button onClick={() => { setManualUrl(''); setStatus(''); }}>Cerrar</button></div>}</div>;
}
