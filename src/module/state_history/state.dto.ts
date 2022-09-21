import {IsOptional} from "class-validator";

export class BodyCreateState{
    @IsOptional()
    when_expired : boolean;
}