### API Lucinete Loja 🛍️💚

API RESTful para gerenciar a lojinha da Lucinete: usuários, produtos, categorias, vendas, carrinho e relatórios. Inclui autenticação com JWT, documentação via Swagger e suporte a Docker.

#### 🔗 Documentação interativa
Depois de subir a API, acesse: http://localhost:3001/docs

---

#### ✨ Tecnologias

- Node.js + Express
- MySQL (mysql2)
- JWT para autenticação
- Bcrypt (bcryptjs) para hashing de senhas
- Swagger (swagger-autogen + swagger-ui-express)
- CORS habilitado
- Nodemailer para e-mails
- Dotenv para variáveis de ambiente
- Dockerfile para containerização

---

#### 🗂️ Estrutura do projeto

api-lucinete-loja/
├─ controllers/ # Lógica de negócio por recurso
├─ repositories/ # Acesso ao banco (queries)
├─ entities/ # Modelagem/entidades
├─ routes/ # Definição das rotas (Express)
├─ middlewares/ # Middlewares (ex.: auth)
├─ utils/bcrypt/ # Utilitários de hash
├─ db/ # (scripts auxiliares, se houver)
├─ swagger.js # Geração do swagger-output.json
├─ swagger-output.json # Esquema gerado do Swagger
├─ server.js # Bootstrap do servidor e rotas
├─ Dockerfile
├─ package.json
├─ .env.example # (recomendado criar)
└─ banco.txt # Script/notes do banco (SQL)


Rotas registradas em server.js: UsuarioRoute, ProdutoRoute, VendaRoute, AuthRoute, CategoriaRoute, RelatorioRoute, CarrinhoRoute (todas montadas em "/"). A documentação fica em "/docs".

Observação: a porta está fixa em 3001 no server.js.

---

#### 📦 Pré-requisitos

- Node.js 18+ e npm
- MySQL 8+ em execução
- Opcional: Docker

---

#### 🔧 Configuração

1) Instale as dependências:
npm install


2) Crie seu arquivo .env na raiz (exemplo sugerido):
App
NODE_ENV=development

Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=lucinete_loja

Auth
JWT_SECRET=uma_chave_bem_secreta
JWT_EXPIRES_IN=1d

Email (opcional)
MAIL_HOST=smtp.seuprovedor.com
MAIL_PORT=587
MAIL_USER=seu_usuario
MAIL_PASS=sua_senha
MAIL_FROM="Lucinete Loja no-reply@exemplo.com"


3) Banco de dados:
Crie o schema e tabelas conforme seu modelo. Use o banco.txt como referência se houver SQL lá. Ajuste as credenciais no .env.

---

#### ▶️ Como rodar

Gera/atualiza o Swagger e inicia o servidor:
npm run start


A API ficará em:  
- API: http://localhost:3001  
- Docs: http://localhost:3001/docs

Dica: se quiser subir apenas o servidor (sem regenerar Swagger), você pode rodar diretamente:
node server.js


Para apenas gerar/atualizar o Swagger:
npm run swagger


---

#### 🐳 Executando com Docker

Build da imagem:
docker build -t api-lucinete-loja .


Rodando o container:
docker run -p 3001:3001 --env-file .env --name lucinete_api api-lucinete-loja


Acesse: http://localhost:3001/docs

Dica: para MySQL, utilize uma rede Docker e um container para o banco, ou aponte o DB_HOST para o host adequado.

---

#### 🔐 Autenticação (JWT)

- Use o header Authorization: Bearer <token>.
- Faça login na rota de autenticação para receber o token.
- Rotas protegidas exigem um token válido.

Exemplo (login):
curl -X POST http://localhost:3001/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"user@exemplo.com","senha":"123456"}'


Usando o token:
curl http://localhost:3001/produtos \
-H "Authorization: Bearer SEU_TOKEN_AQUI"


---

#### 📚 Endpoints

A lista completa de endpoints, esquemas e exemplos está no Swagger:  
http://localhost:3001/docs

Principais recursos: usuários, produtos, categorias, vendas, carrinho e relatórios.

---

#### 🧪 Testes

Há dependências de teste (jest, supertest) no package.json. Para habilitar o script de testes:
npm set-script test "jest"
npm run test


---

#### ⚙️ Scripts npm

- start: executa o swagger.js (gera Swagger e sobe o servidor)
- swagger: gera/atualiza o swagger-output.json

---

#### 🛟 Troubleshooting

- Se as rotas não aparecem no Swagger, rode novamente `npm run swagger` para regenerar o arquivo.
- Confirme variáveis do .env e conectividade com o MySQL.
- Verifique logs do servidor no terminal para mensagens de erro.

---

#### 🗺️ Roadmap (sugestões)

- Testes de integração com supertest
- CI com GitHub Actions (lint/test/build)
- Migrations para o banco (ex.: Sequelize/Knex)
- Rate limiting e logs estruturados
- Padronização de erros e respostas (error handler global)

---

#### 🙌 Contribuição

- Abra uma issue com detalhes do bug/feature
- Faça um fork, crie uma branch, e abra um PR
- Mantenha o padrão de código e atualize a documentação/Swagger quando necessário

---

#### 📄 Licença

ISC (veja o package.json). Ajuste conforme a necessidade do projeto.

---
