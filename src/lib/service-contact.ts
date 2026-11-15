import { whatsappUrl } from './contact.ts';

type ContactConfig = { whatsappNumber: string; email: string; bookingUrl: string; website: string; brand: string };

export function getServiceContact(serviceName: string, config: ContactConfig) {
  const message = `Hola Guillermo, he visto vuestra tarjeta digital y me gustaría recibir información sobre el servicio de ${serviceName} de ${config.brand}.`;
  const whatsapp = whatsappUrl(config.whatsappNumber, message);
  if (whatsapp) return { href: whatsapp, channel: 'WhatsApp' };
  if (config.email) return { href: `mailto:${config.email}?subject=${encodeURIComponent(`Información sobre ${serviceName}`)}&body=${encodeURIComponent(message)}`, channel: 'Correo electrónico' };
  if (config.bookingUrl) return { href: config.bookingUrl, channel: 'Calendario de reuniones' };
  if (config.website) return { href: config.website, channel: 'Web de JaaDs Global' };
  return { href: '', channel: '' };
}
