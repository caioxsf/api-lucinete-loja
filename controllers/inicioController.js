import inicioController from "../repositories/inicioController.js"

export default class inicioController.js {

    #repository
    constructor() {
        this.#repository = new inicioRepository();
    }

    async listar (req,res) {
        let usuarios = await this.#repository.listar();
        res.status(200).json(usuarios);
    }

    async cadastrar(req, res) {
        if(req.body) {
            let {nome} = req.body;
            if(nome) {
                let entidade = new UsuarioEntity(0, nome);
                if(await this.#repo.cadastrar(entidade))
                    return res.status(201).json({msg: "Usuário cadastrado com sucesso!"});
                else
                    throw new Error("Erro ao inserir usuário no banco de dados");
            }
            else
                res.status(400).json({msg: "O corpo da requisição não está adequado!"})
        }
        else {
            res.status(400).json({msg: "Parâmetros inválidos!"});
        }
    }

    async obter(req, res) {
        let {codigo} = req.params;
        var lista = await this.#repo.obter(codigo);
        if(lista.length == 0)
            return res.status(404).json({msg: "Usuário não encontrado!"});

        return res.status(200).json(lista);
    }

    async alterar(req, res) {
        let entidade = new UsuarioEntity();
        let {id, nome} = req.body;
        if(id > 0 && nome) {
            entidade.nome = nome;
            entidade.id = id;
            if(await this.#repo.alterar(entidade))
                return res.status(200).json({msg: "Usuário alterado com sucesso!"});
            else
                throw new Error("Erro ao alterar usuário no banco de dados");
        }
        else{
            return res.status(400).json({msg: "Parâmetros inválidos!"});
        }
    }

    async excluir(req, res) {
        let {codigo} = req.params;
        if(await this.#repo.excluir(codigo))
            return res.status(200).json({msg: "Usuário excluído com sucesso!"});
        else
            throw new Error("Erro ao excluir usuário do banco de dados!");
    }
}
