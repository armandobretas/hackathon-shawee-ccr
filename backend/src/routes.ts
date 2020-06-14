import express from 'express'

import UsuarioController from './controllers/UsuarioController'
import LocalController from './controllers/LocalController'
import ServicoController from './controllers/ServicoController'


const routes = express.Router()
const usuarioController = new UsuarioController()
const localController = new LocalController()
const servicoController = new ServicoController()

routes.get('/', function(req, res) {
  res.json({"API": "Parada banho & descanso - Shawee CCR Hackathon"})
})

// Usuario (caminhoneiro)
routes.post('/usuario', usuarioController.incluir)
routes.post('/login', usuarioController.login)

// Local (paradas, banheiro, chuveiros)
routes.get('/local', localController.listar)
routes.post('/local', localController.incluir)
routes.post('/local/login', localController.login)

// Serviços prestados no app
routes.get('/servico', servicoController.listar)

export default routes