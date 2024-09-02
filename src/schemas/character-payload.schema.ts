export const characterPayloadSchema = {
    type: "object",
    properties: {
        name: {
            type: "string"
        },
        episodes: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid"
                    }
                },
                required: ["id"]
            }
        },
        planet: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    format: "uuid"
                }
            },
            required: ["id"]
        }
    },
    required: ["name"]
};