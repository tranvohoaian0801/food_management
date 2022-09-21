import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";

export class BodyLogin{
    @IsNotEmpty()
    @IsEmail()
    username : string;

    @MinLength(6)
    password : string;
}

export class BodyRegister extends BodyLogin{
    @IsNotEmpty()
    fullname : string;

    @IsNotEmpty()
    gioitinh : string;

    @IsPhoneNumber('VN')
    phone : number;

    @IsNotEmpty()
    verify_token : string;
}