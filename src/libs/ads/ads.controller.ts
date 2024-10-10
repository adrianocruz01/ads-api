import { Controller, Get, Post, Param, Body, HttpCode, BadRequestException } from '@nestjs/common';
import { AdsService } from './ads.service';
import { Ad } from './ad.model';

@Controller('ads')
export class AdsController {
  constructor(
    private readonly adsService: AdsService
  ) {}

  @Get('')
  @HttpCode(200)
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const campain = await this.adsService.findOne(id);
    if (!campain) {
      throw new BadRequestException('Não foi possível acessar os dados de campanha');
    }
    return campain;
  }
  
  @Get('/fetch/facebook')
  async fetchFacebookAds() {
    const result = await this.adsService.fetchFacebookAds();
    return result;
  }
  
  @Post()
  create(@Body() ad: Ad) {
    return this.adsService.createOrUpdate(ad);
  }
}
