import {IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, Min, MinLength} from "class-validator";

export class BodyCreateAccount{
    @IsNotEmpty()
    @IsEmail()
    username : string;

    @MinLength(6)
    password : string;

    @IsNotEmpty()
    fullname : string;

    @IsNotEmpty()
    gioitinh : string;

    @IsPhoneNumber('VN')
    phone: number;

    @IsInt()
    @Min(0)
    role: number;

    is_active: boolean;

    verify_token : string;

    @IsOptional()
    allow_app : boolean;

    @IsOptional()
    allow_sms : boolean;

    @IsOptional()
    allow_email : boolean;
}

export class BodyUpdateAccount{
    @IsOptional()
    password: string;

    @IsOptional()
    name: string;

    @IsOptional()
    gioitinh : string;

    @IsOptional()
    @IsPhoneNumber('VN')
    phone: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    role: number;

    @IsOptional()
    is_active : boolean;

    @IsOptional()
    verify_token : string;

    @IsOptional()
    allow_app : boolean;

    @IsOptional()
    allow_sms : boolean;

    @IsOptional()
    allow_email : boolean;
}

export class BodyDeleteAccount{
    @IsNotEmpty()
    username : string;

    @MinLength(6)
    password : string;

    @IsNotEmpty()
    fullname : string;

    @IsNotEmpty()
    gioitinh : string;

    @IsPhoneNumber('VN')
    phone: number;

    @IsInt()
    @Min(0)
    role: number;

    @IsOptional()
    is_active: boolean;

    @IsNotEmpty()
    verify_token : string;

    @IsOptional()
    allow_app : boolean;

    @IsOptional()
    allow_sms : boolean;

    @IsOptional()
    allow_email : boolean;
}