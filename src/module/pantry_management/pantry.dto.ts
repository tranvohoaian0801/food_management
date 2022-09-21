import {IsInt, IsNotEmpty, IsOptional} from "class-validator";

export class BodyCreatePantry{
    @IsNotEmpty()
    pantry_id : string;

    @IsNotEmpty()
    storage_place : string;
}

export class BodyUpdatePantry{
    @IsOptional()
    pantry_id :string;

    @IsOptional()
    storage_place : string;
}

export class BodyDeletePantry{
    @IsNotEmpty()
    pantry_id :string;

    @IsNotEmpty()
    storage_place : string;
}