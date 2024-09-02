import * as charactersService from "../../services/characters.service";
import {middyfy} from "../../utils/lambda";
import type {ValidatedEventAPIGatewayProxyEvent} from "../../utils/api-gateway";
import {characterPayloadSchema} from "../../schemas/character-payload.schema";
import {AppError} from "../../utils/app-error";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof characterPayloadSchema> = async (event) => {
    const data = JSON.parse(event.body);

    try {
        const newCharacter = await charactersService.createCharacter({
            name: data.name,
            planet: data.planet,
            episodes: data.episodes,
        })

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Character created successfully",
                data: newCharacter,
            }),
        };

    } catch (error) {
        error = error as Error | AppError;
        console.error("Error creating character:", error);

        return {
            statusCode: "code" in error ? error.code : 500,
            body: JSON.stringify({
                message: "An error occurred while creating character",
                ...(process.env.stage !== "production" ? {error: error.message} : {})
            }),
        };
    }
};

export const main = middyfy(handler);
