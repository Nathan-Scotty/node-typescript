import prisma from "../db"

//Get all
export const getProducts = async (request, response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: request.user.id
        },
        include: {
            products: true
        }
    })

    response.json({ data: user.products })
}

//Get one
export const getOneProduct = async (request, response) => {
    const id = request.params.id

    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: request.user.id
        }
    })

    response.json({ data: product })
}

export const createProduct = async (request, response, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: request.body.name,
                belongsToId: request.user.id
            }
        })

        response.json({ data: product })
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (request, response) => {
    const update = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: request.params.id,
                belongsToId: request.user.id
            }
        },
        data: {
            name: request.body.name
        }
    })

    response.json({ data: update })
}

export const deleteProduct = async (request, response) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: request.params.id,
                belongsToId: request.user.id
            }
        }
    })
    response.json({ data: deleted })
}