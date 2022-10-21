import {IsDate, IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodyProductCreate{
    @ApiProperty({description : 'Your image', type : String})
    @IsNotEmpty()
    image : string;

    @ApiProperty({description : 'Products name', type : String})
    @IsNotEmpty()
    name : string;

    @ApiProperty({description : 'Product creation date', type : String})
    @IsDate()
    date : string;

    @ApiProperty({description : 'Product total', type : Number})
    @IsNotEmpty()
    total : number;

    @ApiProperty({description : 'Product status', type : Boolean})
    @IsOptional()
    is_active : boolean;

    @ApiProperty({description : 'Product state used', type : String})
    @IsNotEmpty()
    state_used : string;

    @IsNotEmpty()
    categories? : string;

    @IsNotEmpty()
    pantry? : string;

    @IsNotEmpty()
    account? : string;
}

export class BodyProductUpdate {
    @ApiProperty({description : 'Your image', type : String})
    @IsOptional()
    image: string;

    @ApiProperty({description : 'Products name', type : String})
    @IsOptional()
    name : string;

    @ApiProperty({description : 'Product creation date', type : String})
    @IsOptional()
    @IsDate()
    date : Date;

    @ApiProperty({description : 'Product total', type : Number})
    @IsOptional()
    total : number;

    @ApiProperty({description : 'Product status', type : Boolean})
    @IsOptional()
    is_active : boolean;

    @ApiProperty({description : 'Product state used', type : String})
    @IsOptional()
    state_used : string;

    @IsOptional()
    categories? : string;

    @IsOptional()
    pantry? : string;

    @IsOptional()
    account? : string;
}

export class BodyUploadFileProduct{
    @IsOptional()
    image : string;
}
