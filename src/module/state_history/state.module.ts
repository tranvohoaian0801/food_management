import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {StateEntity} from "./state.entity";
import {StateController} from "./state.controller";
import {StateService} from "./state.service";

@Module({
    imports : [TypeOrmModule.forFeature([StateEntity])],
    controllers : [StateController],
    providers : [StateService],
    exports : [TypeOrmModule, StateService],
})
export class StateModule{}