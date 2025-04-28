import express from 'express';
const router = express.Router();
import CarrinhoController from '../controllers/CarrinhoController.js';
import VendaController from '../controllers/VendaController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

let ctrl = new CarrinhoController();
let ctrlVenda = new VendaController();
let auth = new AuthMiddleware()

router.post('/carrinho', auth.validarCliente, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Carrinho']
    // #swagger.summary = "Endpoint para adicionar um produto ao carrinho"
    
    
    ctrl.AdicionarProdutoCarrinho(req,res);
})

router.post('/carrinho/checkout', auth.validarCliente, (req, res) => {
    /* #swagger.security = [{
            "bearerAuth": []
        }] */
    // #swagger.tags = ["Carrinho"]
    // #swagger.summary = "Endpoint para gerar e vender produtos"
    
    ctrlVenda.VenderProdutos(req, res);
})


router.get('/carrinho', auth.validarCliente, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Carrinho']
    // #swagger.summary = "Endpoint para listar os produtos do carrinho"
    
    
    ctrl.ExibirCarrinho(req,res);
})

router.patch('/carrinho/aumentar/:id', auth.validarCliente, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Carrinho']
    // #swagger.summary = "Endpoint para aumentar a quantidade de um produto no carrinho"
    
    
    ctrl.AumentarQuantidadeProduto(req,res);
})

router.patch('/carrinho/diminuir/:id', auth.validarCliente, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Carrinho']
    // #swagger.summary = "Endpoint para diminuir a quantidade de um produto no carrinho"
    
    
    ctrl.DiminuirQuantidadeProduto(req,res);
})

router.delete('/carrinho/:id', auth.validarCliente, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Carrinho'] 
    // #swagger.summary = "Endpoint para remover um produto do carrinho"
    ctrl.DeletarProdutoCarrinho(req,res);
});

export default router;