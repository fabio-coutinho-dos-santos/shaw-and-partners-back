import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Shaw and Partners API')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  SwaggerModule.setup(`api/doc`, app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
