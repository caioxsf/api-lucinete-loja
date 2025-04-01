import BaseEntity from "./BaseEntity.js";

export default class ProdutoEntity extends BaseEntity {

    #id
    #nome
    #estoque
    #preco

    constructor (id,nome,estoque,preco){
        super();
        this.#id = id;
        this.#nome = nome;
        this.#estoque = estoque;
        this.#preco = preco;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get estoque () {return this.#estoque} set estoque (value) {this.#estoque = value}
    get preco () {return this.#preco} set preco (value) {this.#preco = value}
}