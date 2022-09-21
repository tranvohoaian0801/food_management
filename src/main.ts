import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {Logger} from "@nestjs/common";
import * as morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  const confiService = app.get(ConfigService);
  const port = confiService.get<number>('port')
  await app.listen(port).then(() => {
      Logger.log(`Server is listening on ${port}`);
  });


}
bootstrap();
