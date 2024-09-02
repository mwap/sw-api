import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {EpisodeModel} from "./episode.model";
import {PlanetModel} from "./planet.model";

@Entity("character")
export class CharacterModel {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({type: "varchar"})
    public name!: string;

    @ManyToMany(() => EpisodeModel, episode => episode.characters, {eager: true})
    @JoinTable()
    public episodes: EpisodeModel[];

    @ManyToOne(() => PlanetModel, planet => planet.characters, {eager: true, nullable: true})
    public planet: PlanetModel | null;

    @CreateDateColumn({ type: "timestamp" })
    @Index()
    public creationDate!: Date;
}
