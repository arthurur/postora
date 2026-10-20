'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { YoutubeSettingsDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/youtube.settings.dto';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { Input } from '@gitroom/react/form/input';
import { MediumTags } from '@gitroom/frontend/components/new-launch/providers/medium/medium.tags';
import { MediaComponent } from '@gitroom/frontend/components/media/media.component';
import { Select } from '@gitroom/react/form/select';
import { YoutubePreview } from '@gitroom/frontend/components/new-launch/providers/youtube/youtube.preview';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
const type = [
  {
    key: 'youtube_privacy_public',
    label: 'Public',
    value: 'public',
  },
  {
    key: 'youtube_privacy_private',
    label: 'Private',
    value: 'private',
  },
  {
    key: 'youtube_privacy_unlisted',
    label: 'Unlisted',
    value: 'unlisted',
  },
];

const madeForKids = [
  {
    key: 'no',
    label: 'No',
    value: 'no',
  },
  {
    key: 'yes',
    label: 'Yes',
    value: 'yes',
  },
];
const YoutubeSettings: FC = () => {
  const t = useT();
  const { register, control } = useSettings();
  return (
    <div className="flex flex-col">
      <Input
        label={t('label_title', 'Title')}
        {...register('title')}
        maxLength={100}
      />
      <Select
        label={t('label_type', 'Type')}
        {...register('type', {
          value: 'public',
        })}
      >
        {type.map((item) => (
          <option key={item.value} value={item.value}>
            {t(item.key, item.label)}
          </option>
        ))}
      </Select>
      <Select
        label={t('label_made_for_kids', 'Made for kids')}
        {...register('selfDeclaredMadeForKids', {
          value: 'no',
        })}
      >
        {madeForKids.map((item) => (
          <option key={item.value} value={item.value}>
            {t(item.key, item.label)}
          </option>
        ))}
      </Select>
      <MediumTags label={t('label_tags', 'Tags')} {...register('tags')} />
      <div className="mt-[20px]">
        <MediaComponent
          type="image"
          width={1280}
          height={720}
          label={t('label_thumbnail', 'Thumbnail')}
          description={t(
            'youtube_thumbnail_description',
            'Thumbnail picture (optional)'
          )}
          {...register('thumbnail')}
        />
      </div>
    </div>
  );
};
export default withProvider({
  postComment: PostComment.COMMENT,
  comments: false,
  minimumCharacters: [],
  SettingsComponent: YoutubeSettings,
  CustomPreviewComponent: YoutubePreview,
  dto: YoutubeSettingsDto,
  maximumCharacters: 5000,
});
