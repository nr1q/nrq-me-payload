import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  // Migration code
  await payload.update({
    collection: 'works',
    where: {},
    data: {
      _status: 'draft',
    }
  })

  // const list = await payload.find({
  //   collection: 'works',
  //   depth: 1,
  // })
  // console.log(list);

}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  // Migration code
}
