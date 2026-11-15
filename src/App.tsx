import { ProfileHeader } from './components/ProfileHeader';
import { BookingButton } from './components/BookingButton';
import { ContactLinks, EmailLink } from './components/ContactLinks';
import { SocialLinks } from './components/SocialLinks';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteMetadata } from './components/RouteMetadata';
import { site } from './config/site';
import { Footer } from './components/Footer';
import { ConnectionBackground } from './components/ConnectionBackground';

function CardPage() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <ConnectionBackground />
    <div className="page-shell"><main id="contenido" tabIndex={-1}>
      <ProfileHeader />
      <SocialLinks />
      <section className="primary-actions" aria-label="Reservas y contacto">
        <BookingButton />
        <ContactLinks />
      </section>
      {site.email && <section className="card-tools" aria-label="Conectar"><EmailLink /></section>}
    </main><Footer /></div>
  </>;
}

export default function App() {
  return <><RouteMetadata /><Routes>
    <Route path="/" element={<CardPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></>;
}
