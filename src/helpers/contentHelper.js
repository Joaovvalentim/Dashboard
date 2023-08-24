// Função para acessar valores de um objeto aninhado usando um caminho de chaves
export const get = (obj, path, defaultValue) => {
    // Verifica se o caminho é uma string; se sim, divide-a em um array de chaves
    if (typeof path === 'string') path = path.split('.').filter(key => key.length);
    
    // Reduz o caminho para acessar o valor final no objeto
    const result = path.reduce((dive, key) => dive && dive[key], obj);
    
    // Retorna o valor obtido ou o valor padrão caso não seja encontrado
    return result || defaultValue;
};
