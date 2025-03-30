import BaseEntity from "./BaseEntity.js";

export default class UsuarioEntity extends BaseEntity {

    #id
    #usuario
    #senha
    #per_id
    #re_id

    constructor (id,usuario,senha,per_id,cpf,re_id) {
        super();
        this.#id = id;
        this.#usuario = usuario;
        this.#senha = senha;
        this.#per_id = per_id;
        this.#re_id = re_id;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get usuario () {return this.#usuario} set usuario (value) {this.#usuario = value}
    get senha () {return this.#senha} set senha (value) {this.#senha = value}
    get per_id () {return this.#per_id} set per_id (value) {this.#per_id = value}
    get re_id () {return this.#re_id} set re_id (value) {this.#re_id = value}
}