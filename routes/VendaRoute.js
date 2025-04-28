import express from 'express'
import VendaController from '../controllers/VendaController.js';    
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let ctrl = new VendaController();
let auth = new AuthMiddleware();


router.get('/vendas', auth.validar, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Vendas"]
    // #swagger.summary = "Endpoint para listar todas as vendas"
    ctrl.ListarVendas(req, res);
})


export default router