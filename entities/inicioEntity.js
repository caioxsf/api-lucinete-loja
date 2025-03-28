export default class inicioEntity {
    
    #nome
    #codigo

    constructor(nome, codigo) {
        this.#nome = nome;
        this.#codigo = codigo;
    }

    get nome () {
        return this.#nome;
    }
    set nome (value) {
        this.#nome = value;
    }

    get codigo () {
        return this.#codigo;
    }
    set codigo (value) {
        this.#codigo = value;
    }

    toJSON(){
        return {
            nome: this.#nome,
            codigo: this.#codigo
        }
    }
    
}
