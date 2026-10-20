import i18next from './i18next';
import { defaultLng } from './i18n.config';
export async function getT(ns?: string, options?: any) {
  // i18next loads resources after init returns; without this the first
  // render after a cold start gets the English default values.
  if (!i18next.isInitialized) {
    await new Promise((resolve) => i18next.on('initialized', resolve));
  }
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }
  return i18next.getFixedT(
    i18next.resolvedLanguage || defaultLng,
    Array.isArray(ns) ? ns[0] : ns,
    options?.keyPrefix
  );
}
