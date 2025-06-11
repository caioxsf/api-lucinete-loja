import Database from "../db/database.js";
import RegistroUsuarioEntity from "../entities/RegistroUsuarioEntity.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js"
import nodemailer from 'nodemailer';
import { hashSenha, compararSenha } from "../utils/bcrypt/bcrypt.js";


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

            if (!nome || !sobrenome || !email || !cpf || !nascimento) 
                return res.status(400).json({ message: "Corpo da requisisão não está adequado!" })

            if (await this.#repoRegistroUsuario.VerificarEmail(email) != true)
                return res.status(400).json({message: "Já existe uma conta cadastrada com esse e-mail!"})

            let entidade = new RegistroUsuarioEntity(0, nome, sobrenome, email, cpf, nascimento);
            let idRegistroUsuario = await this.#repoRegistroUsuario.CadastrarRegistroUsuario(entidade);

            if (idRegistroUsuario) {

                let nomeMinusculo = nome.toString().toLowerCase();
                let usuario = nomeMinusculo + Math.floor(Math.random() * 900000);
                let senha = Math.floor(Math.random() * 900000) + 100000;
                var senhaHash = await hashSenha(senha);

                if (!await this.#repoRegistroUsuario.CadastrarUsuario(usuario, senhaHash, idRegistroUsuario))
                    return res.status(201).json({ message: "Erro ao cadastrar usuário!"}) 

                if(await EnviarLogin(email, usuario, senha, nome)) {
                    await banco.Commit();
                    return res.status(201).json({ message: "Conta criada com sucesso!" });
                } 
                
            } else
                throw new Error("Erro ao inserir registro de conta no banco de dados")
                
        } catch (ex) {
            await banco.Rollback();
            return res.status(400).json({ message: "Erro interno no servidor!", error: ex.message})
        }
    }

    async AlterarUsuario(req, res) {
        let { id, nome, sobrenome, email, cpf, nascimento } = req.body;
        if (!nome || !sobrenome || !email || !cpf || !nascimento)
            return res.status(400).json({ message: "Parâmetros invalidos!" })

        if(id != req.usuarioLogado.id)
            return res.status(500).json("Você não pode alterar as informações desse usuario!") 

        let entidade = new RegistroUsuarioEntity(id, nome, sobrenome, email, cpf, nascimento);

        if (await this.#repoRegistroUsuario.Obter(id) == null)
            return res.status(404).json({ message: "Nenhum usuario foi encontrado com esse ID!" })

        if (!await this.#repoRegistroUsuario.AlterarUsuario(entidade))
            return res.status(400).json({ message: "Erro ao alterar usuario no banco de dados!"})
        
        return res.status(200).json({ message: "Informações alteradas com sucesso!" })
    }

    async DeletarUsuario(req, res) {
        let { id } = req.params;

        let usu_id = await this.#repoRegistroUsuario.ObterUsuarioLogin(id);
        if (usu_id == null || usu_id == undefined)
            return res.status(404).json({ message: "Nenhum usuario encontrado!" }) 

        let array_re_id = await this.#repoRegistroUsuario.Obter(usu_id[0].re_id);
        let re_id = array_re_id.id;

        if (array_re_id == null || array_re_id == undefined)
            return res.status(404).json({ message: "Nenhum usuario encontrado!" }) 

        if (!await this.#repoRegistroUsuario.DeletarUsuarioLogin(id))
            return res.status(400).json({ message: "Erro ao deletar usuário!" }) 

        if (!await this.#repoRegistroUsuario.DeletarUsuario(re_id)) 
            return res.status(400).json({ message: "Erro ao deletar usuário" })     

        return res.status(200).json({ message: "Usuário deletado com sucesso!" })   
    }

    async ObterUsuario(req, res) {
        let { id } = req.params;
        let usuario = await this.#repoRegistroUsuario.ObterComUsuario(id);
        if (usuario === null)
            return res.status(404).json({ message: "Nenhum usuario encontrado!" })
        else
            return res.status(201).json(usuario);
    }


    async ListarUsuarios(req, res) {
        let usuarios = await this.#repoRegistroUsuario.ListarUsuarios();
        if (usuarios === null)
            return res.status(404).json({ message: "Nenhum usuario foi encontrado!" })
        return res.status(200).json(usuarios)
    }

}

async function EnviarLogin(email, usuario, senha, nome) {
    const trasporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:  process.env.GMAIL,
            pass: process.env.PASS_GMAIL
        },
    });

    const mailOptions = {
        from: process.env.GMAIL,
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