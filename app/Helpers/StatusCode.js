'use strict'

const status200 = async () => {
    return {
        status: "200",
        message: "Sem erro, operação feita com sucesso."
    } 
}

const status404 = async () => {
    return {
        status: "404",
        message: "Ops, não encontramos nenhum resultado."
    } 
}


module.exports = {
    status200,
    status404
}
