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

export default router;