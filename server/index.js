import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import socket from 'socket.io'
import path from 'path'
import morgan from 'morgan'

import E from './events'
import {readFile, updateFile} from './helpers/fs'

dotenv.config();
const port = process.env.SOCKET_PORT || 5000
const app = express()

app
   .use('/state', express.static(path.sesolve(__dirname, 'public')))
   .use(cors())
   .use(morgan('dev'))

app.get('/userc', async function (req, res) {
    const users = await getUsersData()
    res.send(JSON.stringify(users))
})

async function getUsersData() {
    const data = await readFile('users.json')
    return data
}