import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from "bcryptjs";
import {RoleEntity} from "../role/role.entity";
import {CategoriesEntity} from "../categories/categories.entity";
import {ProductsEntity} from "../products/products.entity";

@Entity({name : 'account'})
export class Account extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    account_id : string;

    @Column({name : 'username', type : 'varchar', nullable : true})
    username : string;

    @Column({name : 'password', type : 'varchar', nullable : true})
    password : string;

    @Column({name : 'fullname', type : 'varchar', nullable : true})
    fullname : string;

    @Column({name : 'gioitinh', type : 'varchar', nullable : true})
    gioitinh : string;

    @Column({name : 'phone', type : 'numeric',nullable : true})
    phone : number;

    @ManyToOne((type) => RoleEntity, (role)=> role.account)
    @JoinColumn({name : 'role_id'})
    role :  RoleEntity | number;

    @Column({ default : false, name : 'is_active', nullable : true})
    is_active : boolean;

    @Column({name : 'verify_token', type : 'varchar', nullable : true})
    verify_token : string;

    @Column({default : true, name : 'allow_app', nullable : true} )
    allow_app : boolean;

    @Column({default : true, name : 'allow_sms', nullable : true})
    allow_sms : boolean;

    @Column({default : false, name : 'allow_email', nullable : true})
    allow_email : boolean;

    @CreateDateColumn({name : 'created_at', type : 'timestamp with time zone', nullable : true})
    created_at: Date;

    @UpdateDateColumn({name : 'updated_at', type : 'timestamp with time zone', nullable : true})
    updated_at : Date;

    @DeleteDateColumn({name : 'deleted_at', type : 'timestamp with time zone', nullable : true})
    deleted_at : Date;

    @OneToMany((type) => CategoriesEntity, (categories)=>categories.account)
    categories : CategoriesEntity[]

    @OneToMany((type)=> ProductsEntity, (products) =>products.account)
    products : ProductsEntity []

    // validate password
     isPasswordValid(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }


}