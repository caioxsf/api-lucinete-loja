import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";

export default class AutenticacaoController {

    async Token(req, res) {
        let { usuario, senha } = req.body;
        if (usuario && senha) {
            let repoUsuario = new UsuarioRepository();
            let usuarioValidado = await repoUsuario.ValidarAcesso(usuario, senha);
            if(usuarioValidado) {
                let auth = new AuthMiddleware();
                let token = auth.gerarToken(usuarioValidado[0].id, usuarioValidado[0].usuario, usuarioValidado[0].perfil, usuarioValidado[0].registro_usuario)
                return res.status(200).json({token: token});
            } else
                return res.status(400).json({msg: "Usuario/Senha incorretos!"})
        } else
            return res.status(400).json({msg: "Parâmetros usuario/senha incorretos!"})
    }

    async AuthUsuarioLogado (req,res) {
        let repoUsuario = new UsuarioRepository();
        let usuario = await repoUsuario.ObterComUsuario(req.usuarioLogado.id);
        if(usuario != null)
            return res.status(200).json(usuario);
        return res.status(404).json({msg: "Nenhum usuario encontrado!"});
    }
}