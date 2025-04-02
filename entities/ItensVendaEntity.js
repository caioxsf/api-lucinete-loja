export default class ItensVendaEntity {

    #item_id
    #ven_id
    #prod_id
    #item_quantidade
    #item_preco
    #item_subtotal

    constructor(item_id, ven_id, prod_id, item_quantidade, item_preco, item_subtotal) {
        this.#item_id = item_id;
        this.#ven_id = ven_id;
        this.#prod_id = prod_id;
        this.#item_quantidade = item_quantidade;
        this.#item_preco = item_preco;
        this.#item_subtotal = item_subtotal;
    }

    get item_id () {return this.#item_id} set item_id (value) {this.#item_id = value}
    get ven_id () {return this.#ven_id} set ven_id (value) {this.#ven_id = value}
    get prod_id () {return this.#prod_id} set prod_id (value) {this.#prod_id = value}
    get item_quantidade () {return this.#item_quantidade} set item_quantidade (value) {this.#item_quantidade = value}
    get item_preco () {return this.#item_preco} set item_preco (value) {this.#item_preco = value}
    get item_subtotal () {return this.#item_subtotal} set item_subtotal (value) {this.#item_subtotal = value}

}