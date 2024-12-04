import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  // Tạo Swagger API documentation
  const configSwagger = new DocumentBuilder()
    .setTitle('API airbnb')
    .setDescription('List API airbnb')
    .setVersion('1.0')
    .build();

  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger', app, swagger);

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/uploads/', // Đặt URL prefix khi truy cập file
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
