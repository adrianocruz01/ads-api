import { Controller, Get, Post, Param, Body, HttpCode, BadRequestException } from '@nestjs/common';
import { AdsService } from './ads.service';
import { Ad } from './ad.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdDto } from './dto/create-campain-dto';

@ApiTags('Ads')
@Controller('ads')
export class AdsController {
  constructor(
    private readonly adsService: AdsService
  ) {}

  @Get('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obter todas as campanhas' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todas as campanhas.',
    type: [Ad],
  })
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obter uma campanha específica' })
  @ApiResponse({
    status: 200,
    description: 'Retorna uma campanha baseada na identificação especificada.',
    type: Ad,
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível acessar os dados de campanha.',
  })
  async findOne(@Param('id') id: string) {
    const campain = await this.adsService.findOne(id);
    if (!campain) {
      throw new BadRequestException('Não foi possível acessar os dados de campanha');
    }
    return campain;
  }
  
  @Get('/fetch/facebook')
  @HttpCode(201)
  @ApiOperation({ summary: 'Obter todas campanhas do Facebook' })
  @ApiResponse({
    status: 201,
    description: 'Retorna todas as campanhas de tráfego pago de um cliente específico e guarda no banco.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar campanhas do Facebook.',
  })
  async fetchFacebookAds() {
    const result = await this.adsService.fetchFacebookAds();
    return result;
  }
  
  @Post('create')
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar ou atualizar uma campanha' })
  @ApiResponse({
    status: 201,
    description: 'Anúncio criado ou atualizado com sucesso.',
    type: Ad,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos.',
  })
  async createOrUpdateAd(@Body() createAdDto: CreateAdDto) {
    return this.adsService.createOrUpdate(createAdDto);
  }
}
