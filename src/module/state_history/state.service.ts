import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {StateEntity} from "./state.entity";
import {Repository} from "typeorm";

@Injectable()
export class StateService{
    constructor(@InjectRepository(StateEntity) private readonly stateRepository : Repository<StateEntity>) {}

    // find all state
    async getAllState(filter : any = {}) : Promise<any>{
        const state  = await this.stateRepository.find(filter);
        return state;
    }

    // find by id
    async getStateByID(id :string) : Promise<any>{
        const state = await this.stateRepository.findOne({where : { id : id }});
        return state;
    }

}