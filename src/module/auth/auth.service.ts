import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {AccountService} from "../account/account.service";
import {BodyRegister} from "./auth.dto";
import {Account} from "../account/account.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private readonly accountService : AccountService,
                private readonly jwtService : JwtService) {}

    // create register
    async register(data : BodyRegister, hostname : string) : Promise<any>{
        try {
            const result =  await this.accountService.register(data,hostname);
            return result;
        }catch (err){
            console.log('errors',err);
            throw new HttpException('Register Failed',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // verify email
    async verifyEmail(token : string) : Promise<any>{
       try {
           const account = await this.accountService.getByVerifyToken(token);
           if(!account){
               throw new HttpException('The account is not exists',HttpStatus.NOT_FOUND);
           }

            const result =  await this.accountService.updateAccount(account.account_id, {
               is_active : true,
           })
           return result;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('Verify email failed',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    // validate Account
    async validateAccount(username : string, password : string) : Promise<any>{
       try {
           const account = await this.accountService.getByUsername(username);
           if(account && account.isPasswordValid(password)){
               const { passwrod, ...result} = account
               return result
           }
           return null
       }catch (err){
           console.log('errors',err);
           throw new HttpException('Invalid account or password',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    // login
    async LoginAccount(account : any) : Promise<any>{
        try {
        const accounts : Account = await this.accountService.getByUsername(account.username);
        const payload ={
            username : accounts.username,
            id : accounts.account_id,
        }

        const jwtToken = this.jwtService.sign(payload)

        return{
            access_token : jwtToken,
        }

        }catch (err) {
            console.log('errors',err);
        }
    }


}