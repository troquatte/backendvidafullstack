'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    await User.create({
      nome: 'Dener Troquatte',
      email: 'd.troquatte20@yahoo.com.br',
      password: "12345"
    })
  }
}

module.exports = DatabaseSeeder
