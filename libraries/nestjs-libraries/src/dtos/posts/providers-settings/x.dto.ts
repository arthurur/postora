import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
import { MediaDto } from '@gitroom/nestjs-libraries/dtos/media/media.dto';

export class XDto {
  @IsOptional()
  @Matches(/^(https:\/\/x\.com\/i\/communities\/\d+)?$/, {
    message:
      'URL de comunidade do X inválida. Use o formato: https://x.com/i/communities/1493446837214187523',
  })
  community?: string;

  @ValidateIf((o) => o.post_type !== 'article')
  @IsIn(['everyone', 'following', 'mentionedUsers', 'subscribers', 'verified'])
  who_can_reply_post:
    | 'everyone'
    | 'following'
    | 'mentionedUsers'
    | 'subscribers'
    | 'verified';

  @IsOptional()
  @IsIn(['post', 'article'])
  @JSONSchema({
    description:
      'post = a regular short post (plain text). article = a long-form X article: write the post content as HTML (p, h1, h2, h3, ul, ol, li, strong, u, a) - the formatting is kept in the article',
  })
  post_type?: 'post' | 'article';

  @ValidateIf((o) => o.post_type === 'article')
  @IsString()
  @MinLength(1, { message: 'O título do artigo é obrigatório' })
  @JSONSchema({
    description: 'Título do artigo, obrigatório quando post_type for article',
  })
  article_title?: string;

  @ValidateIf((o) => o.post_type === 'article')
  @IsIn(['draft', 'published'])
  @JSONSchema({
    description:
      'draft = save the article as a draft on X, published = publish it right away, required when post_type is article',
  })
  article_status?: 'draft' | 'published';

  @IsOptional()
  @ValidateNested()
  @Type(() => MediaDto)
  @JSONSchema({
    description:
      'Optional cover image for the article, only used when post_type is article',
  })
  article_cover?: MediaDto;

  @IsOptional()
  @IsBoolean()
  made_with_ai?: boolean;

  @IsOptional()
  @IsBoolean()
  paid_partnership?: boolean;
}
