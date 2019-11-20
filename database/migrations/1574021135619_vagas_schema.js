'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VagasSchema extends Schema {
  up () {
    this.create('vagases', (table) => {
      table.increments()
      table.string('nomeVaga').notNullable()
      table.string('nomeEmpresa').notNullable()
      table.string('linkEmpresa').notNullable()
      table.string('endereco').notNullable()
      table.string('faixaSalarial').notNullable()
      table.string('contratacao').notNullable()
      table.string('beneficios').notNullable()
      table.integer('qntVagas').notNullable()
      table.text('descricao')
      table.text('requisitos')
      table.timestamps()
    })
  }

  down () {
    this.drop('vagases')
  }
}

module.exports = VagasSchema
