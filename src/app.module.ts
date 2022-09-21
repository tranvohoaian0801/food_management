import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {CoreModule} from "./core/core.module";
import {AccountModule} from "./module/account/account.module";
import {RoleModule} from "./module/role/role.module";
import {ProductsModule} from "./module/products/products.module";
import {PantryModule} from "./module/pantry_management/pantry.module";
import {CategoriesModule} from "./module/categories/categories.module";
import {MulterModule} from "@nestjs/platform-express";
import {ProductHistoryModule} from "./module/products_history/productHistory.module";
import {StateModule} from "./module/state_history/state.module";
import {AuthModule} from "./module/auth/auth.module";

@Module({
  imports: [
      // core
      CoreModule,

      // service
      AccountModule,
      RoleModule,
      ProductsModule,
      PantryModule,
      CategoriesModule,
      MulterModule.register({dest : './uploads'}),
      ProductHistoryModule,
      StateModule,
      AuthModule,
  ],

})
export class AppModule {}
