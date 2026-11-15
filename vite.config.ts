import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site';

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'site-metadata',
    enforce: 'post',
    transformIndexHtml() {
      return [
        { tag: 'link', attrs: { rel: 'icon', href: site.favicon }, injectTo: 'head' as const },
        ...(site.publicUrl ? [
          { tag: 'link', attrs: { rel: 'canonical', href: site.publicUrl }, injectTo: 'head' as const },
          { tag: 'meta', attrs: { property: 'og:url', content: site.publicUrl }, injectTo: 'head' as const },
        ] : []),
        ...(site.socialImage ? [
          { tag: 'meta', attrs: { property: 'og:image', content: site.socialImage }, injectTo: 'head' as const },
          { tag: 'meta', attrs: { name: 'twitter:image', content: site.socialImage }, injectTo: 'head' as const },
        ] : []),
      ];
    },
  }],
});
