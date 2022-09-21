import {forwardRef, Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {StrategyLocal} from "./strategy/strategy.local";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {StrategyJwt} from "./strategy/strategy.jwt";
import {AccountModule} from "../account/account.module";
// import * as dotenv from 'dotenv';
// import {TypeOrmModule} from "@nestjs/typeorm";
// dotenv.config();

@Module({
    imports : [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory: async(configService : ConfigService) =>({
                secret : configService.get<string>('jwt.secret'),
                // secret : 'dasdasd',
                signOptions : {
                    expiresIn : configService.get<string>('jwt.expires_in'),
                }
            }),
        }), forwardRef(()=> AccountModule)
    ],
    controllers : [AuthController],
    providers : [AuthService, StrategyLocal, StrategyJwt],
})
export class AuthModule{}