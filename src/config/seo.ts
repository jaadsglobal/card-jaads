export const seo = {
  card: {
    title: 'JaaDs Global | Inteligencia Artificial y Automatización',
    description: 'Impulsamos el crecimiento empresarial con inteligencia artificial, automatización y estrategias digitales diseñadas para generar resultados.',
  },
  services: {
    title: 'Servicios de Inteligencia Artificial y Automatización | JaaDs Global',
    description: 'Descubre los servicios de JaaDs Global: inteligencia artificial, automatización empresarial, CRM, marketing digital, desarrollo web y posicionamiento SEO.',
  },
};

export function canonicalUrl(publicUrl: string, path: string) {
  return publicUrl ? new URL(path, publicUrl).href : '';
}
