import {Controller, Get, Param, Res, UseGuards} from "@nestjs/common";
import {RoleService} from "./role.service";
import {Roles} from "../../decorator/role/role.decorator";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "./guards/role.guards";
import {EnumRole} from "../../constant/role/role.constant";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('role')
@Controller('role')
@UseGuards(GuardsJwt, RoleGuards)
@ApiBearerAuth('JWT-auth')
export class RoleController{
    constructor(private roleService : RoleService) {}

    // find all role
    @ApiOkResponse({description : 'Get all role'})
    @Roles(EnumRole.ADMIN)
    @Get('/')
    async getAllRole(@Res() res){
        return this.roleService.getAllRole().then(result =>{
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

    // find role by id
    @ApiOkResponse({description : 'Get role by Id'})
    @Roles(EnumRole.ADMIN)
    @Get('/:id')
    async getRoleByID(@Res() res, @Param('id') id : number){
        return this.roleService.findById(id).then(result =>{
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
}