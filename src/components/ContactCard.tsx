import { Download } from 'lucide-react';
import { site } from '../config/site';
import { createVCard } from '../lib/contact';
import { ActionButton } from './ActionButton';

export function ContactCard() {
  function saveContact() {
    const blob = new Blob([createVCard({ ...site, phone: site.phone || site.whatsappNumber })], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'Juan-Guillermo-Marquez-Perez.vcf';
    document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <ActionButton label="Guardar mi contacto" icon={<Download size={20} strokeWidth={1.6} />} onClick={saveContact} />;
}
