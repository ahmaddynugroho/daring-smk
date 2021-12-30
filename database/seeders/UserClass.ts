import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class UserClassSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database.table('user_classes').multiInsert([
      {
        user_id: 2,
        class_id: 1,
      },
      {
        user_id: 2,
        class_id: 2,
      },
      {
        user_id: 2,
        class_id: 3,
      },
    ])
  }
}
