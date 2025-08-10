📰 Sistema para Classificados On-line
Plataforma para publicação e busca de anúncios, inspirada em OLX, Facebook Marketplace e Webmotors. Visitantes podem navegar por classificados; usuários autenticados podem criar, gerenciar e conversar sobre anúncios em tempo real.

🚀 Frontend: Next.js (UI responsiva e performática)
⚙️ Backend: Express (API RESTful)
🗄️ Banco de Dados: Relacional (ex.: MySQL/PostgreSQL)
🔐 Auth: JWT
⚡ Tempo real: WebSocket para mensagens
🖼️ Imagens: Upload e otimização
Funciona bem como base para MVPs de marketplace, com arquitetura clara, separação de responsabilidades e documentação extensível.

✨ O que este projeto faz
Em alto nível, o sistema oferece:

👤 Registro e login com senhas criptografadas (bcrypt) e emissão de tokens JWT.
🗂️ CRUD de anúncios (classificados) e categorias/tipos.
🛒 Experiência de busca com filtros por cidade, tipo (item, imóvel, veículo), condição (novo/usado) e ordenação (data/preço).
🔍 Página de detalhes com galeria de imagens, título, descrição, preço, vendedor, localização e data de publicação.
💬 Chat entre comprador e vendedor em tempo real via WebSocket (inbox de conversas).
💾 Lista de “salvos” para o usuário favoritar anúncios.
🔐 Rotas públicas e restritas, com controle via middleware (JWT).
🧱 Arquitetura (visão geral)
Separação de camadas para facilitar manutenção e evolução:

Rotas → Controllers → Services/Repositories → Banco de dados
Autenticação JWT via middleware
Upload/armazenamento de imagens
Canal WebSocket para mensagens
Exemplo de fluxo: Request → Route → Controller → Repository → DB → Response

🛠️ Tecnologias
Frontend 🎨: Next.js, Tailwind CSS, otimização de imagens
Backend ⚙️: Node.js, Express, CORS, dotenv
Banco 🗄️: MySQL/PostgreSQL (ex.: mysql2/pg)
Autenticação 🔐: JWT, bcrypt
Tempo real ⚡: WebSocket
E-mail ✉️: SMTP (opcional)
Testes 🧪: Jest, Supertest (sugeridos)
Infra 🐳: Dockerfile/Compose (opcional)
📦 Estrutura de pastas (sugerida)
frontend/ (Next.js)
backend/ (Express)
src/
routes/
controllers/
services/ ou repositories/
entities/ ou models/
middlewares/
utils/
config/
infra/ (Docker, nginx, scripts)
docs/ (diagramas, coleções Postman, Swagger)
⚙️ Variáveis de ambiente (exemplos)
Backend (.env):

PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=classificados_db
JWT_SECRET=uma_chave_bem_secreta
STORAGE_PROVIDER=local
SMTP_HOST=smtp.seuprovedor.com
SMTP_PORT=587
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha
Frontend (.env.local):

NEXT_PUBLIC_API_URL=http://localhost:3001
▶️ Como rodar
Clone o repositório
git clone https://github.com/SEU_USUARIO/sistema-classificados.git
cd sistema-classificados
Backend
cd backend
cp .env.example .env
npm install
npm run dev (ou npm start)
Frontend
cd ../frontend
cp .env.local.example .env.local
npm install
npm run dev
Frontend: http://localhost:3000
API: http://localhost:3001
🗺️ API (visão geral)
Auth: POST /auth/register, POST /auth/login
Usuários: GET/PUT /users/me
Classificados:
GET /ads (listagem com filtros e paginação)
GET /ads/:id (detalhes)
POST /ads (criar) — autenticado
PUT /ads/:id (editar) — dono
DELETE /ads/:id (excluir) — dono
PATCH /ads/:id/status (ativo/inativo)
Imagens: POST /ads/:id/images (upload múltiplo)
Salvos:
POST /saved/:adId
GET /saved
DELETE /saved/:adId
Mensagens:
GET /chats
GET /chats/:id/messages
POST /chats/:id/messages
WebSocket: canal de mensagens em tempo real
Sugestão: disponibilize Swagger em /docs ou uma coleção do Postman em docs/.

🧪 Testes
Unitários: regras de negócio (services/utils).
Integração: rotas com Supertest.
E2E: fluxo de criação de anúncio, chat e salvos.
Scripts (backend):

npm test
npm run test:watch
🧭 Roadmap
🔎 Busca full-text e destaques
🧩 Categorias, subcategorias e atributos dinâmicos por tipo
🖼️ Thumbnails e lazy loading
🧑‍💼 Painel do vendedor com métricas
📬 Notificações (e-mail/push)
🧯 Moderação e denúncias
🌐 i18n (pt-BR, en-US)
🤝 Contribuição
Issues e PRs são bem-vindos!
Padrão de commit sugerido: feat:, fix:, docs:, chore:, refactor:, test:
Mantenha documentação (Swagger/README) atualizada.
