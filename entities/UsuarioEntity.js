import BaseEntity from "./BaseEntity.js";

export default class UsuarioEntity extends BaseEntity {

    #id
    #usuario
    #senha
    #perfil_id

    constructor (id,usuario,senha,perfil_id) {
        super();
        this.#id = id;
        this.#usuario = usuario;
        this.#senha = senha;
        this.#perfil_id = perfil_id;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get usuario () {return this.#usuario} set usuario (value) {this.#usuario = value}
    get senha () {return this.#senha} set senha (value) {this.#senha = value}
    get perfil_id () {return this.#perfil_id} set perfil_id (value) {this.#perfil_id = value}
}