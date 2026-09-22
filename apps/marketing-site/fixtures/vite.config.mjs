import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { createRequire } from 'node:module';
const appTailwind = createRequire(import.meta.url)(
  '../../frontend/tailwind.config.cjs'
);

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../../..');
// This fixture imports the real calendar. Only app services and modal entry points
// are replaced so capturing fictional data cannot contact a backend or publish.
export default defineConfig({
  root: directory,
  publicDir: path.join(root, 'apps/frontend/public'),
  plugins: [
    react(),
    {
      name: 'isolated-calendar-services',
      enforce: 'pre',
      resolveId(id) {
        if (id === '@gitroom/frontend/components/launches/calendar')
          return path.join(
            root,
            'apps/frontend/src/components/launches/calendar.tsx'
          );
        if (id === '@gitroom/frontend/components/layout/set.timezone')
          return path.join(
            root,
            'apps/frontend/src/components/layout/set.timezone.tsx'
          );
        if (id.includes('calendar.context'))
          return path.join(directory, 'services.jsx');
        if (id === '@prisma/client')
          return path.join(directory, 'services.jsx');
        if (
          id.startsWith('@gitroom/') &&
          !id.endsWith('/launches/calendar') &&
          !id.endsWith('/layout/set.timezone')
        )
          return path.join(directory, 'services.jsx');
      },
    },
  ],
  css: {
    postcss: {
      plugins: [
        tailwind({
          ...appTailwind,
          content: [
            path.join(
              root,
              'apps/frontend/src/components/launches/calendar.tsx'
            ),
            path.join(directory, '*.jsx'),
          ],
        }),
        autoprefixer(),
      ],
    },
  },
  server: {
    host: '127.0.0.1',
    port: 4301,
    strictPort: true,
    fs: { allow: [root] },
  },
});
