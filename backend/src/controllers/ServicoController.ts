import {Request, Response} from 'express'
import knex from '../database/connection'

class ServicoController{

  async listar(request: Request, response: Response){
    const data = await knex('servico').select('idservico', 'titulo').select(knex.raw("'https://backend-trecho.herokuapp.com/img/'||icone as icone")).orderByRaw('1')
    response.json(data)
  }


}

export default ServicoController