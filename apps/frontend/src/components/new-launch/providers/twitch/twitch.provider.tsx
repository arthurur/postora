'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { TwitchDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/twitch.dto';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { Select } from '@gitroom/react/form/select';
import { useWatch } from 'react-hook-form';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { getLabelTranslationKey } from '@gitroom/react/translation/translated-label';

const messageTypes = [
  {
    label: 'Chat Message',
    value: 'message',
  },
  {
    label: 'Announcement',
    value: 'announcement',
  },
];

const announcementColors = [
  {
    label: 'Primary (Default)',
    value: 'primary',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
  {
    label: 'Purple',
    value: 'purple',
  },
];

const TwitchSettings: FC = () => {
  const t = useT();
  const { register, control } = useSettings();
  const messageType = useWatch({
    control,
    name: 'messageType',
  });

  return (
    <div className="flex flex-col">
      <Select
        label="Message Type"
        {...register('messageType', {
          value: 'message',
        })}
      >
        {messageTypes.map((item) => (
          <option key={item.value} value={item.value}>
            {t(getLabelTranslationKey(item.label), item.label)}
          </option>
        ))}
      </Select>
      {messageType === 'announcement' && (
        <Select
          label="Announcement Color"
          {...register('announcementColor', {
            value: 'primary',
          })}
        >
          {announcementColors.map((item) => (
            <option key={item.value} value={item.value}>
              {t(getLabelTranslationKey(item.label), item.label)}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default withProvider({
  postComment: PostComment.COMMENT,
  comments: 'no-media',
  minimumCharacters: [],
  SettingsComponent: TwitchSettings,
  CustomPreviewComponent: undefined,
  dto: TwitchDto,
  maximumCharacters: 500,
});
