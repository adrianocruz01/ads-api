import { ApiProperty } from '@nestjs/swagger';

export class CreateAdDto {
  @ApiProperty({ description: 'ID da campanha do Facebook', example: '512315278319541' })
  id_campanha: string;

  @ApiProperty({ description: 'Data de criação do anúncio', example: '2024-10-03' })
  ad_creation_time: string;

  @ApiProperty({ description: 'Corpos criativos do anúncio', example: ['Texto do anúncio aqui'] })
  ad_creative_bodies: string[];

  @ApiProperty({ description: 'Legendas dos links do anúncio', example: ['Legenda do link aqui'] })
  ad_creative_link_captions: string[];

  @ApiProperty({ description: 'Data de início da entrega do anúncio', example: '2024-10-03' })
  ad_delivery_start_time: string;

  @ApiProperty({ description: 'URL do snapshot do anúncio', example: 'https://www.facebook.com/ads/archive/render_ad/?id=512315278319541' })
  ad_snapshot_url: string;

  @ApiProperty({ description: 'Distribuição de alcance por idade, país e gênero', example: [] })
  age_country_gender_reach_breakdown: object[];

  @ApiProperty({ description: 'Linhas de autoria (bylines) do anúncio', example: 'Luciane Mello' })
  bylines: string;

  @ApiProperty({ description: 'Moeda utilizada no anúncio', example: 'BRL' })
  currency: string;

  @ApiProperty({ description: 'Distribuição de entrega por região', example: [] })
  delivery_by_region: object[];

  @ApiProperty({ description: 'Distribuição demográfica', example: [] })
  demographic_distribution: object[];

  @ApiProperty({ description: 'Plataformas de publicação', example: ['facebook'] })
  publisher_platforms: string[];

  @ApiProperty({ description: 'Nome da página do anúncio', example: 'Luciane Mello' })
  page_name: string;

  @ApiProperty({ description: 'ID da página do anúncio', example: '112869131398853' })
  page_id: string;
}
