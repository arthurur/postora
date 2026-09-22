import type { MetadataRoute } from 'next';
import { publicPaths, siteUrl } from '../content/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({ url: `${siteUrl}${path}` }));
}
