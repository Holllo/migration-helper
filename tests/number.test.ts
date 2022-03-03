import test from 'ava';

import {migrate, Migration} from '../source/migration-helper.js';

test('migrate<number>', async (t) => {
  const migrations: Array<Migration<number>> = [
    {
      version: 5,
      migrate: async (data: string) => `${data} migrated`,
    },
  ];

  const data = 'data';
  t.is(await migrate(data, 4, migrations), 'data migrated');
  t.is(await migrate(data, 6, migrations), data);
});
