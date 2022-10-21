import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Account} from "../account/account.entity";
import {ProductHistoryEntity} from "../products_history/productHistory.entity";
import {CategoriesEntity} from "../categories/categories.entity";
import {PantryEntity} from "../pantry_management/pantry.entity";
import {StateEntity} from "../state_history/state.entity";
import {usedEnum, useUpNames} from "../../constant/products/product.constant";
import {BodyUploadFileProduct} from "./products.dto";
import {MediaEntity} from "../media/media.entity";

@Entity({name : 'products'})
export class ProductsEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    product_id : string;

    @Column({name : 'avatarId', type : 'varchar', nullable : true})
    // @JoinColumn({name : 'avatarId'})
    @OneToOne(
        () => MediaEntity,{
            nullable : true,
        }
    )
    image? : MediaEntity | string;

    // @Column()
    // avatars? : string;

    @Column({name : 'name',type : 'varchar', nullable : true})
    name : string;

    @Column({name : 'date', type : 'varchar', nullable : true})
    date : string;

    @Column({name : 'total', type : 'numeric', nullable : true})
    total : number;

    @Column({name : 'is_active', nullable : true})
    is_active : boolean;

    @Column({name : 'used_up', type : 'varchar',  default : usedEnum.NEW_PRODUCT})
     state_used : string;

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