import { IsOptional, IsString, MinLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class ListmonkDto {
  @IsString()
  @MinLength(1)
  subject: string;

  @IsString()
  preview: string;

  @IsString()
  @JSONSchema({
    description: 'A lista deve ser informada por ID',
  })
  list: string;

  @IsString()
  @IsOptional()
  @JSONSchema({
    description: 'O modelo deve ser informado por ID',
  })
  template: string;
}
