// Mocking the dependencies
import {acquireDataSource} from "../../src/db/data-source";
import {getEpisodesByIds} from "../../src/services/episodes.service";
import {AppError} from "../../src/utils/app-error";

jest.mock('../../src/db/data-source');
jest.mock('../../src/models/episode.model');

describe('Episodes Service', () => {
    let episodesRepo: any;
    let dataSource: any;

    beforeEach(() => {
        jest.clearAllMocks();

        episodesRepo = {
            findByIds: jest.fn()
        };

        dataSource = {
            getRepository: jest.fn().mockReturnValue(episodesRepo)
        };

        (acquireDataSource as jest.MockedFunction<typeof acquireDataSource>).mockResolvedValue(dataSource);
    });

    describe("getEpisodesByIds", () => {
        it('should return the episodes for valid IDs', async () => {
            const episodes = [
                {id: '1', name: 'Episode 1'},
                {id: '2', name: 'Episode 2'}
            ];

            episodesRepo.findByIds.mockResolvedValue(episodes);

            const result = await getEpisodesByIds(['1', '2']);
            expect(result).toEqual(episodes);
            expect(episodesRepo.findByIds).toHaveBeenCalledWith(['1', '2']);
        });

        it('should throw an error if any episode ID is incorrect', async () => {
            const episodes = [
                {id: '1', name: 'Episode 1'}
            ];

            episodesRepo.findByIds.mockResolvedValue(episodes);

            await expect(getEpisodesByIds(['1', '2'])).rejects.toThrow(AppError);
            await expect(getEpisodesByIds(['1', '2'])).rejects.toThrow('Incorrect episode id');
            expect(episodesRepo.findByIds).toHaveBeenCalledWith(['1', '2']);
        });

        it('should handle empty episode ID list', async () => {
            episodesRepo.findByIds.mockResolvedValue([]);

            const result = await getEpisodesByIds([]);
            expect(result).toEqual([]);
            expect(episodesRepo.findByIds).toHaveBeenCalledWith([]);
        });
    });

});