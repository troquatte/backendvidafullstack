'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Vagas = use('App/Models/Vagas')
const HelpersStatusCode = use('App/Helpers/StatusCode')

/**
 * Resourceful controller for interacting with vagases
 */
class VagasController {
  /**
   * Show a list of all vagases.
   * GET vagases
   */
  async index ({ request }) {
    let { page, perPage } = request.all();

    if(!page){
      page = 1
    }

    if(!perPage){
      perPage = 10
    }

    const findAll = await Vagas.query().paginate(page,perPage)
    return findAll
  }

  /**
   * Create/save a new vagas.
   * POST vagases
   */
  async store ({ request }) {
    const all = request.all()
    await Vagas.create(all)  

    return HelpersStatusCode.status200()
  }

  /**
   * Display a single vagas.
   * GET vagases/:id
   */
  async show ({ params, request }) {
    const find = await Vagas.find(params.id)

    return find
  }

  /**
   * Update vagas details.
   * PUT or PATCH vagases/:id
   */
  async update ({ params, request, response }) {
    const requestAll = request.all()

    const find = await Vagas.find(params.id)

    if(!find){
      response.status(404)
      return HelpersStatusCode.status404()
    }

    find.merge({...requestAll})    
    
    await find.save()

    return HelpersStatusCode.status200()
  }

  /**
   * Delete a vagas with id.
   * DELETE vagases/:id
   */
  async destroy ({ params, response }) {
    
    const find = await Vagas.find(params.id)

    if(!find){
       response.status(404)
       return HelpersStatusCode.status404()
    }

    await find.delete()

    return HelpersStatusCode.status200()

  }
}

module.exports = VagasController
