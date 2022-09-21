import {IsInt, IsNotEmpty, IsOptional} from "class-validator";

export class BodyCreateCate{
    @IsNotEmpty()
    cate_name : string;

    @IsInt()
    time_notify : number;

    @IsInt()
    used_time : number;

    @IsOptional()
    priority : boolean;

    account?: string;
}

export class BodyUpdateCate{
    @IsOptional()
    cate_name : string;

    @IsInt()
    @IsOptional()
    time_notify : number;

    @IsInt()
    @IsOptional()
    used_time : number;

    @IsOptional()
    priority : boolean;

    account?: string
}

export class BodyDeleteCate{
    @IsNotEmpty()
    cate_name : string;

    @IsInt()
    time_notify : number;

    @IsInt()
    used_time : number;

    @IsOptional()
    priority : boolean;

    account?: string;
}