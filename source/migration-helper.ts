/**
 * A {@link Migration} contains a target version and a migrate function.
 *
 * The version is used to determine whether the migration has yet to be applied
 * or if it needs to be skipped, see {@link SkipMigrationFn} for details.
 *
 * The migrate function should take the data you pass through {@link migrate}
 * and modify it to your needs.
 */
export type Migration<V> = {
  version: V;
  migrate: (data: any) => Promise<unknown>;
};

/**
 * A function that determines if a {@link Migration} should be skipped.
 *
 * The first argument will be the version of the current {@link Migration} being
 * tested, while the second argument will be the version passed into
 * {@link migrate}.
 *
 * If left undefined, `a <= b` will be used. This works for {@link Date dates},
 * {@link Number numbers} and {@link String strings}. So if you want to use a
 * different type for versioning you should create your own function.
 */
export type SkipMigrationFn<V> = (a: V, b: V) => boolean;

/**
 * Migrate some data to the specified version.
 *
 * See {@link Migration} and {@link SkipMigrationFn} for details on creating
 * migrations and a custom skip function.
 */
export async function migrate<V>(
  data: unknown,
  version: V,
  migrations: Array<Migration<V>>,
  skip: SkipMigrationFn<V> = (a, b) => a <= b,
): Promise<unknown> {
  let migratedData = data;

  for (const migration of migrations) {
    if (skip(migration.version, version)) {
      continue;
    }

    migratedData = await migration.migrate(migratedData);
  }

  return migratedData;
}
