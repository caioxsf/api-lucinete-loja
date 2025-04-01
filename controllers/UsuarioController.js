import Database from "../db/database.js";
import RegistroUsuarioEntity from "../entities/RegistroUsuarioEntity.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js"

export default class UsuarioController {

    #repoRegistroUsuario
    constructor() {
        this.#repoRegistroUsuario = new UsuarioRepository();
    }

    async CadastrarUsuario(req, res) {
        let banco = new Database();
        try {

            this.#repoRegistroUsuario.banco = banco;
            await banco.AbreTransacao();

            let { nome, sobrenome, email, cpf, nascimento } = req.body;
            if (nome && sobrenome && email && cpf && nascimento) {

                let entidade = new RegistroUsuarioEntity(0, nome, sobrenome, email, cpf, nascimento);
                let idRegistroUsuario = await this.#repoRegistroUsuario.CadastrarRegistroUsuario(entidade);

                if (idRegistroUsuario) {
                    let nomeMinusculo = nome.toString().toLowerCase();
                    let usuario = nomeMinusculo + Math.floor(Math.random() * 900000);
                    let senha = Math.floor(Math.random() * 900000) + 100000;

                    if (await this.#repoRegistroUsuario.CadastrarUsuario(usuario, senha, idRegistroUsuario)) {
                        await banco.Commit();
                        return res.status(201).json({ msg: "Conta criada com sucesso!" });
                    }

                    else
                        throw new Error("Erro ao inserir conta no banco de dados");
                } else
                    throw new Error("Erro ao inserir registro de conta no banco de dados")
            } else
                return res.status(400).json({ msg: "Corpo da requisisão não está adequado!" })
        } catch (ex) {
            await banco.Rollback();
            return res.status(400).json({ msg: "Erro interno no servidor!" })
        }
    }

    async AlterarUsuario(req, res) {
        let { id, nome, sobrenome, email, cpf, nascimento } = req.body;
        if (nome && sobrenome && email && cpf && nascimento) {
            let entidade = new RegistroUsuarioEntity(id, nome, sobrenome, email, cpf, nascimento);
            if (await this.#repoRegistroUsuario.Obter(id) != null) {
                if (await this.#repoRegistroUsuario.AlterarUsuario(entidade))
                    return res.status(200).json({ msg: "Conta do usuario alterada com sucesso!" })
                else
                    throw new Error("Erro ao alterar usuario no banco de dados!")
            } else
                return res.status(404).json({ msg: "Nenhum usuario foi encontrado com esse ID!" })

        } else
            return res.status(400).json({ msg: "Parâmetros invalidos!" })
    }

    async DeletarUsuario(req, res) {
        let { id } = req.params;
        let usu_id = await this.#repoRegistroUsuario.ObterUsuarioLogin(id);
        if (usu_id != null || usu_id != undefined) {
            let array_re_id = await this.#repoRegistroUsuario.Obter(usu_id[0].re_id);
            let re_id = array_re_id.id;

            if (array_re_id != null || array_re_id != undefined) {
                if (await this.#repoRegistroUsuario.DeletarUsuarioLogin(id)) {
                    if (await this.#repoRegistroUsuario.DeletarUsuario(re_id)) {
                        return res.status(200).json({ msg: "Usuario deletado com sucesso!" })
                    } else
                        throw new Error("Erro ao deletar usuario do banco de dados")
                }
            } else
                return res.status(404).json({ msg: "Nenhum usuario encontrado!" })
        } else
            return res.status(404).json({ msg: "Nenhum usuario encontrado!" })
    }


    async ListarUsuarios(req, res) {
        let usuarios = await this.#repoRegistroUsuario.ListarUsuarios();
        if (usuarios === null)
            return res.status(404).json({ msg: "Nenhum usuario foi encontrado!" })
        return res.status(200).json(usuarios)
    }
}