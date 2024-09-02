import {PlanetModel} from "../models/planet.model";
import {AppError} from "../utils/app-error";
import {acquireDataSource} from "../db/data-source";

export const getPlanetById = async (id: string): Promise<PlanetModel> => {
    const dataSource = await acquireDataSource();

    const planetsRepo = dataSource.getRepository(PlanetModel);

    const planetEntity = await planetsRepo.findOne({where: {id}});
    if (!planetEntity) {
        throw new AppError("Incorrect planet id", 400);
    }
    return planetEntity;
}