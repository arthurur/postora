'use client';

import { defaultLng } from '@gitroom/react/translation/i18n.config';
import i18next from 'i18next';
import { FC, useEffect } from 'react';

export const ChangeDir: FC = () => {
  const language = i18next.resolvedLanguage || defaultLng;

  useEffect(() => {
    const rtlLanguages = ['he', 'ar'];
    const dir = rtlLanguages.includes(language) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }, []);

  return null;
};
