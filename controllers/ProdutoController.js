import ProdutoEntity from "../entities/ProdutoEntity.js";
import ProdutoRepository from "../repositories/ProdutoRepository.js"

export default class ProdutoController {

    #repoProduto
    constructor () {
        this.#repoProduto = new ProdutoRepository();
    }

    async CadastrarProduto (req,res) {
        let {nome, estoque, preco} = req.body;
        if(nome && estoque && preco > 0) {
            let entidade = new ProdutoEntity(0, nome, estoque, preco);
            if(await this.#repoProduto.CadastrarProduto(entidade))
                return res.status(201).json({msg: "Produto cadastrado com sucesso!"})
            else
                throw new Error ("Erro ao inserir produto no banco de dados")
        } else
            return res.status(400).json({msg: "Parâmetros invalidos!"})
    }

    async ListarProdutos (req,res) {
        let produtos = await this.#repoProduto.ListarProdutos();
        if(produtos != null)
            return res.status(200).json(produtos);
        else
            return res.status(404).json({msg: "Nenhum produto foi encontrado!"})
    }
}