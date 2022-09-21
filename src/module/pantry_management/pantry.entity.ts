import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ProductsEntity} from "../products/products.entity";

@Entity({name : 'pantry_management'})
export class PantryEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    pantry_id : string;

    @Column({name : 'storage_place', type : 'varchar', nullable : true})
    storage_place : string;

    @CreateDateColumn({name : 'created_at', type : 'timestamp with time zone', nullable : true})
    created_at: Date;

    @UpdateDateColumn({name : 'updated_at', type : 'timestamp with time zone', nullable : true})
    updated_at : Date;

    @DeleteDateColumn({name : 'deleted_at', type : 'timestamp with time zone', nullable : true})
    deleted_at : Date;

    @OneToMany((type)=> ProductsEntity, (products) =>products.pantry)
    products : ProductsEntity[]

}