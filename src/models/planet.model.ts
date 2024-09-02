import {Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CharacterModel} from "./character.model";

@Entity("planet")
export class PlanetModel {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({type: "varchar"})
    public name!: string;

    @OneToMany(() => CharacterModel, character => character.planet)
    public characters!: CharacterModel[];

    @CreateDateColumn({ type: "timestamp" })
    @Index()
    public creationDate!: Date;
}
