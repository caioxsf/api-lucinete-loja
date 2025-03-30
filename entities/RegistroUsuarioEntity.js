import BaseEntity from "./BaseEntity.js";

export default class UsuarioEntity extends BaseEntity {

    #id
    #nome
    #sobrenome
    #email
    #cpf
    #nascimento

    constructor (id,nome,sobrenome,email,cpf,nascimento) {
        super();
        this.#id = id;
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#email = email;
        this.#cpf = cpf;
        this.#nascimento = nascimento;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get sobrenome () {return this.#sobrenome} set sobrenome (value) {this.#sobrenome = value}
    get email () {return this.#email} set email (value) {this.#email = value}
    get cpf () {return this.#cpf} set cpf (value) {this.#cpf = value}
    get nascimento () {return this.#nascimento} set nascimento (value) {this.#nascimento = value}
}