import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X } from 'lucide-react';
import { site } from '../config/site';

export function QRCode() {
  const [open, setOpen] = useState(false);
  if (!site.publicUrl) return null;
  return <div className="qr-control"><button className="utility-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="card-qr"><QrCode size={18} /><span>Código QR</span></button>{open && <div className="qr-panel" id="card-qr"><button className="qr-close" onClick={() => setOpen(false)} aria-label="Cerrar código QR"><X size={18} /></button><QRCodeSVG value={site.publicUrl} size={164} level="M" marginSize={3} title={`Tarjeta digital de ${site.name}`} /><p>Escanea y conectemos</p></div>}</div>;
}
