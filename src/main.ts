import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setVersion('1.0')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  // Importante para mostrar os erros de validação dos DTOs
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
