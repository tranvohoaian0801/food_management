import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class MediaDto {
    @ApiProperty({description : 'filename', type : String})
    @IsOptional()
    filename : string;

    @ApiProperty({description : 'path', type : String})
    @IsOptional()
    path : string;
}