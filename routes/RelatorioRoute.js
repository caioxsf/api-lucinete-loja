import express from 'express';
import RelatorioController from '../controllers/RelatorioController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let auth = new AuthMiddleware();
let ctrl = new RelatorioController()

router.get('/relatorio/produtos-mais-vendidos', auth.validar, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Relatorio"]
    // #swagger.summary = "Endpoint para listar os produtos mais vendidos"
    ctrl.ProdutosMaisVendidos(req,res);
})

router.get('/relatorio/produtos-menos-vendidos', auth.validar, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Relatorio"]
    // #swagger.summary = "Endpoint para listar os produtos menos vendidos"
    ctrl.ProdutosMenosVendidos(req,res);
})

export default router;