# PGRS LAFIC - Sistema Integrado de Gerenciamento de Resíduos

🧬 **Plano de Gerenciamento de Resíduos Sólidos** do Laboratório de Ficologia (LAFIC) - UFSC

Sistema completo para rastreamento, conformidade e biossegurança de resíduos laboratoriais.

## 📁 Estrutura do Projeto

```
PGRS_Lafic/
├── backend/                    # Express.js + Notion API
│   ├── config/                 # Configurações (Notion, constantes)
│   ├── services/               # Lógica de negócio
│   ├── routes/                 # Endpoints da API
│   ├── models/                 # Estruturas de dados
│   ├── tests/                  # Testes unitários
│   ├── .env.example            # Template de variáveis
│   ├── index.js                # Servidor principal
│   └── package.json
│
├── frontend/                   # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── pages/              # Páginas principais
│   │   ├── services/           # Chamadas à API
│   │   ├── styles/             # CSS global
│   │   └── App.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── docs/
│   ├── NOTION_SETUP.md         # Setup das 5 tabelas Notion
│   ├── API_DOCS.md             # Documentação dos endpoints
│   └── DEPLOYMENT.md           # Deploy (Render + Vercel)
│
├── index.html                  # PGRS estático (original)
├── PGRS_LAFIC.md               # Documentação em Markdown
└── README.md                   # Este arquivo
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- npm/yarn
- Conta Notion

### 1️⃣ Setup do Notion

1. Acesse [docs/NOTION_SETUP.md](./docs/NOTION_SETUP.md)
2. Crie os 5 bancos de dados
3. Copie os IDs para `backend/.env`

### 2️⃣ Backend (Express)

```bash
cd backend
cp .env.example .env
# Preencha as variáveis de ambiente

npm install
npm run dev
# Servidor rodando em http://localhost:3000
```

### 3️⃣ Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# Frontend rodando em http://localhost:5173
```

## 🛠️ Tecnologias

### Backend
- **Express.js** - Framework web
- **@notionhq/client** - Integração com Notion
- **SQLite** - Cache local de alertas
- **CORS** - Compartilhamento entre domínios

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool rápido
- **TailwindCSS** - Utility-first CSS
- **Recharts** - Gráficos interativos

## 📊 Funcionalidades

### Dashboard
- ✅ Resumo de volume acumulado (últimos 30 dias)
- ✅ Alertas ativos (vencimento, conformidade, coleta)
- ✅ Gráficos de tendência

### Inventário
- ✅ Tabela filtrada (tipo, ambiente, status)
- ✅ Conformidade de EPIs/EPCs
- ✅ CRUD completo

### Biossegurança
- ✅ Matriz de atividades vs. Nível Biossegurança (NB)
- ✅ EPIs obrigatórios
- ✅ EPCs obrigatórios
- ✅ Protocolos de inativação

### Emergências
- ✅ Quick access buttons (derramamento, perfurocortante, infectante)
- ✅ Procedimentos passo a passo
- ✅ Contatos de emergência

### Conformidade
- ✅ Timeline de alertas
- ✅ Relatório de conformidade PGRS
- ✅ Exportar PDF

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/waste` | Listar resíduos |
| POST | `/api/waste` | Criar resíduo |
| GET | `/api/alerts` | Listar alertas |
| GET | `/api/biosecurity/epi/:activity` | EPIs para atividade |
| GET | `/api/analytics/volume-monthly` | Volume mensal |

Veja [docs/API_DOCS.md](./docs/API_DOCS.md) para documentação completa.

## 📝 Variáveis de Ambiente

Crie `backend/.env`:

```env
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID_WASTE=...
NOTION_DATABASE_ID_BIOSECURITY=...
NOTION_DATABASE_ID_INACTIVATION=...
NOTION_DATABASE_ID_ALERTS=...
NOTION_DATABASE_ID_MAINTENANCE=...

PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_PATH=./data/alerts.db
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 📦 Deploy

### Backend (Render)
Veja [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) para instruções.

### Frontend (Vercel)
```bash
npm run build
# Conectar repositório GitHub ao Vercel
```

## 👥 Fases de Desenvolvimento

- ✅ **Fase 1:** Setup Inicial (Notion, Node.js, React)
- ⏳ **Fase 2:** Backend (Notion API + endpoints)
- ⏳ **Fase 3:** Frontend Dashboard + Inventário
- ⏳ **Fase 4:** Biossegurança + Emergências
- ⏳ **Fase 5:** Testes e Deploy

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

- **Dúvidas sobre Notion?** Veja [docs/NOTION_SETUP.md](./docs/NOTION_SETUP.md)
- **Problemas na API?** Veja [docs/API_DOCS.md](./docs/API_DOCS.md)
- **Deploy?** Veja [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 📄 Licença

MIT - Desenvolvido para UFSC

---

**Desenvolvido com ❤️ para o LAFIC - UFSC**
