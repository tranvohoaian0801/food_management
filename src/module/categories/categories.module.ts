import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriesEntity} from "./categories.entity";
import {CategoriesController} from "./categories.controller";
import {CategoriesService} from "./categories.service";
import {RoleModule} from "../role/role.module";
import {AccountService} from "../account/account.service";
import {AccountModule} from "../account/account.module";

@Module({
    imports : [
        TypeOrmModule.forFeature([CategoriesEntity]),
        forwardRef(()=>RoleModule),
        forwardRef(()=>AccountModule),
    ],
    controllers : [CategoriesController],
    providers : [CategoriesService],
    exports : [TypeOrmModule, CategoriesService],
})
export class CategoriesModule{}