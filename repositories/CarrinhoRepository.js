import Database from "../db/database.js";

export default class CarrinhoRepository {

    #database;
    constructor() {
        this.#database = new Database();
    }

    async AdicionarProdutoCarrinho(idProduto, idUsuario) {
        let sql = `INSERT INTO luci_carrinho (car_produto, car_usuario) VALUES (?, ?)`;
        let valores = [idProduto, idUsuario];
        let resultado = await this.#database.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async VerificarProdutoCarrinho(idProduto, idUsuario) {
        let sql = `SELECT * FROM luci_carrinho WHERE car_produto = ? AND car_usuario = ?`;
        let valores = [idProduto, idUsuario];
        let resultado = await this.#database.ExecutaComando(sql,valores);
        if(resultado.length > 0) {
            return true;
        } else
            return false;
    }

    async ExibirCarrinho(idUsuario) {
        let sql = `SELECT 
                    c.car_id, 
                    p.prod_id, 
                    u.usu_usuario, 
                    p.prod_nome, 
                    p.prod_preco, 
                    c.car_quantidade,
                    (SELECT SUM(p2.prod_preco * c2.car_quantidade)
                    FROM luci_carrinho c2
                    INNER JOIN luci_produtos p2 ON c2.car_produto = p2.prod_id
                    WHERE c2.car_usuario = c.car_usuario
                    ) AS total
                    FROM 
                        luci_carrinho c
                    INNER JOIN 
                        luci_produtos p ON c.car_produto = p.prod_id
                    INNER JOIN 
                        luci_usuarios u ON c.car_usuario = u.usu_id
                    WHERE 
                        c.car_usuario = ?
                `;
        let valores = [idUsuario];
        let rows = await this.#database.ExecutaComando(sql,valores);
        let lista = [];
        if(rows.length > 0) {
            for(let i=0;i<rows.length;i++) {
                let row = rows[i];
                lista.push({
                    id_carrinho: row['car_id'],
                    id_produto: row['prod_id'],
                    usuario: row['usu_usuario'],
                    produto: row['prod_nome'],
                    preco: row['prod_preco'],
                    quantidade: row['car_quantidade'],
                })
            }
            lista.push({
                total: rows[0]['total']
            })
            return lista;
        } 
        return null;
    }

    async AumentarQuantidadeProduto(idProduto, idUsuario) {
        let sql = `UPDATE luci_carrinho SET car_quantidade = car_quantidade + 1 WHERE car_produto = ? AND car_usuario = ?`;
        let valores = [idProduto, idUsuario];
        let resultado = await this.#database.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async DiminuirQuantidadeProduto(idProduto, idUsuario) {
        let sql = `UPDATE luci_carrinho SET car_quantidade = car_quantidade - 1 WHERE car_produto = ? AND car_usuario = ?`;
        let valores = [idProduto, idUsuario];
        let resultado = await this.#database.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async DeletarProdutoCarrinho(idProduto, idUsuario) {
        let sql = `DELETE FROM luci_carrinho WHERE car_produto = ? AND car_usuario = ?`;
        let valores = [idProduto, idUsuario];
        let resultado = await this.#database.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async TotalCarrinho(idUsuario) {
        let sql = `SELECT SUM(p.prod_preco * c.car_quantidade) AS total
                    FROM luci_carrinho c
                    INNER JOIN luci_produtos p ON c.car_produto = p.prod_id
                    WHERE c.car_usuario = ?`;
        let valores = [idUsuario];
        let rows = await this.#database.ExecutaComando(sql,valores);
        if(rows.length > 0) {
            return rows[0]['total'];
        } 
        return null;
    }
}