import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePassewords = (password, hash) =>{
return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET
    )
    return token
}

export const protect = (request, response, next) => {
    const bearer = request.headers.authorization

    if (!bearer){
        response.status(401)
        response.json({message: 'not authorized'})
        return
    }

    const [, token] = bearer.split(' ')

    if(!token){
        response.status(401)
        response.json({message: 'not valid token'})
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        request.user = user
        next()
    } catch (e) {
        console.log(e);
        response.status(401)
        response.json({message: 'not valid token'})
        return
    }
}