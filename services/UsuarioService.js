import UsuarioRepository from "../repositories/UsuarioRepository.js"
import Database from "../db/database.js";
import RegistroUsuarioEntity from "../entities/RegistroUsuarioEntity.js";

export default class UsuarioServices {

    #repoRegistroUsuario
    constructor() {
        this.#repoRegistroUsuario = new UsuarioRepository();
    }

     static async CadastrarUsuarioServices(body) {

        let banco = new Database();
        this.#repoRegistroUsuario.banco = banco;

        try {

            this.#repoRegistroUsuario.banco = banco;
            await banco.AbreTransacao();

            let { nome, sobrenome, email, cpf, nascimento } = body;
            if (nome && sobrenome && email && cpf && nascimento) {

                if (await this.#repoRegistroUsuario.VerificarEmail(email) == true) {
                    
                    let entidade = new RegistroUsuarioEntity(0, nome, sobrenome, email, cpf, nascimento);
                    let idRegistroUsuario = await this.#repoRegistroUsuario.CadastrarRegistroUsuario(entidade);

                    if (idRegistroUsuario) {
                        let nomeMinusculo = nome.toString().toLowerCase();
                        let usuario = nomeMinusculo + Math.floor(Math.random() * 900000);
                        let senha = Math.floor(Math.random() * 900000) + 100000;

                        if (await this.#repoRegistroUsuario.CadastrarUsuario(usuario, senha, idRegistroUsuario)) {
                            await EnviarLogin(email, usuario, senha, nome);
                            await banco.Commit();
                            return {status: 201, msg: "Conta criada com sucesso!"}
                        }

                        else
                            throw new Error("Erro ao inserir conta no banco de dados");
                    } else
                        throw new Error("Erro ao inserir registro de conta no banco de dados")
                } else
                    return {status: 409, msg: "Já existe uma conta cadastrada com esse e-mail!"}


            } else
                return {status: 400, msg: "Corpo da requisisão não está adequado!" }
        } catch (ex) {
            await banco.Rollback();
            return {status: 400, msg: "Erro interno no servidor" }
        }
    }

}