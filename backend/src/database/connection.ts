import knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

const connection = knex({
  client: 'pg',
  connection:  {
    host : process.env.DB_HOST ,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
})

export default connection