import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards} from "@nestjs/common";
import {AccountService} from "./account.service";
import {BodyCreateAccount, BodyUpdateAccount} from "./account.dto";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";
import {RoleGuards} from "../role/guards/role.guards";
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Account} from "./account.entity";

@ApiTags('account')
@Controller('account')
@UseGuards(GuardsJwt, RoleGuards)
@ApiBearerAuth('JWT-auth')
export class AccountController{
    constructor(private accountService : AccountService) {}

    // get all account
    @ApiOkResponse({description : 'Get all account'})
    @Roles(EnumRole.ADMIN)
    @Get('/')
    async getAll(@Res() res, @Query() query) : Promise<any>{
        return this.accountService.getAllAccounts(query).then(result =>{
            res.status(200).json({
                message : 'success',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'failed',
                err,
            });
        })
    }

    // get account by id
    @ApiOkResponse({description : 'Get account by Id'})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
    @Get('/:account_id')
    async getAccountByID(@Res() res, @Param('account_id') account_id : string) : Promise<any>{
        return this.accountService.getAccountById(account_id).then(result =>{
            res.status(200).json({
                message : 'success',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'failed',
                err,
            })
        })
    }

    // create acount
    @ApiCreatedResponse({description : 'The record has been successfully created', type : BodyCreateAccount})
    @ApiBody({type : BodyCreateAccount})
    @ApiCreatedResponse({description : '0', type : Account})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
    @Post('/')
    async postAccount(@Body() body : BodyCreateAccount, @Res() res, @Req() req) : Promise<any>{
        return this.accountService.createAccount(body,req.protocol + '://' + req.headers.host).then(result =>{
            res.status(200).json({
                message : 'Account is created, please check your mail to active this account',
                result,
            });
        }).catch(err =>{
            console.log();
            res.status(500).json({
                message : 'create failed',
                err,
            });
        })
    }

    // update account
    @ApiCreatedResponse({description : 'The record has been successfully updated', type : BodyUpdateAccount})
    @ApiBody({type : BodyUpdateAccount})
    @Roles(EnumRole.ADMIN)
    @Put('/:account_id')
    async putAccount(@Body() body : Partial<BodyUpdateAccount>, @Res() res, @Param('account_id')
        account_id : string ): Promise<any> {
        return this.accountService.updateAccount(account_id, body).then(result =>{
            res.status(200).json({
                message : 'Account is updated',
                result,
            });
        }).catch(err =>{
            console.log();
            res.status(500).json({
                message : 'update failed',
                err,
            });
        })
    }

    @ApiCreatedResponse({description : 'The record has been successfully deleted', type : BodyUpdateAccount})
    @Roles(EnumRole.ADMIN)
    @Delete('/:account_id')
    async deleteAccount(@Res() res , @Param('account_id') account_id : string) : Promise<any>{
        return this.accountService.deleteAccount(account_id).then(result =>{
            res.status(200).json({
                message : 'Account is deleted',
                result,
            });
        }).catch(err => {
            res.status(500).json({
                message : 'delete failed',
                err,
            });
        })
    }


}