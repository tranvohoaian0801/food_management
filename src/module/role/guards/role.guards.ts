import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {EnumRole} from "../../../constant/role/role.constant";
import {ROLES_KEY} from "../../../decorator/role/role.decorator";

@Injectable()
export class RoleGuards implements CanActivate{
    constructor(private reflector : Reflector) {}

    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<EnumRole[]>(ROLES_KEY, [context.getHandler(),context.getClass()]);
        if(!requiredRoles){
            return true
        }
        const {account} =context.switchToHttp().getRequest();

        // setup nhieu quyen tai day
        return requiredRoles.some((roleId)=>account.roleId === roleId);
    }
}