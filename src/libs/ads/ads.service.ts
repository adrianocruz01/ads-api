import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ad } from './ad.model';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { scheduleAdsFetch } from '../cron/cron';

@Injectable()
export class AdsService {
  constructor(
    @InjectModel(Ad)
    private adModel: typeof Ad,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    scheduleAdsFetch(this); // Agendar o cron job quando o módulo for iniciado
  }

  async findAll(): Promise<Ad[]> {
    return this.adModel.findAll();
  }

  async createOrUpdate(adData: any): Promise<Ad> {
    const existingAd = await this.adModel.findOne({ where: { id_campanha: adData.id_campanha } });

    if (existingAd) {
      return await existingAd.update(adData);
    } else {
      return await this.adModel.create(adData);
    }
    
  }

  async findOne(id: string): Promise<Ad> {
    return this.adModel.findOne({ where: { id } });
  }

  async fetchFacebookAds(): Promise<{ message: string; adsSaved?: any }> {
    try {
      const accessToken = this.configService.get<string>('FACEBOOK_ACCESS_TOKEN');
      const searchTerms = 'Luciane Mello';
      const adReachedCountries = ['BR'];

      const response = await axios.get(
        `https://graph.facebook.com/v16.0/ads_archive`,
        {
          params: {
            access_token: accessToken,
            ad_type: 'POLITICAL_AND_ISSUE_ADS',
            search_terms: searchTerms,
            ad_reached_countries: adReachedCountries.join(','),
            fields: 'id,ad_creation_time,ad_creative_bodies,ad_creative_link_captions,ad_delivery_start_time,ad_snapshot_url,age_country_gender_reach_breakdown,bylines,currency,delivery_by_region,demographic_distribution,publisher_platforms,page_name,page_id',
          },
        }
      );

      const ads = response.data.data;
      const savedAds = [];

      if (ads && ads.length > 0) {
        for (const adData of ads) {
          const formattedAdData: Partial<Ad> = {
            id_campanha: adData.id,
            ad_creation_time: adData.ad_creation_time,
            ad_creative_bodies: adData.ad_creative_bodies || {},
            ad_creative_link_captions: adData.ad_creative_link_captions || {},
            ad_delivery_start_time: adData.ad_delivery_start_time,
            ad_snapshot_url: adData.ad_snapshot_url,
            age_country_gender_reach_breakdown: adData.age_country_gender_reach_breakdown || {},
            bylines: adData.bylines,
            currency: adData.currency,
            delivery_by_region: adData.delivery_by_region || {},
            demographic_distribution: adData.demographic_distribution || {},
            publisher_platforms: adData.publisher_platforms || {},
            page_name: adData.page_name,
            page_id: adData.page_id,
          };

          const savedAd = await this.createOrUpdate(formattedAdData);
          savedAds.push(savedAd);
        }

        return { message: 'Anúncios do Facebook buscados e salvos no banco de dados.', adsSaved: savedAds };
      } else {
        return { message: 'Nenhum anúncio encontrado.' };
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro ao buscar anúncios do Facebook:', error.response.data);
        return { message: `Erro ao buscar anúncios: ${error.response.data.error.message}` };
      } else {
        console.error('Erro ao buscar anúncios do Facebook:', error.message);
        return { message: `Erro ao buscar anúncios: ${error.message}` };
      }
    }
  }
}
