import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PantryEntity} from "./pantry.entity";
import {PantryController} from "./pantry.controller";
import {PantryService} from "./pantry.service";
import {RoleService} from "../role/role.service";
import {RoleModule} from "../role/role.module";
import {AccountService} from "../account/account.service";
import {AccountModule} from "../account/account.module";

@Module({
    imports : [
        TypeOrmModule.forFeature([PantryEntity]),
        forwardRef(()=>RoleModule),
        forwardRef(()=>AccountModule)
    ],
    controllers : [PantryController],
    providers : [PantryService, RoleService],
    exports : [PantryService,TypeOrmModule],
})
export class PantryModule{}