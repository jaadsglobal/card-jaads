import { site } from '../config/site';
import { Brand } from './Brand';

export function ProfileHeader() {
  return <header className="profile" aria-labelledby="profile-name">
    <div className="profile-content">
      <Brand />
      <h1 id="profile-name">{site.brand}</h1>
      <h2 className="profile-headline">{site.headline}</h2>
      <p className="profile-description">{site.description}</p>
    </div>
  </header>;
}
