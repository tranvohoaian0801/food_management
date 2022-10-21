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

    //         class RoleGuardMixin  implements CanActivate {
    //         constructor(private readonly reflector : Reflector) {}
    //         canActivate(context : ExecutionContext){
    //             const requiredRoles = this.reflector.getAllAndOverride<EnumRole[]>(ROLES_KEY, [context.getHandler(),context.getClass()]);
    //             if(!requiredRoles){
    //                 return true
    //             }
    //             const request = context.switchToHttp().getRequest<AccountRequestWithUser>();
    //             const account = request.account;
    //
    //             const hasRole = ((role)=> requiredRoles.includes(role));
    //             return account && account.role && hasRole(requiredRoles);
    //             // return requiredRoles.some((roleId) => account?.role === roleId);
    //
    //         }
    //             return mixin(RoleGuardMixin);
    //     }
    //
    //
    // export default RoleGuards;
}