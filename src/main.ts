import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  // Add ClassSerializerInterceptor to the global interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(port, () => {
    console.log('[WEB]', `http://localhost:${port}`);
  });
}

bootstrap();
