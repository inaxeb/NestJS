import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'user123',
    description: 'Nom d utilisateur unique',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Adresse e-mail unique et valide',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'MotDePasse123!',
    description: 'Mot de passe sécurisé (minimum 6 caractères)',
  })
  @MinLength(6)
  password: string;
}
