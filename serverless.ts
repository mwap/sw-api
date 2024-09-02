import type {AWS} from '@serverless/typescript';

import {endpoints} from "./src/api";
import {configDotenv} from "dotenv";

configDotenv();

const serverlessConfiguration: AWS = {
    service: 'starwars',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild'],
    provider: {
        name: 'aws',
        runtime: 'nodejs20.x',
        region: "eu-central-1",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            DB_HOST: process.env.DB_HOST,
            DB_PORT: process.env.DB_PORT,
            DB_USERNAME: process.env.DB_USERNAME,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_NAME: process.env.DB_NAME,
            STAGE: process.env.STAGE,
            TEST: "1",
        },
    },
    // import the function via paths
    functions: {...endpoints},
    package: {individually: true},
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node20',
            define: {'require.resolve': undefined},
            platform: 'node',
            concurrency: 10,
        },
    },
};

module.exports = serverlessConfiguration;
