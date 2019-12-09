import { promisify } from 'util';
import debug from 'debug';
import mysql, { PoolConfig, Pool } from 'mysql';
import { md5 } from './utils';

type CachedPool = { [key: string]: Function };

const db: { [key: string]: Pool } = {};

const createPool = (key: string, options: PoolConfig): void => {
  db[key] = mysql.createPool(options);
};

export const pool = (options: PoolConfig = {}): CachedPool => {
  const key = md5(JSON.stringify(options));
  if (!db[key]) {
    createPool(key, options);
  }

  const result: CachedPool = {};
  const promiseFn = promisify(db[key].query).bind(db[key]);
  result.query = (sql: string): Promise<unknown> => {
    debug('swm:mysql:query')(sql);
    return promiseFn(sql);
  };
  return result;
};
