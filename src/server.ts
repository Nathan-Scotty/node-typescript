import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import { error } from 'console'
import { request } from 'http'

const app = express()

const customLogger = (message) => (request, response, next)=>{
    console.log(`Hello from ${message}`);
    next()   
}

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (request, response, next) => {
    response.json({message: 'hello'})
})

app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((error, request, response, next) => {
    if(error.type === 'auth'){
        response.status(401).json({message: 'unauthorized'})
    }else if(error.type === 'input'){
        response.status(400).json({message: 'invalid input'})
    }else{
        response.status(500).json({message: 'oops that on us'})
    }
})

export default app