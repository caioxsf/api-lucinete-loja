import express from 'express'
import ProdutoController from '../controllers/ProdutoController.js';
const router = express.Router();

let ctrl = new ProdutoController();

router.post('/produtos', (req,res) => {
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para cadastrar um produto"
    ctrl.CadastrarProduto(req,res);
})

export default router;