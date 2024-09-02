// to be used by migrations, seeders, scripts etc.

import {configDotenv} from "dotenv";
configDotenv();

import {DataSource} from "typeorm";
import {dataSourceConfig} from "./data-source-config";

export default new DataSource({
    ...dataSourceConfig
});
