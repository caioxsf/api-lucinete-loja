import express from 'express'
import VendaController from '../controllers/VendaController.js';
const router = express.Router();

let ctrl = new VendaController();

router.post('/vendas', (req,res) => {
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
    ctrl.VenderProdutos(req,res);
})

export default router