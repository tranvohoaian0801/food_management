import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductHistoryEntity} from "./productHistory.entity";
import {ProductHistoryController} from "./productHistory.controller";
import {ProductHistoryService} from "./productHistory.service";
import {RoleModule} from "../role/role.module";
import {ProductsModule} from "../products/products.module";

@Module({
    imports : [TypeOrmModule.forFeature([ProductHistoryEntity]),
        forwardRef(()=>RoleModule),
        forwardRef(()=>ProductsModule),
    ],
    controllers : [ProductHistoryController],
    providers : [ProductHistoryService],
    exports : [TypeOrmModule, ProductHistoryService],
})
export class ProductHistoryModule {}