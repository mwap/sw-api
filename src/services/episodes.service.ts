import {AppError} from "../utils/app-error";
import {acquireDataSource} from "../db/data-source";
import {EpisodeModel} from "../models/episode.model";

export const getEpisodesByIds = async (ids: string[]): Promise<EpisodeModel[]> => {
    const dataSource = await acquireDataSource();

    const episodesRepo = dataSource.getRepository(EpisodeModel);

    const episodeEntities = await episodesRepo.findByIds(ids);

    // Check if all provided episode IDs were found, otherwise throw an error
    const foundEpisodeIds = new Set(episodeEntities.map((episode) => episode.id));
    for (const episodeId of ids) {
        if (!foundEpisodeIds.has(episodeId)) {
            throw new AppError("Incorrect episode id", 400);
        }
    }

    return episodeEntities;
}
