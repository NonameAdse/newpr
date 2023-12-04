import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Block List').build();
  const document = SwaggerModule.createDocument(app, config);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Укажите ваш домен, с которого будут приходить запросы
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}
bootstrap();
