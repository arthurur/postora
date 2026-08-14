'use client';

import { FC } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const RenderPreviewDate: FC<{ date: string }> = ({ date }) => {
  return (
    <>
      {dayjs.utc(date).local().toDate().toLocaleString('pt-BR', {
        dateStyle: 'long',
        timeStyle: 'short',
      })}
    </>
  );
};
