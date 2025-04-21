import bcrypt from 'bcryptjs';

export async function hashSenha(senha) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(senha.toString(), saltRounds);
    return hash;
}

export async function compararSenha(senha, hash) {
    const resultadoSenha = await bcrypt.compare(senha, hash);
    return resultadoSenha;
}