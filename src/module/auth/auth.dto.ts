import {IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, Matches, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodyLogin{
    @ApiProperty({description : 'Your email', type : String})
    @IsNotEmpty()
    @IsEmail()
    username : string;

    @ApiProperty({description : "Your password", type : String})
    @MinLength(6)
    password : string;
}

export class BodyRegister extends BodyLogin{
    @ApiProperty({description : "Your fullname", type : String})
    @IsNotEmpty()
    fullname : string;

    @ApiProperty({description : "Your gioi tinh", type : String})
    @IsNotEmpty()
    gioitinh : string;

    @ApiProperty({
        description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
        example: '+123123123123'
    })
    @IsNotEmpty()
    @IsPhoneNumber('VN')
    // @Matches(/^\+[1-9]\d{1,14}$/)
    phone : number;

    @ApiProperty({description : 'Your role', type : Number})
    @IsOptional()
    @IsInt()
    role : number;

    @ApiProperty({description : 'Your allow_email', type : Boolean})
    @IsOptional()
    allow_email : boolean;

    verify_token : string;
}