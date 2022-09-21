import {Controller, Get, HttpStatus, Param, Query, Res} from "@nestjs/common";
import {StateService} from "./state.service";

@Controller('stateHistory')
export class StateController{
    constructor(private stateService : StateService) {}

    // get all state
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