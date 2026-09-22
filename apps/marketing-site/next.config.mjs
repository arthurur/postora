/** @type {import('next').NextConfig} */
export default {
  async redirects() {
    return ['/docs', '/docs/mcp'].map((source) => ({
      source,
      destination: '/docs/mcp/introducao',
      permanent: true,
    }));
  },
};
