import 'should';
import { pool } from '../src';
import config from './_config';

const client = pool(config);

test('query', async (): Promise<void> => {
  const rows = await client.query('SELECT 1');
  rows.should.have.length(1);
});
