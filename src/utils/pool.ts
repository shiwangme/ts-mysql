import mysql, { PoolConfig, Pool } from 'mysql';
import { jsonMd5, makeFn, CachedPool } from './utils';

const db: { [key: string]: Pool } = {};

const createPool = (key: string, options: PoolConfig): void => {
  db[key] = mysql.createPool(options);
};

export const pool = (options: PoolConfig = {}): CachedPool => {
  const key = jsonMd5(options);
  if (!db[key]) {
    createPool(key, options);
  }

  return makeFn(db[key]);
};
