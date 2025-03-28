import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API RESTful",
    },
    host: 'localhost:5000',
}

const outputJson = "./swagger-output.json";
// Aqui colocar todas as rodas exemplo:
// ['./routes/testeRoute.js', ./routes/teste2Route2.js']
const routes = ['./routes/testeRoute.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})
