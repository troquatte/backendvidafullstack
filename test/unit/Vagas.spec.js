'use strict'

const { test, trait, after } = use('Test/Suite')('Vagas')

const User = use('App/Models/User')
const Vagas = use('App/Models/Vagas')

trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')

//Verifica o token do User
async function Auth(client){
  const user = await User.findBy('email', client)
  return user
}

//Array de Storage Vagas
const dataStoreVagas = {
    "nomeVaga": "d.troquatte20@yahoo.com.br",
    "nomeEmpresa": "Everis",
    "linkEmpresa": "http://www.everis.com.br",
    "endereco": "Brokling Sp",
    "faixaSalarial": "10k",
    "contratacao": "clt",
    "beneficios": 1,
    "qntVagas": "5",
    "descricao": "Dev",
    "requisitos": "Saber de Tudo"
}

test('List paginate Vagas', async ({ client }) => {
  let user = await Auth("d.troquatte20@yahoo.com.br");

  //Passo extra tenta acessar uma Rota Protegida
  const response = await client.get('/vagas/').loginVia(user).end()
  response.assertStatus(200) 
})

test('List paginate Itens PerPage and Page Vagas', async ({ client }) => {
  let user = await Auth("d.troquatte20@yahoo.com.br");
  
  let page;
  let perPage;
  
  if(!page){
    page = 1
  }

  if(!perPage){
    perPage = 10
  }

  //Passo extra tenta acessar uma Rota Protegida
  let response = await client.get(`/vagas/`).query({ "page": page, "perPage": perPage }).loginVia(user).end()
  response.assertStatus(200) 
})

test('Store Vagas', async ({client}) => {
  let user = await Auth("d.troquatte20@yahoo.com.br")
  
  let data = dataStoreVagas
  
  let response = await client.post('/vagas').loginVia(user).send(data).end()
  
  response.assertStatus(200)   
})

test('Show Vagas', async ({client}) => {
  const user = await Auth("d.troquatte20@yahoo.com.br");
  
  const data = dataStoreVagas
  let createVagas = await Vagas.create(data)

  let response = await client.get(`/vagas/${createVagas.id}`).loginVia(user).end()
  
  response.assertStatus(200)
})

test('Update Vagas', async ({client}) => {
  const user = await Auth("d.troquatte20@yahoo.com.br");
  let data = dataStoreVagas

  let createVagas = await Vagas.create(data)

  let response = await client.put(`/vagas/${createVagas.id}`).loginVia(user).send(data).end()
  
  data.nomeEmpresa = "Everis 2"
  if(data.nomeEmpresa == "Everis 2"){
    response.assertStatus(200)
  } else {
    response.assertStatus(401)
  }
})

test('Destroy Vagas', async ({client}) => {
  const user = await Auth("d.troquatte20@yahoo.com.br");
  let data = dataStoreVagas
  
  let createVagas = await Vagas.create(data)

  let response = await client.delete(`/vagas/${createVagas.id}`).loginVia(user).send(data).end()
  response.assertStatus(200)
})

after(async () => {
  await Vagas.truncate()
})