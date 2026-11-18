import type { CSSProperties } from 'react';
import { siLinkedin, siInstagram, siFacebook, siX, siTiktok, siYoutube } from 'simple-icons';
import { site } from '../config/site';

const icons = { 'linkedin-company': siLinkedin, instagram: siInstagram, facebook: siFacebook, x: siX, tiktok: siTiktok, youtube: siYoutube };

export function SocialLinks() {
  return <section className="social-section" aria-label="Conectemos en redes sociales"><div className="social-scroll"><div className="social-links">
    {site.socials.map(social => {
      const icon = icons[social.id];
      const color = social.id === 'x' || social.id === 'tiktok' ? '#FFFFFF' : `#${icon.hex}`;
      const style = { '--social-color': color } as CSSProperties;
      const graphic = <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={icon.path} /></svg>;
      return <span className="social-item" key={social.id} style={style}>
        {social.url ? <a className="social-icon" href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (nueva pestaña)`} title={social.label}>{graphic}</a>
        : <button className="social-icon" type="button" aria-disabled="true" aria-label={`${social.label}: perfil pendiente de configurar`} title={social.label}>{graphic}</button>}
        <span className="social-tooltip" aria-hidden="true">{social.label}</span>
      </span>;
    })}
  </div></div></section>;
}
