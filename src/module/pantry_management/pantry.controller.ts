import {Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards} from "@nestjs/common";
import {PantryService} from "./pantry.service";
import {BodyCreatePantry} from "./pantry.dto";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('pantry')
@Controller('pantry')
@UseGuards(GuardsJwt,RoleGuards)
@ApiBearerAuth('JWT-auth')
export class PantryController{
    constructor(private pantryService : PantryService) {}

    // Get All pantry
    @ApiOkResponse({description : 'Get all Pantry'})
    @Roles(EnumRole.ADMIN)
    @Get('/')
    async getAllPantry(@Res() res, @Query() query) : Promise<any>{
        return this.pantryService.getAll(query).then(result =>{
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


    @ApiOkResponse({description : 'Get pantry by Id'})
    @Roles(EnumRole.ADMIN)
    @Get('/:pantry_id')
    async getPantryByID(@Res() res, @Param('pantry_id') pantry_id : string) : Promise<any>{
        return this.pantryService.getByID(pantry_id).then(result =>{
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

    // create pantry
    @ApiCreatedResponse({description : 'The record has been successfully created', type : BodyCreatePantry})
    @ApiBody({type : BodyCreatePantry})
    @Roles(EnumRole.ADMIN)
    @Post('/')
    async postPantry(@Body() body : BodyCreatePantry, @Res() res) : Promise<any>{
        return this.pantryService.createPantry(body).then(result =>{
            res.status(200).json({
                message : 'Pantry is created',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message : 'create failed',
                err,
            });
        })
    }

    // delete pantry
    @ApiCreatedResponse({description : 'The record has been successfully deleted'})
    @Roles(EnumRole.ADMIN)
    @Delete('/:pantry_id')
    async deletePantry(@Res() res, @Param('pantry_id') pantry_id  :string) : Promise<any>{
        return this.pantryService.deletePantry(pantry_id).then(result =>{
            res.status(200).json({
                message : 'Pantry is deleted',
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