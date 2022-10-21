import {IsInt, IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodyCreatePantry{
    @ApiProperty({description : 'Your storage place', type : String})
    @IsNotEmpty()
    storage_place : string;

    account? : string
}

export class BodyUpdatePantry{
    @IsOptional()
    pantry_id :string;

    @IsOptional()
    storage_place : string;
}

// export class BodyDeletePantry{
//     @IsNotEmpty()
//     pantry_id :string;
//
//     @IsNotEmpty()
//     storage_place : string;
// }