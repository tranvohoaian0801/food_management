import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ProductsEntity} from "../products/products.entity";
import {Account} from "../account/account.entity";

@Entity({name : 'pantry_management'})
export class PantryEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    pantry_id : string;

    @Column({name : 'storage_place', type : 'varchar', nullable : true})
    storage_place : string;

    @ManyToOne((type)=>Account,(account)=>account.pantry)
    @JoinColumn({name : 'account_id'})
    account : Account

    @CreateDateColumn({name : 'created_at', type : 'timestamp with time zone', nullable : true})
    created_at: Date;

    @UpdateDateColumn({name : 'updated_at', type : 'timestamp with time zone', nullable : true})
    updated_at : Date;

    @DeleteDateColumn({name : 'deleted_at', type : 'timestamp with time zone', nullable : true})
    deleted_at : Date;

    @OneToMany((type)=> ProductsEntity, (products) =>products.pantry)
    products : ProductsEntity[]

}