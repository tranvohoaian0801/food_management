import {ExecutionContext, Injectable, SetMetadata} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class GuardsJwt extends AuthGuard('jwt'){
    constructor(private reflector : Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if(isPublic){
            return true;
        }
        return super.canActivate(context)
    }

    // getRequest(context : ExecutionContext){
    //     const ctx = GqlExecutionContext.create(context);
    //     return ctx.getContext().req;
    // }
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY,true);