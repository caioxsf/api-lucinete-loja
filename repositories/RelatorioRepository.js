import Database from "../db/database.js"

export default class RelatorioRepository {

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async ProdutosMaisVendidos() {
        let sql = ` SELECT p.prod_id, p.prod_nome,
                    SUM(iv.item_quantidade) AS total_vendido
                    FROM luci_itens_vendas iv
                    JOIN luci_produtos p ON iv.prod_id = p.prod_id
                    GROUP BY p.prod_id, p.prod_nome
                    ORDER BY total_vendido DESC`;
        let rows = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if(rows.length > 0) {
            for(let i = 0; i < rows.length; i++) {
                lista.push({
                    id: rows[i]['prod_id'],
                    nome: rows[i]['prod_nome'],
                    total_vendido: rows[i]['total_vendido']
                });
            }
            return lista;
        }
        return null;
    }

    async ProdutosMenosVendido() {
        let sql = ` SELECT p.prod_id, p.prod_nome,
        SUM(iv.item_quantidade) AS total_vendido
        FROM luci_itens_vendas iv
        JOIN luci_produtos p ON iv.prod_id = p.prod_id
        GROUP BY p.prod_id, p.prod_nome
        ORDER BY total_vendido ASC`;
        let rows = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if(rows.length > 0) {
        for(let i = 0; i < rows.length; i++) {
            lista.push({
                id: rows[i]['prod_id'],
                nome: rows[i]['prod_nome'],
                total_vendido: rows[i]['total_vendido']
            });
        }
        return lista;
        }
        return null;
    }
}