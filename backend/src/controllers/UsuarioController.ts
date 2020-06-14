import {Request, Response, json} from 'express'
import knex from '../database/connection'
import crypto from 'crypto'

class UsuarioController{
  async incluir(request: Request, response: Response){
    var sha1 = crypto.createHash('sha1')
    var {nome, cpf, celular, email, senha} = request.body
    senha = sha1.update(senha).digest('hex')

    await knex('usuario')
      .insert({
        nome, cpf, celular, email, senha
      })
      .then(data => response.json({message: "Dados incluidos com sucesso!"}))
      .catch(err => response.status(400).json({message: "Erro ao incluir", erro: err}))
  }

  async deletar(request: Request, response: Response){
    
  }

  async listar(request: Request, response: Response){
    
  }

  async login(request: Request, response: Response){
    var sha1 = crypto.createHash('sha1')
    var {celular, senha} = request.body
    senha = sha1.update(senha).digest('hex')

    const dados = await knex('usuario')
                          .where('celular', celular)
                          .where('senha',senha)
                          .select('*')
    if(dados.length > 0){
      response.json(dados)
    }else{
      response.status(401).json({mensagem: "Usuário ou senha inválidos!"})
    }
  }


}

export default UsuarioController