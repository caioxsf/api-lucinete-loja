import swaggerAutogen from "swagger-autogen";
import ProdutoEntity from "./entities/ProdutoEntity.js";
import CategoriaEntity from "./entities/CategoriaEntity.js";

const doc = {
    info: {
        title: "API RESTful",
    },
    host: '161.97.170.146:3001',
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
                './routes/VendaRoute.js']

swaggerAutogen({openapi: '3.0.0', autoHeaders: false})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})
