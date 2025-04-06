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
}