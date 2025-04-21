import RelatorioRepository from "../repositories/RelatorioRepository.js"

export default class RelatorioController {

    #repoRelatorio
    constructor() {
        this.#repoRelatorio = new RelatorioRepository();
    }

    async ProdutosMaisVendidos(req, res) {
        let produtos = await this.#repoRelatorio.ProdutosMaisVendidos();
        if(produtos != null) {
            res.status(200).json(produtos);
        } else {
            res.status(404).json({msg: "Nenhum produto encontrado"});
        }
    }

    async ProdutosMenosVendidos(req, res) {
        let produtos = await this.#repoRelatorio.ProdutosMenosVendido();
        if(produtos != null) {
            res.status(200).json(produtos);
        } else {
            res.status(404).json({msg: "Nenhum produto encontrado"});
        }
    }

}