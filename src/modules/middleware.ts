import { validationResult } from "express-validator";


export const handleInputErrors = (request, response, next) =>{

    const errors =  validationResult(request)

    if(!errors.isEmpty()){
        response.status(400);
        response.json({errors: errors.array()})
    }
    else{
        next()
    }
}