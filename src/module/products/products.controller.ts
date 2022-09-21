import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseFilePipeBuilder,
    Post,
    Put,
    Query,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {BodyProductCreate, BodyProductUpdate, BodyUploadFileProduct} from "./products.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {EnumRole} from "../../constant/role/role.constant";
import {Roles} from "../../decorator/role/role.decorator";

@Controller('product')
// @UseGuards(GuardsJwt,RoleGuards)
export class ProductsController{
    constructor(private productService : ProductsService) {}

    // get all products
    // @Roles(EnumRole.admin,EnumRole.support)
    @Get('/')
    async getAllProducts(@Res() res, @Query() query) : Promise<any>{
        return this.productService.getAllProduct(query).then(result =>{
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
    // @Roles(EnumRole.admin)
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

    // upload file products
    // @UseInterceptors(FileInterceptor('file',{
    //     storage :  diskStorage({
    //         destination : './files',
    //         filename :(req, file, callback)=>{
    //             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //             const ext = extname(file.originalname);
    //             const filename = `${uniqueSuffix}${ext}`;
    //             callback(null,filename);
    //         },
    //     }),
    // }))
    // @Post('file')
    //  async uploadFile(@Body() body : BodyUploadFileProduct, @UploadedFile(
    //       await new ParseFilePipeBuilder().addFileTypeValidator({
    //          fileType : 'jpg',
    //      }).build(),
    // )
    //          file : Express.Multer.File,
    // ):Promise<any>{
    //   return {
    //       body,
    //       file  : file.buffer.toString(),
    //   };
    // }

    // create product
    // @Roles(EnumRole.admin,EnumRole.support)
    @Post('/')
    async postProduct(@Body() body : BodyProductCreate, @Res() res) : Promise<any>{
        return this.productService.createProduct(body).then(result =>{
            res.status(200).json({
                message : 'Product is created',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'create failed',
                err,
            });
        })
    }

    // update product
    // @Roles(EnumRole.support,EnumRole.admin)
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
    // @Roles(EnumRole.admin,EnumRole.support)
    @Delete('/:product_id')
    async deleteProduct(@Res() res , @Param('account_id') product_id : string) : Promise<any>{
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

}