import {IsDate, IsNotEmpty, IsOptional} from "class-validator";

export class BodyProductCreate{
    @IsNotEmpty()
    image : string;

    @IsNotEmpty()
    name : string;

    @IsDate()
    date : Date;

    @IsNotEmpty()
    total : number;

    @IsOptional()
    is_active : boolean;

    @IsNotEmpty()
    state_used : number;

    @IsNotEmpty()
    categories? : string;

    @IsNotEmpty()
    pantry? : string;

    @IsNotEmpty()
    account? : string;
}

export class BodyProductUpdate {
    @IsOptional()
    image: string;

    @IsOptional()
    name : string;

    @IsOptional()
    @IsDate()
    date : Date;

    @IsOptional()
    total : number;

    @IsOptional()
    is_active : boolean;

    @IsOptional()
    state_used : number;

    @IsOptional()
    categories? : string;

    @IsOptional()
    pantry? : string;

    @IsOptional()
    account? : string;
}

export class BodyProductDelete {
    @IsNotEmpty()
    name : string;

    @IsDate()
    date : Date;

    @IsNotEmpty()
    total : number;

    @IsOptional()
    is_active : boolean;

    @IsNotEmpty()
    state_used : number;
}

export class BodyUploadFileProduct{
    @IsOptional()
    image : string;
}
