import BaseEntity from "./BaseEntity.js"

export default class CategoriaEntity extends BaseEntity {

    #id
    #nome

    constructor(id, nome) {
        super();
        this.#id = id;
        this.#nome = nome;
    }

    get id() { return this.#id; } set id(value) { this.#id = value; }
    get nome() { return this.#nome; } set nome(value) { this.#nome = value; }

}