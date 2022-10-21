import {Body, Controller, Get, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import {BodyLogin, BodyRegister} from "./auth.dto";
import {AuthService} from "./auth.service";
import {GuardsLocal} from "./guards/guards.local";
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ProductsService} from "../products/products.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(
        private authService : AuthService,
        private productService : ProductsService,
    ) {}


    @ApiOkResponse({ description: 'Login is successful!' })
    @ApiUnauthorizedResponse({ description: 'Incorrect email or password!' })
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


    @ApiCreatedResponse({description : 'The record has been successfully created'})
    @ApiBody({type : BodyRegister})
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

    // confirm active product
    @Get('confirm/:encode')
    async verifyActive(@Res() res, @Param('encode') encode : string) : Promise<any>{
        return this.productService.confirmProduct(encode).then(result =>{
            res.status(200).json({
                message : 'The product is activated',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'confirm active product failed',
                err,
            });
        })
    }

}