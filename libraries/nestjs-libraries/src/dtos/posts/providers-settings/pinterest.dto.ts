import {
  IsDefined,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class PinterestSettingsDto {
  @IsString()
  @ValidateIf((o) => !!o.title)
  @MaxLength(100)
  title: string;

  @IsString()
  @ValidateIf((o) => !!o.link)
  @IsUrl()
  link: string;

  @IsString()
  @ValidateIf((o) => !!o.dominant_color)
  dominant_color: string;

  @IsDefined({
    message: 'O quadro é obrigatório',
  })
  @IsString({
    message: 'O quadro é obrigatório',
  })
  @MinLength(1, {
    message: 'O quadro é obrigatório',
  })
  @JSONSchema({
    description: 'O quadro deve ser informado por ID',
  })
  board: string;
}
