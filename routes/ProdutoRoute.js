import express from 'express'
import ProdutoController from '../controllers/ProdutoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let ctrl = new ProdutoController();
let auth = new AuthMiddleware();

router.post('/produtos', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para cadastrar um produto"
    ctrl.CadastrarProduto(req,res);
})

router.get('/produtos',  (req,res) => {
   
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para listar todos os produtos"
    ctrl.ListarProdutos(req,res);
})

router.get('/produtos/estoque-baixo', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para listar todos os produtos com estoque baixo"
    ctrl.ProdutosEstoqueBaixo(req,res);
})

router.get('/produtos/estoque-medio', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para listar todos os produtos com estoque medio"
    ctrl.ProdutosEstoqueMedio(req,res);
})

router.get('/produtos/estoque-alto', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para listar todos os produtos com estoque alto"
    ctrl.ProdutosEstoqueAlto(req,res);
})

router.put('/produtos', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para alterar um produto"
    ctrl.AlterarProduto(req,res);
})

router.get('/produtos/:id', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para obter um produto pelo ID"
    ctrl.Obter(req,res);
})

router.delete('/produtos/:id', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Produtos"]
    // #swagger.summary = "Endpont para deletar um produto pelo ID"
    ctrl.Deletar(req,res);
})



export default router;