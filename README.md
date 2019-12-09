# @shiwangme/mysql

[![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin) [![npm](https://img.shields.io/npm/v/@shiwangme/mysql.svg)](https://npmjs.org/package/@shiwangme/mysql) [![npm](https://img.shields.io/npm/dt/@shiwangme/mysql.svg)](https://npmjs.org/package/@shiwangme/mysql) [![codebeat badge](https://codebeat.co/badges/13b9d4ff-2c65-41a2-ae6b-630f3daecb76)](https://codebeat.co/projects/github-com-shiwangme-ts-mysql-master) [![Build Status](https://travis-ci.org/shiwangme/ts-mysql.svg?branch=master)](https://travis-ci.org/shiwangme/ts-mysql) [![Coverage Status](https://coveralls.io/repos/github/shiwangme/ts-mysql/badge.svg)](https://coveralls.io/github/shiwangme/ts-mysql)

## 安装

```bash
yarn add @shiwangme/mysql
```

## 使用

此处给出的传统 Node.js 调用方式示例。同时，您可以在 Typescript 中使用。

### POOL

```js
const { pool } = require('@shiwangme/mysql');

(async(){
  // 传入配置，新建一个Pool，如果已有Pool则直接拿来使用
  const cn = await pool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test'
  }); // 根据当前数据库配置创建一个连接
  console.log(await cn.query('SELECT 1'));
})();
```

TS：

```typescript
import { pool, PoolConfig } from '@shiwangme/mysql';

const config: PoolConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root'
};

const mysql = pool(config);

mysql.query('select 1').then((x: object) => {
  console.log(x);
});
```

### CONNECTION

```js
const { connection } = require('@shiwangme/mysql');

(async(){
  // 传入配置，新建一个连接，，如果已有连接则直接拿来使用
  const cn = await connection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test'
  });
  console.log(await cn.query('SELECT 1'));
})();
```

### FORMAT

```js
const { pool, format } = require('@shiwangme/mysql');

(async(){
  const cn = await pool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test'
  });
  console.log(await cn.query(format('SELECT 1')));
})();
```

## License

Apache 2.0
