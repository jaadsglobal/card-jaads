import { MotionConfig } from 'framer-motion';
import { ProfileHeader } from './components/ProfileHeader';
import { BookingButton } from './components/BookingButton';
import { ContactLinks, EmailLink } from './components/ContactLinks';
import { SocialLinks } from './components/SocialLinks';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteMetadata } from './components/RouteMetadata';
import { QRCode } from './components/QRCode';
import { Footer } from './components/Footer';

function CardPage() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="page-shell"><main id="contenido">
      <ProfileHeader />
      <SocialLinks />
      <section className="primary-actions" aria-label="Reservas y contacto">
        <BookingButton />
        <ContactLinks />
      </section>
      <section className="card-tools" aria-label="Conectar"><QRCode /><EmailLink /></section>
    </main><Footer /></div>
  </>;
}

export default function App() {
  return <MotionConfig reducedMotion="user"><RouteMetadata /><Routes>
    <Route path="/" element={<CardPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></MotionConfig>;
}
