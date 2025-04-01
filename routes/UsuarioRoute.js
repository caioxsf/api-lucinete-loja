import express from 'express'
import UsuarioController from '../controllers/UsuarioController.js';
const router = express.Router();

let ctrl = new UsuarioController();

router.post('/usuario', (req,res) => {
    // #swagger.tags = ['Usuários']
    // #swagger.summary = "Endpoint para cadastrar usuários"
    ctrl.CadastrarUsuario(req,res)
});

router.get('/usuario', (req,res) => {
    // #swagger.tags = ['Usuários']
    // #swagger.summary = "Endpoint para listar usuários cadastrados"
    ctrl.ListarUsuarios(req,res)
});

router.get('/usuario/:id', (req,res) => {
    // #swagger.tags = ['Usuários']
    // #swagger.summary = "Endpoint para obter um usuário cadastrado"
    ctrl.ObterUsuario(req,res)
});

router.put('/usuario', (req,res) => {
    // #swagger.tags = ['Usuários']
    // #swagger.summary = "Endpoint para alterar os dados do usuario ja cadastrado"
    ctrl.AlterarUsuario(req,res);
})

router.delete('/usuario/:id', (req,res) => {
    // #swagger.tags = ['Usuários']
    // #swagger.summary = "Endpoint para deletar os dados do usuario ja cadastrado"
    ctrl.DeletarUsuario(req,res);
})

export default router;
