export const WASTE_TYPES = [
  'Químico',
  'Biológico',
  'Perfurocortante',
  'Comum',
  'Logística Reversa'
];

export const RISK_LEVELS = [
  'NB-1',
  'NB-2',
  'NB-3',
  'Não-Biológico'
];

export const ENVIRONMENTS = [
  'E1 - Sala de reuniões/estudos',
  'E2 - Sala dos professores',
  'E3 - Câmara de cultivo 1',
  'E4 - Laboratório 1',
  'E5 - Sala de estoque',
  'E6 - Laboratório 2',
  'E7 - Sala pré-experimental',
  'E8 - Câmara de cultivo 2',
  'E9 - Sala de mergulho',
  'E10 - Câmara de cultivo 3'
];

export const WASTE_STATUS = [
  'Em Geração',
  'Armazenado',
  'Coletado',
  'Descartado'
];

export const PACKAGING_TYPES = [
  'Saco Branco',
  'Saco Vermelho',
  'Bombona',
  'Caixa Rígida',
  'Outro'
];

export const EPI_OPTIONS = [
  'Jaleco',
  'Luvas nitrílicas',
  'Óculos de segurança',
  'Protetor facial',
  'Máscara',
  'Calçado fechado',
  'Avental impermeável'
];

export const EPC_OPTIONS = [
  'Capela de Gases',
  'Fluxo Laminar',
  'Nenhum'
];

export const ACTIVITIES = [
  'Coleta de Macroalgas',
  'Cultivo',
  'Experimento',
  'Descarte',
  'Limpeza'
];

export const ALERT_TYPES = [
  'Vencimento',
  'Volume Alto',
  'Conformidade',
  'Coleta Pendente'
];

export const ALERT_PRIORITIES = [
  'Alta',
  'Média',
  'Baixa'
];

export const SAMPLE_TYPES = [
  'Microalgas',
  'Macroalgas',
  'Meio de Cultura',
  'Amostra Ambiental'
];

export const INACTIVATION_METHODS = {
  'Microalgas': {
    method: 'Hipoclorito de Sódio 1%',
    time: 30,
    temperature: 'Ambiente',
    notes: 'Tempo de contato mínimo de 30 minutos'
  },
  'Macroalgas': {
    method: 'Hipoclorito de Sódio 1% ou Álcool 70%',
    time: 30,
    temperature: 'Ambiente',
    notes: 'Seguido por autoclave se disponível'
  },
  'Meio de Cultura': {
    method: 'Hipoclorito de Sódio 1% + Autoclave',
    time: 30,
    temperature: '121°C',
    notes: 'Desinfecção química antes de autoclavar'
  },
  'Amostra Ambiental': {
    method: 'Hipoclorito de Sódio 1%',
    time: 60,
    temperature: 'Ambiente',
    notes: 'Tempo estendido para amostras de origem desconhecida'
  }
};
