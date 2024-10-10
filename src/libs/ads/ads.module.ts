import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { Ad } from './ad.model';

@Module({
  imports: [SequelizeModule.forFeature([Ad])],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
