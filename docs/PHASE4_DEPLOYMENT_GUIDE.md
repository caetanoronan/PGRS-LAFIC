# 🚀 Fase 4: Deployment - Guia Completo

## Status Atual: Sistema Pronto para Produção ✅

O PGRS LAFIC completou todas as funcionalidades core:
- ✅ Frontend com decisão tree inteligente (Opção C)
- ✅ Backend Express.js + Notion API
- ✅ Inventário dinâmico com classificação automática
- ✅ Alertas e conformidade
- ✅ Biossegurança integrada

---

## 🧪 ETAPA 1: Testes Pré-Deployment Local

### 1.1 Verificar Backend Localmente

```bash
cd backend
npm run dev
# Esperado: ✅ PGRS LAFIC Backend rodando em http://localhost:3000
```

Testar endpoints:
```bash
# Health check
curl http://localhost:3000/api/health
# Esperado: {"status":"ok","timestamp":"..."}

# Waste list (com Notion configurado)
curl http://localhost:3000/api/waste
# Esperado: [] ou [resíduos]
```

### 1.2 Verificar Frontend Localmente

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend (em outro terminal)
cd PGRS_Lafic
python3 -m http.server 8000
# Acesse: http://localhost:8000/app.html
```

**Testes no Browser:**
- [ ] Dashboard carrega sem erros de console
- [ ] API Health status mostra ✅ (verde)
- [ ] Botão "🌳 Ver Árvore" abre modal
- [ ] Expandir abas de decisão funciona
- [ ] Formulário de registro aparece
- [ ] Seleção de origem → tipo muda dinamicamente
- [ ] Card visual aparece após selecionar tipo
- [ ] Volume máximo valida (23kg/L)
- [ ] Botão "Registrar" tenta salvar (deve conectar ao Notion)

### 1.3 Verificar Notion Conectado

```bash
# No backend, verificar se conecta ao Notion:
NODE_ENV=development npm run dev
# Console deve mostrar: [Notion API] Conectando...
```

---

## 🔑 ETAPA 2: Preparar Credenciais

### 2.1 Gerar Notion API Key (seguro)

1. Acesse: https://www.notion.so/profile/integrations
2. Clique: "New Integration"
3. Nome: `PGRS-LAFIC-Backend`
4. Copie: **Internal Integration Token** (começa com `ntn_`)
5. Salve em local seguro (será usado no Render)

### 2.2 Obter Database IDs

Para cada tabela Notion criada, copiar o ID da URL:

**Notion URL padrão:**
```
https://www.notion.so/WORKSPACE/DATABASE_ID?v=VIEW_ID
                                    ^^^^^^^^
```

Copiar os IDs de:
- [ ] Inventário de Resíduos
- [ ] Protocolo de Inativação
- [ ] Requisitos de Biossegurança
- [ ] Alertas e Conformidade
- [ ] Manutenção de EPCs

---

## 🌐 ETAPA 3: Deploy Backend no Render

### 3.1 Preparar Repositório GitHub

Se ainda não estiver no GitHub:

```bash
cd "/c/Users/caetanoronan/OneDrive - UFSC/Área de Trabalho/PGRS_Lafic"

# Se não tem remote:
git remote add origin https://github.com/SEU_USUARIO/PGRS-LAFIC.git

# Se deve resetar origin:
# git remote remove origin
# git remote add origin https://github.com/SEU_USUARIO/PGRS-LAFIC.git

# Mudar para main branch (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

**Verificar:**
```bash
git remote -v
# origin    https://github.com/SEU_USUARIO/PGRS-LAFIC.git (fetch)
# origin    https://github.com/SEU_USUARIO/PGRS-LAFIC.git (push)
```

### 3.2 Criar Web Service no Render

1. Acesse: https://dashboard.render.com
2. Clique: **"New"** → **"Web Service"**
3. Autorizar GitHub e selecionar: `PGRS-LAFIC`

**Configurar:**
```
Name:             pgrs-lafic-backend
Root Directory:   backend
Environment:      Node
Build Command:    npm install
Start Command:    npm start
```

**Na aba "Environment", adicionar:**
```
NOTION_API_KEY = ntn_[SEU_TOKEN_AQUI]
NOTION_DATABASE_ID_WASTE = [UUID_WASTE]
NOTION_DATABASE_ID_INACTIVATION = [UUID_INACTIVATION]
NOTION_DATABASE_ID_BIOSECURITY = [UUID_BIOSECURITY]
NOTION_DATABASE_ID_ALERTS = [UUID_ALERTS]
NOTION_DATABASE_ID_MAINTENANCE = [UUID_MAINTENANCE]

PORT = 3000
NODE_ENV = production
FRONTEND_URL = [SERÁ_PREENCHIDO_DEPOIS]
ALLOWED_ORIGINS = [SERÁ_PREENCHIDO_DEPOIS]
```

4. Clique: **"Create Web Service"**
5. Aguarde deploy (~3-5 min)

**URL Gerada:** `https://pgrs-lafic-backend.onrender.com`

**Testar:**
```bash
curl https://pgrs-lafic-backend.onrender.com/api/health
# Esperado: {"status":"ok","timestamp":"..."}
```

---

## 🎨 ETAPA 4: Deploy Frontend no Vercel

### 4.1 Opção A: Vercel CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# No diretório do projeto
cd "/c/Users/caetanoronan/OneDrive - UFSC/Área de Trabalho/PGRS_Lafic"

# Deploy
vercel
# Seguir prompts:
# - Link to existing project? No
# - Project name: pgrs-lafic
# - Framework: Other (estático)
# - Root directory: ./
# - Build output dir: ./

# URL Gerada: https://pgrs-lafic.vercel.app
```

### 4.2 Opção B: GitHub Integration (Automático)

1. Acesse: https://vercel.com/dashboard
2. Clique: **"Add New..."** → **"Project"**
3. Selecione: `PGRS-LAFIC` (GitHub)
4. Deploy automático

---

## 🔄 ETAPA 5: Configurar Integração Frontend-Backend

### 5.1 Atualizar Variáveis no Render

No dashboard Render, editar Web Service:
```
Environment Variables:

FRONTEND_URL = https://pgrs-lafic.vercel.app
ALLOWED_ORIGINS = https://pgrs-lafic.vercel.app,https://pgrs-lafic-backend.onrender.com
```

Clicar: **"Save"** → Backend faz redeployment automático (~1-2 min)

### 5.2 Atualizar app.html para Produção

Editar `app.html`:

**Mudar:**
```javascript
// De:
const API_BASE = 'http://localhost:3001/api';

// Para:
const API_BASE = 'https://pgrs-lafic-backend.onrender.com/api';
```

**Commit e Push:**
```bash
git add app.html
git commit -m "🚀 Update API_BASE para produção"
git push origin main
```

**Vercel vai redeployar automaticamente** (~1-2 min)

---

## ✅ ETAPA 6: Testes em Produção

### 6.1 Testar Conexão Frontend-Backend

1. Abrir: https://pgrs-lafic.vercel.app
2. Verificar no browser console (F12):
   - [ ] Sem erros de CORS
   - [ ] Sem erros 404 no /api/health
   - [ ] Dashboard mostra status ✅
   - [ ] Dados de waste carregam (vazio ou com dados)

### 6.2 Testar Fluxo Completo

1. Abrir: https://pgrs-lafic.vercel.app
2. Ir para: **"➕ Registrar Resíduo"**
3. [ ] Modal "🌳 Ver Árvore" funciona
4. [ ] Expandir abas funciona
5. [ ] Formulário carrega corretamente
6. [ ] Origem → Tipo dinâmico funciona
7. [ ] Registrar resíduo (conecta ao Notion)
8. [ ] Aparecer no Dashboard

### 6.3 Monitorar Logs

**Render Logs:**
- Dashboard → Web Service → Logs
- Procurar por erros ou avisos

**Vercel Logs:**
- https://vercel.com/dashboard
- Seu projeto → Deployments → Logs

---

## 🚨 Troubleshooting

### CORS Error em produção

**Symptom:** `Access to XMLHttpRequest blocked by CORS`

**Solução:**
```bash
# Render → Environment Variables → Adicionar/editar:
ALLOWED_ORIGINS = https://pgrs-lafic.vercel.app,https://pgrs-lafic-backend.onrender.com

# Salvar → Redeployment automático
```

### Backend não conecta ao Notion

**Symptom:** `[Notion] Error: Invalid token` ou `401 Unauthorized`

**Solução:**
1. Verificar Notion API Key no Render (deve começar com `ntn_`)
2. Verificar permissões da integração no Notion
3. Copiar token novamente de: https://www.notion.so/profile/integrations
4. Salvar no Render → Redeployar

### Frontend mostra "API Error"

**Symptom:** Dashboard mostra `⚠️ Erro ao conectar à API`

**Solução:**
1. Verificar `API_BASE` em app.html (deve ser exato)
2. Testar URL manualmente no browser:
   ```
   https://pgrs-lafic-backend.onrender.com/api/health
   ```
3. Se Render está com cold start, aguardar 30s
4. Redeployar no Vercel:
   ```bash
   vercel --prod
   ```

### Notion Database IDs incorretos

**Symptom:** `[Notion] Database not found`

**Solução:**
1. Copiar IDs novamente da URL Notion
2. Atualizar no Render
3. Testar manualmente:
   ```bash
   curl -H "Authorization: Bearer ntn_XXX" \
     https://api.notion.com/v1/databases/[ID]/query \
     -X POST -H "Notion-Version: 2022-06-28"
   ```

---

## 📋 Checklist Final

- [ ] Backend deployado no Render (status: "Live")
- [ ] Frontend deployado no Vercel (status: "Ready")
- [ ] Notion credenciais salvas no Render
- [ ] Database IDs corretos no Render
- [ ] CORS habilitado entre frontend e backend
- [ ] app.html atualizado com API_BASE de produção
- [ ] Teste: https://pgrs-lafic-backend.onrender.com/api/health
- [ ] Teste: Abrir app em https://pgrs-lafic.vercel.app
- [ ] Dashboard carrega sem erros
- [ ] Registrar resíduo teste salva no Notion
- [ ] Verificar no Notion que dados chegaram

---

## 🎉 Sistema em Produção!

**URLs Finais:**
| Serviço | URL |
|---------|-----|
| **App LAFIC** | https://pgrs-lafic.vercel.app |
| **Backend API** | https://pgrs-lafic-backend.onrender.com |
| **GitHub Repo** | https://github.com/SEU_USUARIO/PGRS-LAFIC |
| **Notion Database** | https://www.notion.so/PGRS-LAFIC |

**Próximas Etapas:**
1. Treinar usuários LAFIC
2. Imprimir árvore de decisão (árvore em poster)
3. Monitorar alertas e performance
4. Coletar feedback para melhorias

---

**Pronto para produção! 🚀**
