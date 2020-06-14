import crypto from 'crypto'
import { response } from 'express'

class Sha1{
  async encrypt(senha: string){
    var sha1 = crypto.createHash('sha1')
    return sha1.update(senha).digest('hex')
  }
}

export default  Sha1