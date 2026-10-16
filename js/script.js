import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

// Mapeamento dos elementos HTML
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

// Elementos da Barra de Progresso
const caixaProgresso = document.querySelector(".caixa-progresso");
const progressoPreenchimento = document.querySelector(".progresso-preenchimento");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Função para o efeito de digitação suave
function digitaTexto(elemento, texto, velocidade = 25) {
    elemento.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, velocidade);
}

// Atualiza a barra de progresso do topo
function atualizaProgresso() {
    const porcentagem = ((atual + 1) / perguntas.length) * 100;
    progressoPreenchimento.style.width = `${Math.min(porcentagem, 100)}%`;
}

// Inicia a jornada ocultando a tela inicial e exibindo o progresso
function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = 'none';
    caixaProgresso.style.display = 'block';
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

// Exibe a pergunta atual com efeito de digitação
function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    
    atualizaProgresso();
    perguntaAtual = perguntas[atual];
    digitaTexto(caixaPerguntas, perguntaAtual.enunciado);
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

// Renderiza os botões das alternativas
function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

// Processa a resposta selecionada e define a próxima etapa no fluxograma
function respostaSelecionada(opcaoSelecionada) {
    const afirmacaoSorteada = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacaoSorteada + " ";

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
        mostraPergunta();
    } else {
        mostraResultado();
    }
}

// Oculta as alternativas e exibe o resultado final formatado
function mostraResultado() {
    caixaProgresso.style.display = 'none';
    caixaPerguntas.textContent = `Em 2049, ${nome}...`;
    digitaTexto(textoResultado, historiaFinal, 20);
    caixaAlternativas.textContent = "";
    caixaResultado.classList.add("mostrar");
    botaoJogarNovamente.addEventListener("click", jogaNovamente);
}

// Reinicia o jogo voltando à tela de início
function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove("mostrar");
    caixaProgresso.style.display = 'none';
    telaInicial.style.display = 'block';
    caixaPerguntas.textContent = "";
}

// Substituição global da palavra "você" pelo nome sorteado
function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

// Escutador de clique no botão de início
botaoIniciar.addEventListener('click', iniciaJogo);

// Prepara a substituição do nome ao carregar o script
substituiNome();