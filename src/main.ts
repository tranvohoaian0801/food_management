import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {Logger, ValidationPipe} from "@nestjs/common";
import * as morgan from "morgan";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as fileUpload from "express-fileupload";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  // app.use(fileUpload({
  //   limits: { fileSize: 50 * 1024 * 1024 },
  //   useTempFiles : true,
  //   tempFileDir : '/tmp/'
  // }));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  // config swagger
  app.useGlobalPipes(new ValidationPipe())
  const swaggerConfig = new DocumentBuilder()
      .setTitle('Food Management')
      .setDescription('API developed throughout the API with NestJS course')
      .setVersion('1.0')
      .addBearerAuth({ in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
      .build();

  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('/',app,document);

  app.enableCors();

  await app.listen(port).then(() => {
      Logger.log(`Server is listening on ${port}`);
  });


}
bootstrap();
