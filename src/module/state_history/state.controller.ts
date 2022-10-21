import {Controller, Get, HttpStatus, Param, Query, Res, UseGuards} from "@nestjs/common";
import {StateService} from "./state.service";
import {Roles} from "../../decorator/role/role.decorator";
import {EnumRole} from "../../constant/role/role.constant";
import {GuardsJwt} from "../auth/guards/guards.jwt";
import {RoleGuards} from "../role/guards/role.guards";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('stateHistory')
@Controller('stateHistory')
@UseGuards(GuardsJwt, RoleGuards)
@ApiBearerAuth('JWT-auth')
export class StateController{
    constructor(private stateService : StateService) {}

    // get all state
    @ApiOkResponse({description : 'Get all state '})
    @Roles(EnumRole.ADMIN)
    @Get('/')
    async getAllState(@Res() res, @Query() query) : Promise<any>{
        return this.stateService.getAllState(query).then(result =>{
            res.status(200).json({
                message : 'success',
                result,
            });
        }).catch(err =>{
            res.status(500).json({
                message: 'failed',
                err,
            });
        })
    }

    // get state by id
    @ApiOkResponse({description : 'Get state by Id'})
    @Roles(EnumRole.ADMIN)
    @Get('/:id')
    async getStateByID(@Res() res, @Param('id') id : string) : Promise<any>{
        return this.stateService.getStateByID(id).then(result =>{
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