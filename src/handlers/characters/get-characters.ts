import * as charactersService from "../../services/characters.service";
import {middyfy} from "../../utils/lambda";
import type {ValidatedEventAPIGatewayProxyEvent} from "../../utils/api-gateway";
import {characterPayloadSchema} from "../../schemas/character-payload.schema";
import {AppError} from "../../utils/app-error";

const handler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    const {page, limit} = event.queryStringParameters || {};
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = Math.min(parseInt(limit, 10) || 10, 100);

    try {
        if (pageNumber < 1 || limitNumber < 1) {
            throw new AppError("Invalid pagination params", 400);
        }

        const charactersList = await charactersService.getCharacters({
            page: pageNumber,
            limit: limitNumber,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Characters retrieved successfully",
                data: charactersList,
            }),
        };

    } catch (error) {
        error = error as Error | AppError;
        console.error("Error retrieving characters:", error);

        return {
            statusCode: "code" in error ? error.code : 500,
            body: JSON.stringify({
                message: "An error occurred while retrieving characters",
                ...(process.env.stage !== "production" ? {error: error.message} : {})
            }),
        };
    }
};

export const main = middyfy(handler);
