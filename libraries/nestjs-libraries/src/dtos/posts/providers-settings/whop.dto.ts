import { IsDefined, IsOptional, IsString, MinLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class WhopDto {
  @MinLength(1)
  @IsDefined()
  @IsString()
  @JSONSchema({
    description: 'ID da empresa',
  })
  company: string;

  @MinLength(1)
  @IsDefined()
  @IsString()
  @JSONSchema({
    description: 'ID da experiência do fórum da Whop',
  })
  experience: string;

  @IsOptional()
  @IsString()
  title?: string;
}
