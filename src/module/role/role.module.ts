import {forwardRef, Module} from "@nestjs/common";
import {RoleController} from "./role.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "./role.entity";
import {RoleService} from "./role.service";

@Module({
    imports : [TypeOrmModule.forFeature([RoleEntity])],
    controllers : [RoleController],
    providers : [RoleService],
    exports : [TypeOrmModule, RoleService]
})
export class RoleModule{}