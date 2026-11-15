import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = { label: string; icon: ReactNode; href?: string; onClick?: () => void; accent?: boolean; external?: boolean };

export function ActionButton({ label, icon, href, onClick, accent = false, external = true }: Props) {
  const className = `action-button${accent ? ' action-button-accent' : ''}`;
  const content = <><span className="action-icon">{icon}</span><span className="action-label">{label}</span><ArrowUpRight className="action-arrow" size={17} strokeWidth={1.6} /></>;
  return href
    ? external ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{content}</a> : <Link className={className} to={href}>{content}</Link>
    : <button className={className} type="button" onClick={onClick} disabled={!onClick} title={!onClick ? `${label}: enlace pendiente de configurar` : undefined}>{content}</button>;
}
