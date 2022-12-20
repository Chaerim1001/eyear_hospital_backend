import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
// API 자동 문서화를 위한 swagger 설정
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Eyear Hospital API Docs')
    .setDescription('Eyear Hospital API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
