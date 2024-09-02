import {DataSourceOptions} from "typeorm";
import {CharacterModel} from "../models/character.model";
import {EpisodeModel} from "../models/episode.model";
import {PlanetModel} from "../models/planet.model";

export const dataSourceConfig: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        CharacterModel,
        EpisodeModel,
        PlanetModel,
    ],
    migrations: [
        __dirname + "/migrations/*{.js,.ts}"
    ],
};