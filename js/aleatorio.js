// Lista de nomes aleatórios para personalizar a história
const nomes = ["Fernanda", "Giuliana", "Lucas", "Eduardo", "Gabriel", "Juliana"];

// Função para sortear um item aleatório de qualquer lista
export function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

// Sorteia e exporta um único nome para o jogo
export const nome = aleatorio(nomes);