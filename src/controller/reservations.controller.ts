import {
    Controller,
    Post,
    Body,
    Get,
    Delete,
    Param,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { ReservationService } from 'src/service/reservation.service';
  import { CreateReservationDto } from '../dto/create-reservation.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('Réservations')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('reservations')
  export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
  
    /**
     * Effectuer une nouvelle réservation
     */
    @ApiOperation({ summary: 'Effectuer une réservation' })
    @Post()
    async book(@Request() req, @Body() createReservationDto: CreateReservationDto) {
      return this.reservationService.book(req.user.id, createReservationDto);
    }
  
    /**
     * Récupérer les réservations d'un utilisateur
     */
    @ApiOperation({ summary: 'Lister les réservations d’un utilisateur' })
    @Get()
    async listUserReservations(@Request() req) {
      return this.reservationService.listUserReservations(req.user.id);
    }
  
    /**
     * Supprimer une réservation existante
     */
    @ApiOperation({ summary: 'Supprimer une réservation' })
    @Delete(':id')
    async removeReservation(@Param('id') id: number, @Request() req) {
      return this.reservationService.removeReservation(id, req.user.id);
    }
  }
