# Setup do Notion para PGRS LAFIC

## Passo 1: Criar Integration no Notion

1. Acesse https://www.notion.so/profile/integrations
2. Clique em "Create new integration"
3. Nome: `PGRS LAFIC Backend`
4. Defina as capabilities que a integração pode fazer:
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
   - ✅ Delete content (opcional, apenas para gerenciamento)
5. Copie o **Internal Integration Token** (começará com `secret_`)
6. Salve em `backend/.env` como `NOTION_API_KEY=secret_...`

---

## Passo 2: Criar 5 Bancos de Dados no Notion

### 2.1 Tabela: Inventário de Resíduos

**Nome:** `Inventário de Resíduos`

**Campos:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| ID | Number | Número sequencial |
| Data de Registro | Date | Quando foi registrado |
| Tipo de Resíduo | Select | Químico, Biológico, Perfurocortante, Comum, Logística Reversa |
| Classificação de Risco | Select | NB-1, NB-2, NB-3, Não-Biológico |
| Ambiente | Select | E1-E10 |
| Volume/Quantidade | Number | Quantidade gerada |
| Unidade | Select | kg, L, un |
| Data de Geração | Date | Quando o resíduo foi criado |
| Data de Vencimento | Date | Para reagentes |
| Responsável | Person | Quem registrou |
| Acondicionamento | Select | Saco Branco, Saco Vermelho, Bombona, Caixa Rígida, Outro |
| Status | Select | Em Geração, Armazenado, Coletado, Descartado |
| EPI Obrigatório | Multi-select | Jaleco, Luvas, Óculos, Máscara, etc. |
| EPC Necessário | Select | Capela de Gases, Fluxo Laminar, Nenhum |
| Observações | Text | Notas adicionais |

**Após criar a tabela:**
1. Abra a tabela em Notion
2. Clique no ícone ••• (mais opções) → Share
3. Encontre sua integration (PGRS LAFIC Backend) e clique em Invite
4. Copie o **Database ID** da URL:
   - URL: `https://www.notion.so/{workspace}/{ESTE_É_O_ID}?v=...`
   - Ou copie direto clicando em Share → Copy link (o ID está entre as barras)
5. Salve em `backend/.env` como `NOTION_DATABASE_ID_WASTE=...`

---

### 2.2 Tabela: Protocolo de Inativação

**Nome:** `Protocolo de Inativação`

**Campos:**

| Campo | Tipo |
|-------|------|
| Tipo de Amostra | Select |
| Nível de Risco | Select |
| Método de Inativação | Text |
| Tempo de Contato (min) | Number |
| Temperatura | Text |
| Observações | Text |
| Validado Por | Person |
| Data de Validação | Date |

**Dados Iniciais (criar manualmente ou via API):**

```
1. Microalgas
   - Nível: NB-1
   - Método: Hipoclorito de Sódio 1%
   - Tempo: 30 min
   - Temperatura: Ambiente

2. Macroalgas
   - Nível: NB-1
   - Método: Hipoclorito de Sódio 1% ou Álcool 70%
   - Tempo: 30 min
   - Temperatura: Ambiente

3. Meio de Cultura
   - Nível: NB-1
   - Método: Hipoclorito + Autoclave
   - Tempo: 30 min (desinfecção) + 15 min (autoclave)
   - Temperatura: 121°C

4. Amostra Ambiental
   - Nível: NB-1
   - Método: Hipoclorito de Sódio 1%
   - Tempo: 60 min
   - Temperatura: Ambiente
```

Salve o Database ID em `backend/.env` como `NOTION_DATABASE_ID_INACTIVATION=...`

---

### 2.3 Tabela: Requisitos de Biossegurança

**Nome:** `Requisitos de Biossegurança por Atividade`

**Campos:**

| Campo | Tipo |
|-------|------|
| Atividade | Select |
| Nível de Biossegurança | Select |
| EPIs Obrigatórios | Multi-select |
| EPCs Obrigatórios | Multi-select |
| Procedimento de Emergência | Rich Text |
| Contato de Emergência | Text |
| Última Atualização | Date |

**Dados Iniciais:**

```
1. Coleta de Macroalgas
   - NB: NB-1
   - EPIs: Jaleco, Luvas, Óculos
   - EPCs: Nenhum

2. Cultivo (manipulação)
   - NB: NB-1
   - EPIs: Jaleco, Luvas, Óculos
   - EPCs: Fluxo Laminar

3. Experimento
   - NB: NB-1
   - EPIs: Jaleco, Luvas, Óculos, Máscara
   - EPCs: Fluxo Laminar (se cultivo)

4. Descarte
   - NB: NB-1
   - EPIs: Jaleco, Luvas, Máscara
   - EPCs: Capela de Gases (se químico) ou Fluxo (se biológico)

5. Limpeza
   - NB: NB-1
   - EPIs: Jaleco, Luvas, Óculos, Máscara
   - EPCs: Fluxo Laminar
```

Salve o Database ID em `backend/.env` como `NOTION_DATABASE_ID_BIOSECURITY=...`

---

### 2.4 Tabela: Alertas e Conformidade

**Nome:** `Alertas e Conformidade`

**Campos:**

| Campo | Tipo |
|-------|------|
| Data do Alerta | Date |
| Tipo de Alerta | Select |
| Descrição | Text |
| Prioridade | Select |
| Resolvido? | Checkbox |
| Data de Resolução | Date |
| Responsável | Person |

Salve o Database ID em `backend/.env` como `NOTION_DATABASE_ID_ALERTS=...`

---

### 2.5 Tabela: Manutenção de EPCs

**Nome:** `Manutenção de EPCs`

**Campos:**

| Campo | Tipo |
|-------|------|
| EPC | Select |
| Localização | Text |
| Data da Última Manutenção | Date |
| Próxima Manutenção Prevista | Date |
| Status | Select |
| Responsável | Person |
| Observações | Text |

**Dados Iniciais:**

```
1. Capela de Gases
   - Localização: E4 (Laboratório 1)
   - Status: Funcionando
   - Próxima manutenção: [defina conforme histórico]

2. Fluxo Laminar
   - Localização: [preencher conforme laboratório]
   - Status: Funcionando
   - Próxima manutenção: [defina conforme histórico]
```

Salve o Database ID em `backend/.env` como `NOTION_DATABASE_ID_MAINTENANCE=...`

---

## Passo 3: Preencher o arquivo `.env` do Backend

Após criar todos os 5 bancos, seu arquivo `backend/.env` deve ficar assim:

```env
NOTION_API_KEY=secret_abc123xyz...
NOTION_DATABASE_ID_WASTE=12345678-1234-1234-1234-123456789abc
NOTION_DATABASE_ID_BIOSECURITY=12345678-1234-1234-1234-123456789def
NOTION_DATABASE_ID_INACTIVATION=12345678-1234-1234-1234-123456789ghi
NOTION_DATABASE_ID_ALERTS=12345678-1234-1234-1234-123456789jkl
NOTION_DATABASE_ID_MAINTENANCE=12345678-1234-1234-1234-123456789mno

PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_PATH=./data/alerts.db
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## Passo 4: Validar Conexão

1. Abra terminal na pasta `backend/`
2. Execute: `npm run dev`
3. Teste: `curl http://localhost:3000/api/health`
4. Você deve receber: `{"status":"ok","timestamp":"..."}`

Se funcionar, a integração do Notion está pronta! 🎉

---

## Troubleshooting

- **Erro 401 Unauthorized:** Verifique se copiou corretamente o `NOTION_API_KEY`
- **Erro 404 Database not found:** Verifique se o Database ID está correto e se a integration foi convidada para a tabela
- **Erro de permissão:** Certifique-se que ao Share da tabela, a integration tem permissão de **Edit**
