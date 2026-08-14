import { IsString, MinLength } from 'class-validator';

export class ApiKeyDto {
  @IsString()
  @MinLength(4, {
    message: 'Deve ter pelo menos 4 caracteres',
  })
  api: string;
}
