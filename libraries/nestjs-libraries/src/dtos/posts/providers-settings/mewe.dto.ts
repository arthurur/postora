import {
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class MeweDto {
  @IsIn(['timeline', 'group'])
  @JSONSchema({
    description: 'Onde publicar: linha do tempo ou grupo',
  })
  postType: 'timeline' | 'group';

  @ValidateIf((o) => o.postType === 'group')
  @MinLength(1)
  @IsString()
  @JSONSchema({
    description: 'O grupo deve ser informado por ID',
  })
  @IsOptional()
  group?: string;
}
