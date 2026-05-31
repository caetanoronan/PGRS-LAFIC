# 🚀 FASE 4 - PLANO EXECUTIVO DE DEPLOYMENT
## Render + Vercel + App Funcional

**Data:** 31 de Maio de 2026
**Status:** Pronto para Lançamento ✅
**Tempo Estimado:** 30-45 minutos

---

## ⚡ CHECKLIST PRÉ-DEPLOYMENT

### ✅ Backend
- [x] Express.js configurado
- [x] Notion API integrada
- [x] Rotas REST funcionando
- [x] .env com credenciais
- [x] package.json pronto
- [x] Sem erros de console

### ✅ Frontend
- [x] app.html completo
- [x] Árvore de decisão (Versão 1 + abas)
- [x] Vidrarias adicionadas
- [x] Validações funcionando
- [x] API_BASE para localhost (temporário)

### ✅ Repositório
- [x] Git status limpo
- [x] Histórico commitado
- [x] Sem credenciais expostas
- [x] Pronto para GitHub

---

## 📋 PASSO A PASSO - DEPLOYMENT

### PASSO 1: GitHub Push (5 min)

```bash
cd "/c/Users/caetanoronan/OneDrive - UFSC/Área de Trabalho/PGRS_Lafic"

# Se ainda não tem remote GitHub:
git remote add origin https://github.com/SEU_USUARIO/PGRS-LAFIC.git

# Se precisa verificar:
git remote -v

# Fazer push
git branch -M main
git push -u origin main
```

**Resultado esperado:** 
- Repositório no GitHub sincronizado ✅
- URL: `https://github.com/SEU_USUARIO/PGRS-LAFIC`

---

### PASSO 2: Deploy Backend no Render (10 min)

#### 2.1 Criar Web Service
1. Acesse: https://dashboard.render.com
2. Clique: **"New"** → **"Web Service"**
3. Selecione o repositório `PGRS-LAFIC` (autorizar GitHub se for primeira vez)

#### 2.2 Configurar Service
```
Name:             pgrs-lafic-backend
Root Directory:   backend
Environment:      Node
Build Command:    npm install
Start Command:    npm start
```

#### 2.3 Adicionar Variáveis de Ambiente
Clique em **"Environment"** e adicione:

```
NOTION_API_KEY=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
NOTION_DATABASE_ID_WASTE=371d14c7-8a56-8173-b0ed-f2e2e53b216e
NOTION_DATABASE_ID_INACTIVATION=371d14c7-8a56-814e-ac23-d2b9a41593d4
NOTION_DATABASE_ID_BIOSECURITY=371d14c7-8a56-815b-9089-da61c9c307cd
NOTION_DATABASE_ID_ALERTS=371d14c7-8a56-81dc-815e-c579569d6c5c
NOTION_DATABASE_ID_MAINTENANCE=371d14c7-8a56-8162-bc0a-d62261b9b520

PORT=3000
NODE_ENV=production
FRONTEND_URL=https://pgrs-lafic.vercel.app
ALLOWED_ORIGINS=https://pgrs-lafic.vercel.app,https://pgrs-lafic-backend.onrender.com
```

#### 2.4 Deploy
1. Clique: **"Create Web Service"**
2. Aguarde deploy (~3-5 min)

**URL gerada:** `https://pgrs-lafic-backend.onrender.com`

**Testar:** 
```bash
curl https://pgrs-lafic-backend.onrender.com/api/health
# Esperado: {"status":"ok","timestamp":"..."}
```

---

### PASSO 3: Deploy Frontend no Vercel (10 min)

#### 3.1 Deploy com Vercel CLI (Recomendado)
```bash
# Instalar (se não tiver)
npm i -g vercel

# No diretório raiz do projeto
cd "/c/Users/caetanoronan/OneDrive - UFSC/Área de Trabalho/PGRS_Lafic"

# Fazer deploy
vercel --prod
```

**Perguntas esperadas:**
```
Set up and deploy? Yes
Which scope? [Selecionar seu escopo]
Link to existing project? No
What's your project's name? pgrs-lafic
In which directory is your code? ./
Want to modify vercel.json? No
```

**URL gerada:** `https://pgrs-lafic.vercel.app`

---

### PASSO 4: Atualizar URL da API (5 min)

#### 4.1 Editar app.html
```bash
# Abrir app.html e localizar:
const API_BASE = 'http://localhost:3001/api';

# Mudar para:
const API_BASE = 'https://pgrs-lafic-backend.onrender.com/api';
```

#### 4.2 Commit e Push
```bash
git add app.html
git commit -m "🚀 Update API_BASE para produção"
git push origin main
```

**Vercel redeploy automático** (~1-2 min)

---

### PASSO 5: Testes em Produção (10 min)

#### 5.1 Testar Backend
```bash
# Verificar saúde
curl https://pgrs-lafic-backend.onrender.com/api/health
# Esperado: {"status":"ok","timestamp":"2026-05-31..."}

# Verificar Notion conectado
curl https://pgrs-lafic-backend.onrender.com/api/waste
# Esperado: [] ou [resíduos existentes]
```

#### 5.2 Testar Frontend
1. Abrir: https://pgrs-lafic.vercel.app
2. Abrir console (F12)
3. Verificar:
   - [ ] Sem erros vermelhos
   - [ ] Dashboard carrega
   - [ ] Status mostra ✅
   - [ ] Botão "🌳 Ver Árvore" funciona
   - [ ] Expandir abas funciona

#### 5.3 Testar Fluxo Completo
1. Ir para: **"➕ Registrar Resíduo"**
2. [ ] Origem e Tipo carregam
3. [ ] Classificação automática funciona
4. [ ] Card visual aparece
5. [ ] Registrar resíduo salva
6. [ ] Aparecer no **"📦 Inventário"**
7. [ ] Dashboard atualiza

#### 5.4 Verificar Notion
1. Abrir seu Notion
2. Tabela "Inventário de Resíduos"
3. [ ] Novo resíduo apareceu
4. [ ] Todos os campos preenchidos
5. [ ] Status correto

---

## 🚨 TROUBLESHOOTING

### ❌ CORS Error
**Symptom:** `Access to XMLHttpRequest blocked by CORS`

**Solução:**
```bash
# No Render dashboard:
Environment Variables → Editar:
ALLOWED_ORIGINS=https://pgrs-lafic.vercel.app,https://pgrs-lafic-backend.onrender.com

# Salvar → Redeployment automático
```

### ❌ Backend não conecta ao Notion
**Symptom:** `[Notion] Error: Invalid token`

**Solução:**
1. Verificar NOTION_API_KEY no Render
2. Copiar token novamente: https://www.notion.so/profile/integrations
3. Atualizar no Render
4. Redeployar

### ❌ Frontend mostra "Erro ao conectar"
**Symptom:** Dashboard exibe erro

**Solução:**
1. Verificar API_BASE em app.html (deve ser exato)
2. Testar manualmente: https://pgrs-lafic-backend.onrender.com/api/health
3. Se Render está com "cold start", aguardar 30s
4. Redeployar Vercel: `vercel --prod`

---

## 📊 URLS FINAIS

| Serviço | URL |
|---------|-----|
| **App LAFIC** | https://pgrs-lafic.vercel.app |
| **Backend API** | https://pgrs-lafic-backend.onrender.com |
| **GitHub Repo** | https://github.com/SEU_USUARIO/PGRS-LAFIC |
| **Notion Database** | https://www.notion.so/[seu-workspace]/PGRS-LAFIC |

---

## ✅ CHECKLIST FINAL

- [ ] GitHub push completo
- [ ] Render backend live (status: "Live")
- [ ] Vercel frontend live (status: "Ready")
- [ ] API_BASE atualizado em app.html
- [ ] Test: Backend health check ✅
- [ ] Test: Frontend carrega ✅
- [ ] Test: Registrar resíduo salva no Notion ✅
- [ ] Test: Dashboard atualiza ✅
- [ ] Logs sem erros ✅

---

## 🎯 Após Deployment (Próximas Etapas)

1. **Compartilhar com LAFIC:**
   - URL: https://pgrs-lafic.vercel.app
   - Credenciais de acesso: [conforme sua política]

2. **Treinamento:**
   - Mostrar árvore de decisão
   - Guiar primeiro registro
   - Mostrar inventário

3. **Imprimir Poster:**
   - Acessar: docs/DECISION_TREE.md
   - Copiar código Mermaid
   - Paste em: mermaid.live
   - Download como PNG
   - Plastificar e afixar no lab

4. **Monitorar:**
   - Render logs: https://dashboard.render.com
   - Vercel logs: https://vercel.com/dashboard
   - Notion: verificar registros

---

## 🎉 SUCESSO!

**Sistema PGRS LAFIC em PRODUÇÃO! 🚀**

Você agora tem:
✨ App funcional
🌳 Árvore de decisão visual
📊 Dashboard automático
🔐 Biossegurança integrada
📱 Acesso remoto
☁️ Escalável e mantível

---

**Tempo total:** ~30-45 minutos
**Próximas etapas:** Usuários começam a usar!

Qualquer dúvida durante o deployment, me avisa! 💪
