// Añade únicamente datos reales. Las URLs vacías nunca generan enlaces activos.
// VITE_* configura enlaces públicos del navegador; no debe contener secretos.
export const BOOKING_URL = import.meta.env?.VITE_BOOKING_URL?.trim() || '';
export const WHATSAPP_NUMBER = import.meta.env?.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') || '';
export const CONTACT_EMAIL = import.meta.env?.VITE_CONTACT_EMAIL?.trim() || '';

export const site = {
  brand: 'JaaDs Global',
  name: 'Juan Guillermo Márquez Pérez',
  firstName: 'Juan Guillermo',
  lastName: 'Márquez Pérez',
  role: 'Fundador y CEO',
  description: 'Impulsamos el crecimiento empresarial con inteligencia artificial, automatización y estrategias digitales diseñadas para generar resultados.',
  logo: '/brand/logo-jaads-256.webp', // Copia optimizada; original intacto en public/brand/.
  favicon: '/brand/favicon-64.png',
  socialImage: '', // URL absoluta de la imagen para compartir, cuando esté disponible.
  website: 'https://jaadsglobal.com',
  publicUrl: 'https://card-jaads.vercel.app/', // Dominio definitivo de la tarjeta; activa QR y canonical.
  bookingUrl: BOOKING_URL,
  whatsappNumber: WHATSAPP_NUMBER,
  phone: '', // Teléfono para la vCard, con prefijo internacional.
  email: CONTACT_EMAIL,
  whatsappMessage: 'Hola Guillermo, he visto tu tarjeta digital y me gustaría conocer más sobre los servicios de JaaDs Global.',
  socials: [
    { id: 'linkedin-company', label: 'LinkedIn de JaaDs Global', url: import.meta.env?.VITE_LINKEDIN_COMPANY_URL?.trim() || '' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/jaadsglobal/' },
    { id: 'facebook', label: 'Facebook', url: import.meta.env?.VITE_FACEBOOK_URL?.trim() || '' },
  ],
  services: [
    { icon: 'brain', name: 'Inteligencia Artificial', description: 'Agentes inteligentes que atienden consultas, cualifican clientes y automatizan conversaciones.', detail: 'Desarrollamos agentes inteligentes que permiten automatizar conversaciones, atender consultas, cualificar oportunidades comerciales y mejorar la experiencia del cliente.', benefits: ['Atención automatizada.', 'Respuestas rápidas.', 'Cualificación de clientes potenciales.', 'Disponibilidad fuera del horario comercial.', 'Integración con procesos empresariales.'] },
    { icon: 'workflow', name: 'Automatización Empresarial', description: 'Conectamos herramientas y automatizamos procesos para ahorrar tiempo y mejorar la productividad.', detail: 'Diseñamos sistemas que conectan herramientas, eliminan tareas repetitivas y optimizan los procesos internos de las empresas.', benefits: ['Reducción de tareas manuales.', 'Automatización de procesos.', 'Integración entre aplicaciones.', 'Mejor organización operativa.', 'Mayor eficiencia.'] },
    { icon: 'crm', name: 'CRM y Gestión Comercial', description: 'Organizamos tus contactos, oportunidades y procesos comerciales en un único sistema.', detail: 'Implementamos soluciones CRM para centralizar contactos, gestionar oportunidades y mejorar el seguimiento de los procesos comerciales.', benefits: ['Centralización de contactos.', 'Seguimiento de oportunidades.', 'Automatización comercial.', 'Organización del proceso de ventas.', 'Mayor control de la actividad comercial.'] },
    { icon: 'marketing', name: 'Marketing Digital', description: 'Estrategias de publicidad y captación para conectar tu empresa con nuevos clientes.', detail: 'Desarrollamos estrategias de captación mediante publicidad digital y acciones orientadas a conectar empresas con sus clientes potenciales.', benefits: ['Google Ads.', 'Meta Ads.', 'Campañas de captación.', 'Optimización de conversiones.', 'Análisis de resultados.'] },
    { icon: 'web', name: 'Desarrollo Web', description: 'Webs y landing pages profesionales diseñadas para transmitir confianza y generar oportunidades.', detail: 'Creamos páginas web y landing pages profesionales, rápidas y adaptadas a dispositivos móviles, enfocadas en transmitir confianza y generar oportunidades comerciales.', benefits: ['Diseño profesional.', 'Experiencia responsive.', 'Optimización de rendimiento.', 'Integración con herramientas comerciales.', 'Enfoque en conversión.'] },
    { icon: 'seo', name: 'SEO y Posicionamiento', description: 'Mejoramos la visibilidad de tu empresa en Google y otros buscadores.', detail: 'Trabajamos la visibilidad digital de las empresas mediante estrategias de posicionamiento orgánico y optimización de su presencia en buscadores.', benefits: ['SEO técnico.', 'SEO local.', 'Optimización de contenidos.', 'Mejora de la estructura web.', 'Análisis de visibilidad.'] },
  ],
} as const;
