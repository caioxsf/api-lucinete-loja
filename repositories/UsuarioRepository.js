import Database from "../db/database.js"
import UsuarioEntity from "../entities/UsuarioEntity.js";
import RegistroUsuarioEntity from "../entities/RegistroUsuarioEntity.js";

export default class UsuarioRepository {

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async CadastrarRegistroUsuario(entidade) {
        let sql = `INSERT INTO luci_registro_usuarios (re_nome, re_sobrenome, re_email, re_cpf, re_nascimento) VALUES (?,?,?,?,?)`;
        let valores = [entidade.nome, entidade.sobrenome, entidade.email, entidade.cpf, entidade.nascimento];
        let resultado = await this.#banco.ExecutaComandoLastInserted(sql, valores);
        return resultado;
    }

    async CadastrarUsuario(usuario, senha, per_id) {
        let sql = `INSERT INTO luci_usuarios (usu_usuario, usu_senha, per_id, re_id) VALUES (?,?,2,?)`;
        let valores = [usuario, senha, per_id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async AlterarUsuario(entidade) {
        let sql = `UPDATE luci_registro_usuarios SET re_nome = ?, re_sobrenome = ?, re_email = ?, re_cpf = ?, re_nascimento = ? WHERE re_id = ?`
        let valores = [entidade.nome, entidade.sobrenome, entidade.email, entidade.cpf, entidade.nascimento, entidade.id]
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async Obter(id) {
        let sql = `SELECT * FROM luci_registro_usuarios WHERE re_id = ?`;
        let valores = [id];
        let rows = await this.#banco.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i]
                return new RegistroUsuarioEntity(
                    row['re_id'],
                    row['re_nome'],
                    row['re_sobrenome'],
                    row['re_email'],
                    row['re_cpf'],
                    row['re_nascimento']
                )
            }
        }
        return null
    }

    async ObterUsuarioLogin(id) {
        let sql = `SELECT * FROM luci_usuarios WHERE usu_id = ?`;
        let valores = [id];
        let rows = await this.#banco.ExecutaComando(sql, valores);
        let lista = [];
        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                lista.push(new UsuarioEntity(
                    row['usu_id'],
                    row['usu_usuario'],
                    row['usu_senha'],
                    row['per_id'],
                    row['re_id']
                ))
            }
            return lista;
        }
    }

    async DeletarUsuarioLogin(id) {
        let sql = `DELETE FROM luci_usuarios WHERE usu_id = ?`;
        let valores = [id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async DeletarUsuario(id) {
        let sql = `DELETE FROM luci_registro_usuarios WHERE re_id = ?`;
        let valores = [id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async ListarUsuarios() {
        let sql = ` SELECT usu.usu_id, usu.usu_usuario, usu.usu_senha, re.re_nome, re.re_sobrenome, 
                    re.re_email, re.re_cpf, re.re_nascimento, p.per_nome
                    FROM luci_usuarios usu INNER JOIN luci_registro_usuarios re 
                    INNER JOIN luci_perfil p ON usu.re_id = re.re_id AND usu.per_id = p.per_id`;
        let resultado = await this.#banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < resultado.length; i++) {
            let row = resultado[i];
            lista.push({
                id: row['usu_id'],
                usuario: row['usu_usuario'],
                nome: row['re_nome'],
                sobrenome: row['re_sobrenome'],
                email: row['re_email'],
                cpf: row['re_cpf'],
                nascimento: row['re_nascimento'],
                perfil: row['per_nome']
            }

            )
        }
        return lista;
    }

}