import cors from 'cors'
import express from 'express'
import path from 'path'
import routes from './routes'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

 app.use('/img', express.static(path.resolve(__dirname,'..', 'img')))

//app.listen(3333)

app.listen(process.env.PORT || 3333)