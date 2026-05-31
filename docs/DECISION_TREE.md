# 🌳 Árvore de Decisão - PGRS LAFIC

## Fluxograma Completo de Classificação

```mermaid
graph TD
    A["🚀 Início: Atividade no LAFIC"] --> B{"❓ Qual a natureza do resíduo?"}
    
    B -->|🧬 Biomassa / Meio| C["🔴 BIOLÓGICO / INFECTANTE<br/>Sobras de biomassa, meios de cultura,<br/>amostras ambientais"]
    B -->|🧪 Fixadores / Solventes| D["🟡 QUÍMICO<br/>Formol, álcool, reagentes vencidos,<br/>misturas de experimentos"]
    B -->|⚔️ Lâminas / Vidro| E["🟠 PERFUROCORTANTE<br/>Lamínulas, pipetas de vidro,<br/>bisturis quebrados"]
    B -->|♻️ Pilhas / Baterias| F["🔵 LOGÍSTICA REVERSA<br/>Pilhas, baterias, lâmpadas tubulares"]
    B -->|📄 Papel / Embalagem| G["⚪ COMUM / RECICLÁVEL<br/>Papel toalha, embalagens limpas,<br/>caixas de papelão"]

    %% ===== FLUXO BIOLÓGICO =====
    C --> H{"❓ É possível inativar<br/>quimicamente na bancada?"}
    
    H -->|✅ SIM<br/>Meio líquido| I["💧 INATIVAÇÃO QUÍMICA"]
    I --> I1["1️⃣ Adicionar Hipoclorito de Sódio 1%"]
    I1 --> I2["2️⃣ Aguardar 30 minutos"]
    I2 --> I3["3️⃣ Descarte do líquido na pia<br/>com água corrente abundante"]
    I3 --> I4["✅ RESOLVIDO - Sem Coleta"]
    
    H -->|❌ NÃO<br/>Biomassa sólida| K["📦 ACONDICIONAMENTO"]
    K --> K1["Saco Vermelho<br/>(Autoclavável)"]
    K1 --> K2["Etiquetar com:<br/>- Data<br/>- Tipo de material<br/>- Responsável"]
    K2 --> L["📞 Solicitar Coleta Especial<br/>(UFSC - SAU)"]
    L --> L1["Aguardar coleta programada"]

    %% ===== FLUXO QUÍMICO =====
    D --> M["🔍 VERIFICAR INCOMPATIBILIDADE"]
    M --> M1["Classificar:"]
    M1 --> M2a["Halogenados<br/>(Formol, Cloro)"]
    M1 --> M2b["Não-Halogenados<br/>(Álcool, Acetona)"]
    M2a --> M3["⚠️ NUNCA misturar!"]
    M2b --> M3
    M3 --> N["🛢️ ACONDICIONAMENTO"]
    N --> N1["Bombona PEAD<br/>(máx. 80% capacidade)<br/>OU Vidro Âmbar original"]
    N1 --> N2["Colocar em Bandeja<br/>de Contenção"]
    N2 --> O["🏷️ IDENTIFICAÇÃO"]
    O --> O1["Preencher rótulo com:"]
    O1 --> O2["- Código IBAMA"]
    O1 --> O3["- Composição química"]
    O1 --> O4["- Data"]
    O1 --> O5["- Responsável"]
    O2 --> P["📞 Solicitar Coleta UFSC"]
    O3 --> P
    O4 --> P
    O5 --> P
    P --> P1["Empresa licenciada coleta<br/>e processa"]

    %% ===== FLUXO PERFUROCORTANTE =====
    E --> Q["🚨 DESCARTE IMEDIATO"]
    Q --> Q1["Caixa Rígida Amarela<br/>(Descarpack)"]
    Q1 --> Q2["⚠️ Cuidado com pontas afiadas!<br/>Use pinças/pás - NUNCA as mãos"]
    Q2 --> Q3["Fechar quando atingir<br/>linha pontilhada"]
    Q3 --> P

    %% ===== FLUXO LOGÍSTICA REVERSA =====
    F --> R["🏠 ARMAZENAMENTO"]
    R --> R1["Local seco"]
    R1 --> R2["Sem contaminação cruzada"]
    R2 --> S["📍 DESTINO"]
    S --> S1["Entregar em Ponto de Coleta UFSC"]
    S1 --> S2["(Não vai para lixo comum)"]
    S2 --> S3["✅ Reciclagem"]

    %% ===== FLUXO COMUM =====
    G --> T["🗑️ DESTINO"]
    T --> T1a["Lixeira Comum<br/>(Saco Preto)"]
    T --> T1b["Lixeira Reciclável<br/>(Saco Verde/Azul)"]
    T1a --> T2["Coleta de resíduos comum"]
    T1b --> T3["Reciclagem"]

    style A fill:#667eea,stroke:#333,stroke-width:3px,color:#fff
    style B fill:#764ba2,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style D fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style E fill:#fed7aa,stroke:#ea580c,stroke-width:2px
    style F fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style G fill:#e5e7eb,stroke:#6b7280,stroke-width:2px
    style I4 fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534
    style L1 fill:#fce7f3,stroke:#ec4899,stroke-width:2px
    style P1 fill:#fce7f3,stroke:#ec4899,stroke-width:2px
    style S3 fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534
    style T2 fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px
    style T3 fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px
```

---

## 📋 Tabela de Decisão Rápida

| **Resíduo** | **Origem** | **Decisão** | **Acondicionamento** | **Ação Final** | **Código IBAMA** |
|-------------|-----------|-----------|---------------------|----------------|-----------------|
| 🔴 **Biomassa / Meio Cultura** | Experimento | Inativar quimicamente? | Saco Vermelho (se não) | Coleta Especial | N/A |
| 🟡 **Fixador (Formol)** | Descarte | Verificar incompatibilidade | Bombona PEAD | Coleta UFSC | Sim |
| 🟡 **Álcool / Solvente** | Descarte | Verificar incompatibilidade | Bombona PEAD | Coleta UFSC | Sim |
| 🟠 **Lâmula / Vidro Quebrado** | Limpeza | Descarte imediato | Caixa Rígida Amarela | Coleta UFSC | Sim |
| 🔵 **Pilhas / Baterias** | Equipamento | Armazenar seco | Local próprio | Ponto de Coleta | Não |
| ⚪ **Papel Toalha Limpo** | Limpeza | Reciclar | Saco Branco/Verde | Coleta Comum | Não |

---

## 🎯 Pontos Críticos de Decisão

### 🔴 FLUXO BIOLÓGICO - Decisão Principal: "Inativar Quimicamente?"

**✅ SIM se:**
- Meio de cultura líquido
- Solução aquosa
- Sem biomassa sólida complexa
- Passível de tratamento com hipoclorito

**❌ NÃO se:**
- Biomassa sólida (algas, cells precipitadas)
- Meios muito complexos
- Vidro ou plástico contaminado
- Incerteza sobre composição

**Quando SIM: Protocolo Rápido (30 min)**
```
1. Medir volume (máx. 1L por vez em erlenmeyer)
2. Adicionar Hipoclorito 1% (10 mL por 100 mL)
3. Deixar em repouso 30 minutos
4. Descartar na pia com água corrente
5. Lavar erlenmeyer e deixar secar
```

**Quando NÃO: Protocolo de Armazenamento**
```
1. Etiquetar saco vermelho
2. Armazenar em local designado
3. Solicitar coleta quando cheio
4. Recepção SAU coleta em 48h
```

---

### 🟡 FLUXO QUÍMICO - Decisão Principal: "Compatibilidade"

**Halogenados:** Formol, Cloro, Iodo, Bromo
- ❌ NUNCA misturar com Não-Halogenados
- 📦 Bombona separada
- 🏷️ Rótulo em VERMELHO

**Não-Halogenados:** Álcool, Acetona, Tolueno
- ❌ NUNCA misturar com Halogenados
- 📦 Bombona separada
- 🏷️ Rótulo em AZUL

**Código IBAMA:**
- **3001.32.00** - Resíduos de formol
- **3001.33.00** - Resíduos de solventes halogenados
- **3001.34.00** - Resíduos de solventes não-halogenados

---

### 🟠 FLUXO PERFUROCORTANTE - Sem Decisão

**Sempre:** Descarte Imediato na Caixa Rígida Amarela

⚠️ **Segurança:**
- Use **PINÇAS** ou **PÁ** - NUNCA as mãos
- Deposite vidro quebrado em saco pequeno antes de colocar na caixa
- Avise coordenador se houver muito vidro/biomassa

---

### 🔵 FLUXO LOGÍSTICA REVERSA - Decisão: "Identificar Local de Coleta"

**Pilhas / Baterias:**
- Local: Sala de reuniões (caixa verde)
- Coleta: Trimestral

**Lâmpadas Tubulares:**
- Local: Almoxarifado
- Coleta: Semestral

---

### ⚪ FLUXO COMUM - Sem Decisão Técnica

**Papel Toalha / Embalagens Limpas:**
- Saco Branco (lixo comum)
- Coleta semanal

**Recicláveis (Caixas, Plástico limpo):**
- Saco Azul/Verde
- Coleta semanal

---

## 💾 Implementação no Aplicativo

Este fluxograma será:
1. ✅ Visualizado como diagrama Mermaid no GitHub
2. ✅ Referência para o formulário inteligente
3. ✅ Printável para afixar no laboratório
4. ✅ Incorporado no app.html como guia interativo

---

**Próxima Etapa:** Integrar esta árvore de decisão ao formulário do app para orientar passo a passo!
