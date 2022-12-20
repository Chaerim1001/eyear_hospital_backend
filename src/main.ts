import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger/swagger';
// swagger 설정 및 main
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 들어오는 요청에 대해 파이프라인을 사용하여 validation 검사를 수행한다.
  setupSwagger(app);
  app.enableCors();
  await app.listen(3334);
}
bootstrap();
