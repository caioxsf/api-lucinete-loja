import express from 'express'
import dotenv from 'dotenv';
// Rotas
import UsuarioRoute from './routes/UsuarioRoute.js';
import ProdutoRoute from './routes/ProdutoRoute.js';
import VendaRoute from './routes/VendaRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import CategoriaRoute from './routes/CategoriaRoute.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import swaggerUi from 'swagger-ui-express';
dotenv.config();
const app = express();
app.use(express.json());

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use('/', UsuarioRoute);
app.use('/', ProdutoRoute);
app.use('/', VendaRoute);
app.use('/', AuthRoute);
app.use('/', CategoriaRoute);


app.listen(3001, function() {
    console.log("backend em execução");
})

export default app;
