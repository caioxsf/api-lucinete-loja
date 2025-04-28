import ItensVendaEntity from "../entities/ItensVendaEntity.js";
import CarrinhoRepository from "../repositories/CarrinhoRepository.js";
import VendaRepository from "../repositories/VendaRepository.js"

export default class VendaController {

    #repoVenda
    constructor() {
        this.#repoVenda = new VendaRepository();
    }

    async VenderProdutos(req, res) {
        let carrinhoRepo = new CarrinhoRepository();
        let carrinho = await carrinhoRepo.ExibirCarrinho(req.usuarioLogado.id);
        if (carrinho.length > 0) {
            let vendaGerada = await this.#repoVenda.GerarVenda(new Date(), carrinho[0].total);
            if (vendaGerada) {
                let entidade = new ItensVendaEntity();
                let total = 0;
                for (let i = 1; i < carrinho.length; i++) {
                    let produto = carrinho[i];
                    let preco = produto.preco;
                    let quantidade = produto.quantidade;
                    let subtotal = quantidade * preco;
                    total += subtotal;
                    entidade.item_quantidade = parseInt(quantidade);
                    entidade.item_preco = parseFloat(preco);
                    entidade.ven_id = vendaGerada;
                    entidade.item_subtotal = subtotal;
                    entidade.prod_id = produto.id_produto;

                    if (await this.#repoVenda.VerificarEstoque(produto.id_produto, quantidade)) {
                        await this.#repoVenda.AtualizarEstoqueDoProduto(quantidade, produto.id_produto);
                        await this.#repoVenda.CadastrarVenda(entidade);
                        await carrinhoRepo.LimparCarrinho(req.usuarioLogado.id);
                    } else
                        return res.status(404).json({ message: `Estoque do produto ${produto.id_produto} insuficiente!` })
                }
                return res.status(201).json({ message: "Venda registrada com sucesso!" })
            } else {
                return res.status(500).json({ message: "Erro ao gerar venda!" })
            }
        } else {
            return res.status(404).json({ message: "Nenhum produto encontrado no carrinho!" })
        }
    }

    async ListarVendas(req, res) {
        let vendas = await this.#repoVenda.ListarVendas();
        if (vendas != null)
            return res.status(200).json(vendas)
        return res.status(404).json({ message: "Nenhuma venda foi encontrada" })
    }

}