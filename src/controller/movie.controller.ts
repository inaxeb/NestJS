import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from '../service/movies.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({
    summary: 'Récupérer la liste des films',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Rechercher un film par titre',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Numéro de page (défaut : 1)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Critère de tri (défaut : popularity.desc)',
  })
  @Get()
  async fetchMovies(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('sort') sort: string = 'popularity.desc',
  ) {
    return this.moviesService.fetchMovies(search, page, sort);
  }

  @ApiOperation({ summary: 'Récupérer les films actuellement en salle' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Numéro de page (défaut : 1)',
  })
  @Get('now-playing')
  async fetchNowPlaying(@Query('page') page: number = 1) {
    return this.moviesService.fetchNowPlaying(page);
  }

  @ApiOperation({ summary: 'Obtenir les informations détaillées d un film' })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'ID unique du film',
  })
  @Get(':id')
  async fetchMovieDetails(@Param('id') movieId: number) {
    return this.moviesService.fetchMovieDetails(movieId);
  }
}
