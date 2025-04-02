import Database from "../db/database.js";

import ProdutoEntity from "../entities/ProdutoEntity.js";

export default class VendaRepository{

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async VerificarEstoque(id, quantidade) {
        let sql = `SELECT * FROM luci_produtos WHERE prod_id = ? AND prod_estoque >= ?`
        let valores = [id, quantidade];
        let row = await this.#banco.ExecutaComando(sql, valores);
        if (row.length > 0) {
            return new ProdutoEntity(
                row[0]['prod_id'],
                row[0]['prod_nome'],
                row[0]['prod_estoque'],
                row[0]['prod_preco']
            )
        }
        return null;
    }

    async GerarVenda(data) {
        let sql = `INSERT INTO luci_vendas (ven_data) VALUES (?)`;
        let valores = [data];
        let resultado = await this.#banco.ExecutaComandoLastInserted(sql,valores);
        return resultado;
    }

    async VerificarCodigoProduto(id) {
        let sql = `SELECT * FROM luci_produtos WHERE prod_id = ?`;
        let valores = [id];
        let row = await this.#banco.ExecutaComando(sql, valores);
        if (row.length > 0) {
            return new ProdutoEntity(
                row[0]['prod_id'],
                row[0]['prod_nome'],
                row[0]['prod_estoque'],
                row[0]['prod_preco'],
            )
        }
        return null;
    }

    async BuscarPrecoDoProduto(preco) {
        let sql = `SELECT prod_preco FROM luci_produtos WHERE prod_id = ?`;
        let valores = [preco];
        let row = await this.#banco.ExecutaComando(sql, valores);
        if (row.length > 0) {
            return {
                id: row[0]['prod_preco']
            }
        }
        return null;
    }

    async AtualizarEstoqueDoProduto(quantidade, id) {
        let sql = `UPDATE luci_produtos SET prod_estoque = prod_estoque - ? WHERE prod_id = ? AND prod_estoque > 0`;
        let valores = [quantidade, id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async CadastrarVenda (entidade) {
        let sql = ` INSERT INTO luci_itens_vendas (item_id, ven_id, prod_id, item_quantidade, item_preco, item_subtotal) 
                    VALUES (?,?,?,?,?,?)`;
        let valores = [entidade.item_id, entidade.ven_id, entidade.prod_id, entidade.item_quantidade, entidade.item_preco, entidade.item_subtotal];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

}