import {IsInt, IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodyCreateCate{
    @ApiProperty({description : 'Your category name', type : String })
    @IsNotEmpty()
    cate_name : string;

    @ApiProperty({description : 'Product notice time', type : Number})
    @IsInt()
    time_notify : number;

    @ApiProperty({description : 'Product used time', type : Number})
    @IsInt()
    used_time : number;

    @ApiProperty({description : 'Priority product', type : Boolean})
    @IsOptional()
    priority : boolean;

    account?: string;
}

export class BodyUpdateCate{
    @ApiProperty({description : 'Your category name', type : String })
    @IsOptional()
    cate_name : string;

    @ApiProperty({description : 'Product notice time', type : Number})
    @IsInt()
    @IsOptional()
    time_notify : number;

    @ApiProperty({description : 'Product used time', type : Number})
    @IsInt()
    @IsOptional()
    used_time : number;

    @ApiProperty({description : 'Priority product', type : Boolean})
    @IsOptional()
    priority : boolean;

    account?: string
}

// export class BodyDeleteCate{
//     @IsNotEmpty()
//     cate_name : string;
//
//     @IsInt()
//     time_notify : number;
//
//     @IsInt()
//     used_time : number;
//
//     @IsOptional()
//     priority : boolean;
//
//     account?: string;
// }