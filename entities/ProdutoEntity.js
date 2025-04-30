import BaseEntity from "./BaseEntity.js";

export default class ProdutoEntity extends BaseEntity {

    #id
    #nome
    #estoque
    #preco
    #categoria
    #ativo

    constructor (id,nome,estoque,preco,categoria,ativo){
        super();
        this.#id = id;
        this.#nome = nome;
        this.#estoque = estoque;
        this.#preco = preco;
        this.#categoria = categoria;
        this.#ativo = ativo;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get estoque () {return this.#estoque} set estoque (value) {this.#estoque = value}
    get preco () {return this.#preco} set preco (value) {this.#preco = value}
    get categoria () {return this.#categoria} set categoria (value) {this.#categoria = value}
    get ativo () {return this.#ativo} set ativo (value) {this.#ativo = value}
}