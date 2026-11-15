import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../config/site';
import { Brand } from './Brand';

export function ProfileHeader() {
  const reducedMotion = useReducedMotion();
  return <header className="profile" aria-labelledby="profile-name">
    <motion.div className="profile-content" initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Brand />
      <h1 id="profile-name">{site.brand}</h1>
      <p className="profile-description">{site.description}</p>
    </motion.div>
  </header>;
}
