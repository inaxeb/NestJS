import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user.module';
import { MoviesModule } from './module/movies.module';
import { ReservationModule } from './module/reservation.module';
import { DataSource } from 'typeorm';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'parry.alwaysdata.net',
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USER || 'parry',
      password: process.env.DB_PASS || 'Kevin-2017',
      database: process.env.DB_NAME || 'parry_nestproject',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    MoviesModule,
    ReservationModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}