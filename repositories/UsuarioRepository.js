import Database from "../db/database.js"

export default class UsuarioRepository {

    #banco
    constructor () {
        this.#banco = new Database();
    }

    async CadastrarUsuario (entidade) {
        let sql = `INSERT INTO luci_usuarios (usu_usuario, usu_senha, per_id) VALUES (? ,? ,2)`;
        let valores = [entidade.usuario, entidade.senha];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

}