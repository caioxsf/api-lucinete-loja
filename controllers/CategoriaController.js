import CategoriaEntity from "../entities/CategoriaEntity.js";
import CategoriaRepository from "../repositories/CategoriaRepository.js"

export default class CategoriaController {

    #repoCategoria
    constructor() {
        this.#repoCategoria = new CategoriaRepository();
    }

    async CadastrarCategoria(req, res) {
        let {nome} = req.body;

        if(!nome) 
            return res.status(400).json({message: "Parâmetros invalidos!"})
        
        if(await this.#repoCategoria.VerificarCategoria(nome) == true) 
            return res.status(400).json({message: "Essa categoria já foi criada!"})

        let entidade = new CategoriaEntity(0, nome);

        if(!await this.#repoCategoria.CadastrarCategoria(entidade)) 
            return res.status(201).json({message: "Não foi possível cadastrar essa categoria"})
        
        return res.status(201).json({message: "Categoria criada com sucesso!"})
    }

    async ListarCategorias(req,res) {
        let categorias = await this.#repoCategoria.ListarCategorias();

        if(categorias != null)
            return res.status(200).json(categorias);
        
        return res.status(404).json({message: "Nenhuma categoria foi encontrada!"})
    }

    async AlterarCategoria(req,res) {
        let {id, nome} = req.body;
        
        if(id <= 0 || !nome) 
            return res.status(400).json({message: "Parâmetros invalidos!"})
        
        if(await this.#repoCategoria.ObterCategoria(id) == null) 
            return res.status(404).json({message: "Essa categoria não existe!"})

        let entidade = new CategoriaEntity(id, nome);

        if(!await this.#repoCategoria.AlterarCategoria(entidade))
            return res.status(200).json({message: "Erro ao alterar categoria"})

        return res.status(200).json({message: "Categoria alterada com sucesso!"})
    }
        
    async DeletarCategoria(req,res) {
        let {id} = req.params;

        if(id <= 0) 
            return res.status(400).json({message: "O id precisa ser maior que 0!"})

        if(await this.#repoCategoria.ObterCategoria(id) == null)
            return res.status(404).json({message: "Essa categoria não existe!"})

        if(!await this.#repoCategoria.DeletarCategoria(id))
            return res.status(200).json({message: "Não foi possível deletar categoria!"})

        return res.status(200).json({message: "Categoria deletada com sucesso!"})    
    }

    async ObterCategoria (req,res) {
        let {id} = req.params;
        if(id > 0) {
            let categoria = await this.#repoCategoria.ObterCategoria(id);
            if(categoria != null)
                return res.status(200).json(categoria)
            else
                return res.status(404).json({message: "Essa categoria não existe!"})
        } else
            return res.status(400).json({message: "O id precisa ser maior que 0!"})
        
    }
}