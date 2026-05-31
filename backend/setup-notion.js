import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function createDatabases() {
  console.log('\n🚀 PGRS LAFIC - Setup Automático de Tabelas Notion\n');

  // 1. Obter Notion API Key
  const notionApiKey = await question(
    '🔑 Coloque sua Notion Integration Token (secret_...): '
  );

  if (!notionApiKey.startsWith('secret_')) {
    console.error('❌ Token inválido. Deve começar com "secret_"');
    process.exit(1);
  }

  const notion = new Client({ auth: notionApiKey });

  // 2. Obter Parent Page ID
  const parentPageId = await question(
    '📄 ID da página pai (onde as tabelas serão criadas) [Enter para criar no workspace]: '
  );

  const parent = parentPageId.trim()
    ? { type: 'page_id', page_id: parentPageId }
    : undefined;

  const envContent = `# Notion API Configuration
NOTION_API_KEY=${notionApiKey}

`;

  console.log('\n⏳ Criando tabelas...\n');

  try {
    // 1. Tabela: Inventário de Resíduos
    console.log('📝 1/5 Criando "Inventário de Resíduos"...');
    const wasteDb = await notion.databases.create({
      parent: parent ? parent : { type: 'workspace', workspace: true },
      title: [{ type: 'text', text: { content: 'Inventário de Resíduos' } }],
      properties: {
        'ID': { number: {} },
        'Data de Registro': { date: {} },
        'Tipo de Resíduo': {
          select: {
            options: [
              { name: 'Químico', color: 'red' },
              { name: 'Biológico', color: 'brown' },
              { name: 'Perfurocortante', color: 'purple' },
              { name: 'Comum', color: 'gray' },
              { name: 'Logística Reversa', color: 'blue' }
            ]
          }
        },
        'Classificação de Risco': {
          select: {
            options: [
              { name: 'NB-1', color: 'green' },
              { name: 'NB-2', color: 'yellow' },
              { name: 'NB-3', color: 'red' },
              { name: 'Não-Biológico', color: 'gray' }
            ]
          }
        },
        'Ambiente': {
          select: {
            options: [
              { name: 'E1 - Sala de reuniões/estudos' },
              { name: 'E2 - Sala dos professores' },
              { name: 'E3 - Câmara de cultivo 1' },
              { name: 'E4 - Laboratório 1' },
              { name: 'E5 - Sala de estoque' },
              { name: 'E6 - Laboratório 2' },
              { name: 'E7 - Sala pré-experimental' },
              { name: 'E8 - Câmara de cultivo 2' },
              { name: 'E9 - Sala de mergulho' },
              { name: 'E10 - Câmara de cultivo 3' }
            ]
          }
        },
        'Volume/Quantidade': { number: {} },
        'Unidade': {
          select: {
            options: [
              { name: 'kg' },
              { name: 'L' },
              { name: 'un' }
            ]
          }
        },
        'Data de Geração': { date: {} },
        'Data de Vencimento': { date: {} },
        'Responsável': { people: {} },
        'Acondicionamento': {
          select: {
            options: [
              { name: 'Saco Branco' },
              { name: 'Saco Vermelho' },
              { name: 'Bombona' },
              { name: 'Caixa Rígida' },
              { name: 'Outro' }
            ]
          }
        },
        'Status': {
          select: {
            options: [
              { name: 'Em Geração', color: 'blue' },
              { name: 'Armazenado', color: 'yellow' },
              { name: 'Coletado', color: 'green' },
              { name: 'Descartado', color: 'gray' }
            ]
          }
        },
        'EPI Obrigatório': {
          multi_select: {
            options: [
              { name: 'Jaleco' },
              { name: 'Luvas nitrílicas' },
              { name: 'Óculos de segurança' },
              { name: 'Protetor facial' },
              { name: 'Máscara' },
              { name: 'Calçado fechado' },
              { name: 'Avental impermeável' }
            ]
          }
        },
        'EPC Necessário': {
          select: {
            options: [
              { name: 'Capela de Gases' },
              { name: 'Fluxo Laminar' },
              { name: 'Nenhum' }
            ]
          }
        },
        'Observações': { rich_text: {} }
      }
    });
    console.log(`✅ Tabela criada: ${wasteDb.id}\n`);

    // 2. Tabela: Protocolo de Inativação
    console.log('📝 2/5 Criando "Protocolo de Inativação"...');
    const inactivationDb = await notion.databases.create({
      parent: parent ? parent : { type: 'workspace', workspace: true },
      title: [{ type: 'text', text: { content: 'Protocolo de Inativação' } }],
      properties: {
        'Tipo de Amostra': {
          select: {
            options: [
              { name: 'Microalgas' },
              { name: 'Macroalgas' },
              { name: 'Meio de Cultura' },
              { name: 'Amostra Ambiental' }
            ]
          }
        },
        'Nível de Risco': {
          select: {
            options: [
              { name: 'NB-1', color: 'green' },
              { name: 'NB-2', color: 'yellow' }
            ]
          }
        },
        'Método de Inativação': { rich_text: {} },
        'Tempo de Contato (min)': { number: {} },
        'Temperatura': { rich_text: {} },
        'Observações': { rich_text: {} },
        'Validado Por': { people: {} },
        'Data de Validação': { date: {} }
      }
    });
    console.log(`✅ Tabela criada: ${inactivationDb.id}\n`);

    // 3. Tabela: Requisitos de Biossegurança
    console.log('📝 3/5 Criando "Requisitos de Biossegurança"...');
    const biosecurityDb = await notion.databases.create({
      parent: parent ? parent : { type: 'workspace', workspace: true },
      title: [{ type: 'text', text: { content: 'Requisitos de Biossegurança' } }],
      properties: {
        'Atividade': {
          select: {
            options: [
              { name: 'Coleta de Macroalgas' },
              { name: 'Cultivo' },
              { name: 'Experimento' },
              { name: 'Descarte' },
              { name: 'Limpeza' }
            ]
          }
        },
        'Nível de Biossegurança': {
          select: {
            options: [
              { name: 'NB-1', color: 'green' },
              { name: 'NB-2', color: 'yellow' },
              { name: 'NB-3', color: 'red' }
            ]
          }
        },
        'EPIs Obrigatórios': {
          multi_select: {
            options: [
              { name: 'Jaleco' },
              { name: 'Luvas nitrílicas' },
              { name: 'Óculos de segurança' },
              { name: 'Protetor facial' },
              { name: 'Máscara' },
              { name: 'Calçado fechado' },
              { name: 'Avental impermeável' }
            ]
          }
        },
        'EPCs Obrigatórios': {
          multi_select: {
            options: [
              { name: 'Capela de Gases' },
              { name: 'Fluxo Laminar' }
            ]
          }
        },
        'Procedimento de Emergência': { rich_text: {} },
        'Contato de Emergência': { rich_text: {} },
        'Última Atualização': { date: {} }
      }
    });
    console.log(`✅ Tabela criada: ${biosecurityDb.id}\n`);

    // 4. Tabela: Alertas e Conformidade
    console.log('📝 4/5 Criando "Alertas e Conformidade"...');
    const alertsDb = await notion.databases.create({
      parent: parent ? parent : { type: 'workspace', workspace: true },
      title: [{ type: 'text', text: { content: 'Alertas e Conformidade' } }],
      properties: {
        'Data do Alerta': { date: {} },
        'Tipo de Alerta': {
          select: {
            options: [
              { name: 'Vencimento', color: 'red' },
              { name: 'Volume Alto', color: 'orange' },
              { name: 'Conformidade', color: 'yellow' },
              { name: 'Coleta Pendente', color: 'purple' }
            ]
          }
        },
        'Descrição': { rich_text: {} },
        'Prioridade': {
          select: {
            options: [
              { name: 'Alta', color: 'red' },
              { name: 'Média', color: 'yellow' },
              { name: 'Baixa', color: 'green' }
            ]
          }
        },
        'Resolvido?': { checkbox: {} },
        'Data de Resolução': { date: {} },
        'Responsável': { people: {} }
      }
    });
    console.log(`✅ Tabela criada: ${alertsDb.id}\n`);

    // 5. Tabela: Manutenção de EPCs
    console.log('📝 5/5 Criando "Manutenção de EPCs"...');
    const maintenanceDb = await notion.databases.create({
      parent: parent ? parent : { type: 'workspace', workspace: true },
      title: [{ type: 'text', text: { content: 'Manutenção de EPCs' } }],
      properties: {
        'EPC': {
          select: {
            options: [
              { name: 'Capela de Gases' },
              { name: 'Fluxo Laminar' }
            ]
          }
        },
        'Localização': { rich_text: {} },
        'Data da Última Manutenção': { date: {} },
        'Próxima Manutenção Prevista': { date: {} },
        'Status': {
          select: {
            options: [
              { name: 'Funcionando', color: 'green' },
              { name: 'Manutenção Necessária', color: 'yellow' },
              { name: 'Em Reparo', color: 'red' }
            ]
          }
        },
        'Responsável': { people: {} },
        'Observações': { rich_text: {} }
      }
    });
    console.log(`✅ Tabela criada: ${maintenanceDb.id}\n`);

    // Salvar IDs no .env
    const envContent2 = `NOTION_DATABASE_ID_WASTE=${wasteDb.id}
NOTION_DATABASE_ID_INACTIVATION=${inactivationDb.id}
NOTION_DATABASE_ID_BIOSECURITY=${biosecurityDb.id}
NOTION_DATABASE_ID_ALERTS=${alertsDb.id}
NOTION_DATABASE_ID_MAINTENANCE=${maintenanceDb.id}

PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_PATH=./data/alerts.db
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
`;

    const envPath = path.join(process.cwd(), 'backend', '.env');
    fs.writeFileSync(envPath, envContent + envContent2);

    console.log('✅ Arquivo .env atualizado!\n');
    console.log('📋 Resumo das Tabelas Criadas:');
    console.log(`   1️⃣  Inventário de Resíduos: ${wasteDb.id}`);
    console.log(`   2️⃣  Protocolo de Inativação: ${inactivationDb.id}`);
    console.log(`   3️⃣  Requisitos de Biossegurança: ${biosecurityDb.id}`);
    console.log(`   4️⃣  Alertas e Conformidade: ${alertsDb.id}`);
    console.log(`   5️⃣  Manutenção de EPCs: ${maintenanceDb.id}\n`);

    console.log('🎉 Setup concluído com sucesso!');
    console.log('👉 Próximo: npm run dev (backend)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

createDatabases();
