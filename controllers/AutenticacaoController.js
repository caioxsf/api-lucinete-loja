import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { compararSenha } from "../utils/bcrypt/bcrypt.js";

export default class AutenticacaoController {

    async Token(req, res) {
        let { usuario, senha } = req.body;

        if (!usuario || !senha)
            return res.status(400).json({message: "Parâmetros usuario/senha incorretos!"}) 

        let repoUsuario = new UsuarioRepository();
        let hash = await repoUsuario.RetornarHash(usuario); 
        if(hash == null)
            return res.status(400).json({message: "Usuario/Senha incorretos!"})

        let senhaValida = await compararSenha(senha, hash);
        if(senhaValida != true)
            return res.status(400).json({message: "Usuario/Senha incorretos!"}) 

        let usuarioValidado = await repoUsuario.ValidarAcesso(usuario, hash);
        if(usuarioValidado == null)
            return res.status(400).json({message: "Usuario/Senha incorretos!"}) 

        let auth = new AuthMiddleware();
        let token = auth.gerarToken(usuarioValidado[0].id, usuarioValidado[0].usuario, usuarioValidado[0].perfil, usuarioValidado[0].registro_usuario)
        return res.status(200).json({token: token});        
    }

    async AuthUsuarioLogado (req,res) {
        let repoUsuario = new UsuarioRepository();
        let usuario = await repoUsuario.ObterComUsuario(req.usuarioLogado.id);

        if(usuario != null)
            return res.status(200).json(usuario);
        
        return res.status(404).json({message: "Nenhum usuario encontrado!"});
    }
}