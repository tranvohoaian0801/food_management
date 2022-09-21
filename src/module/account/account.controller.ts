import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards} from "@nestjs/common";
import {AccountService} from "./account.service";
import {BodyCreateAccount, BodyDeleteAccount, BodyUpdateAccount} from "./account.dto";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";

@Controller('account')
@UseGuards(GuardsJwt, RoleGuards)
export class AccountController{
    constructor(private accountService : AccountService) {}

    // get all account
    // @Roles(EnumRole.admin)
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
    // @Roles(EnumRole.admin)
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
    // @Roles(EnumRole.admin)
    @Post('/')
    async postAccount(@Body() body : BodyCreateAccount, @Res() res) : Promise<any>{
        return this.accountService.createAccount(body).then(result =>{
            res.status(200).json({
                message : 'Account is created',
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
    // @Roles(EnumRole.admin)
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

    // @Roles(EnumRole.admin)
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