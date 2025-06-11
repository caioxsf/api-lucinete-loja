import CategoriaEntity from "../entities/CategoriaEntity.js";
import ProdutoEntity from "../entities/ProdutoEntity.js";
import CarrinhoRepository from "../repositories/CarrinhoRepository.js";
import CategoriaRepository from "../repositories/CategoriaRepository.js";
import ProdutoRepository from "../repositories/ProdutoRepository.js"

export default class ProdutoController {

    #repoProduto
    #repoCategoria
    #repoCarrinho
    constructor() {
        this.#repoCategoria = new CategoriaRepository();
        this.#repoProduto = new ProdutoRepository();
        this.#repoCarrinho = new CarrinhoRepository();
    }

    async CadastrarProduto(req, res) {
        let { nome, estoque, preco, categoria } = req.body;

        if (nome && estoque && preco > 0 && categoria.id) {
            let entidade = new ProdutoEntity(0, nome, estoque, preco, 1, new CategoriaEntity(categoria.id));
            if (await this.#repoCategoria.VerificarCategoriaPeloID(categoria.id) == true) {
                if (await this.#repoProduto.CadastrarProduto(entidade))
                    return res.status(201).json({ message: "Produto cadastrado com sucesso!" })
                else
                    throw new Error("Erro ao inserir produto no banco de dados")
            } else
                return res.status(400).json({ message: "A categoria do produto não existe!" })

        } else
            return res.status(400).json({ message: "Parâmetros invalidos!" })
    }

    async AlterarProduto(req, res) {
        let { id, nome, estoque, preco, categoria } = req.body;

        if (id <= 0 || !nome || !estoque || preco <=0 || !categoria.id) 
            return res.status(400).json({ message: "Parâmetros invalidos!" })

        let entidade = new ProdutoEntity(id, nome, estoque, preco, new CategoriaEntity(categoria.id))

        if (!await this.#repoCategoria.VerificarCategoriaPeloID(categoria.id))
            return res.status(400).json({ message: "A categoria do produto não existe!" }) 

        if (await this.#repoProduto.AlterarProduto(entidade))
            return res.status(201).json({ message: "Produto alterado com sucesso!" })
    
        return res.status(400).json({ message: "Esse produto não existe!" })
    }

    async AdicionarEstoque(req, res) {
        let { id, quantidade } = req.body;

        if (!id || !quantidade) 
            return res.status(400).json({ message: "Parâmetros invalidos!" })
            
        if (!await this.#repoProduto.Obter(id)) 
            return res.status(404).json({ message: "Esse produto não existe!" })

        if (await this.#repoProduto.AdicionarEstoque(quantidade, id))
            return res.status(200).json({ message: "Estoque do produto atualizado!" })
        
        return res.status(400).json({ message: "Não foi possível adicionar estoque ao produto!"})
    }

    async Obter(req, res) {
        let { id } = req.params;
        let produtos = await this.#repoProduto.Obter(id);
        if (produtos != null)
            return res.status(200).json(produtos);
        return res.status(404).json({ message: "Nenhum produto foi encontrado" })
    }

    async AtivarProduto(req, res) {
        let { id } = req.params;
        if (await this.#repoProduto.ObterSemOpcaoDeAtivo(id) == null)
            return res.status(404).json({ message: "Produto não encontrado!" })

        if (await this.#repoProduto.AtivarProduto(id))
            return res.status(200).json({ message: "Produto ativado com sucesso!" })
        throw new Error("Erro ao ativar produto!")
    }

    async DesativarProduto(req, res) {
        let { id } = req.params;
        if (await this.#repoProduto.ObterSemOpcaoDeAtivo(id) == null)
            return res.status(404).json({ message: "Produto não encontrado!" })

        if(await this.#repoCarrinho.VerificarProdutoCarrinho(id, req.usuarioLogado.id) == true)
            return res.status(400).json({message: "Não foi possível desativar esse produto! Ele já está adicionado em algum carrinho!"})

        if (await this.#repoProduto.DesativarProduto(id))
            return res.status(200).json({ message: "Produto desativado com sucesso!" })
        else
            throw new Error("Erro ao desativar produto!")
    }

    async ListarProdutos(req, res) {
        let produtos = await this.#repoProduto.ListarProdutos();
        if (produtos != null)
            return res.status(200).json(produtos);
        else
            return res.status(404).json({ message: "Nenhum produto foi encontrado!" })
    }

    async ProdutosEstoqueBaixo(req, res) {
        let produtos = await this.#repoProduto.ProdutosEstoqueBaixo();
        if (produtos != null)
            return res.status(200).json(produtos)
        else
            return res.status(404).json({ message: "Nenhum produto com estoque baixo!" })
    }

    async ProdutosEstoqueMedio(req, res) {
        let produtos = await this.#repoProduto.ProdutosEstoqueMedio();
        if (produtos != null)
            return res.status(200).json(produtos)
        else
            return res.status(404).json({ message: "Nenhum produto com estoque razoavel!" })
    }

    async ProdutosEstoqueAlto(req, res) {
        let produtos = await this.#repoProduto.ProdutosEstoqueAlto();
        if (produtos != null)
            return res.status(200).json(produtos)
        else
            return res.status(404).json({ message: "Nenhum produto com estoque razoavel!" })
    }


}