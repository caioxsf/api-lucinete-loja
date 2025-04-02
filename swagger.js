import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API RESTful",
    },
    host: 'localhost:5000',
    components: {
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
                 './routes/ProdutoRoute.js',
                './routes/VendaRoute.js']

swaggerAutogen({openapi: '3.0.0', autoHeaders: false})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})
