import {IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, matches, Matches, Min, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodyCreateAccount{
    @ApiProperty({description : 'Your email', type : String})
    @IsNotEmpty()
    @IsEmail()
    username : string;

    @ApiProperty({description : 'Your password', type : String})
    @MinLength(6)
    password : string;

    @ApiProperty({description : 'your fullname', type : String})
    @IsNotEmpty()
    fullname : string;

    @ApiProperty({description : 'Your gioi tinh', type : String})
    @IsNotEmpty()
    gioitinh : string;

    @ApiProperty({
        description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
        example: '+123123123123'
    })
    @IsNotEmpty()
    @IsPhoneNumber('VN')
    // @Matches(/^\+[1-9]\d{1,14}$/)
    phone: number;

    @ApiProperty({description : 'Your role', type : Number})
    @IsInt()
    @Min(0)
    role: number;

    is_active: boolean;

    verify_token : string;

    @IsOptional()
    allow_app : boolean;

    @IsOptional()
    allow_sms : boolean;

    @ApiProperty({description : 'Your allow_email', type : Boolean})
    @IsOptional()
    allow_email : boolean;
}

export class BodyUpdateAccount{
    @ApiProperty({description : 'Your email', type : String})
    @IsOptional()
    @IsEmail()
    username : string;

    @ApiProperty({description : 'Your password', type : String})
    @IsOptional()
    password: string;

    @ApiProperty({description : 'your fullname', type : String})
    @IsOptional()
    fullname: string;

    @ApiProperty({description : 'Your gioi tinh', type : String})
    @IsOptional()
    gioitinh : string;

    @ApiProperty({
        description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
        example: '+123123123123'
    })
    @IsOptional()
    @IsPhoneNumber('VN')
    // @Matches(/^\+[1-9]\d{1,14}$/)
    phone: number;

    @ApiProperty({description : 'Your role', type : Number})
    @IsInt()
    @Min(0)
    @IsOptional()
    role: number;

    @ApiProperty({description : 'Your active', type : Boolean})
    @IsOptional()
    is_active : boolean;

    @IsOptional()
    verify_token : string;

    @IsOptional()
    allow_app : boolean;

    @IsOptional()
    allow_sms : boolean;

    @ApiProperty({description : 'Your allow_email', type : Boolean})
    @IsOptional()
    allow_email : boolean;
}

// export class BodyDeleteAccount{
//     @IsNotEmpty()
//     username : string;
//
//     @MinLength(6)
//     password : string;
//
//     @IsNotEmpty()
//     fullname : string;
//
//     @IsNotEmpty()
//     gioitinh : string;
//
//     @IsPhoneNumber('VN')
//     phone: number;
//
//     @IsInt()
//     @Min(0)
//     role: number;
//
//     @IsOptional()
//     is_active: boolean;
//
//     @IsNotEmpty()
//     verify_token : string;
//
//     @IsOptional()
//     allow_app : boolean;
//
//     @IsOptional()
//     allow_sms : boolean;
//
//     @IsOptional()
//     allow_email : boolean;
// }