import {Column, CreateDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {CharacterModel} from "./character.model";

@Entity("episode")
export class EpisodeModel {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({type: "varchar"})
    public name!: string;

    @ManyToMany(() => CharacterModel, character => character.episodes)
    characters: CharacterModel[];

    @CreateDateColumn({ type: "timestamp" })
    @Index()
    public creationDate!: Date;
}
