import { site } from '../config/site';

export function Footer() {
  return <footer className="footer"><span className="footer-brand">{site.brand}</span><small>© {new Date().getFullYear()} {site.brand}. Todos los derechos reservados.</small></footer>;
}
