import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
export default [
  ...nextVitals,
  ...nextTypescript,
  { settings: { next: { rootDir: 'apps/marketing-site' } } },
  { ignores: ['**/.next/**', '**/fixtures/**', '**/next-env.d.ts'] },
];
