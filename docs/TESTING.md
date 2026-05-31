# 🧪 Testing Guide - PGRS LAFIC API

This guide helps you verify that all API endpoints are working correctly.

## Prerequisites
- Backend running: `npm run dev` in `/backend`
- cURL or Postman installed

## Health Check

### Test 1: API Status
```bash
curl http://localhost:3001/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-31T04:47:49.113Z"
}
```

---

## Waste Inventory Endpoints

### Test 2: List All Waste
```bash
curl http://localhost:3001/api/waste
```

**Expected:** Array of waste objects (or error if Notion credentials not valid)

### Test 3: Filter by Type
```bash
curl "http://localhost:3001/api/waste?tipo=Biológico"
```

### Test 4: Filter by Status
```bash
curl "http://localhost:3001/api/waste?status=Em Geração"
```

### Test 5: Create New Waste (POST)
```bash
curl -X POST http://localhost:3001/api/waste \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Amostra Teste",
    "tipo": "Biológico",
    "risco": "NB-1",
    "ambiente": "E4",
    "volume": 2.5,
    "unidade": "L",
    "acondicionamento": "Saco Vermelho",
    "epcNecessario": "Fluxo Laminar",
    "observacoes": "Teste da API"
  }'
```

---

## Biosecurity Endpoints

### Test 6: Get Biosecurity Requirements
```bash
curl http://localhost:3001/api/biosecurity/requirements
```

**Expected:** Array of biosecurity requirements objects

### Test 7: Get Inactivation Protocols
```bash
curl http://localhost:3001/api/biosecurity/inactivation
```

**Expected:** Array of inactivation protocol objects

---

## Alerts Endpoints

### Test 8: Get Active Alerts
```bash
curl http://localhost:3001/api/alerts
```

**Expected:** Array of unresolved alerts

---

## Maintenance Endpoints

### Test 9: Get EPC Maintenance Status
```bash
curl http://localhost:3001/api/maintenance/epc
```

**Expected:** Array of maintenance status objects

---

## Error Testing

### Test 10: Get Non-existent Waste (404)
```bash
curl http://localhost:3001/api/waste/invalid-id
```

**Expected Response (404):**
```json
{
  "error": "Resíduo não encontrado"
}
```

### Test 11: Update Status Without Body (400)
```bash
curl -X PUT http://localhost:3001/api/waste/some-id/status \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response (400):**
```json
{
  "error": "Status é obrigatório"
}
```

---

## Automated Testing Script

Save as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3001/api"

echo "🧪 PGRS LAFIC API Testing"
echo "=========================="

# Test 1: Health
echo ""
echo "✓ Test 1: Health Check"
curl -s "$BASE_URL/health" | jq . || echo "Failed"

# Test 2: Waste List
echo ""
echo "✓ Test 2: List Waste"
curl -s "$BASE_URL/waste" | jq . || echo "Failed"

# Test 3: Alerts
echo ""
echo "✓ Test 3: Get Alerts"
curl -s "$BASE_URL/alerts" | jq . || echo "Failed"

# Test 4: Biosecurity
echo ""
echo "✓ Test 4: Get Biosecurity Requirements"
curl -s "$BASE_URL/biosecurity/requirements" | jq . || echo "Failed"

# Test 5: Inactivation
echo ""
echo "✓ Test 5: Get Inactivation Protocols"
curl -s "$BASE_URL/biosecurity/inactivation" | jq . || echo "Failed"

# Test 6: Maintenance
echo ""
echo "✓ Test 6: Get EPC Maintenance"
curl -s "$BASE_URL/maintenance/epc" | jq . || echo "Failed"

echo ""
echo "=========================="
echo "✅ All tests completed"
```

Run with:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## Postman Collection

You can also import these requests into Postman:

1. **Create Collection:** "PGRS LAFIC API"
2. **Create Variable:** `BASE_URL = http://localhost:3001/api`
3. **Create Requests:**

| Method | URL | Description |
|--------|-----|-------------|
| GET | `{{BASE_URL}}/health` | Health check |
| GET | `{{BASE_URL}}/waste` | List waste |
| POST | `{{BASE_URL}}/waste` | Create waste |
| GET | `{{BASE_URL}}/alerts` | List alerts |
| GET | `{{BASE_URL}}/biosecurity/requirements` | Biosecurity |
| GET | `{{BASE_URL}}/biosecurity/inactivation` | Inactivation |
| GET | `{{BASE_URL}}/maintenance/epc` | Maintenance |

---

## Troubleshooting

### Error: "API token is invalid"
**Cause:** Notion API credentials are incorrect or missing
**Solution:** 
- Check `backend/.env` has correct `NOTION_API_KEY`
- Verify the integration token has access to Notion workspace
- Test with: `curl -s "https://api.notion.com/v1/databases" -H "Authorization: Bearer YOUR_KEY"`

### Error: "Address already in use"
**Cause:** Port 3001 is in use
**Solution:**
- Kill process: `lsof -ti:3001 | xargs kill -9`
- Or change PORT in `.env`

### Error: CORS error in browser
**Cause:** Frontend URL not in ALLOWED_ORIGINS
**Solution:**
- Update `ALLOWED_ORIGINS` in `.env` to include frontend URL
- Restart backend: `npm run dev`

---

## CI/CD Testing

For GitHub Actions, add to `.github/workflows/test.yml`:

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install
      - run: npm run test || true
```

---

**Last Updated:** 2026-05-31
