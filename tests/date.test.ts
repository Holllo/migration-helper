import test from 'ava';

import {migrate, Migration} from '../source/migration-helper.js';

test('migrate<Date>', async (t) => {
  const migrations: Array<Migration<Date>> = [
    {
      version: new Date('2022-01-01'),
      migrate: async (data: string) => `${data} migrated`,
    },
  ];

  function offsetDate(offset: number): Date {
    const d = new Date(migrations[0].version);
    d.setDate(d.getDate() + offset);
    return d;
  }

  const data = 'data';
  t.is(await migrate(data, offsetDate(-1), migrations), 'data migrated');
  t.is(await migrate(data, offsetDate(1), migrations), data);
});
