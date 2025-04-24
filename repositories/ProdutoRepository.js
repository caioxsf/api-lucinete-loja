import Database from "../db/database.js"
import ProdutoEntity from "../entities/ProdutoEntity.js";

export default class ProdutoRepository {

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async CadastrarProduto(entidade) {
        let sql = `INSERT INTO luci_produtos (prod_nome, prod_estoque, prod_preco, cat_id) VALUES (?,?,?,?)`;
        let valores =   [entidade.nome, entidade.estoque, entidade.preco, entidade.categoria.id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async AlterarProduto(entidade) {
        let sql = `UPDATE luci_produtos SET prod_nome = ?, prod_estoque = ?, prod_preco = ?, cat_id = ? WHERE prod_id = ?`;
        let valores = [entidade.nome, entidade.estoque, entidade.preco, entidade.categoria.id, entidade.id,];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async Obter(id) {
        let sql = `SELECT p.prod_id, p.prod_nome, p.prod_estoque, p.prod_preco, c.cat_nome 
        FROM luci_produtos p 
        INNER JOIN luci_categorias c on p.cat_id = c.cat_id WHERE prod_id = ?`;
        let valores = [id];
        let rows = await this.#banco.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            return new ProdutoEntity(
                rows[0]['prod_id'],
                rows[0]['prod_nome'],
                rows[0]['prod_estoque'],
                rows[0]['prod_preco'],
                rows[0]['cat_nome'],
            )
        }
        return null;
    }

    async Deletar(id) {
        let sql = `DELETE FROM luci_produtos WHERE prod_id = ?`;
        let valores = [id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async ListarProdutos() {
        let sql = ` SELECT p.prod_id, p.prod_nome, p.prod_estoque, p.prod_preco, c.cat_nome 
                    FROM luci_produtos p 
                    INNER JOIN luci_categorias c on p.cat_id = c.cat_id`;
        let row = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if (row.length > 0) {
            for (let i = 0; i < row.length; i++) {
                let rows = row[i];
                lista.push(new ProdutoEntity(
                    rows['prod_id'],
                    rows['prod_nome'],
                    rows['prod_estoque'],
                    rows['prod_preco'],
                    rows['cat_nome']
                ))
            }
            return lista;
        }
        return null;
    }

    async ProdutosEstoqueBaixo() {
        let sql = `SELECT * FROM luci_produtos WHERE prod_estoque < 10`
        let row = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if(row.length > 0) {
            for(let i=0;i<row.length;i++) {
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

    async AdicionarEstoque (quantidade, id) {
        let sql = `UPDATE luci_produtos SET prod_estoque = prod_estoque + ? WHERE prod_id = ?`;
        let valores = [quantidade,id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async ProdutosEstoqueMedio () {
        let sql = `SELECT * FROM luci_produtos WHERE prod_estoque >= 10 AND prod_estoque < 50`;
        let row = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if(row.length > 0) {
            for(let i=0;i<row.length;i++) {
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

    async ProdutosEstoqueAlto () {
        let sql = `SELECT * FROM luci_produtos WHERE prod_estoque >= 50`;
        let row = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if(row.length > 0) {
            for(let i=0;i<row.length;i++) {
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