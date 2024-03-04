import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Lock seeder comment the two following lines
  const seeder = app.get(SeederService);
  await seeder.seedAll();

  const config = new DocumentBuilder()
    .setTitle('Exam API - Address handler with Swagger | Paul Jaguin')
    .setDescription('This API is used  to manage real estate creating the address, building, apartment, owner, tenant, common facility, and options linked to them.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();