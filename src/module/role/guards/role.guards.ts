import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {EnumRole} from "../../../constant/role/role.constant";
import {ROLES_KEY} from "../../../decorator/role/role.decorator";


@Injectable()
export class RoleGuards implements CanActivate{
    constructor(private readonly reflector : Reflector) {}
    canActivate(context: ExecutionContext) : boolean {
        const requiredRoles = this.reflector.getAllAndOverride<EnumRole[]>(ROLES_KEY, [context.getHandler(),context.getClass()]);
        if(!requiredRoles){
            return true
        }
        const  { user }  = context.switchToHttp().getRequest();

        // // setup nhieu quyen tai day
        return requiredRoles.some((roleId)=> user.roleId === roleId);
    }

}