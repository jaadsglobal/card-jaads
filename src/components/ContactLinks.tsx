import { Mail } from 'lucide-react';
import { siWhatsapp } from 'simple-icons';
import { site } from '../config/site';
import { whatsappUrl } from '../lib/contact';
import { ActionButton } from './ActionButton';

export function ContactLinks() {
  return <>
    <ActionButton label="Contactar por WhatsApp" icon={<svg width="22" height="22" viewBox="0 0 24 24" fill={`#${siWhatsapp.hex}`} aria-hidden="true"><path d={siWhatsapp.path} /></svg>} href={whatsappUrl(site.whatsappNumber, site.whatsappMessage)} />
    <ActionButton label="Página web" icon={<img className="action-brand-logo" src={site.logo} width="26" height="26" alt="" aria-hidden="true" />} href={site.website} />
  </>;
}

export function EmailLink() {
  if (!site.email) return null;
  return <a className="utility-button" href={`mailto:${site.email}`}><Mail size={17} /><span>Correo electrónico</span></a>;
}
