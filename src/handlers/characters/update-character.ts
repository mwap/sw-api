import * as charactersService from "../../services/characters.service";
import {ValidatedEventAPIGatewayProxyEvent} from "../../utils/api-gateway";
import {middyfy} from "../../utils/lambda";
import {AppError} from "../../utils/app-error";
import {characterPayloadSchema} from "../../schemas/character-payload.schema";
import {isUuid} from "../../utils/is-uuid";

// for the sake of simplicity we support only full updates
const handler: ValidatedEventAPIGatewayProxyEvent<typeof characterPayloadSchema> = async (event) => {
    const characterId = event.pathParameters.characterId;
    const data = JSON.parse(event.body);

    try {
        if (!isUuid(characterId)) {
            throw new AppError("Not a UUID", 400);
        }

        const updatedCharacter = await charactersService.updateCharacter(characterId, {
            name: data.name,
            planet: data.planet || null,
            episodes: data.episodes || [],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Character updated successfully",
                data: updatedCharacter,
            }),
        };

    } catch (error) {
        error = error as Error | AppError;
        console.error("Error updating character:", error);

        return {
            statusCode: "code" in error ? error.code : 500,
            body: JSON.stringify({
                message: "An error occurred while updating the character",
                ...(process.env.stage !== "production" ? { error: error.message } : {})
            }),
        };
    }
};

export const main = middyfy(handler);
