import {
    Injectable,
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateReservationDto } from 'src/dto/create-reservation.dto';

@Injectable()
export class ReservationService {
    constructor(private readonly dataSource: DataSource) {}

    
    async book(userId: number, createReservationDto: CreateReservationDto) {
        const { movieId, movieTitle, startTime } = createReservationDto;

        const startTimeDate = new Date(startTime);
        const endTimeDate = new Date(startTimeDate.getTime() + 2 * 60 * 60 * 1000);

        const conflictingReservations = await this.dataSource
            .createQueryBuilder()
            .select('*')
            .from('reservations', 'r')
            .where('r.user_id = :userId', { userId })
            .andWhere(
                '((r.start_time BETWEEN :start AND :end) OR (r.end_time BETWEEN :start AND :end))',
                { start: startTimeDate, end: endTimeDate },
            )
            .getRawMany();

        if (conflictingReservations.length > 0) {
            throw new BadRequestException(
                'Conflit de réservation : Vous avez déjà un film réservé à cette heure.',
            );
        }

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into('reservations')
            .values({
                user_id: userId,
                movie_id: movieId,
                movie_title: movieTitle,
                start_time: startTimeDate,
                end_time: endTimeDate,
            })
            .execute();

        return { message: 'Réservation créée avec succès' };
    }

    
    async listUserReservations(userId: number) {
        return await this.dataSource
            .createQueryBuilder()
            .select('*')
            .from('reservations', 'r')
            .where('r.user_id = :userId', { userId })
            .getRawMany();
    }

    
    async removeReservation(reservationId: number, userId: number) {
        const reservation = await this.dataSource
            .createQueryBuilder()
            .select('*')
            .from('reservations', 'r')
            .where('r.id = :reservationId AND r.user_id = :userId', { reservationId, userId })
            .getRawMany();

        if (reservation.length === 0) {
            throw new NotFoundException(
                'Réservation introuvable ou ne vous appartient pas.',
            );
        }

        await this.dataSource
            .createQueryBuilder()
            .delete()
            .from('reservations')
            .where('id = :reservationId', { reservationId })
            .execute();

        return { message: 'Réservation annulée avec succès' };
    }
}
