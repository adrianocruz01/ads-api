import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Facebook Ads API')
    .setDescription(
      'API para integração e gestão de campanhas do Facebook Ads. Criado por Adriano Cruz. Saiba mais: [Adriano Cruz](https://www.linkedin.com/in/adrianocruz01/)',
    )
    .addTag('Login')
    .addTag('Ads')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('API rodando em: http://localhost:3000/api-docs');
}

bootstrap();
