import express from 'express'
import CategoriaController from '../controllers/CategoriaController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router()

let ctrl = new CategoriaController();
let auth = new AuthMiddleware();

router.post('/categoria', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Categorias']
    // #swagger.summary = "Endpoint para criar a categoria do produto"
    ctrl.CadastrarCategoria(req,res);
})

router.get('/categoria', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Categorias']
    // #swagger.summary = "Endpoint para listar todas as categorias"
    ctrl.ListarCategorias(req,res);
})

router.put('/categoria', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Categorias']
    // #swagger.summary = "Endpoint para alterar uma categoria"
    ctrl.AlterarCategoria(req,res);
})

router.get('/categoria/:id', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Categorias']
    // #swagger.summary = "Endpoint para obter uma categoria"
    ctrl.ObterCategoria(req,res);
})

router.delete('/categoria/:id', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Categorias']
    // #swagger.summary = "Endpoint para deletar uma categoria"
    ctrl.DeletarCategoria(req,res);
})



export default router;