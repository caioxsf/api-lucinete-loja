import CategoriaEntity from "../entities/CategoriaEntity.js";
import CategoriaRepository from "../repositories/CategoriaRepository.js"

export default class CategoriaController {

    #repoCategoria
    constructor() {
        this.#repoCategoria = new CategoriaRepository();
    }

    async CadastrarCategoria(req, res) {
        let {nome} = req.body;
        if(nome) {
            if(await this.#repoCategoria.VerificarCategoria(nome) == false) {
                let entidade = new CategoriaEntity(0,nome);
                if(await this.#repoCategoria.CadastrarCategoria(entidade)) 
                    return res.status(201).json({msg: "Categoria criada com sucesso!"})
                throw new Error ("Erro ao inserir categoria no banco de dados!")
            } else
                return res.status(400).json({msg: "Essa categoria já foi criada!"})
        } else
            return res.status(400).json({msg: "Parâmetros invalidos!"})
    }

    async ListarCategorias(req,res) {
        let categorias = await this.#repoCategoria.ListarCategorias();
        if(categorias != null)
            return res.status(200).json(categorias);
        return res.status(404).json({msg: "Nenhuma categoria foi encontrada!"})
    }

    async AlterarCategoria(req,res) {
        let {id, nome} = req.body;
        if(id > 0 && nome) {
            if(await this.#repoCategoria.ObterCategoria(id) != null) {
                let entidade = new CategoriaEntity(id, nome);
                if(await this.#repoCategoria.AlterarCategoria(entidade))
                    return res.status(200).json({msg: "Categoria alterada com sucesso!"})
                throw new Error("Erro ao alterar categoria no banco de dados!")
            } else
                return res.status(404).json({msg: "Essa categoria não existe!"})
        }
    }

    async DeletarCategoria(req,res) {
        let {id} = req.params;
        if(id > 0) {
            if(await this.#repoCategoria.ObterCategoria(id) != null) {
                if(await this.#repoCategoria.DeletarCategoria(id))
                    return res.status(200).json({msg: "Categoria deletada com sucesso!"})
                else
                    throw new Error("Erro ao deletar categoria do banco de dados!")
            } else
                return res.status(404).json({msg: "Essa categoria não existe!"})
        } else
            return res.status(400).json({msg: "O id precisa ser maior que 0!"})
    }

    async ObterCategoria (req,res) {
        let {id} = req.params;
        if(id > 0) {
            let categoria = await this.#repoCategoria.ObterCategoria(id);
            if(categoria != null)
                return res.status(200).json(categoria)
            else
                return res.status(404).json({msg: "Essa categoria não existe!"})
        } else
            return res.status(400).json({msg: "O id precisa ser maior que 0!"})
        
    }
}