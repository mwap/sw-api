import * as charactersService from "../../services/characters.service";
import {middyfy} from "../../utils/lambda";
import type {ValidatedEventAPIGatewayProxyEvent} from "../../utils/api-gateway";
import {AppError} from "../../utils/app-error";
import {isUuid} from "../../utils/is-uuid";

const handler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    const characterId = event.pathParameters.characterId;

    try {
        if (!isUuid(characterId)) {
            throw new AppError("Not a UUID", 400);
        }

        await charactersService.deleteCharacter(characterId);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Character deleted successfully",
            }),
        };

    } catch (error) {
        error = error as Error | AppError;
        console.error("Error deleting character:", error);

        return {
            statusCode: "code" in error ? error.code : 500,
            body: JSON.stringify({
                message: "An error occurred while deleting the character",
                ...(process.env.stage !== "production" ? { error: error.message } : {})
            }),
        };
    }
};

export const main = middyfy(handler);
