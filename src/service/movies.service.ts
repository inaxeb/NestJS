import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
    private readonly baseUrl: string = 'https://api.themoviedb.org/3';

    constructor(private readonly httpService: HttpService) {}

    async fetchMovies(
        search?: string,
        page: number = 1,
        sort: string = 'popularity.desc',
    ): Promise<any> {
        try {
            const params: any = {
                api_key: process.env.API_KEY,
                page,
            };

            if (search) {
                params.query = search;
                const response = await firstValueFrom(
                    this.httpService.get(`${this.baseUrl}/search/movie`, { params }),
                );
                return response.data;
            } else {
                params.sort_by = sort;
                const response = await firstValueFrom(
                    this.httpService.get(`${this.baseUrl}/discover/movie`, { params }),
                );
                return response.data;
            }
        } catch (error) {
            throw new HttpException(
                'Impossible de récupérer les films.',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async fetchNowPlaying(page: number = 1): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.baseUrl}/movie/now_playing`, {
                    params: { api_key: process.env.API_KEY, page },
                }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                'Impossible de récupérer les films en salle.',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async fetchMovieDetails(movieId: number): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.baseUrl}/movie/${movieId}`, {
                    params: { api_key: process.env.API_KEY },
                }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                'Impossible de récupérer les détails du film.',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
