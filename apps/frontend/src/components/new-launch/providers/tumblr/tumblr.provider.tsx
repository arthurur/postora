'use client';

import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { Input } from '@gitroom/react/form/input';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { TumblrDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/tumblr.dto';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

const TumblrSettings = () => {
  const t = useT();
  const form = useSettings();

  return (
    <>
      <Input label={t('label_title', 'Title')} {...form.register('title')} />
      <Input
        label={t('tumblr_label_link_url', 'Link URL')}
        {...form.register('link')}
      />
      <Input
        label={t('tumblr_label_source_url', 'Source URL')}
        {...form.register('sourceUrl')}
      />
      <Input label={t('label_tags', 'Tags')} {...form.register('tags')} />
    </>
  );
};

export default withProvider({
  comments: false,
  postComment: PostComment.POST,
  minimumCharacters: [],
  SettingsComponent: TumblrSettings,
  CustomPreviewComponent: undefined,
  dto: TumblrDto,
  maximumCharacters: 32768,
});
