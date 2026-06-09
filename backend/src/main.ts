import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = `${process.env.PORT}`;

  const config = new DocumentBuilder()
    .setTitle('Rei do Palpite Documentation APIs')
    .setDescription('Documentação das APIs do projeto Rei do Palpite')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ZodValidationPipe());

  app.use(
    '/scalar/documentation',
    apiReference({
      theme: 'default',
      content: documentFactory,
    }),
  );
  await app.listen(port);
}
bootstrap().catch((error) => console.log(error));
