/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'node:url';

export default {
  output: 'standalone',
  outputFileTracingRoot: fileURLToPath(new URL('../..', import.meta.url)),
  async redirects() {
    return ['/docs', '/docs/mcp'].map((source) => ({
      source,
      destination: '/docs/mcp/introducao',
      permanent: true,
    }));
  },
};
