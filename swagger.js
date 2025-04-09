import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API RESTful",
  },
  host: 'localhost:5000',
  components: {
    schemas: {
      produtos: {
        id: 1,
        nome: "Caneta",
        estoque: 10,
        preco: 2.5,
        categoria: {
          id: 1,
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputJson = "./swagger-output.json";
const routes = [
  './routes/AuthRoute.js',
  './routes/UsuarioRoute.js',
  './routes/CategoriaRoute.js',
  './routes/ProdutoRoute.js',
  './routes/VendaRoute.js',
];

swaggerAutogen({ openapi: '3.0.0', autoHeaders: false })(outputJson, routes, doc).then(() => {
  console.log("📄 Swagger gerado com sucesso!");
});
