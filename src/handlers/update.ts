import prisma from "../db"

export const getOneUpdate = async(request, response)=>{
    const update = await prisma.update.findUnique({
        where:{
            id: request.params.id
        }
    })

    response.json({data: update})
}
export const getUpdates = async(request, response)=>{
    const products = await prisma.product.findMany({
        where: {
            belongsToId: request.user.id
        },
        include: {
            Updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Updates]
    }, [])

    response.json({data: updates})
}
export const createUpdate = async(request, response)=>{
    const product = await prisma.product.findUnique({
        where: {
            id: request.body.productId
        }
    })
    if(!product){
       //does not belong to user
       return response.json({message: 'nope'}) 
    }

    const update = await prisma.update.create({
        data: {
            title: request.body.title,
            body: request.body.body,
            product: {connect: {id: product.id}}
        }
    })

    response.json({data: update})
}
export const updateUpdate = async(request, response)=>{
    const products = await prisma.product.findMany({
        where: {
            belongsToId: request.user.id
        },
        include: {
            Updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Updates]
    }, [])

    const match = updates.find(update => update.id === request.params.id)

    if(!match){
        //handle this
        response.json({message: 'nope'})
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: request.params.id
        },
        data: request.body
    })

    response.json({data: updatedUpdate})

}
export const deleteUpdate = async(request, response)=>{
    const products = await prisma.product.findMany({
        where: {
            belongsToId: request.user.id
        },
        include: {
            Updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Updates]
    }, [])

    const match = updates.find(update => update.id === request.params.id)

    if(!match){
        //handle this
        response.json({message: 'nope'})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: request.params.id
        }
    })

    response.json({data: deleted})

}
