import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Class from 'App/Models/Class'

export default class ClassSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Class.createMany([
      {
        name: 'X_Matematika',
        schedule: 'Senin 07:00 - 09:00',
        room: 'Saintek 401',
      },
      {
        name: 'XI_Matematika',
        schedule: 'Senin 07:00 - 09:00',
        room: 'Saintek 402',
      },
      {
        name: 'XII_Matematika',
        schedule: 'Senin 07:00 - 09:00',
        room: 'Saintek 403',
      },
    ])
  }
}
