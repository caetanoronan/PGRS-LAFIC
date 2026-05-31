# 🌳 Árvore de Decisão SIMPLIFICADA

## Versão 1: Diagrama Principal Limpo

```mermaid
graph TD
    A["🚀 INÍCIO: Qual o tipo de resíduo?"] 
    
    A --> B["🔴 BIOLÓGICO<br/>Biomassa, meios, amostras"]
    A --> C["🟡 QUÍMICO<br/>Fixadores, solventes"]
    A --> D["🟠 PERFUROCORTANTE<br/>Vidros, lâminas"]
    A --> E["🔵 LOGÍSTICA REVERSA<br/>Pilhas, baterias"]
    A --> F["⚪ COMUM/RECICLÁVEL<br/>Papel, embalagens"]
    
    style A fill:#667eea,color:#fff,stroke:#333,stroke-width:3px
    style B fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style C fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style D fill:#fed7aa,stroke:#ea580c,stroke-width:2px
    style E fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style F fill:#e5e7eb,stroke:#6b7280,stroke-width:2px
```

---

## Versão 2: Fluxo BIOLÓGICO Detalhado

```mermaid
graph LR
    A["🔴 RESÍDUO BIOLÓGICO"] 
    
    A --> B{"Pode inativar<br/>quimicamente?"}
    
    B -->|✅ SIM| C["1. Hipoclorito 1%<br/>2. Aguardar 30 min<br/>3. Descartar na Pia"]
    C --> C_FIM["✅ PRONTO<br/>Sem coleta"]
    
    B -->|❌ NÃO| D["1. Usar Saco Vermelho<br/>2. Etiquetar<br/>3. Solicitar Coleta"]
    D --> D_FIM["⏳ AGUARDANDO<br/>Coleta Especial"]
    
    style A fill:#fee2e2,stroke:#ef4444,stroke-width:3px
    style B fill:#ffeaa7,stroke:#f39c12,stroke-width:2px
    style C fill:#d4edda,stroke:#28a745,stroke-width:2px
    style D fill:#f8d7da,stroke:#dc3545,stroke-width:2px
    style C_FIM fill:#28a745,color:#fff,stroke:#28a745,stroke-width:2px
    style D_FIM fill:#dc3545,color:#fff,stroke:#dc3545,stroke-width:2px
```

---

## Versão 3: Fluxo QUÍMICO Detalhado

```mermaid
graph LR
    A["🟡 RESÍDUO QUÍMICO"]
    
    A --> B["1. Verificar composição"]
    B --> C{"Qual tipo?"}
    
    C -->|Halogenado<br/>Formol| D["Bombona PEAD<br/>SEPARADA<br/>Rótulo VERMELHO"]
    C -->|Não-Halogenado<br/>Álcool| E["Bombona PEAD<br/>SEPARADA<br/>Rótulo AZUL"]
    
    D --> F["Preencher Código IBAMA"]
    E --> F
    
    F --> G["Solicitar Coleta UFSC"]
    G --> G_FIM["⏳ COLETA<br/>Empresa Licenciada"]
    
    style A fill:#fef3c7,stroke:#f59e0b,stroke-width:3px
    style B fill:#fff9e6,stroke:#f39c12,stroke-width:2px
    style C fill:#ffeaa7,stroke:#f39c12,stroke-width:2px
    style D fill:#ffe6e6,stroke:#dc3545,stroke-width:2px
    style E fill:#e6f2ff,stroke:#3b82f6,stroke-width:2px
    style F fill:#fff9e6,stroke:#f39c12,stroke-width:2px
    style G fill:#fff9e6,stroke:#f39c12,stroke-width:2px
    style G_FIM fill:#dc3545,color:#fff,stroke:#dc3545,stroke-width:2px
```

---

## Versão 4: Fluxo PERFUROCORTANTE (Simples!)

```mermaid
graph LR
    A["🟠 VIDRO/LAMÍNULA<br/>QUEBRADO"] 
    
    A --> B["Use PINÇAS<br/>Nunca mãos!"]
    B --> C["Coloque em<br/>Caixa Rígida<br/>Amarela"]
    C --> D["Quando cheio,<br/>Solicitar Coleta"]
    D --> E["✅ Coleta UFSC"]
    
    style A fill:#fed7aa,stroke:#ea580c,stroke-width:3px
    style B fill:#ffe6cc,stroke:#ea580c,stroke-width:2px
    style C fill:#ffe6cc,stroke:#ea580c,stroke-width:2px
    style D fill:#ffe6cc,stroke:#ea580c,stroke-width:2px
    style E fill:#ea580c,color:#fff,stroke:#ea580c,stroke-width:2px
```

---

## Versão 5: Fluxo LOGÍSTICA & COMUM (Simples!)

```mermaid
graph LR
    A["🔵 PILHAS/<br/>BATERIAS"] --> B["Armazenar<br/>em local seco"]
    B --> C["Entregar no Ponto<br/>de Coleta UFSC"]
    C --> D["✅ Reciclagem"]
    
    E["⚪ PAPEL/<br/>EMBALAGEM"] --> F["Lixeira Comum<br/>OU<br/>Lixeira Reciclável"]
    F --> G["✅ Coleta Regular"]
    
    style A fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style B fill:#e0f2ff,stroke:#3b82f6,stroke-width:2px
    style C fill:#e0f2ff,stroke:#3b82f6,stroke-width:2px
    style D fill:#3b82f6,color:#fff,stroke:#3b82f6,stroke-width:2px
    
    style E fill:#e5e7eb,stroke:#6b7280,stroke-width:2px
    style F fill:#f3f4f6,stroke:#6b7280,stroke-width:2px
    style G fill:#6b7280,color:#fff,stroke:#6b7280,stroke-width:2px
```

---

## 📋 TABELA RESUMIDA (Mais Fácil!)

| Tipo | Decisão? | Ação 1 | Ação 2 | Ação 3 | Destino |
|------|----------|--------|--------|--------|---------|
| 🔴 **BIOLÓGICO** | ❓ Inativar? | SIM: Hipoclorito 1% | Aguardar 30 min | Pia c/ água | ✅ Pronto |
| 🔴 **BIOLÓGICO** | ❓ Inativar? | NÃO: Saco Vermelho | Etiquetar | Solicitar Coleta | ⏳ Coleta |
| 🟡 **QUÍMICO** | ❓ Compatível? | Bombona PEAD | Código IBAMA | Solicitar Coleta | ⏳ Coleta |
| 🟠 **PERFURO** | ❌ Não | Pinças (nunca mãos) | Caixa Amarela | Solicitar Coleta | ⏳ Coleta |
| 🔵 **LOGÍSTICA** | ❌ Não | Local Seco | Ponto de Coleta | Entregar | ✅ Reciclado |
| ⚪ **COMUM** | ❌ Não | Lixeira Branca | - | - | ✅ Coleta |

---

## 🎯 QUAL VERSÃO É MELHOR?

### Para App.html (Modal):
**Use Versão 1** (Diagrama Principal)
- Simples e claro
- Mostra os 5 caminhos

### Para Laboratório (Impressão):
**Use Versão 2, 3, 4, 5** (Separadas por fluxo)
- Uma impressão por tipo de resíduo
- Menos confuso
- Fácil de lembrar

### Para Referência Rápida:
**Use Tabela Resumida**
- Tudo em uma página
- Praticamente

---

## ✅ Qual você prefere?

1. **Manter simplificado** (Versão 1 no app)
2. **Usar multi-diagramas** (Versões 2-5 por tipo)
3. **Usar tabela** (Mais direto)
4. **Combinar:** Versão 1 + Tabela no app

Qual faz mais sentido para o LAFIC? 🤔
