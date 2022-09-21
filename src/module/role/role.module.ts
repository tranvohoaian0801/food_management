import {Module} from "@nestjs/common";
import {RoleController} from "./role.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "./role.entity";
import {RoleService} from "./role.service";
import {APP_GUARD} from "@nestjs/core";
import {RoleGuards} from "./guards/role.guards";

@Module({
    imports : [TypeOrmModule.forFeature([RoleEntity])],
    controllers : [RoleController],
    providers : [RoleService,
        {
            provide : APP_GUARD,
            useClass : RoleGuards,
        }],
    exports : [TypeOrmModule, RoleService]
})
export class RoleModule{}