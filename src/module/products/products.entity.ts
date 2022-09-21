import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Account} from "../account/account.entity";
import {ProductHistoryEntity} from "../products_history/productHistory.entity";
import {CategoriesEntity} from "../categories/categories.entity";
import {PantryEntity} from "../pantry_management/pantry.entity";
import {StateEntity} from "../state_history/state.entity";
import {usedUpIds} from "../../constant/products/product.constant";

@Entity({name : 'products'})
export class ProductsEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    product_id : string;

    @Column({name : 'image', type : 'varchar', nullable : true})
    image : string;

    @Column({name : 'name',type : 'varchar', nullable : true})
    name : string;

    @Column({name : 'date', type : 'timestamp with time zone', nullable : true})
    date : Date;

    @Column({name : 'total', type : 'numeric', nullable : true})
    total : number;

    @Column({name : 'is_active', nullable : true})
    is_active : boolean;

    @Column({name : 'used_up', type : 'enum', enum : usedUpIds, default : 1})
     state_used : number;

    @ManyToOne((type)=> CategoriesEntity, (categories)=>categories.products)
    @JoinColumn({name : 'category_by'})
    categories : CategoriesEntity;

    @ManyToOne((type)=> PantryEntity, (pantry)=>pantry.products)
    @JoinColumn({name: 'pantry_by'})
    pantry : PantryEntity;

    @ManyToOne((type) => Account, (account)=>account.products)
    @JoinColumn({name : 'created_by'})
    account : Account;

    @CreateDateColumn({name : 'created_at', type : 'timestamp with time zone',nullable : true})
    created_at: Date;

    @UpdateDateColumn({name : 'updated_at', type : 'timestamp with time zone', nullable : true})
    updated_at : Date;

    @DeleteDateColumn({name : 'deleted_at', type : 'timestamp with time zone', nullable : true})
    deleted_at : Date;

    @OneToMany((type)=> ProductHistoryEntity, (history)=>history.products)
    history : ProductHistoryEntity[];

    @OneToMany((type)=>StateEntity, (state) =>state.products)
    state : StateEntity[];

}