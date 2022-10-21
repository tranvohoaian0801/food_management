import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodyCreateState{
    @ApiProperty({description : 'Product when expired', type : Boolean})
    @IsOptional()
    when_expired : boolean;
}