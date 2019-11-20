'use strict'

class Vagas {

  get validateAll(){
    return true
  }

  get rules () {
    return {
      "nomeVaga": "required",
      "nomeEmpresa": "required",
      "linkEmpresa": "required",
      "endereco": "required",
      "faixaSalarial": "required",
      "contratacao": "required",
      "beneficios": "required",
      "qntVagas": "required",
    }
  }
}

module.exports = Vagas
