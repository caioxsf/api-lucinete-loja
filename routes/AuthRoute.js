import express from 'express'
import AuthMiddleware from '../middlewares/authMiddleware.js';
import AutenticacaoController from '../controllers/AutenticacaoController.js';

const router = express.Router();

let auth = new AuthMiddleware();
let ctrl = new AutenticacaoController();

router.post('/auth/token', (req,res) => {
    // #swagger.tags = ['Autenticação']
    // #swagger.summary = "Gera um JWT para validação de acesso"
    
    ctrl.Token(req,res);
})

router.post('/auth/usuario', auth.validarCliente, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Autenticação']
    // #swagger.summary = "Endpoint para listar os dados do usuario logado"
    
    ctrl.AuthUsuarioLogado(req,res);
})

export default router;