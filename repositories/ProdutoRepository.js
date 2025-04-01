import Database from "../db/database.js"

export default class ProdutoRepository {

    #banco
    constructor () {
        this.#banco = new Database();
    }

    async CadastrarProduto (entidade) {
        let sql = `INSERT INTO luci_produtos (prod_nome, prod_estoque, prod_preco) VALUES (?,?,?)`;
        let valores = [entidade.nome, entidade.estoque, entidade.preco];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

}