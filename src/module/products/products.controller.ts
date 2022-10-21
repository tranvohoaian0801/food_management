import {
    Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, Req, Res,
    UploadedFile, UseGuards, UseInterceptors
} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {BodyProductCreate, BodyProductUpdate, BodyUploadFileProduct} from "./products.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ProductsEntity} from "./products.entity";

export const storage = {
    storage :  diskStorage({
        destination : './files',
        filename :(req, file, callback)=>{
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            callback(null,filename);
        },
    }),
}

@ApiTags('product')
@Controller('product')
@UseGuards(GuardsJwt,RoleGuards)
@ApiBearerAuth('JWT-auth')
export class ProductsController{
    constructor(private productService : ProductsService) {}

    // get all products
    @ApiOkResponse({description : 'Get all products'})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
    @Get('/')
    async getAllProducts(@Res() res, @Query() query) : Promise<any>{
        return this.productService.getProducts(query).then(result =>{
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

    // Get by id
    @ApiOkResponse({description : 'Get product by Id'})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
    @Get('/:product_id')
    async getProductByID(@Res() res, @Param('product_id') product_id : string) : Promise<any>{
        return this.productService.getByID(product_id).then(result =>{
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


    // create product
    @ApiCreatedResponse({description : 'The record has been successfully created', type : BodyProductCreate})
    @ApiBody({type : BodyProductCreate})
    @ApiCreatedResponse({description : '0', type : ProductsEntity})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
    @Post('/')
    @UseInterceptors(FileInterceptor('image',storage))
    async postProduct(@Body() body : BodyProductCreate, @Res() res,
                      @UploadedFile() file : Express.Multer.File) : Promise<any> {
        return this.productService.createProduct(body).then(result => {
            res.status(200).json({
                message: 'Product is created',
                result,
            });
        }).catch(err => {
            res.status(500).json({
                message: 'create failed',
                err,
            });
        })
    }

    // update product
    @ApiCreatedResponse({description : 'The record has been successfully created', type : BodyProductUpdate})
    @ApiBody({type : BodyProductUpdate})
    @Roles(EnumRole.SUPPORT,EnumRole.ADMIN)
    @Put('/:product_id')
    async putProduct(@Body() body : Partial<BodyProductUpdate>, @Res() res, @Param('product_id')
        product_id : string) : Promise<any>{
        return this.productService.updateProduct(product_id,body).then(result =>{
            res.status(200).json({
                message : 'Products is updated',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'update failed',
                err,
            });
        })
    }

    // delete product
    @ApiCreatedResponse({description : 'The record has been successfully deleted'})
    @Roles(EnumRole.ADMIN,EnumRole.SUPPORT)
    @Delete('/:product_id')
    async deleteProduct(@Res() res , @Param('product_id') product_id : string) : Promise<any>{
        return this.productService.deleteProduct(product_id).then(result =>{
            res.status(200).json({
                message : 'Products is deleted',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'delete failed',
                err,
            });
        })
    }


    // upload file
    @Post('upload/:product_id')
    @UseInterceptors(FileInterceptor('image',storage))
    async addFile(@Param('product_id') product_id : string,
                  @UploadedFile() file : Express.Multer.File, @Res() res){
        return this.productService.addFileProduct(product_id,{
            path: file.path,
            filename: file.filename,
        }).then(result =>{
            res.status(200).json({
                message : 'upload file success',
                result,
            })
        }).catch(err =>{
            res.status(500).json({
                message : 'upload file failed',
                err
            })
        })
    }


}