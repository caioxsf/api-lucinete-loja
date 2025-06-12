import CarrinhoRepository from "../repositories/CarrinhoRepository.js";
import ProdutoRepository from "../repositories/ProdutoRepository.js";
import VendaRepository from "../repositories/VendaRepository.js";

export default class CarrinhoController {

    #carrinhoRepo;
    #produtoRepo;
    #vendaRepo;
    constructor() {
        this.#carrinhoRepo = new CarrinhoRepository();
        this.#produtoRepo = new ProdutoRepository();
        this.#vendaRepo = new VendaRepository();
    }

    async AdicionarProdutoCarrinho(req, res) {
        let { idProduto } = req.body;
        let idUsuario = req.usuarioLogado.id;

        if (!idProduto)
            return res.status(400).json({ message: "Produto não informado" })

        if (!await this.#produtoRepo.Obter(idProduto))
            return res.status(400).json({ message: "Produto não encontrado" })

        if (await this.#carrinhoRepo.VerificarProdutoCarrinho(idProduto, idUsuario) != false)
            return res.status(400).json({ message: "Produto já adicionado ao carrinho!" })

        if (!await this.#carrinhoRepo.AdicionarProdutoCarrinho(idProduto, idUsuario))
            return res.status(400).json({ message: "Erro ao inserir produto no carrinho!" })

        return res.status(201).json({ message: "Produto adicionado ao carrinho!" });
    }

    async ExibirCarrinho(req, res) {
        let idUsuario = req.usuarioLogado.id;
        let carrinho = await this.#carrinhoRepo.ExibirCarrinho(idUsuario);
        if (carrinho != null) {
            return res.status(200).json(carrinho);
        } else {
            return res.status(404).json({ message: "Nenhum produto encontrado no carrinho!" });
        }
    }

    async AumentarQuantidadeProduto(req, res) {
        let { id } = req.params;

        if (!id)
            return res.status(400).json({ message: "Produto não informado!" });

        if (await this.#produtoRepo.Obter(id) == null)
            return res.status(400).json({ message: "Produto não encontrado!" });

        if (await this.#carrinhoRepo.VerificarProdutoCarrinho(id, req.usuarioLogado.id) != true)
            return res.status(400).json({ message: "Produ não encontrado no carrinho!" });

        let quantidade = await this.#produtoRepo.PegaQuantidadeProdutoCarrinho(id);

        if (await this.#produtoRepo.VerificarEstoqueParaCarrinho(id, quantidade) != true)
            return res.status(400).json({ message: "Quantidade fora de estoque!" })

        if (!await this.#carrinhoRepo.AumentarQuantidadeProduto(id, req.usuarioLogado.id))
            return res.status(200).json({ message: "Não foi possível aumentar a quantidade do produto!" });

        return res.status(200).json({ message: "Quantidade aumentada com sucesso!" });
    }

    async DiminuirQuantidadeProduto(req, res) {
        let { id } = req.params;

        if (!id)
            return res.status(400).json({ message: "Produto não informado!" })

        if (await this.#produtoRepo.Obter(id) == null)
            return res.status(400).json({ message: "Produto não encontrado!" })

        if (await this.#carrinhoRepo.VerificarProdutoCarrinho(id, req.usuarioLogado.id) != true)
            return res.status(400).json({ message: "Produto não encontrado no carrinho!" })

        let quantidade = await this.#produtoRepo.PegaQuantidadeProdutoCarrinho(id);
        if (quantidade == 1)
            return res.status(400).json({ message: "A quantidade não pode ser menor que 1!" })

        if (!await this.#carrinhoRepo.DiminuirQuantidadeProduto(id, req.usuarioLogado.id))
            return res.status(200).json({ message: "Não foi possível diminuir a quantidade de quantidade do produto no carrinho!" })

        return res.status(200).json({ message: "Quantidade diminuida com sucesso!" })
    }

    async DeletarProdutoCarrinho(req, res) {
        let { id } = req.params;
        if (!id)
            return res.status(400).json({ message: "Produto não informado!" })

        if (await this.#produtoRepo.Obter(id) == null)
            return res.status(400).json({ message: "Produto não encontrado!" })

        if (await this.#carrinhoRepo.VerificarProdutoCarrinho(id, req.usuarioLogado.id) != true)
            return res.status(400).json({ message: "Esse produto não está no carrinho!" })

        if (!await this.#carrinhoRepo.DeletarProdutoCarrinho(id, req.usuarioLogado.id)) 
            return res.status(200).json({ message: "Não foi possível deletar esse produto deletado do carrinho!" });

        return res.status(200).json({ message: "Produto deletado do carrinho!" });
    }
}
