import express from 'express'

// Rotas
import UsuarioRoute from './routes/UsuarioRoute.js';
import ProdutoRoute from './routes/ProdutoRoute.js';
import VendaRoute from './routes/VendaRoute.js';
import AuthRoute from './routes/AuthRoute.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use('/', UsuarioRoute);
app.use('/', ProdutoRoute);
app.use('/', VendaRoute)
app.use('/', AuthRoute)

app.listen(5000, function() {
    console.log("backend em execução");
})

export default app;
