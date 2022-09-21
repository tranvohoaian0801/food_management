import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from 'passport-local';
import {AuthService} from "../auth.service";

@Injectable()
export class StrategyLocal extends PassportStrategy(Strategy){
    constructor(private authService : AuthService) {
        super({
            usernameField : 'username',
            passwordField : 'password',
        })
    }

    // auto call
    async validate(username : string, password : string) : Promise<any>{
        const account = await this.authService.validateAccount(username,password);
        if (!account.is_active) {
            throw new HttpException('Account is not activated', HttpStatus.UNAUTHORIZED);
        }

        // if(account.allow_email){
        //     throw new HttpException('Notification will be sent to email',HttpStatus.ACCEPTED);
        // }
        //
        // if(account.allow_sms){
        //     throw new HttpException('sms activation successful',HttpStatus.ACCEPTED);
        // }
        //
        // if(account.allow_app){
        //     throw new HttpException('app activation successful',HttpStatus.ACCEPTED);
        // }

        return account;
    }
}