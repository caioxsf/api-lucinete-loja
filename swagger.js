import swaggerAutogen from "swagger-autogen";
import ProdutoEntity from "./entities/ProdutoEntity.js";
import CategoriaEntity from "./entities/CategoriaEntity.js";

const doc = {
    info: {
        title: "API RESTful",
    },
    host: "projetos-api-lucinete-loja.lp3jkk.easypanel.host",
    // host: "localhost:3001",
    schemes: ["https"],
    components: {
        schemas: {
            produtos: {
                "id": 1,
                "nome": "Caneta",
                "estoque": 10,
                "preco": 2.50,
                "categoria": {
                    "id": 1
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        }
    }
}

const outputJson = "./swagger-output.json";
// Aqui colocar todas as rodas exemplo:
// ['./routes/testeRoute.js', ./routes/teste2Route2.js']
const routes = ['./routes/AuthRoute.js',
                './routes/UsuarioRoute.js',
                './routes/CategoriaRoute.js',
                 './routes/ProdutoRoute.js',
                 './routes/CarrinhoRoute.js',
                './routes/VendaRoute.js',
                './routes/RelatorioRoute.js',
                ];

swaggerAutogen({openapi: '3.0.0', autoHeaders: false})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})
