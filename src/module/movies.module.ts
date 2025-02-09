import { Module } from '@nestjs/common';
import { MoviesService } from 'src/service/movies.service';
import { MoviesController } from 'src/controller/movie.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
