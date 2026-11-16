import {
  IsBoolean,
  ValidateIf,
  IsIn,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

// video_made_with_ai / duet / stitch are video-only: TikTok's photo post_info
// has no is_aigc, disable_duet or disable_stitch field.
// Fields stay required here (existing clients depend on it); the constraints are
// documented, not enforced.
export class TikTokDto {
  @ValidateIf((p) => p.title)
  @MaxLength(90)
  @JSONSchema({
    description:
      'Used as the title of photo posts. Video posts use the post content as the title.',
  })
  title: string;

  @IsIn(
    [
      'PUBLIC_TO_EVERYONE',
      'MUTUAL_FOLLOW_FRIENDS',
      'FOLLOWER_OF_CREATOR',
      'SELF_ONLY',
    ],
    { message: 'Choose who can see this video' }
  )
  @IsString({ message: 'Choose who can see this video' })
  @JSONSchema({
    description: 'Who can see the post.',
  })
  privacy_level:
    | 'PUBLIC_TO_EVERYONE'
    | 'MUTUAL_FOLLOW_FRIENDS'
    | 'FOLLOWER_OF_CREATOR'
    | 'SELF_ONLY';

  @IsBoolean()
  @JSONSchema({
    description:
      'Video posts only. TikTok has no duet setting for photo posts.',
  })
  duet: boolean;

  @IsBoolean()
  @JSONSchema({
    description:
      'Video posts only. TikTok has no stitch setting for photo posts.',
  })
  stitch: boolean;

  @IsBoolean()
  @JSONSchema({
    description: 'Allows comments on the post.',
  })
  comment: boolean;

  @IsIn(['yes', 'no'])
  @JSONSchema({
    description: 'Photo posts only.',
  })
  autoAddMusic: 'yes' | 'no';

  @IsBoolean()
  @JSONSchema({
    description:
      'Discloses that the post promotes a third party (Branded Content). Branded content cannot be private (privacy_level=SELF_ONLY).',
  })
  brand_content_toggle: boolean;

  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    description:
      'Labels the post as AI generated. Video posts only. TikTok has no AI-generated label for photo posts.',
  })
  video_made_with_ai: boolean;

  @IsBoolean()
  @JSONSchema({
    description:
      'Discloses that the post promotes the creator or their own brand (Brand Organic).',
  })
  brand_organic_toggle: boolean;

  @IsIn(['DIRECT_POST'], {
    message: 'TikTok posts can only be published directly (DIRECT_POST)',
  })
  @IsString()
  @JSONSchema({
    description:
      'Required. Must be "DIRECT_POST": the post is published directly to the TikTok account.',
  })
  content_posting_method: 'DIRECT_POST';
}
