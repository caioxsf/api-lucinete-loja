import express from 'express'
import inicioController from '../controllers/inicioController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let ctrl = new inicioController();
let authMiddleware = new AuthMiddleware();

router.get('/', authMiddleware.validar, (req,res) => {
    // #swagger.tags = ['Tabela FIPE']
    // #swagger.summary = "Endpoint para listar marcas de carros"
    ctrl.listarMarca(req,res);
});

export default router;
