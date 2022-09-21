import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ProductsEntity} from "../products/products.entity";

@Entity('state_history')
export class StateEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({name : 'when_expired',nullable : true})
    when_expired : boolean;

    @ManyToOne((type)=>ProductsEntity, (products)=>products.state)
    @JoinColumn({name : 'products_by'})
    products : ProductsEntity;

    @CreateDateColumn({name : 'created_at', type : 'timestamp with time zone',nullable : true})
    created_at: Date;

    @UpdateDateColumn({name : 'updated_at', type : 'timestamp with time zone', nullable : true})
    updated_at : Date;

    @DeleteDateColumn({name : 'deleted_at', type : 'timestamp with time zone', nullable : true})
    deleted_at : Date;
}