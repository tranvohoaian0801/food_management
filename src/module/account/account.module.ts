import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Account} from "./account.entity";
import {AccountController} from "./account.controller";
import {AccountService} from "./account.service";
import {RoleService} from "../role/role.service";
import {RoleModule} from "../role/role.module";

@Module({
    imports :[TypeOrmModule.forFeature([Account]),forwardRef(()=>RoleModule)],
    controllers : [AccountController],
    providers : [AccountService],
    exports : [AccountService,TypeOrmModule],
})
export class AccountModule{}