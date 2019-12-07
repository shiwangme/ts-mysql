import { promisify } from 'util';
import crypto from 'crypto';
import debug from 'debug';
import mysql, { PoolConfig, Pool } from 'mysql';

type CachedPool = { [key: string]: Function };

const md5 = (str: string): string =>
  crypto
    .createHash('md5')
    .update(`${str}`)
    .digest('hex');

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
