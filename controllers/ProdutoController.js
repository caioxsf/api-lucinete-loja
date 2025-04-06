import CategoriaEntity from "../entities/CategoriaEntity.js";
import ProdutoEntity from "../entities/ProdutoEntity.js";
import CategoriaRepository from "../repositories/CategoriaRepository.js";
import ProdutoRepository from "../repositories/ProdutoRepository.js"

export default class ProdutoController {

    #repoProduto
    #repoCategoria
    constructor() {
        this.#repoCategoria = new CategoriaRepository();
        this.#repoProduto = new ProdutoRepository();
    }

    async CadastrarProduto(req, res) {
        let { nome, estoque, preco, categoria } = req.body;
        if (nome && estoque && preco > 0 && categoria.id) {
            let entidade = new ProdutoEntity(0, nome, estoque, preco, new CategoriaEntity(categoria.id));
            if(await this.#repoCategoria.VerificarCategoriaPeloID(categoria.id) == true) {
                if (await this.#repoProduto.CadastrarProduto(entidade))
                return res.status(201).json({ msg: "Produto cadastrado com sucesso!" })
            else
                throw new Error("Erro ao inserir produto no banco de dados")
            } else
                return res.status(400).json({msg: "A categoria do produto não existe!"})
            
        } else
            return res.status(400).json({ msg: "Parâmetros invalidos!" })
    }

    async AlterarProduto(req, res) {
        let { id, nome, estoque, preco } = req.body;
        if (id > 0 && nome && estoque && preco > 0) {
            let entidade = new ProdutoEntity(id, nome, estoque, preco);
            if (await this.#repoProduto.AlterarProduto(entidade))
                return res.status(201).json({ msg: "Produto alterado com sucesso!" })
            else
                throw new Error("Erro ao alterar produto no banco de dados")
        } else
            return res.status(400).json({ msg: "Parâmetros invalidos!" })
    }

    async Obter(req, res) {
        let { id } = req.params;
        let produtos = await this.#repoProduto.Obter(id);
        if (produtos != null)
            return res.status(200).json(produtos);
        return res.status(404).json({ msg: "Nenhum produto foi encontrado" })
    }

    async Deletar(req, res) {
        let { id } = req.params;
        if (await this.#repoProduto.Obter(id)) {
            if (await this.#repoProduto.Deletar(id))
                return res.status(200).json({ msg: "Produto deletado com sucesso" })
            else
                throw new Error("Erro ao deletar usuario do banco de dados")
        } else
            return res.status(404).json({ msg: "Produto nao encontrado!" })

    }

    async ListarProdutos(req, res) {
        let produtos = await this.#repoProduto.ListarProdutos();
        if (produtos != null)
            return res.status(200).json(produtos);
        else
            return res.status(404).json({ msg: "Nenhum produto foi encontrado!" })
    }

    async ProdutosEstoqueBaixo(req,res) {
        let produtos = await this.#repoProduto.ProdutosEstoqueBaixo();
        if(produtos != null) 
            return res.status(200).json(produtos)
        else
            return res.status(404).json({msg: "Nenhum produto com estoque baixo!"})
    }

    async ProdutosEstoqueMedio(req,res) {
        let produtos = await this.#repoProduto.ProdutosEstoqueMedio();
        if(produtos != null) 
            return res.status(200).json(produtos)
        else
            return res.status(404).json({msg: "Nenhum produto com estoque razoavel!"})
    }

    async ProdutosEstoqueAlto(req,res) {
        let produtos = await this.#repoProduto.ProdutosEstoqueAlto();
        if(produtos != null) 
            return res.status(200).json(produtos)
        else
            return res.status(404).json({msg: "Nenhum produto com estoque razoavel!"})
    }


}