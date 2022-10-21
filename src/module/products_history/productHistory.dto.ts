import {IsInt, IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodyCreateHistory{
    @ApiProperty({description : 'Products quantity', type : Number})
    @IsNotEmpty()
    quantity : number;

    @ApiProperty({description : 'Product measurement', type : String})
    @IsNotEmpty()
    measurement : string;

    products? : string;

}

export class BodyUpdateHistory{
    @ApiProperty({description : 'Products quantity', type : Number})
    @IsOptional()
    @IsInt()
    quantity : number;

    @ApiProperty({description : 'Product measurement', type : String})
    @IsOptional()
    measurement : string;

    products? : string;
}