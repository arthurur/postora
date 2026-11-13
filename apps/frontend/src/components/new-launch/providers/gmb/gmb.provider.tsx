'use client';

import { FC, useCallback, useEffect } from 'react';
import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { GmbSettingsDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/gmb.settings.dto';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { Input } from '@gitroom/react/form/input';
import { Select } from '@gitroom/react/form/select';
import { useWatch } from 'react-hook-form';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

const topicTypes = [
  {
    key: 'gmb_topic_standard',
    label: 'Standard Update',
    value: 'STANDARD',
  },
  {
    key: 'gmb_topic_event',
    label: 'Event',
    value: 'EVENT',
  },
  {
    key: 'gmb_topic_offer',
    label: 'Offer',
    value: 'OFFER',
  },
];

const callToActionTypes = [
  {
    key: 'gmb_cta_none',
    label: 'None',
    value: 'NONE',
  },
  {
    key: 'gmb_cta_book',
    label: 'Book',
    value: 'BOOK',
  },
  {
    key: 'gmb_cta_order_online',
    label: 'Order Online',
    value: 'ORDER',
  },
  {
    key: 'gmb_cta_shop',
    label: 'Shop',
    value: 'SHOP',
  },
  {
    key: 'gmb_cta_learn_more',
    label: 'Learn More',
    value: 'LEARN_MORE',
  },
  {
    key: 'gmb_cta_sign_up',
    label: 'Sign Up',
    value: 'SIGN_UP',
  },
  {
    key: 'gmb_cta_get_offer',
    label: 'Get Offer',
    value: 'GET_OFFER',
  },
  {
    key: 'gmb_cta_call',
    label: 'Call',
    value: 'CALL',
  },
];

const GmbSettings: FC = () => {
  const t = useT();
  const { register, control } = useSettings();
  const topicType = useWatch({ control, name: 'topicType' });
  const callToActionType = useWatch({ control, name: 'callToActionType' });

  return (
    <div className="flex flex-col gap-[10px]">
      <Select
        label={t('label_post_type', 'Post Type')}
        {...register('topicType', {
          value: 'STANDARD',
        })}
      >
        {topicTypes.map((topic) => (
          <option key={topic.value} value={topic.value}>
            {t(topic.key, topic.label)}
          </option>
        ))}
      </Select>

      <Select
        label={t('gmb_label_call_to_action', 'Call to Action')}
        {...register('callToActionType', {
          value: 'NONE',
        })}
      >
        {callToActionTypes.map((cta) => (
          <option key={cta.value} value={cta.value}>
            {t(cta.key, cta.label)}
          </option>
        ))}
      </Select>

      {callToActionType &&
        callToActionType !== 'NONE' &&
        callToActionType !== 'CALL' && (
          <Input
            label={t('gmb_label_call_to_action_url', 'Call to Action URL')}
            placeholder="https://example.com"
            {...register('callToActionUrl')}
          />
        )}

      {topicType === 'EVENT' && (
        <div className="flex flex-col gap-[10px] mt-[10px] p-[15px] border border-input rounded-[8px]">
          <div className="text-[14px] font-medium mb-[5px]">
            {t('gmb_event_details', 'Event Details')}
          </div>
          <Input
            label={t('gmb_label_event_title', 'Event Title')}
            placeholder={t('gmb_event_name_placeholder', 'Event name')}
            {...register('eventTitle')}
          />
          <div className="grid grid-cols-2 gap-[10px]">
            <Input
              label={t('label_start_date', 'Start Date')}
              type="date"
              {...register('eventStartDate')}
            />
            <Input
              label={t('label_end_date', 'End Date')}
              type="date"
              {...register('eventEndDate')}
            />
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <Input
              label={t('label_start_time_optional', 'Start Time (optional)')}
              type="time"
              {...register('eventStartTime')}
            />
            <Input
              label={t('label_end_time_optional', 'End Time (optional)')}
              type="time"
              {...register('eventEndTime')}
            />
          </div>
        </div>
      )}

      {topicType === 'OFFER' && (
        <div className="flex flex-col gap-[10px] mt-[10px] p-[15px] border border-input rounded-[8px]">
          <div className="text-[14px] font-medium mb-[5px]">
            {t('gmb_offer_details', 'Offer Details')}
          </div>
          <Input
            label={t(
              'gmb_label_coupon_code_optional',
              'Coupon Code (optional)'
            )}
            placeholder="SAVE20"
            {...register('offerCouponCode')}
          />
          <Input
            label={t(
              'gmb_label_redeem_online_url_optional',
              'Redeem Online URL (optional)'
            )}
            placeholder="https://example.com/redeem"
            {...register('offerRedeemUrl')}
          />
          <Input
            label={t(
              'gmb_label_terms_optional',
              'Terms & Conditions (optional)'
            )}
            placeholder={t('gmb_offer_terms_placeholder', 'Valid until...')}
            {...register('offerTerms')}
          />
        </div>
      )}
    </div>
  );
};

export default withProvider({
  postComment: PostComment.POST,
  minimumCharacters: [],
  SettingsComponent: GmbSettings,
  CustomPreviewComponent: undefined,
  dto: GmbSettingsDto,
  maximumCharacters: 1500,
});
