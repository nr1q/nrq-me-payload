import * as migration_20260107_193800_add_versioning_to_work_entries from './20260107_193800_add_versioning_to_work_entries';

export const migrations = [
  {
    up: migration_20260107_193800_add_versioning_to_work_entries.up,
    down: migration_20260107_193800_add_versioning_to_work_entries.down,
    name: '20260107_193800_add_versioning_to_work_entries'
  },
];
