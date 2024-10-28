const baseURL = window.location.hostname === 'localhost' 
    ? 'http://localhost:10000'  
    : 'https://painelsupervidorbackend.onrender.com';

// Atualiza o horário em cada botão
function updateTime(idTextoParaCopiar, idResultado) {
    const timeElement = document.getElementById(idTextoParaCopiar);
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    timeElement.textContent = timeString;
    document.getElementById(idResultado).textContent = timeString;
}

// Atualiza o horário em intervalos de 1 segundo
setInterval(() => {
    updateTime('textoParaCopiarEntrada', 'resultadoEntrada');
    updateTime('textoParaCopiarAlmoco', 'resultadoAlmoco');
    updateTime('textoParaCopiarCafe', 'resultadoCafe');
    updateTime('textoParaCopiarRetorno', 'resultadoRetorno');
    updateTime('textoParaCopiarSaida', 'resultadoSaida');
}, 1000);

// Função para copiar o horário e enviar para a API
function copiarTexto(tipo) {
    const textoCopiado = document.getElementById(`resultado${tipo}`).innerText;
    const inputNome = document.getElementById('inputNome').value || 'Victor Cardoso';
    const dataAtual = new Date().toLocaleDateString("pt-BR");

    const ponto = {
        nome: inputNome,
        categoria: "CLT",  // Ajuste conforme necessário para o tipo de colaborador
        tipo: tipo,
        data: dataAtual,
        hora: textoCopiado
    };

    enviarPontoParaAPI(ponto);
}

// Função para enviar os dados do ponto para a API
async function enviarPontoParaAPI(ponto) {
    try {
        const response = await fetch(`${baseURL}/pontos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ponto)
        });
        if (response.ok) {
            alert(`${ponto.tipo} registrado com sucesso!`);
        } else {
            alert("Erro ao registrar o ponto.");
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Falha ao conectar com o servidor.");
    }
}

// Atualiza o nome nos botões
function atualizarNome() {
    const inputNome = document.getElementById('inputNome').value || 'Victor Cardoso';
    document.getElementById('nomePessoaEntrada').textContent = inputNome;
    document.getElementById('nomePessoaAlmoco').textContent = inputNome;
    document.getElementById('nomePessoaCafe').textContent = inputNome;
    document.getElementById('nomePessoaRetorno').textContent = inputNome;
    document.getElementById('nomePessoaSaida').textContent = inputNome;
    localStorage.setItem('nome', inputNome);
}

// Carrega o nome salvo no local storage (se houver)
function carregarNomeSalvo() {
    const nomeSalvo = localStorage.getItem('nome') || 'Victor Cardoso';
    document.getElementById('inputNome').value = nomeSalvo;
    atualizarNome();
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

// Função para capitalizar a primeira letra da string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Inicializa as configurações ao carregar a página
window.onload = function() {
    carregarNomeSalvo();
    atualizarData();
};
