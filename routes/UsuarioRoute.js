import express from 'express'
import UsuarioController from '../controllers/UsuarioController.js';
const router = express.Router();

let ctrl = new UsuarioController();

router.post('/usuario', (req,res) => {
    // #swagger.tags = ['Usuários']
    // #swagger.summary = "Endpoint para cadastrar usuários"
    ctrl.CadastrarUsuario(req,res)
});

export default router;
