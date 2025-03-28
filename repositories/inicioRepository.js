export default class inicioRepository {

    #banco;

    constructor() {
        this.#banco = new Database();
    }

    async cadastrar(entidade) {
        let sql = `insert into tb_usuario (usu_nome) values (?)`;
        let params = [entidade.nome];

        let result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }

    async listar() {

        let sql = `select * from tb_usuario`;
        let rows = await this.#banco.ExecutaComando(sql);

        let lista = [];
        for(let i=0; i<rows.length; i++) {
            let row = rows[i];
            lista.push(
                new UsuarioEntity(row["usu_id"], row["usu_nome"]
            );
        }

        return lista;
    }

    async obter(codigo) {
        
        let sql = `select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id where u.usu_id = ?`;
        
        let params = [codigo];

        let rows = await this.#banco.ExecutaComando(sql, params);
        let lista = [];
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(new UsuarioEntity(row["usu_id"], row["usu_nome"], row["usu_email"]));
        }

        return lista;
    }

    async excluir(codigo) {
        
        let sql = "delete from tb_usuario where usu_id = ?"
        let params = [codigo];

        let result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }

    async alterar(entidade) {
        let sql = `update tb_usuario set usu_nome = ? where usu_id = ?`;
        let params = [entidade.nome, entidade.id];

        let result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }
}
