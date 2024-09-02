import type {AWS} from '@serverless/typescript';
import * as path from "node:path";
import {characterPayloadSchema} from "./schemas/character-payload.schema";

const HANDLERS_DIR = path.join("src", "handlers");

export const endpoints: AWS["functions"] = {
    createCharacter: {
        handler: path.join(HANDLERS_DIR, "characters", "create-character.main"),
        events: [
            {
                http: {
                    method: 'post',
                    path: 'characters',
                    request: {
                        schemas: {
                            'application/json': characterPayloadSchema,
                        },
                    },
                },
            },
        ],
    },
    getCharacters: {
        handler: path.join(HANDLERS_DIR, "characters", "get-characters.main"),
        events: [
            {
                http: {
                    method: 'get',
                    path: 'characters',
                    request: {
                        parameters: {
                            querystrings: {
                                page: true,
                                limit: true,
                            },
                        },
                    },
                },
            },
        ],
    },
    updateCharacter: {
        handler: path.join(HANDLERS_DIR, "characters", "update-character.main"),
        events: [
            {
                http: {
                    method: 'put',
                    path: 'characters/{characterId}',
                    request: {
                        parameters: {
                            paths: {
                                characterId: true,
                            },
                        },
                        schemas: {
                            'application/json': characterPayloadSchema,
                        },
                    },
                },
            },
        ],
    },

    deleteCharacter: {
        handler: path.join(HANDLERS_DIR, "characters", "delete-character.main"),
        events: [
            {
                http: {
                    method: 'delete',
                    path: 'characters/{characterId}',
                    request: {
                        parameters: {
                            paths: {
                                characterId: true,
                            },
                        },
                    },
                },
            },
        ],
    },
}
