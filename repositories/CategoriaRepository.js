import Database from "../db/database.js";
import CategoriaEntity from "../entities/CategoriaEntity.js";

export default class CategoriaRepository {
    
    #banco
    constructor() {
        this.#banco = new Database();;
    }

    async CadastrarCategoria (entidade) {
        let sql = `INSERT INTO luci_categorias (cat_nome) VALUES (?)`;
        let valores = [entidade.nome]
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async VerificarCategoria (nome) {
        let sql = `SELECT * FROM luci_categorias WHERE cat_nome = ?`;
        let valores = [nome];
        let row = await this.#banco.ExecutaComando(sql,valores);
        if(row.length > 0)
            return true;
        return false; 
    }

    async VerificarCategoriaPeloID(id) {
        let sql = `SELECT * FROM luci_categorias WHERE cat_id = ?`;
        let valores = [id];
        let row = await this.#banco.ExecutaComando(sql,valores);
        if(row.length > 0)
            return true;
        return false;
    }

    async ListarCategorias () {
        let sql = `SELECT * FROM luci_categorias`;
        let rows = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if(rows.length > 0) {
            for(let i=0;i<rows.length;i++) {
                let row = rows[i];
                lista.push(
                    new CategoriaEntity(
                    row['cat_id'], 
                    row['cat_nome'])
                )
            }
            return lista;
        }
        return null;
    }

    async AlterarCategoria (entidade) {
        let sql = `UPDATE luci_categorias SET cat_nome = ? WHERE cat_id = ?`;
        let valores = [entidade.nome, entidade.id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async DeletarCategoria (id) {
        let sql = `DELETE FROM luci_categorias WHERE cat_id = ?`;
        let valores = [id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async ObterCategoria (id) {
        let sql = `SELECT * FROM luci_categorias WHERE cat_id = ?`;
        let valores = [id];
        let row = await this.#banco.ExecutaComando(sql,valores);
        if(row.length > 0) {
            return new CategoriaEntity(
                row[0]['cat_id'],
                row[0]['cat_nome']
            )
        }
        return null;
    }
}