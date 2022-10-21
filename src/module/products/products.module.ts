import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductsEntity} from "./products.entity";
import {ProductsController} from "./products.controller";
import {ProductsService} from "./products.service";
import {RoleModule} from "../role/role.module";
import {CategoriesModule} from "../categories/categories.module";
import {PantryModule} from "../pantry_management/pantry.module";
import {AccountModule} from "../account/account.module";
import {ScheduleModule} from "@nestjs/schedule";
import {MailerService} from "@nestjs-modules/mailer";

@Module({
    imports : [TypeOrmModule.forFeature([ProductsEntity]),
                forwardRef(()=>RoleModule),
                forwardRef(()=>CategoriesModule),
                forwardRef(()=>PantryModule),
                forwardRef(()=>AccountModule),
            ],
    controllers : [ProductsController],
    providers : [ProductsService],
    exports : [TypeOrmModule, ProductsService],
})
export class ProductsModule{}