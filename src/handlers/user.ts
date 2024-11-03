import prisma from "../db";
import { comparePassewords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (request, response, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: request.body.username,
                password: await hashPassword(request.body.password)
            }
        })

        const token = createJWT(user)
        response.json({ token })
    } catch (error) {
        error.type = 'input'
        next(error)
    }
}

export const signin = async (request, response) => {
    const user = await prisma.user.findUnique({
        where: {
            username: request.body.username
        }
    })

    const isValid = await comparePassewords(request.body.password, user.password)

    if (!isValid) {
        response.status(401)
        response.json({ message: 'nope' })
        return
    }
    const token = createJWT(user)
    response.json({ token })
}