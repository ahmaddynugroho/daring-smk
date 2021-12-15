/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/', 'UsersController.login')
Route.get('/', 'UsersController.pageLogin')

Route.group(() => {
  Route.post('/register', 'UsersController.register')
  Route.get('/register', 'UsersController.pageRegister')

  Route.post('/admin', 'UsersController.logout')
  Route.get('/admin', 'UsersController.pageAdminGuruSiswa')

  Route.post('/guru', 'UsersController.logout')
  Route.get('/guru', 'UsersController.pageAdminGuruSiswa')

  Route.post('/siswa', 'UsersController.logout')
  Route.get('/siswa', 'UsersController.pageAdminGuruSiswa')
}).middleware('auth')
