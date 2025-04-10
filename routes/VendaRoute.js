import express from 'express'
import VendaController from '../controllers/VendaController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let ctrl = new VendaController();
let auth = new AuthMiddleware();

router.post('/vendas', auth.validarCliente, (req, res) => {
    /* #swagger.security = [{
            "bearerAuth": []
        }] */
    // #swagger.tags = ["Venda"]
    // #swagger.summary = "Endpoint para gerar e vender produtos"
    /* 
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            produto_id: { type: "string" },
                            quantidade: { type: "string" },
                        }
                    }
                }
            }
        }
    }
    */
    ctrl.VenderProdutos(req, res);
})

router.get('/vendas', auth.validar, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Venda"]
    // #swagger.summary = "Endpoint para listar todas as vendas teste"
    ctrl.ListarVendas(req, res);
})

export default router