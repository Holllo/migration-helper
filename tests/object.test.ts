import test from 'ava';

import {
  migrate,
  Migration,
  SkipMigrationFn,
} from '../source/migration-helper.js';

test('migrate<{custom: number}>', async (t) => {
  type Custom = {
    custom: number;
  };

  const skip: SkipMigrationFn<Custom> = (a, b) => a.custom > b.custom;
  const migrations: Array<Migration<Custom>> = [
    {
      version: {custom: 5},
      migrate: async (data: string) => `${data} migrated`,
    },
  ];

  const data = 'data';
  t.is(await migrate(data, {custom: 4}, migrations, skip), data);
  t.is(await migrate(data, {custom: 6}, migrations, skip), 'data migrated');
});
