'use strict'

const { test, trait } = use('Test/Suite')('Vagas')

trait('Test/ApiClient')


//Tenta logar com User e retronar Status 200 ok
test('Auth User Jwt True', async ({ client }) => {
  //Chama a rota Session com User Correto
  const login = await client.post("/sessions").send({
    "email": "d.troquatte20@yahoo.com.br",
    "password": "12345"
  }).end()
 
  //Verifica o token do User
  let token = login.body.token
  
  //Passo extra tenta acessar uma Rota Protegida
  const response = await client.get('/vagas').send({token}).end()
  response.assertStatus(200) 
})


//Tenta Logar User e retorna erro com status 401
test('Auth User Jwt False', async ({ client }) => {
  const login = await client.post("/sessions").send({
    "email": "User invalido",
    "password": "Senha invalida"
  }).end()

  return login.assertStatus(401)
})
