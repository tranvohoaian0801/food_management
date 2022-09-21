import {
    BaseEntity,
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import * as timers from "timers";
import {Account} from "../account/account.entity";
import {ProductsEntity} from "../products/products.entity";

@Entity({name : 'categories'})
export class CategoriesEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    cate_id : string;

    @Column({name : 'cate_name', type: 'varchar', nullable :true})
    cate_name : string;

    @Column({name : 'time_notify', type : 'numeric', nullable : true})
    time_notify : number;

    @Column({name : 'used_time', type : 'numeric', nullable : true})
    used_time : number;

    @Column({name : 'priority', nullable: true })
    priority : boolean;

    @ManyToOne((type)=> Account, (account) =>account.categories)
    @JoinColumn({name : 'created_by'})
    account: Account;

    @CreateDateColumn({name : 'created_at', type : 'timestamp with time zone', nullable : true})
    created_at : Date;

    @UpdateDateColumn({name : 'updated_at', type : 'timestamp with time zone', nullable : true})
    updated_at : Date;

    @DeleteDateColumn({name : 'deleted_at', type : 'timestamp with time zone', nullable : true})
    deleted_at : Date;

    @OneToMany((type) => ProductsEntity, (products)=>products.categories)
    products : ProductsEntity[]




}