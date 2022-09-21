import {Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards} from "@nestjs/common";
import {ProductHistoryService} from "./productHistory.service";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";
import {BodyCreateHistory} from "./productHistory.dto";

@Controller('productHistory')
// @UseGuards(GuardsJwt, RoleGuards)
export class ProductHistoryController {
    constructor(private readonly historyService : ProductHistoryService) {}

    // get all History
    // @Roles(EnumRole.admin)
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
    // @Roles(EnumRole.admin)
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
    // @Roles(EnumRole.admin)
    @Post('/')
    async createProductHistory(@Body() body : BodyCreateHistory , @Res() res,@Req() req, @Param('product_id') product_id : string) : Promise<any>{
        return this.historyService.createProductHistory(body,product_id).then(result =>{
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
}