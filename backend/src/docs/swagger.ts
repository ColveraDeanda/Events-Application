import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Ticketmaster | API Documentation",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:5000",
        },
    ],
    components: {
        securitySchemes: {
            basicAuth: {
                type: "http",
                scheme: "basic",
            },
        },
        schemas: {
            user: {
                type: "object",
                required: ["username", "email"],
                properties: {
                    username: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    authentication: {
                        type: "object",
                        required: ["password"],
                        properties: {
                            password: {
                                type: "string",
                            },
                            salt: {
                                type: "string",
                            },
                            sessionToken: {
                                type: "string",
                            },
                        },
                    },
                },
            },
            event: {
                type: "object",
                required: ["userId", "name", "image", "url", "type", "date", "venue", "classifications", "priceRanges"],
                properties: {
                    userId: {
                        type: "string",
                    },
                    name: {
                        type: "string",
                    },
                    image: {
                        type: "string",
                    },
                    url: {
                        type: "string",
                    },
                    type: {
                        type: "string",
                    },
                    info: {
                        type: "string",
                    },
                    date: {
                        type: "object",
                        required: ["localDate", "localTime", "timezone"],
                        properties: {
                            localDate: {
                                type: "string",
                            },
                            localTime: {
                                type: "string",
                            },
                            timezone: {
                                type: "string",
                            },
                        },
                    },
                    venue: {
                        type: "object",
                        required: ["name", "city", "country"],
                        properties: {
                            name: {
                                type: "string",
                            },
                            city: {
                                type: "string",
                            },
                            country: {
                                type: "string",
                            },
                        },
                    },
                    classifications: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                    priceRanges: {
                        type: "array",
                        items: {
                            type: "object",
                            required: ["type", "currency", "min", "max"],
                            properties: {
                                type: {
                                    type: "string",
                                },
                                currency: {
                                    type: "string",
                                },
                                min: {
                                    type: "number",
                                },
                                max: {
                                    type: "number",
                                },
                            },
                        },
                    },
                    review: {
                        type: "string",
                    },
                },
            },
        },
    },
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);