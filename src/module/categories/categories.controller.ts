import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {BodyCreateCate, BodyUpdateCate} from "./categories.dto";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('category')
@Controller('category')
@UseGuards(GuardsJwt, RoleGuards)
@ApiBearerAuth('JWT-auth')
export class CategoriesController{
    constructor(private categoriesService : CategoriesService) {}

    // get all cate
    @ApiOkResponse({description : 'Get all categories'})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
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
    @ApiOkResponse({description : 'Get category by Id'})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
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
    @ApiCreatedResponse({description : 'The record has been successfully created', type : BodyCreateCate})
    @ApiBody({type : BodyCreateCate})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
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
    @ApiCreatedResponse({
        type: BodyUpdateCate,
        description: 'The record has been successfully updated.'
    })
    @ApiOkResponse({ description: 'Update a category' })
    @ApiBody({ type: BodyUpdateCate })
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
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
    @ApiCreatedResponse({description : 'The record has been successfully deleted'})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
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