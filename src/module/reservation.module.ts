import { Module } from '@nestjs/common';
import { ReservationService } from 'src/service/reservation.service';
import { ReservationController } from 'src/controller/reservations.controller';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
