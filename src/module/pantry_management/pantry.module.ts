import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PantryEntity} from "./pantry.entity";
import {PantryController} from "./pantry.controller";
import {PantryService} from "./pantry.service";
import {RoleService} from "../role/role.service";
import {RoleModule} from "../role/role.module";

@Module({
    imports : [TypeOrmModule.forFeature([PantryEntity]),forwardRef(()=>RoleModule)],
    controllers : [PantryController],
    providers : [PantryService, RoleService],
    exports : [PantryService,TypeOrmModule],
})
export class PantryModule{}