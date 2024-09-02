import {CharacterModel} from "../models/character.model";
import {acquireDataSource} from "../db/data-source";
import {AppError} from "../utils/app-error";
import {getPlanetById} from "./planets.service";
import {getEpisodesByIds} from "./episodes.service";

export interface CharacterDataPayload {
    name: string;
    episodes?: {
        id: string,
    }[];
    planet?: {
        id: string,
    }
}

export interface GetCharactersParams {
    page: number;
    limit: number;
}

export const createCharacter = async (characterDataPayload: CharacterDataPayload): Promise<CharacterModel> => {
    const dataSource = await acquireDataSource();

    const charactersRepo = dataSource.getRepository(CharacterModel);

    const characterModel = new CharacterModel();
    characterModel.name = characterDataPayload.name;

    const {episodes, planet} = characterDataPayload;

    if (episodes) {
        const episodesSet = new Set(episodes.map(e => e.id));
        if (episodesSet.size !== episodes.length) {
            throw new AppError("Episodes contains duplicates", 400);
        }

        const episodeIds = episodes.map((episode) => episode.id);
        const episodeEntities = await getEpisodesByIds(episodeIds);

        characterModel.episodes = episodeEntities;
    }

    if (planet) {
        const planetEntity = await getPlanetById(planet.id);
        characterModel.planet = planetEntity;
    }

    return await charactersRepo.save(characterModel);
};

export const getCharacters = async ({ page, limit }: GetCharactersParams): Promise<{ characters: CharacterModel[], totalCount: number }> => {
    const dataSource = await acquireDataSource();

    const charactersRepo = dataSource.getRepository(CharacterModel);

    const [characters, totalCount] = await charactersRepo.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: {
            creationDate: "DESC",
        }
    });

    return {
        characters,
        totalCount
    };
};

export const updateCharacter = async (characterId: string, characterDataPayload: CharacterDataPayload): Promise<CharacterModel> => {
    const dataSource = await acquireDataSource();

    const charactersRepo = dataSource.getRepository(CharacterModel);

    const character = await charactersRepo.findOne({ where: { id: characterId } });

    if (!character) {
        throw new AppError("Character not found", 404);
    }

    character.name = characterDataPayload.name;
    character.planet = character.episodes = null;

    const { episodes, planet } = characterDataPayload;

    if (episodes) {
        const episodesSet = new Set(episodes.map(e => e.id));
        if (episodesSet.size !== episodes.length) {
            throw new AppError("Episodes contains duplicates", 400);
        }

        const episodeIds = episodes.map((episode) => episode.id);
        const episodeEntities = await getEpisodesByIds(episodeIds);

        character.episodes = episodeEntities;
    }

    if (planet) {
        const planetEntity = await getPlanetById(planet.id);
        character.planet = planetEntity;
    }

    return await charactersRepo.save(character);
};

export const deleteCharacter = async (characterId: string): Promise<void> => {
    const dataSource = await acquireDataSource();
    const charactersRepo = dataSource.getRepository(CharacterModel);

    const character = await charactersRepo.findOne({ where: { id: characterId } });

    if (!character) {
        throw new AppError("Character not found", 404);
    }

    await charactersRepo.remove(character);
};