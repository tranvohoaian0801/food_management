import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {ProductsEntity} from "../products/products.entity";

@Entity('history')
export class ProductHistoryEntity {
    @PrimaryGeneratedColumn('uuid')
    history_id : string;

    @Column({name : 'quantity',  type : 'numeric' , nullable : true})
    quantity : number;

    @Column({name : 'measurement', type : 'varchar', nullable : true})
    measurement : string;

    @ManyToOne((type)=> ProductsEntity, (products) =>products.history)
    @JoinColumn({ name : 'product_id'})
    products : ProductsEntity

    @CreateDateColumn({name : 'created_at', type : 'timestamp with time zone',nullable : true})
    created_at: Date;

    @UpdateDateColumn({name : 'updated_at', type : 'timestamp with time zone',nullable : true})
    updated_at: Date;

    @DeleteDateColumn({name : 'deleted_at', type : 'timestamp with time zone',nullable : true})
    deleted_at: Date;

}