import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductsEntity} from "./products.entity";
import {ProductsController} from "./products.controller";
import {ProductsService} from "./products.service";
import {RoleModule} from "../role/role.module";
import {CategoriesModule} from "../categories/categories.module";
import {PantryModule} from "../pantry_management/pantry.module";
import {AccountModule} from "../account/account.module";
import {LocalFilesService} from "../media/media.localFileService";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "@hapi/joi";
import {MediaModule} from "../media/media.module";

@Module({
    imports : [TypeOrmModule.forFeature([ProductsEntity]),
                ConfigModule.forRoot({
                    // // xác định biến môi trường multer
                    validationSchema : Joi.object({
                        UPLOADED_FILES_DESTINATION: Joi.string().required(),
                    }),
                }),
                forwardRef(()=>RoleModule),
                forwardRef(()=>CategoriesModule),
                forwardRef(()=>PantryModule),
                forwardRef(()=>AccountModule),
                forwardRef(()=>MediaModule)
            ],
    controllers : [ProductsController],
    providers : [ProductsService],
    exports : [TypeOrmModule, ProductsService],
})
export class ProductsModule{}