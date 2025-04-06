import Database from "../db/database.js";

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
}