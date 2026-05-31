# 🚀 Setup GitHub + Render + Notion

## Passo 1: Criar Repositório no GitHub

### 1.1 Criar repo vazio no GitHub:
1. Acesse https://github.com/new
2. Nome: `PGRS-LAFIC`
3. Descrição: `Plano de Gerenciamento de Resíduos - Laboratório de Ficologia UFSC`
4. **Public** (para CI/CD funcionar)
5. Clique em **"Create repository"**

### 1.2 Fazer Push do repositório local:

```bash
cd "/c/Users/caetanoronan/OneDrive - UFSC/Área de Trabalho/PGRS_Lafic"

# Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/PGRS-LAFIC.git

# Mudar branch para main (se não estiver)
git branch -M main

# Fazer push
git push -u origin main
```

**Resultado esperado:** Repositório sincronizado no GitHub ✅

---

## Passo 2: Deploy Backend no Render

### 2.1 Criar conta no Render:
- Acesse https://render.com
- Login com GitHub (recomendado)

### 2.2 Criar novo Web Service:
1. Dashboard → **"New +"** → **"Web Service"**
2. Conectar repositório GitHub (autorizar)
3. Selecionar: `PGRS-LAFIC`
4. Configurar:
   - **Name:** `pgrs-lafic-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run start`

### 2.3 Adicionar Variáveis de Ambiente:
Clique em **"Environment"** e adicione:

```
NOTION_API_KEY = ntn_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NOTION_DATABASE_ID_WASTE = 371d14c7-8a56-8173-b0ed-f2e2e53b216e
NOTION_DATABASE_ID_INACTIVATION = 371d14c7-8a56-814e-ac23-d2b9a41593d4
NOTION_DATABASE_ID_BIOSECURITY = 371d14c7-8a56-815b-9089-da61c9c307cd
NOTION_DATABASE_ID_ALERTS = 371d14c7-8a56-81dc-815e-c579569d6c5c
NOTION_DATABASE_ID_MAINTENANCE = 371d14c7-8a56-8162-bc0a-d62261b9b520

PORT = 3000
NODE_ENV = production
FRONTEND_URL = https://SEU_FRONTEND_URL.vercel.app
ALLOWED_ORIGINS = https://SEU_FRONTEND_URL.vercel.app,https://pgrs-lafic-backend.onrender.com
```

### 2.4 Deploy:
- Clique em **"Deploy"**
- Aguarde (~2-3 min)
- URL será: `https://pgrs-lafic-backend.onrender.com`

**Testar:** 
```
curl https://pgrs-lafic-backend.onrender.com/api/health
```

---

## Passo 3: Deploy Frontend no Vercel

### 3.1 Deploy do app.html estático:

**Opção A: Vercel CLI (recomendado)**
```bash
npm i -g vercel
vercel
```

**Opção B: Drag & Drop**
1. Acesse https://vercel.com/new
2. Importar repositório `PGRS-LAFIC`
3. Deploy automático

### 3.2 Configurar CORS no Backend:
Após ter URLs do Frontend e Backend, atualizar no Render:

```env
FRONTEND_URL = https://pgrs-lafic.vercel.app
ALLOWED_ORIGINS = https://pgrs-lafic.vercel.app,https://pgrs-lafic-backend.onrender.com
```

---

## Passo 4: Atualizar app.html para Produção

No arquivo `app.html`, mudar:

```javascript
// De (desenvolvimento):
const API_BASE = 'http://localhost:3001/api';

// Para (produção):
const API_BASE = 'https://pgrs-lafic-backend.onrender.com/api';
```

Fazer commit e push:
```bash
git add app.html
git commit -m "🚀 Update API URL para produção"
git push
```

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Backend deployado no Render
- [ ] Frontend deployado no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] CORS habilitado entre Frontend e Backend
- [ ] Notion conectada
- [ ] Testar /api/health em produção
- [ ] Verificar no app.html que conecta ao backend

---

## 🔗 URLs Finais

| Serviço | URL |
|---------|-----|
| **GitHub** | https://github.com/SEU_USUARIO/PGRS-LAFIC |
| **Backend (Render)** | https://pgrs-lafic-backend.onrender.com |
| **Frontend (Vercel)** | https://pgrs-lafic.vercel.app |
| **Notion Dashboard** | https://app.notion.com/p/PGRS-LAFIC-... |

---

## 📞 Troubleshooting

### CORS Error:
- Verificar `ALLOWED_ORIGINS` no Render

### API Não Responde:
- Verificar logs no Render: Dashboard → Logs
- Testar: `curl https://pgrs-lafic-backend.onrender.com/api/health`

### Variáveis não carregam:
- Restart do deploy no Render
- Redeployar após mudança de env vars

---

**Pronto! Sistema em produção! 🎉**
