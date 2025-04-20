import express from 'express';
import RelatorioController from '../controllers/RelatorioController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let auth = new AuthMiddleware();
let ctrl = new RelatorioController()

router.get('/relatorio', auth.validar, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Relatorio"]
    // #swagger.summary = "Endpoint para listar os produtos mais vendidos"
    ctrl.ProdutosMaisVendidos(req,res);
})

export default router;