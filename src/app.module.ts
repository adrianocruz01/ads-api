import { Module } from '@nestjs/common';
import { AdsModule } from './libs/ads/ads.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module'; // Certifique-se de que está importando o AuthModule

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    AdsModule,
    AuthModule, // Certifique-se de que o AuthModule está aqui
  ],
})
export class AppModule {}
