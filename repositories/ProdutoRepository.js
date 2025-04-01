import Database from "../db/database.js"
import ProdutoEntity from "../entities/ProdutoEntity.js";

export default class ProdutoRepository {

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async CadastrarProduto(entidade) {
        let sql = `INSERT INTO luci_produtos (prod_nome, prod_estoque, prod_preco) VALUES (?,?,?)`;
        let valores = [entidade.nome, entidade.estoque, entidade.preco];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async AlterarProduto(entidade) {
        let sql = `UPDATE luci_produtos SET prod_nome = ?, prod_estoque = ?, prod_preco = ? WHERE prod_id = ?`;
        let valores = [entidade.nome, entidade.estoque, entidade.preco, entidade.id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async ListarProdutos() {
        let sql = `SELECT * FROM luci_produtos`;
        let row = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if (row.length > 0) {
            for (let i = 0; i < row.length; i++) {
                let rows = row[i];
                lista.push(new ProdutoEntity(
                    rows['prod_id'],
                    rows['prod_nome'],
                    rows['prod_estoque'],
                    rows['prod_preco']
                ))
            }
            return lista;
        }
        return null;
    }

}