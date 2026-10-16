import { DATA_SOURCE_MODE } from "./config";
import { databaseDataSource } from "./databaseDataSource";
import { demoDataSource } from "./demoDataSource";
import type { DataSource } from "./dataSource.types";

export { DataSourceError, getErrorMessage } from "./dataSource.types";
export type { DataSource } from "./dataSource.types";

/**
 * Returns the active data source.
 * Everything in the app calls this function instead of importing an adapter
 * directly, which is what makes switching to a database a one-line change.
 */
export function getDataSource(): DataSource {
  return DATA_SOURCE_MODE === "database" ? databaseDataSource : demoDataSource;
}
