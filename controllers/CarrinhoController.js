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

    async AdicionarProdutoCarrinho(req,res) {
        let { idProduto } = req.body;
        let idUsuario = req.usuarioLogado.id;
        if ( idProduto) {
            if(await this.#produtoRepo.Obter(idProduto)) {
                if(await this.#carrinhoRepo.VerificarProdutoCarrinho(idProduto, idUsuario) == false) {
                    if(await this.#carrinhoRepo.AdicionarProdutoCarrinho(idProduto, idUsuario)) {
                        return res.status(201).json({ message: "Produto adicionado ao carrinho!" });
                    }
                    throw new Error("Erro ao inserir produto no carrinho!");
                } else
                    return res.status(400).json({ message: "Produto já adicionado ao carrinho!" });
            } else {
                return res.status(400).json({ message: "Produto não encontrado" });
            }
        } else {
            return res.status(400).json({ message: "Produto não informado" });
        }
    }

    async ExibirCarrinho(req,res) {
        let idUsuario = req.usuarioLogado.id;
        let carrinho = await this.#carrinhoRepo.ExibirCarrinho(idUsuario);
        if(carrinho != null) {
            return res.status(200).json(carrinho);
        } else {
            return res.status(404).json({ message: "Nenhum produto encontrado no carrinho!" });
        }
    }

    async AumentarQuantidadeProduto(req,res) {
        let { id } = req.params;
        if(id) {
            if(await this.#produtoRepo.Obter(id) != null) {
                if(await this.#carrinhoRepo.VerificarProdutoCarrinho(id, req.usuarioLogado.id) == true) {
                    let quantidade = await this.#produtoRepo.PegaQuantidadeProdutoCarrinho(id);
                    if(await this.#produtoRepo.VerificarEstoqueParaCarrinho(id, quantidade) == true) {
                        if(await this.#carrinhoRepo.AumentarQuantidadeProduto(id, req.usuarioLogado.id)) {
                            return res.status(200).json({ message: "Quantidade aumentada com sucesso!" });
                        }
                        throw new Error("Erro ao aumentar quantidade do produto!");
                    } else {
                        return res.status(400).json({ message: "Produto fora de estoque!" });
                    }
                }
            } else 
                return res.status(400).json({ message: "Produto não encontrado!" });
        } else 
            return res.status(400).json({ message: "Produto não informado!" });
    }

    async DiminuirQuantidadeProduto(req,res) {

        let { id } = req.params;
        if(id) {
            if(await this.#produtoRepo.Obter(id) != null) {
                if(await this.#carrinhoRepo.VerificarProdutoCarrinho(id, req.usuarioLogado.id) == true) {
                    let quantidade = await this.#produtoRepo.PegaQuantidadeProdutoCarrinho(id);
                    if(quantidade > 1) {
                        if(await this.#carrinhoRepo.DiminuirQuantidadeProduto(id, req.usuarioLogado.id)) {
                            return res.status(200).json({ message: "Quantidade diminuida com sucesso!" });
                        }
                        throw new Error("Erro ao diminuir quantidade do produto!");
                    } else {
                        return res.status(400).json({ message: "A quantidade não pode ser menor que 1!" });
                    }
                }
            } else 
                return res.status(400).json({ message: "Produto não encontrado!" });
        } else 
            return res.status(400).json({ message: "Produto não informado!" });

    }

    async DeletarProdutoCarrinho(req,res) {

        let { id } = req.params;
        if(id) {
            if(await this.#produtoRepo.Obter(id) != null) {
                if(await this.#carrinhoRepo.VerificarProdutoCarrinho(id, req.usuarioLogado.id) == true) {
                    if(await this.#carrinhoRepo.DeletarProdutoCarrinho(id, req.usuarioLogado.id)) {
                        return res.status(200).json({ message: "Produto deletado do carrinho!" });
                    }
                    throw new Error("Erro ao deletar produto do carrinho!");
                } else
                    return res.status(400).json({ message: "Esse produto não está no carrinho!" });
            } else 
                return res.status(400).json({ message: "Produto não encontrado!" });
        } else 
            return res.status(400).json({ message: "Produto não informado!" });
    }
}
