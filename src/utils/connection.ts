import mysql, { ConnectionConfig, Connection } from 'mysql';
import { jsonMd5, makeFn, CachedConnection } from './utils';

const db: { [key: string]: Connection } = {};

const createConnection = (key: string, options: ConnectionConfig): void => {
  db[key] = mysql.createConnection(options);
};

export const connection = (
  options: ConnectionConfig = {}
): CachedConnection => {
  const key = jsonMd5(options);
  if (!db[key]) {
    createConnection(key, options);
  }

  return makeFn(db[key]);
};
