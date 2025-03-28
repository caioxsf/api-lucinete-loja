import UsuarioEntity from "../entities/UsuarioEntity.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js"

export default class UsuarioController {

    #repo
    constructor () {
        this.#repo = new UsuarioRepository();
    }

    async CadastrarUsuario (req,res) {
        let {usuario, senha} = req.body;
        if(usuario && senha) {
            let entidade = new UsuarioEntity(0,usuario,senha);
            if(await this.#repo.CadastrarUsuario(entidade))
                return res.status(201).json({msg: "Usuário cadastrado com sucesso!"})
            else 
                throw new Error("Erro ao inserir usuário no banco de dados");
        } else
            res.status(400).json({msg: "O corpo da requisição não está adequado!"})
    }

    async ListarUsuarios (req,res) {
        let usuarios = await this.#repo.ListarUsuarios();
        res.status(200).json(usuarios)
    }
}