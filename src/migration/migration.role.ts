import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationRole implements MigrationInterface{
    name: string;

    down(queryRunner: QueryRunner): Promise<any> {
        return Promise.resolve(undefined);
    }

    up(queryRunner: QueryRunner): Promise<any> {
        return Promise.resolve(undefined);
    }
    //
    // public async down(queryRunner : QueryRunner) : Promise<void>{}

}