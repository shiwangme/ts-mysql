import { promisify } from 'util';
import debug from 'debug';
import mysql, { ConnectionConfig, Connection } from 'mysql';
import { md5 } from './utils';

type CachedConnection = { [key: string]: Function };

const db: { [key: string]: Connection } = {};

const createConnection = (key: string, options: ConnectionConfig): void => {
  db[key] = mysql.createConnection(options);
};

export const connection = (
  options: ConnectionConfig = {}
): CachedConnection => {
  const key = md5(JSON.stringify(options));
  if (!db[key]) {
    createConnection(key, options);
  }

  const result: CachedConnection = {};
  const promiseFn = promisify(db[key].query).bind(db[key]);
  result.query = (sql: string): Promise<unknown> => {
    debug('swm:mysql:query')(sql);
    return promiseFn(sql);
  };
  return result;
};
