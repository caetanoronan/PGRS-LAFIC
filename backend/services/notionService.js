import notion from '../config/notionConfig.js';
import { notionDatabases } from '../config/notionConfig.js';

// Converter página Notion para objeto JavaScript
function pageToObject(page) {
  const props = page.properties;
  return {
    id: page.id,
    nome: props['Nome']?.title?.[0]?.text?.content || '',
    tipo: props['Tipo de Resíduo']?.select?.name || '',
    risco: props['Classificação de Risco']?.select?.name || '',
    ambiente: props['Ambiente']?.select?.name || '',
    volume: props['Volume/Quantidade']?.number || 0,
    unidade: props['Unidade']?.select?.name || '',
    dataGeracao: props['Data de Geração']?.date?.start || '',
    dataVencimento: props['Data de Vencimento']?.date?.start || '',
    acondicionamento: props['Acondicionamento']?.select?.name || '',
    status: props['Status']?.select?.name || '',
    epiObrigatorio: props['EPI Obrigatório']?.multi_select?.map(e => e.name) || [],
    epcNecessario: props['EPC Necessário']?.select?.name || '',
    observacoes: props['Observações']?.rich_text?.[0]?.text?.content || '',
    responsavel: props['Responsável']?.people?.[0]?.name || '',
    dataRegistro: props['Data de Registro']?.date?.start || ''
  };
}

// GET: Listar todos os resíduos
export async function getWasteInventory(filters = {}) {
  try {
    const query = {
      database_id: notionDatabases.waste,
      page_size: 100
    };

    // Aplicar filtros se fornecidos
    if (filters.tipo || filters.status) {
      const conditions = [];

      if (filters.tipo) {
        conditions.push({
          property: 'Tipo de Resíduo',
          select: { equals: filters.tipo }
        });
      }

      if (filters.status) {
        conditions.push({
          property: 'Status',
          select: { equals: filters.status }
        });
      }

      if (conditions.length > 0) {
        query.filter = conditions.length === 1
          ? conditions[0]
          : { and: conditions };
      }
    }

    const response = await notion.databases.query(query);
    return response.results.map(pageToObject);
  } catch (error) {
    console.error('Erro ao buscar resíduos:', error);
    throw error;
  }
}

// POST: Criar novo resíduo
export async function createWaste(wasteData) {
  try {
    const page = await notion.pages.create({
      parent: { database_id: notionDatabases.waste },
      properties: {
        'Nome': {
          title: [{ text: { content: wasteData.nome || `Resíduo ${wasteData.tipo}` } }]
        },
        'Tipo de Resíduo': {
          select: { name: wasteData.tipo }
        },
        'Classificação de Risco': {
          select: { name: wasteData.risco }
        },
        'Ambiente': {
          select: { name: wasteData.ambiente }
        },
        'Volume/Quantidade': {
          number: parseFloat(wasteData.volume) || 0
        },
        'Unidade': {
          select: { name: wasteData.unidade || 'kg' }
        },
        'Data de Geração': {
          date: { start: wasteData.dataGeracao || new Date().toISOString().split('T')[0] }
        },
        'Data de Vencimento': wasteData.dataVencimento ? {
          date: { start: wasteData.dataVencimento }
        } : undefined,
        'Acondicionamento': {
          select: { name: wasteData.acondicionamento }
        },
        'Status': {
          select: { name: 'Em Geração' }
        },
        'EPI Obrigatório': {
          multi_select: (wasteData.epiObrigatorio || []).map(epi => ({ name: epi }))
        },
        'EPC Necessário': {
          select: { name: wasteData.epcNecessario || 'Nenhum' }
        },
        'Observações': {
          rich_text: [{ text: { content: wasteData.observacoes || '' } }]
        },
        'Data de Registro': {
          date: { start: new Date().toISOString().split('T')[0] }
        }
      }
    });

    return pageToObject(page);
  } catch (error) {
    console.error('Erro ao criar resíduo:', error);
    throw error;
  }
}

// GET: Obter detalhes de um resíduo específico
export async function getWasteById(pageId) {
  try {
    const page = await notion.pages.retrieve(pageId);
    return pageToObject(page);
  } catch (error) {
    console.error('Erro ao buscar resíduo:', error);
    throw error;
  }
}

// PUT: Atualizar status de um resíduo
export async function updateWasteStatus(pageId, newStatus) {
  try {
    const page = await notion.pages.update(pageId, {
      properties: {
        'Status': {
          select: { name: newStatus }
        }
      }
    });

    return pageToObject(page);
  } catch (error) {
    console.error('Erro ao atualizar resíduo:', error);
    throw error;
  }
}

// GET: Buscar protocolos de inativação
export async function getInactivationProtocols() {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabases.inactivation,
      page_size: 100
    });

    return response.results.map(page => ({
      id: page.id,
      tipoAmostra: page.properties['Tipo de Amostra']?.select?.name || '',
      nivelRisco: page.properties['Nível de Risco']?.select?.name || '',
      metodo: page.properties['Método de Inativação']?.rich_text?.[0]?.text?.content || '',
      tempoContato: page.properties['Tempo de Contato (min)']?.number || 0,
      temperatura: page.properties['Temperatura']?.rich_text?.[0]?.text?.content || '',
      observacoes: page.properties['Observações']?.rich_text?.[0]?.text?.content || ''
    }));
  } catch (error) {
    console.error('Erro ao buscar protocolos de inativação:', error);
    throw error;
  }
}

// GET: Buscar requisitos de biossegurança
export async function getBiosecurityRequirements() {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabases.biosecurity,
      page_size: 100
    });

    return response.results.map(page => ({
      id: page.id,
      atividade: page.properties['Atividade']?.select?.name || '',
      nivelBiosseguranca: page.properties['Nível de Biossegurança']?.select?.name || '',
      episObrigatorios: page.properties['EPIs Obrigatórios']?.multi_select?.map(e => e.name) || [],
      epcsObrigatorios: page.properties['EPCs Obrigatórios']?.multi_select?.map(e => e.name) || [],
      procedimentoEmergencia: page.properties['Procedimento de Emergência']?.rich_text?.[0]?.text?.content || '',
      contatoEmergencia: page.properties['Contato de Emergência']?.rich_text?.[0]?.text?.content || ''
    }));
  } catch (error) {
    console.error('Erro ao buscar requisitos de biossegurança:', error);
    throw error;
  }
}

// GET: Buscar alertas ativos
export async function getActiveAlerts() {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabases.alerts,
      filter: {
        property: 'Resolvido?',
        checkbox: { equals: false }
      },
      page_size: 100
    });

    return response.results.map(page => ({
      id: page.id,
      dataAlerta: page.properties['Data do Alerta']?.date?.start || '',
      tipoAlerta: page.properties['Tipo de Alerta']?.select?.name || '',
      descricao: page.properties['Descrição']?.rich_text?.[0]?.text?.content || '',
      prioridade: page.properties['Prioridade']?.select?.name || '',
      responsavel: page.properties['Responsável']?.people?.[0]?.name || ''
    }));
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    throw error;
  }
}

// GET: Status de manutenção dos EPCs
export async function getMaintenanceStatus() {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabases.maintenance,
      page_size: 100
    });

    return response.results.map(page => ({
      id: page.id,
      epc: page.properties['EPC']?.select?.name || '',
      localizacao: page.properties['Localização']?.rich_text?.[0]?.text?.content || '',
      dataUltimaManutencao: page.properties['Data da Última Manutenção']?.date?.start || '',
      proximaManutencaoPrevista: page.properties['Próxima Manutenção Prevista']?.date?.start || '',
      status: page.properties['Status']?.select?.name || '',
      responsavel: page.properties['Responsável']?.people?.[0]?.name || ''
    }));
  } catch (error) {
    console.error('Erro ao buscar status de manutenção:', error);
    throw error;
  }
}
