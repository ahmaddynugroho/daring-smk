import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /**
   * isLoggedIn
   */
  public async isLoggedIn({ auth, view, response }: HttpContextContract) {
    await auth.use('web').check()

    if (auth.use('web').isLoggedIn) {
      response.redirect().toPath('/dashboard')
    } else {
      return view.render('welcome')
    }
  }

  /**
   * register
   */
  public async register({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const password_retype = request.input('password_retype')
    const user_type = request.input('user_type')

    if (password !== password_retype) {
      response.redirect('/register')
    } else {
      await User.create({
        email: email,
        password: password,
        user_type: user_type,
      })

      response.redirect('/')
    }
  }

  /**
   * login
   */
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const remember_me = request.input('remember_me')

    try {
      await auth.use('web').attempt(email, password, remember_me)
      response.redirect('/dashboard')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
