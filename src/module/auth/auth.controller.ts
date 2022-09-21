import {Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import {BodyLogin, BodyRegister} from "./auth.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {GuardsLocal} from "./guards/guards.local";

@Controller('auth')
export class AuthController{
    constructor(
        private authService : AuthService,
    ) {}

    @Post('login')
    @UseGuards(GuardsLocal)
    async logIn(@Body() body : BodyLogin, @Res() res) : Promise<any>{
        return this.authService.LoginAccount(body).then(result =>{
            res.status(200).json({
                message : 'Login successful',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'Login failed',
                err,
            });
        })
    }

    @Post('register')
    async register(@Body() body : BodyRegister, @Res() res, @Req() req) :  Promise<any>{
        return this.authService.register(body,req.protocol + '://' + req.headers.host).then(result =>{
            res.status(200).json({
                result,
                message : 'Sign up successfully, please check your mail to active this account',
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'Sign up failed',
                err,
            });
        })
    }

    @Get('verify/:token')
    async verify(@Res() res, @Param('token') token : string) : Promise<any>{
        return this.authService.verifyEmail(token).then(result =>{
            res.status(200).json({
                message : 'The account is activated',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'verify token failed',
                err,
            });
        })
    }

}