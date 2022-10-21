import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'media'})
export class MediaEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({name : 'filename', type : 'varchar', nullable : true})
    filename : string;

    @Column({name : 'path', type : 'varchar', nullable : true})
    path : string;

}