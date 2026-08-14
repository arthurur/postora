import {
  IsDefined,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class DribbbleDto {
  @IsString()
  @IsDefined()
  @MinLength(1, {
    message: 'O título é obrigatório',
  })
  title: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  team: string;
}
