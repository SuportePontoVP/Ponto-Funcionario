const baseURL = window.location.hostname === 'localhost' 
    ? 'http://localhost:10000'  
    : 'https://painelsupervidorbackend.onrender.com';

function updateTime(idTextoParaCopiar, idResultado) {
    const timeElement = document.getElementById(idTextoParaCopiar);
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`; // Alterado para ":" ao invés de "h"
    timeElement.textContent = timeString;
    document.getElementById(idResultado).textContent = timeString;
}

// Atualiza o horário em intervalos de 1 segundo
setInterval(function () {
    updateTime('textoParaCopiarEntrada', 'resultadoEntrada');
    updateTime('textoParaCopiarCafe1', 'resultadoCafe1');
    updateTime('textoParaCopiarRetornoCafe1', 'resultadoRetornoCafe1');
    updateTime('textoParaCopiarAlmoco', 'resultadoAlmoco');
    updateTime('textoParaCopiarRetornoAlmoco', 'resultadoRetornoAlmoco');
    updateTime('textoParaCopiarCafe2', 'resultadoCafe2');
    updateTime('textoParaCopiarRetornoCafe2', 'resultadoRetornoCafe2');
    updateTime('textoParaCopiarSaida', 'resultadoSaida');
}, 1000);

// Função auxiliar para copiar o texto para a área de transferência
function copiarParaAreaDeTransferencia(texto) {
    const tempInput = document.createElement('textarea');
    tempInput.value = texto;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

// Atualiza a data atual no cabeçalho
function atualizarData() {
    const dataAtual = new Date();
    const diaSemana = capitalizeFirstLetter(dataAtual.toLocaleDateString('pt-BR', { weekday: 'long' }));
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${diaSemana}: ${dia} | ${mes} | ${ano}`;
    document.getElementById('currentDate').textContent = dataFormatada;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

atualizarData();

function atualizarNome() {
    const inputNome = document.getElementById('inputNome').value || 'Seu nome';

    // Atualizando o nome em todos os pontos
    document.getElementById('nomePessoaEntrada').textContent = inputNome;
    document.getElementById('nomePessoaAlmoco').textContent = inputNome;
    document.getElementById('nomePessoaCafe1').textContent = inputNome; // Atualizado para cafe1
    document.getElementById('nomePessoaRetornoCafe1').textContent = inputNome; // Atualizado para retornoCafe1
    document.getElementById('nomePessoaCafe2').textContent = inputNome; // Atualizado para cafe2
    document.getElementById('nomePessoaRetornoCafe2').textContent = inputNome; // Atualizado para retornoCafe2
    document.getElementById('nomePessoaRetornoAlmoco').textContent = inputNome; // Atualizado para retornoAlmoco
    document.getElementById('nomePessoaSaida').textContent = inputNome;

    // Salva o nome no localStorage
    localStorage.setItem('nome', inputNome);
}

// Carrega o nome salvo no localStorage (se houver)
function carregarNomeSalvo() {
    const nomeSalvo = localStorage.getItem('nome') || 'Seu nome';
    document.getElementById('inputNome').value = nomeSalvo;
    atualizarNome();
}

window.onload = carregarNomeSalvo;

// Função para copiar o texto dentro do botão
function copiarTexto(id) {
    const botao = document.getElementById(id);
    const nome = botao.querySelector('p').innerText; // Pega o texto do botão
    const horario = botao.querySelector('.time').innerText; // Pega o horário
    const textoCompleto = nome + ' '; // Cria o texto completo sem repetição
    copiarParaAreaDeTransferencia(textoCompleto); // Copia o texto completo
}

// Função para mostrar ou esconder os botões com base na seleção do rádio
function atualizarVisibilidadeBotoes() {
  const estagiarioSelecionado = document.querySelector('input[name="categoria"]:checked').value === "Estagiário";
  const cafe2Container = document.getElementById('cafe2');
  const retornoCafe2Container = document.getElementById('retornoCafe2');

  if (estagiarioSelecionado) {
      cafe2Container.style.display = 'none';
      retornoCafe2Container.style.display = 'none';
  } else {
      cafe2Container.style.display = 'block';
      retornoCafe2Container.style.display = 'block';
  }
}

// Adiciona o evento de mudança aos botões de rádio
document.querySelectorAll('input[name="categoria"]').forEach((input) => {
  input.addEventListener('change', atualizarVisibilidadeBotoes);
});

// Chama a função ao carregar a página para definir o estado inicial
window.onload = () => {
  carregarNomeSalvo();
  atualizarVisibilidadeBotoes(); // Chama a função para definir o estado inicial
};
