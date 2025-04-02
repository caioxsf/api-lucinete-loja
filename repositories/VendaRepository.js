import Database from "../db/database.js";

import ProdutoEntity from "../entities/ProdutoEntity.js";

export default class VendaRepository {

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
        let resultado = await this.#banco.ExecutaComandoLastInserted(sql, valores);
        return resultado;
    }

    async AtualizarTotalVenda(id, total) {
        let sql = `UPDATE luci_vendas SET ven_total = ? WHERE ven_id = ?`;
        let valores = [id, total];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
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
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async CadastrarVenda(entidade) {
        let sql = ` INSERT INTO luci_itens_vendas (item_id, ven_id, prod_id, item_quantidade, item_preco, item_subtotal) 
                    VALUES (?,?,?,?,?,?)`;
        let valores = [entidade.item_id, entidade.ven_id, entidade.prod_id, entidade.item_quantidade, entidade.item_preco, entidade.item_subtotal];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async ListarVendas() {
        let sql = ` SELECT it.item_id, ven.ven_id, ven.ven_data, p.prod_nome, it.item_quantidade, it.item_preco, it.item_subtotal, ven.ven_total 
                    FROM luci_itens_vendas it INNER JOIN luci_vendas ven INNER JOIN luci_produtos p
                    ON it.ven_id = ven.ven_id AND it.prod_id = p.prod_id`;
        let rows = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if (rows.length > 0) {
            for(let i=0;i<rows.length;i++) {
                let row = rows[i];
                lista.push({
                    id: row['item_id'],
                    id_vendas: row['ven_id'],
                    data: row['ven_data'],
                    produto_nome: row['prod_nome'],
                    quantidade: row['item_quantidade'],
                    preco: row['item_preco'],
                    subtotal: row['item_subtotal'],
                    total: row['ven_total']
                })
            }
            return lista;
        }   
        return null;
    }

}