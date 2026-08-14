'use client';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chatbase: any;
  }
}

import { FC, useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { deleteDialog } from '@gitroom/react/helpers/delete.dialog';
import useSWR from 'swr';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

export const ChatbaseComponent: FC = () => {
  const { isChatBase } = useVariables();
  if (!isChatBase) {
    return null;
  }
  return <ChatbaseComponentLoad />;
};
export const ChatbaseComponentLoad: FC = () => {
  const fetch = useFetch();

  const { data } = useSWR(
    'chatbase-token',
    async () => {
      const { token } = await (await fetch('/user/chatbase-token')).json();

      return token;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      refreshInterval: 0,
    }
  );

  if (!data) {
    return null;
  }

  return <ChatBaseCode token={data} />;
};

const ChatBaseCode: FC<{ token: string }> = ({ token }) => {
  const fetch = useFetch();
  const t = useT();

  useEffect(() => {
    if (!window.chatbase || window.chatbase('getState') !== 'initialized') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.chatbase = (...arg) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(arg);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === 'q') {
            return target.q;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return (...args) => target(prop, ...args);
        },
      });
    }
    const onLoad = function () {
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = '1zVZuOz0vgFE_NLumfPPj';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      script.domain = 'www.chatbase.co';
      document.body.appendChild(script);
    };
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    window.chatbase('identify', { token });

    window.chatbase('registerTools', {
      stripe_refund: async () => {
        try {
          const previewResponse = await fetch(
            '/billing/chatbase-refund/preview'
          );

          if (!previewResponse.ok) {
            return {
              status: 'error',
              error: t(
                'could_not_process_refund',
                'Could not process the refund request'
              ),
            };
          }

          const preview = await previewResponse.json();

          if (!preview.eligible) {
            return {
              status: 'success',
              data: { refunded: false, reason: preview.reason },
            };
          }

          const approved = await deleteDialog(
            t(
              'confirm_cancel_with_refund',
              'You are cancelling your {{tier}} subscription and will receive a refund of {{amount}} {{currency}}. Do you approve?',
              {
                tier: preview.tier || '',
                amount: preview.amount,
                currency: (preview.currency || '').toUpperCase(),
              }
            ),
            t('yes_cancel_and_refund', 'Yes, cancel and refund'),
            t('cancel_subscription', 'Cancel subscription')
          );

          if (!approved) {
            return {
              status: 'success',
              data: {
                refunded: false,
                reason: t(
                  'user_declined_refund_confirmation',
                  'The user declined the refund confirmation'
                ),
              },
            };
          }

          const response = await fetch('/billing/chatbase-refund', {
            method: 'POST',
          });

          if (!response.ok) {
            return {
              status: 'error',
              error: t(
                'could_not_process_refund',
                'Could not process the refund request'
              ),
            };
          }

          return {
            status: 'success',
            data: await response.json(),
          };
        } catch (err) {
          return {
            status: 'error',
            error: t(
              'could_not_process_refund',
              'Could not process the refund request'
            ),
          };
        }
      },
    });
  }, []);
  return null;
};
