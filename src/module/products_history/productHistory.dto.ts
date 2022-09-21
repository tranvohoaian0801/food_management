import {IsInt, IsNotEmpty, IsOptional} from "class-validator";

export class BodyCreateHistory{
    @IsNotEmpty()
    quantity : number;

    @IsNotEmpty()
    measurement : string;

    products? : string;

}

export class BodyUpdateHistory{
    @IsOptional()
    @IsInt()
    quantity : number;

    @IsOptional()
    measurement : string;

    products? : string;
}