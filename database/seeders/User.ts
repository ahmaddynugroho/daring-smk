import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        full_name: 'admin',
        username: 'admin',
        password: 'admin',
        user_type: 'admin',
      },
      {
        full_name: 'Joko Widodadi',
        username: 'joko',
        password: 'awokawok',
        user_type: 'guru',
      },
      {
        full_name: 'Muhammad Zaki',
        username: 'zaki',
        password: 'awokawok',
        user_type: 'siswa',
      },
    ])
  }
}
