import test from 'ava';

import {migrate, Migration} from '../source/migration-helper.js';

test('migrate<string>', async (t) => {
  const migrations: Array<Migration<string>> = [
    {
      version: '0.2.4',
      migrate: async (data: string) => `${data} migrated`,
    },
  ];

  const data = 'data';
  t.is(await migrate(data, '0.2.3', migrations), 'data migrated');
  t.is(await migrate(data, '0.2.5', migrations), data);
});
