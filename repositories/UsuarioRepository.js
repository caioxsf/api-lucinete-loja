import Database from "../db/database.js"
import UsuarioEntity from "../entities/UsuarioEntity.js";

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

    async ListarUsuarios () {
        let sql = ` SELECT usu.usu_id, usu.usu_usuario, usu.usu_senha, per.per_nome 
                    FROM luci_usuarios usu INNER JOIN luci_perfil per
                    ON usu.per_id = per.per_id `;
        let resultado = await this.#banco.ExecutaComando(sql);
        let lista = [];

        for (let i=0;i<resultado.length;i++) {
            let row = resultado[i];
            lista.push(new UsuarioEntity(
                row['usu_id'],
                row['usu_usuario'],
                row['usu_senha'],
                row['per_nome']
            ))
        }
        return lista;
    }

}