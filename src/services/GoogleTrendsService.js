// Importa o módulo "rss-parser" para análise de feeds RSS
import Parser from 'rss-parser';

// URL base da API de tendências do Google
const API_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=';

// Cria uma instância do Parser com opções personalizadas
const parser = new Parser({
  defaultRSS: 2.0,
  customFields: {
    item: [['ht:approx_traffic', 'volume', { keepArray: false }]],
  },
});

// Função para converter o volume de string para inteiro
const parseVolumeToInt = volume => {
  // Remove caracteres não numéricos e converte para número inteiro
  let vol = volume.replace('+', '');
  vol = vol.replace(/\,/g, '');
  return Number.parseInt(vol, 10);
};

// Função para ordenar por volume em ordem decrescente
const sortVolume = (a, b) => b.volume - a.volume;

// Função assíncrona para obter tendências do Google para um país específico
export const getGoogleTrends = async (geo) => {
  const url = `${API_URL}${geo}`;
  const trends = await parser.parseURL(url);
  // Mapeia os itens do feed para um formato mais simples com nome e volume
  const items = trends.items.map(item => {
    const { title: name, volume } = item;
    return { name, volume: parseVolumeToInt(volume) };
  });
  return items;
};

// Função assíncrona para buscar e processar tendências do Google de diferentes países
const fetchData = async (limit = 10) => {
  // Aguarda a resolução das promessas getGoogleTrends para diferentes países
  const [us, br] = await Promise.all([
    getGoogleTrends('US'), // Tendências dos EUA
    getGoogleTrends('BR'), // Tendências do Brasil
  ]);

  // Combina as tendências de ambos os países e as ordena por volume
  const items = [...us, ...br];
  const sorted = items.sort(sortVolume); // Ordena as tendências pelo volume
  const limited = sorted.slice(0, limit); // Limita o número de tendências

  return limited;
};

// Exporta um objeto com a função fetchData como propriedade
export default { fetchData };
