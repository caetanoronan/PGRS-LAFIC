# 🔌 API Documentation - PGRS LAFIC

## Base URL
```
Development: http://localhost:3001/api
Production: https://pgrs-lafic-backend.onrender.com/api
```

---

## 📦 WASTE INVENTORY ENDPOINTS

### GET `/waste` - List all waste
Retrieve all waste entries with optional filtering.

**Query Parameters:**
- `tipo` (optional): Filter by waste type (Químico, Biológico, Perfurocortante, Comum, Logística Reversa)
- `status` (optional): Filter by status (Em Geração, Armazenado, Coletado, Descartado)
- `ambiente` (optional): Filter by environment (E1-E10)

**Example:**
```bash
curl "http://localhost:3001/api/waste?tipo=Biológico&status=Em Geração"
```

**Response (200):**
```json
[
  {
    "id": "page-id-1",
    "nome": "Resíduo Biológico",
    "tipo": "Biológico",
    "risco": "NB-1",
    "ambiente": "E4",
    "volume": 5.5,
    "unidade": "L",
    "dataGeracao": "2026-05-31",
    "dataVencimento": "2026-06-30",
    "acondicionamento": "Saco Vermelho",
    "status": "Em Geração",
    "epiObrigatorio": ["Jaleco", "Luvas", "Óculos"],
    "epcNecessario": "Fluxo Laminar",
    "observacoes": "Meios de cultivo com microalgas",
    "responsavel": "João Silva",
    "dataRegistro": "2026-05-31"
  }
]
```

---

### POST `/waste` - Create new waste entry
Register a new waste entry in Notion.

**Request Body:**
```json
{
  "nome": "Resíduo Químico",
  "tipo": "Químico",
  "risco": "Não-Biológico",
  "ambiente": "E4",
  "volume": 2.5,
  "unidade": "kg",
  "dataGeracao": "2026-05-31",
  "dataVencimento": "2027-05-31",
  "acondicionamento": "Bombona",
  "epiObrigatorio": ["Jaleco", "Luvas"],
  "epcNecessario": "Capela de Gases",
  "observacoes": "Reagente armazenado corretamente"
}
```

**Response (201):**
```json
{
  "id": "new-page-id",
  "nome": "Resíduo Químico",
  "tipo": "Químico",
  ...
}
```

---

### GET `/waste/:id` - Get specific waste
Retrieve details of a specific waste entry.

**Example:**
```bash
curl "http://localhost:3001/api/waste/page-id-1"
```

**Response (200):**
```json
{
  "id": "page-id-1",
  "nome": "Resíduo Biológico",
  ...
}
```

**Response (404):**
```json
{ "error": "Resíduo não encontrado" }
```

---

### PUT `/waste/:id/status` - Update waste status
Change the status of an existing waste entry.

**Request Body:**
```json
{
  "status": "Coletado"
}
```

**Example:**
```bash
curl -X PUT "http://localhost:3001/api/waste/page-id-1/status" \
  -H "Content-Type: application/json" \
  -d '{"status":"Coletado"}'
```

**Response (200):**
```json
{
  "id": "page-id-1",
  "nome": "Resíduo Biológico",
  "status": "Coletado",
  ...
}
```

---

## 🧬 BIOSECURITY ENDPOINTS

### GET `/biosecurity/requirements` - Get biosecurity requirements
Retrieve all biosecurity requirements by activity and risk level.

**Example:**
```bash
curl "http://localhost:3001/api/biosecurity/requirements"
```

**Response (200):**
```json
[
  {
    "id": "page-id",
    "atividade": "Cultivo",
    "nivelBiosseguranca": "NB-1",
    "episObrigatorios": ["Jaleco", "Luvas", "Óculos"],
    "epcsObrigatorios": ["Fluxo Laminar"],
    "procedimentoEmergencia": "Em caso de derramamento...",
    "contatoEmergencia": "3133334444"
  }
]
```

---

### GET `/biosecurity/inactivation` - Get inactivation protocols
Retrieve all chemical inactivation protocols for different sample types.

**Example:**
```bash
curl "http://localhost:3001/api/biosecurity/inactivation"
```

**Response (200):**
```json
[
  {
    "id": "page-id",
    "tipoAmostra": "Microalgas",
    "nivelRisco": "NB-1",
    "metodo": "Hipoclorito de Sódio 1%",
    "tempoContato": 30,
    "temperatura": "Ambiente",
    "observacoes": "Tempo mínimo de 30 minutos"
  }
]
```

---

## 🚨 ALERTS ENDPOINTS

### GET `/alerts` - List active alerts
Retrieve all unresolved alerts and compliance issues.

**Example:**
```bash
curl "http://localhost:3001/api/alerts"
```

**Response (200):**
```json
[
  {
    "id": "page-id",
    "dataAlerta": "2026-05-31",
    "tipoAlerta": "Vencimento",
    "descricao": "Reagente vencendo em 5 dias",
    "prioridade": "Alta",
    "responsavel": "João Silva"
  }
]
```

---

## 🔧 MAINTENANCE ENDPOINTS

### GET `/maintenance/epc` - Get EPC maintenance status
Retrieve maintenance status and schedules for all EPC equipment.

**Example:**
```bash
curl "http://localhost:3001/api/maintenance/epc"
```

**Response (200):**
```json
[
  {
    "id": "page-id",
    "epc": "Capela de Gases",
    "localizacao": "E4",
    "dataUltimaManutencao": "2026-05-01",
    "proximaManutencaoPrevista": "2026-08-01",
    "status": "Funcionando",
    "responsavel": "Maria Santos"
  }
]
```

---

## ❤️ HEALTH CHECK

### GET `/health` - API health status
Simple health check to verify API is running.

**Example:**
```bash
curl "http://localhost:3001/api/health"
```

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2026-05-31T04:47:49.113Z"
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 - Bad Request:**
```json
{
  "error": "Validation error message",
  "details": "Additional details"
}
```

**404 - Not Found:**
```json
{
  "error": "Resource not found",
  "details": "The requested resource could not be found"
}
```

**500 - Internal Server Error:**
```json
{
  "error": "Internal Server Error",
  "timestamp": "2026-05-31T04:47:49.113Z"
}
```

---

## Authentication

Currently, the API uses the Notion API token stored in `.env`:
```
NOTION_API_KEY=ntn_XXXXX...
```

No frontend authentication is required. The token is used server-side to authenticate with Notion.

---

## CORS Configuration

Allowed origins (configurable in `.env`):
```
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

Production should update this to:
```
ALLOWED_ORIGINS=https://pgrs-lafic.vercel.app,https://pgrs-lafic-backend.onrender.com
```

---

## Testing Endpoints

### Test with curl
```bash
# List waste
curl http://localhost:3001/api/waste

# Get alerts
curl http://localhost:3001/api/alerts

# Get biosecurity requirements
curl http://localhost:3001/api/biosecurity/requirements

# Get maintenance status
curl http://localhost:3001/api/maintenance/epc
```

### Test with Postman
1. Import as raw collection or use cURL snippets
2. Base URL: `http://localhost:3001/api`
3. Set headers: `Content-Type: application/json`

---

**Last Updated:** 2026-05-31
