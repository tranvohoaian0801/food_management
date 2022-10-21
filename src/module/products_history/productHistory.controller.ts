import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards} from "@nestjs/common";
import {ProductHistoryService} from "./productHistory.service";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";
import {BodyCreateHistory, BodyUpdateHistory} from "./productHistory.dto";
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('productHistory')
@Controller('productHistory')
@UseGuards(GuardsJwt, RoleGuards)
@ApiBearerAuth('JWT-auth')
export class ProductHistoryController {
    constructor(private readonly historyService : ProductHistoryService) {}

    // get all History
    @ApiOkResponse({description : 'Get all product history'})
    @Roles(EnumRole.ADMIN)
    @Get('/')
    async getAllProductHistory(@Res() res, @Query() query) : Promise<any>{
        return this.historyService.getAllHistory(query).then(result =>{
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

    // get History by id
    @ApiOkResponse({description : 'Get product history by Id'})
    @Roles(EnumRole.ADMIN)
    @Get('/:history_id')
    async getProductHistoryByID(@Res() res ,@Param('history_id') history_id : string) : Promise<any>{
        return this.historyService.getHistoryByID(history_id).then(result =>{
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

    // create history
    @ApiCreatedResponse({description : 'The record has been successfully created', type : BodyCreateHistory})
    @ApiBody({type : BodyCreateHistory})
    @Roles(EnumRole.ADMIN)
    @Post('/')
    async postProductHistory(@Body() body : BodyCreateHistory , @Res() res): Promise<any>{
        return this.historyService.createProductHistory(body).then(result =>{
            res.status(200).json({
                message : 'Product history is created',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'create failed',
                err,
            });
        })
    }

    // update history
    @ApiOkResponse({description : 'The record has been successfully updated', type : BodyUpdateHistory})
    @ApiBody({type : BodyUpdateHistory})
    @Roles(EnumRole.ADMIN)
    @Put(':history_id')
    async putProductHistory(@Body() body : BodyUpdateHistory, @Res() res, @Param('history_id')
        history : string) : Promise<any>{
        return this.historyService.updateProductHistory(body,history).then(result =>{
            res.status(200).json({
                message : 'update success',
                result,
            })
        }).catch(err =>{
            res.status(500).json({
                message : 'update fail',
                err,
            })
        })
    }

    // delete history
    @ApiCreatedResponse({description : 'The record has been successfully deleted'})
    @Roles(EnumRole.ADMIN)
    @Delete(':history_id')
    async DelProductHistory(@Res() res, @Param('history_id') history_id : string) : Promise<any> {
        return this.historyService.deleteProductHistory(history_id).then(result =>{
            res.status(200).json({
                message : 'delete success',
                result,
            })
        }).catch(err =>{
            res.status(500).json({
                message : 'delete failed',
                err,
            })
        })
    }

}