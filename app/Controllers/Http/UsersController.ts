import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  private routes = {
    siswa: '/siswa',
    guru: '/guru',
    admin: '/admin',
  }

  private renders = {
    siswa: 'siswa.index',
    guru: 'guru.index',
    admin: 'admin.index',
  }

  /**
   * register
   */
  public async register({ request, response }: HttpContextContract) {
    const full_name = request.input('full_name')
    const username = request.input('username')
    const password = request.input('password')
    const password_retype = request.input('password_retype')
    const user_type = request.input('user_type')

    if (password !== password_retype) {
      response.redirect('/register')
    } else {
      await User.create({
        full_name,
        username,
        password,
        user_type,
      })

      response.redirect('/')
    }
  }

  /**
   * login
   */
  public async login({ auth, request, response }: HttpContextContract) {
    const username = request.input('username')
    const password = request.input('password')
    const remember_me = request.input('remember_me')

    try {
      await auth.use('web').attempt(username, password, remember_me)
      const user_type = auth.use('web').user?.user_type
      response.redirect(this.routes[user_type])
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  /**
   * logout
   */
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/')
  }

  /**
   * pageLogin
   */
  public async pageLogin({ auth, view, response }: HttpContextContract) {
    await auth.use('web').check()

    if (auth.use('web').isLoggedIn) {
      response.redirect(this.routes[auth.use('web').user?.user_type])
    } else {
      return view.render('welcome')
    }
  }

  /**
   * pageRegister
   */
  public async pageRegister({ auth, response, view }: HttpContextContract) {
    await auth.use('web').check()

    if (auth.user?.user_type === 'admin') {
      return view.render('register')
    } else {
      response.redirect('/')
    }
  }

  /**
   * pageAdmin
   */
  public async pageAdminGuruSiswa({ auth, route, response, view }: HttpContextContract) {
    await auth.use('web').check()
    const user_type = auth.use('web').user?.user_type

    if (route?.pattern === this.routes[user_type]) {
      return view.render(this.renders[user_type])
    } else {
      response.redirect(this.routes[user_type])
    }
  }
}
