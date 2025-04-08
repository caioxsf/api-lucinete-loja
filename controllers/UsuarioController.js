import Database from "../db/database.js";
import RegistroUsuarioEntity from "../entities/RegistroUsuarioEntity.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js"
import nodemailer from 'nodemailer';

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
                            return res.status(201).json({ msg: "Conta criada com sucesso!" });
                        }

                        else
                            throw new Error("Erro ao inserir conta no banco de dados");
                    } else
                        throw new Error("Erro ao inserir registro de conta no banco de dados")
                } else
                    return res.status(409).json({msg: "Já existe uma conta cadastrada com esse e-mail!"})


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
            if(id == req.usuarioLogado.id) {
                let entidade = new RegistroUsuarioEntity(id, nome, sobrenome, email, cpf, nascimento);
                if (await this.#repoRegistroUsuario.Obter(id) != null) {
                    if (await this.#repoRegistroUsuario.AlterarUsuario(entidade))
                        return res.status(200).json({ msg: "Conta do usuario alterada com sucesso!" })
                    else
                        throw new Error("Erro ao alterar usuario no banco de dados!")
                } else
                    return res.status(404).json({ msg: "Nenhum usuario foi encontrado com esse ID!" })
            } else
                return res.status(500).json("Você não pode alterar as informações desse usuario!")
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

    async ObterUsuario(req, res) {
        let { id } = req.params;
        let usuario = await this.#repoRegistroUsuario.ObterComUsuario(id);
        if (usuario === null)
            return res.status(404).json({ msg: "Nenhum usuario encontrado!" })
        else
            return res.status(201).json(usuario);
    }


    async ListarUsuarios(req, res) {
        let usuarios = await this.#repoRegistroUsuario.ListarUsuarios();
        if (usuarios === null)
            return res.status(404).json({ msg: "Nenhum usuario foi encontrado!" })
        return res.status(200).json(usuarios)
    }

}

async function EnviarLogin(email, usuario, senha, nome) {
    const trasporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'veigarnobile@gmail.com',
            pass: 'hpqy pbxj eivw pnuz'
        },
    });

    const mailOptions = {
        from: 'veigarnobile@gmail.com',
        to: email,
        subject: '🎉 Bem-vindo(a) à Loja da Luh! - Seus dados de acesso',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <h2 style="color: #ff4081; text-align: center;">🎉 Bem-vindo(a) à Loja da Luh!</h2>
                <p style="font-size: 16px; color: #333;">Olá, <strong>${nome}</strong>,</p>
                <p style="font-size: 16px; color: #333;">Estamos muito felizes em ter você por aqui! 🎈</p>
                <p style="font-size: 16px; color: #333;">Aqui estão seus dados de acesso:</p>
                <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; font-size: 16px;">
                    <p><strong>🆔 Usuário:</strong> <span style="color: #ff4081;">${usuario}</span></p>
                    <p><strong>🔒 Senha:</strong> <span style="color: #ff4081;">${senha}</span></p>
                </div>
                <p style="font-size: 16px; color: #333;">Recomendamos que você altere sua senha após o primeiro login para maior segurança. 🔐</p>
                <p style="text-align: center; margin-top: 20px;">
                    <a href="https://www.lucinete.com.br/login" style="padding: 10px 20px; background-color: #ff4081; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">
                        Acessar minha conta
                    </a>
                </p>
                <p style="font-size: 14px; color: #777; text-align: center;">Se precisar de ajuda, entre em contato conosco. 💌</p>
                <p style="font-size: 14px; color: #777; text-align: center;">Atenciosamente,<br><strong>Equipe Loja da Luh</strong></p>
            </div>
        `
    };

    await trasporter.sendMail(mailOptions)
}