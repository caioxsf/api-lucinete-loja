import Database from "../db/database.js";
import ItensVendaEntity from "../entities/ItensVendaEntity.js";
import VendaRepository from "../repositories/VendaRepository.js"

export default class VendaController {

    #repoVenda
    constructor() {
        this.#repoVenda = new VendaRepository();
    }

    async VenderProdutos(req, res) {

        let banco = new Database();
        
        try {
            await banco.AbreTransacao();
            this.#repoVenda.banco = banco;

            let data = new Date();
            let idVenda = await this.#repoVenda.GerarVenda(data);
            let total = 0;

            if (idVenda) {
                for (let i = 0; i < req.body.length; i++) {
                    let entidade = new ItensVendaEntity();
                    let { quantidade, produto_id } = req.body[i];

                    if (await this.#repoVenda.VerificarCodigoProduto(produto_id)) {
                        let resultadoPreco = await this.#repoVenda.BuscarPrecoDoProduto(produto_id);
                        let preco = resultadoPreco.id;
                        entidade.item_quantidade = parseInt(quantidade);
                        entidade.item_preco = parseFloat(preco);
                        entidade.ven_id = idVenda;
                        entidade.item_subtotal = entidade.item_quantidade * parseFloat(preco);
                        entidade.prod_id = produto_id;

                        total += entidade.item_subtotal;

                        if (await this.#repoVenda.VerificarEstoque(produto_id, quantidade)) {
                            await this.#repoVenda.AtualizarEstoqueDoProduto(quantidade, produto_id);
                            await this.#repoVenda.CadastrarVenda(entidade);
                        } else
                            return res.status(404).json({msg: `Estoque do produto ${produto_id} insuficiente!`})
                    } else
                        return res.status(404).json({msg: `Codigo do produto inexistente!`})
                }
                await this.#repoVenda.AtualizarTotalVenda(total, idVenda);
                await banco.Commit();
                return res.status(200).json({ msg: "Venda registrada com sucesso!" })
            }
        } catch (ex) {
            await banco.Rollback();
            return res.status(500).json({msg: "Erro interno no servidor"})
        }

    }

}