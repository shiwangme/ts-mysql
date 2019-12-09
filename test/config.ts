import 'should';
import { connection, pool } from '../src';

test('default config', () => {
  const client = connection({
    host: '127.0.0.1'
  });
  client.should.be.an.Object();
});

test('default config', () => {
  const client = connection();
  client.should.be.an.Object();
});

test('default config', () => {
  const client = connection();
  client.should.be.an.Object();
});

test('default config', () => {
  const client = pool({
    host: '127.0.0.1'
  });
  client.should.be.an.Object();
});

test('default config', () => {
  const client = pool();
  client.should.be.an.Object();
});

test('default config', () => {
  const client = pool();
  client.should.be.an.Object();
});
