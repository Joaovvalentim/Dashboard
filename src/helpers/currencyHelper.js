// Constantes para símbolos de moedas
export const SYMBOL_USD = "U$:"; // Símbolo para Dólar Americano
export const SYMBOL_BRL = "R$:"; // Símbolo para Real Brasileiro

// Função para formatar um valor numérico com um símbolo de moeda
export const format = (value, symbol) => {
    // Verifica se o valor não é um número; se não for, assume o valor como 0
    const parsedValue = isNaN(value) ? 0 : parseFloat(value, 10);
    
    // Formata o valor numérico com duas casas decimais e o símbolo de moeda
    return `${symbol} ${parsedValue.toFixed(2)}`;
};
