import {Request, Response, json} from 'express'
import knex from '../database/connection'
import crypto from 'crypto'

class LocalController{
  async incluir(request: Request, response: Response){
    var sha1 = crypto.createHash('sha1')
    var {titulo, cnpj, tamanho, responsavel, 
          senha, uf, cidade, longitude, latitude, telefone, email, servicos} = request.body
    senha = sha1.update(senha).digest('hex')
    
    const trx = await knex.transaction()

    await knex('local')
      .insert({
        titulo, cnpj, tamanho, responsavel, senha, uf, cidade, longitude, latitude, telefone, email
      })
      .then(data => response.json({message: "Dados incluidos com sucesso!"}))
      .catch(err => response.status(400).json({message: "Erro ao incluir", erro: err}))
    
    const [insertId] = await knex('local').select(knex.raw('max(idlocal) as idlocal')).returning('idlocal')

    const idlocal = insertId[0]

    

    const localServico = servicos.map((idservico: number) => {
      return {
        idlocal,
        idservico,
        valor : 6,
        tempo : 10
      }
    })

    await knex('localservico').insert(localServico)
  
    return response.json({
      id: idlocal
    })
    
  }

  async deletar(request: Request, response: Response){
    
  }

  async listar(request: Request, response: Response){
    const data = await knex('local as l')
      .leftJoin('localservico as ls ', 'ls.idlocal','=','l.idlocal')
      .leftJoin('servico as s ', 's.idservico','=','ls.idservico')
      .select('l.titulo', 'l.cnpj', 'l.tamanho', 'l.responsavel', 'l.uf', 'l.cidade', 'l.longitude', 'l.latitude', 'l.telefone', 'l.email')
      .select(knex.raw("json_agg(json_build_object('titulo',s.titulo,'icone','https://backend-trecho.herokuapp.com/img/'||s.icone,'valor',ls.valor,'tempo',ls.tempo)) as servico"))
      .groupByRaw('1,2,3,4,5,6,7,8,9,10')
    
    response.json(data)
  }

  async login(request: Request, response: Response){
    var sha1 = crypto.createHash('sha1')
    var {email, senha} = request.body
    senha = sha1.update(senha).digest('hex')

    const dados = await knex('local')
                          .where('email', email)
                          .where('senha',senha)
                          .select('*')
    if(dados.length > 0){
      response.json(dados)
    }else{
      response.status(401).json({mensagem: "Usuário ou senha inválidos!"})
    }
  }


}

export default LocalController