import jwt from 'jsonwebtoken'
import UsuarioRepository from '../repositories/UsuarioRepository.js';
const SECRET = "@@S3GR3D0@@";

export default class AuthMiddleware {


    gerarToken(id, usuario, perfil, registro_usuario) {
        return jwt.sign({
            id: id,
            usuario: usuario,
            perfil: perfil,
            registro_usuario: registro_usuario
        }, SECRET, { expiresIn: 3600 })
    }

    async validar(req, res, next) {
        if (req.headers.authorization == null)
            return res.status(401).json({ msg: "Token de acesso não foi enviado!" })

        let token = req.headers["authorization"].split(" ")[1];
        if (token) {
            let usuarioToken = jwt.verify(token, SECRET);
            let repoUsuario = new UsuarioRepository();
            let usuarioBanco = await repoUsuario.ObterUsuarioLogin(usuarioToken.id);
            if (usuarioBanco.length > 0) {
                if (usuarioBanco[0].per_id == 1) {
                    req.usuarioLogado = usuarioBanco[0];
                    next();
                } else {
                    res.status(401).json({ msg: "Usuario não autorizado" })
                }
            } else
                res.status(401).json({ msg: "Usuario não inexistente!" })
        } else
            res.status(401).json({ msg: "Usuario não inexistente!" })
    }

    async validarCliente(req, res, next) {
        if (req.headers.authorization == null)
            return res.status(401).json({ msg: "Token de acesso não foi enviado!" })

        let token = req.headers["authorization"].split(" ")[1];
        if (token) {
            let usuarioToken = jwt.verify(token, SECRET);
            let repoUsuario = new UsuarioRepository();
            let usuarioBanco = await repoUsuario.ObterUsuarioLogin(usuarioToken.id);
            if (usuarioBanco.length > 0) {
                if (usuarioBanco[0].per_id == 2 || usuarioBanco[0].per_id == 1) {
                    req.usuarioLogado = usuarioBanco[0];
                    next();
                } else {
                    res.status(401).json({ msg: "Usuario não autorizado" })
                }
            } else
                res.status(401).json({ msg: "Usuario não inexistente!" })
        } else
            res.status(401).json({ msg: "Usuario não inexistente!" })
    }

}