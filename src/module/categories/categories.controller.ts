import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {BodyCreateCate, BodyUpdateCate} from "./categories.dto";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";
import {getConnection} from "typeorm";
import {popResultSelector} from "rxjs/internal/util/args";

@Controller('category')
// @UseGuards(GuardsJwt, RoleGuards)
export class CategoriesController{
    constructor(private categoriesService : CategoriesService) {}

    // get all cate
    // @Roles(EnumRole.admin,EnumRole.support)
    @Get('/')
    async getAll(@Res() res, @Query() query) : Promise<any>{
        return this.categoriesService.getAllCategories(query).then(result =>{
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

    // get cate by id
    // @Roles(EnumRole.admin,EnumRole.support)
    @Get('/:cate_id')
    async getCategoriesByID(@Res() res, @Param(':cate_id') cate_id : string) : Promise<any>{
        return this.categoriesService.getById(cate_id).then(result =>{
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

    // create cate
    // @Roles(EnumRole.admin)
    @Post('/')
    async postCategories(@Body() body : BodyCreateCate, @Res() res,
                         @Req() req,@Param('account_id') account_id :string) : Promise<any> {
        return this.categoriesService.createCategories(body, account_id).then(result =>{
            res.status(200).json({
                message : 'Category is created',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'create failed',
                err,
            });
        })
    }

    // update cate
    // @Roles(EnumRole.admin)
    @Put('/:cate_id')
    async putCategories(@Body() body : Partial<BodyUpdateCate>, @Res() res, @Param('cate_id',)
     cate_id : string) : Promise<any>{
        return this.categoriesService.updateCategories(cate_id,body).then(result =>{
            res.status(200).json({
                message : 'Category is updated',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'update failed',
                err,
            });
        })
    }

    // delete cate
    // @Roles(EnumRole.admin)
    @Delete('/:cate_id')
    async deleteCategories(@Res() res, @Param('cate_id') cate_id : string) : Promise<any>{
        return this.categoriesService.deleteCategories(cate_id).then(result =>{
            res.status(200).json({
                message : 'Category is deleted',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'delete failed',
                err,
            });
        })
    }

}