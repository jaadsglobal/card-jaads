import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../config/site';
import { canonicalUrl, seo } from '../config/seo';

export function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = seo.card;
    document.title = metadata.title;
    for (const [selector, content] of [
      ['meta[name="description"]', metadata.description],
      ['meta[property="og:title"]', metadata.title],
      ['meta[property="og:description"]', metadata.description],
      ['meta[name="twitter:title"]', metadata.title],
      ['meta[name="twitter:description"]', metadata.description],
      ['meta[property="og:type"]', 'website'],
    ]) document.querySelector(selector)?.setAttribute('content', content);
    const url = canonicalUrl(site.publicUrl, '/');
    if (url) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
      canonical.href = url;
      let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
      if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); document.head.append(ogUrl); }
      ogUrl.content = url;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
