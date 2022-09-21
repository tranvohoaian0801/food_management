import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {ConfigService} from "@nestjs/config";
import {AccountService} from "../../account/account.service";
import {ExtractJwt} from "passport-jwt";
import {RoleEntity} from "../../role/role.entity";
// import * as dotenv from 'dotenv'
// dotenv.config();

@Injectable()
export class StrategyJwt extends PassportStrategy(Strategy){
    constructor(
        private readonly configService : ConfigService,
        private readonly accountService : AccountService
    ) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret'),
        })
    }

    // auto call
    // validate
    async validate(payload : any){
        const payLoadUsername = payload.username;
        const account = await this.accountService.findByUsernameAndSelectRole(payLoadUsername);
        if(!account){
            throw new UnauthorizedException();
        }

        // req.user
        const {role} = account;
        const _role : RoleEntity = <RoleEntity> role;
        if(!_role){
            return{
                id : payload.id,
                username : payload.username,
                roleId : null,
            }
        }
        const { id : roleId } = _role;
        return {
            id : payload.id,
            username : payload.username,
            roleId : roleId,
        }
    }
}