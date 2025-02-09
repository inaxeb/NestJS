import { IsNotEmpty, IsNumber, IsString, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ example: 550, description: "Id unique du film à réserver" })
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @ApiProperty({ example: "Inception", description: "Titre du film concerné par la réservation" })
  @IsString()
  @IsNotEmpty()
  movieTitle: string;

  @ApiProperty({
    example: "2025-02-07T14:00:00Z",
    description: "Date et heure de la réservation"
  })
  @IsISO8601()
  @IsNotEmpty()
  startTime: string;
}
