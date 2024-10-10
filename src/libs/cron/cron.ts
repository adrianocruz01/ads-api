// src/libs/ads/ads-cron.ts
import * as cron from 'node-cron';
import { AdsService } from '../ads/ads.service'; // Ajuste o caminho se necessário

export function scheduleAdsFetch(adsService: AdsService): void {
  // Agendar a tarefa para executar todos os dias às 00:00
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('Iniciando a busca de anúncios às 00h...');
      const result = await adsService.fetchFacebookAds();
      console.log('Resultado da busca de anúncios:', result.message);
    } catch (error) {
      console.error('Erro ao executar o cron job de busca de anúncios:', error);
    }
  });
}
