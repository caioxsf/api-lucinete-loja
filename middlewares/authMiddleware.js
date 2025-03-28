export default class AuthMiddleware {


    validar(req, res, next) {
        // let chave = req.headers.chaveapi
        // if(chave == "admin10") {
            next();
        // }
        // else{
        //     return res.status(401).json({msg: "Não autorizado"});
        // }
    }
}