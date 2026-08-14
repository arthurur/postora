'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useTranslationSettings } from '@gitroom/react/translation/get.transation.service.client';
import { defaultDocumentLanguage } from '@gitroom/react/translation/i18n.config';

export const HtmlComponent: FC = () => {
  const settings = useTranslationSettings();
  const [dir, setDir] = useState(settings.dir());

  useEffect(() => {
    settings.on('languageChanged', (lng) => {
      setDir(settings.dir());
    });
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.setAttribute('dir', dir);
      htmlElement.setAttribute(
        'lang',
        settings.resolvedLanguage === 'pt'
          ? defaultDocumentLanguage
          : settings.resolvedLanguage || defaultDocumentLanguage
      );
    }
  }, [dir, settings]);

  return null;
};
