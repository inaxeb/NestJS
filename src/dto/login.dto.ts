import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Adresse e-mail de l utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MotDePasse123!', description: 'Mot de passe de l utilisateur' })
  @IsNotEmpty()
  password: string;
}
