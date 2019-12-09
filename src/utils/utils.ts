import crypto from 'crypto';
import debug from 'debug';
import { promisify } from 'util';
import { Pool, Connection } from 'mysql';

export type CachedPool = { [key: string]: Function };
export type CachedConnection = { [key: string]: Function };

export const md5 = (str: string): string =>
  crypto
    .createHash('md5')
    .update(`${str}`)
    .digest('hex');

export const makeFn = (
  client: Pool | Connection
): CachedPool | CachedConnection => {
  const result: CachedPool | CachedConnection = {};
  const promiseFn = promisify(client.query).bind(client);
  result.query = (sql: string): Promise<unknown> => {
    debug('swm:mysql:query')(sql);
    return promiseFn(sql);
  };
  return result;
};
