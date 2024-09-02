import {DataSource, DataSourceOptions} from "typeorm";
import {dataSourceConfig} from "./data-source-config";

let promisedDataSource: Promise<DataSource> | null = null;

export const acquireDataSource = async (dsOptions: DataSourceOptions = {...dataSourceConfig}): Promise<DataSource> => {
    if (promisedDataSource) {
        return promisedDataSource;
    }
    promisedDataSource = new DataSource(dsOptions).initialize();
    return promisedDataSource;
}
