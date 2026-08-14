'use client';
import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const { sentryDsn } = useVariables();
  const t = useT();

  useEffect(() => {
    if (!sentryDsn) {
      return;
    }
    const eventId = Sentry.captureException(error);
    Sentry.showReportDialog({
      eventId,
      title: t('something_broke', 'Something broke!'),
      subtitle: t(
        'help_us_fix_issue_details',
        'Please help us fix the issue by providing some details.'
      ),
      labelComments: t('what_happened', 'What happened?'),
      labelName: t('your_name', 'Your name'),
      labelEmail: t('your_email', 'Your email'),
      labelSubmit: t('send_report', 'Send Report'),
      lang: 'pt-BR',
    });
  }, [error]);
  return (
    <html lang="pt-BR">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
