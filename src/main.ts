import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const options = {cors: true};

  const app = await NestFactory.create(AppModule,options);
//  app.setGlobalPrefix('api');
  /*
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  */
  const config = new DocumentBuilder()
  .setTitle('Currency Exchange')
  .setDescription('The Currency Exchange API description')
  .setVersion('1.3')
  .addTag('api')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();
