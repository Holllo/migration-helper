# migration-helper

> A tiny helper library for migrating data.

* Zero dependencies
* 100% code coverage
* TypeScript definitions included

## Usage

```sh
npm install migration-helper
```

```ts
import {migrate, Migration} from 'migration-helper';

// Your data that needs migrating.
const data = 'data';

// Your data's current version.
const version = '1.0.0';

// Create some migrations to apply.
const migrations: Array<Migration<string>> = [
  {
    version: '1.0.1',
    migrate: async (data: string) => `${data} migrated`,
  },
  {
    version: '1.0.2',
    migrate: async (data: string) => `${data} (again!)`,
  },
];

// Migrate your data.
const migrated = migrate(data, version, migrations);

// Congratulations, your data is now on version 1.0.2!
console.log(migrated);
```

See [the tests directory] for how to use `number`, `Date` or a custom way of versioning.

[the tests directory]: tests/
