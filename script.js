const baseURL = window.location.hostname === 'localhost' 
    ? 'http://localhost:10000'  
    : 'https://painelsupervidorbackend.onrender.com';

function updateTime(idTextoParaCopiar, idResultado) {
  const timeElement = document.getElementById(idTextoParaCopiar);
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}h${minutes}`;
  timeElement.textContent = timeString;
  document.getElementById(idResultado).textContent = timeString;
}

// Atualiza o horário em intervalos de 1 segundo
setInterval(function () {
  updateTime('textoParaCopiarEntrada', 'resultadoEntrada');
  updateTime('textoParaCopiarAlmoco', 'resultadoAlmoco');
  updateTime('textoParaCopiarCafe', 'resultadoCafe');
  updateTime('textoParaCopiarRetorno', 'resultadoRetorno');
  updateTime('textoParaCopiarSaida', 'resultadoSaida');
}, 1000);

// Função para copiar o horário e enviar ao backend
function copiarTexto(idResultado, tipo) {
  const textoCopiado = document.getElementById(idResultado).innerText;
  copiarParaAreaDeTransferencia(textoCopiado);
  enviarMarcacao(tipo, textoCopiado);
}

// Função auxiliar para copiar o texto para a área de transferência
function copiarParaAreaDeTransferencia(texto) {
  const tempInput = document.createElement('textarea');
  tempInput.value = texto;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}

// Função para enviar a marcação do ponto ao backend
async function enviarMarcacao(tipo, hora) {
  const nome = document.getElementById('inputNome').value || 'Victor Cardoso';
  const categoria = document.querySelector('input[name="categoria"]:checked')?.value || 'CLT';
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  const ponto = {
    nome: nome,
    categoria: categoria,
    tipo: tipo,
    data: dataAtual,
    hora: hora
  };

  try {
    const response = await fetch(`${baseURL}/pontos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ponto)
    });

    if (response.ok) {
      alert(`${tipo} registrado com sucesso!`);
    } else {
      alert(`Erro ao registrar ${tipo}.`);
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    alert("Falha ao conectar com o servidor.");
  }
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
  const inputNome = document.getElementById('inputNome').value || 'Victor Cardoso';
  document.getElementById('nomePessoaEntrada').textContent = inputNome;
  document.getElementById('nomePessoaAlmoco').textContent = inputNome;
  document.getElementById('nomePessoaCafe').textContent = inputNome;
  document.getElementById('nomePessoaRetorno').textContent = inputNome;
  document.getElementById('nomePessoaSaida').textContent = inputNome;

  // Salva o nome no localStorage
  localStorage.setItem('nome', inputNome);
}

// Carrega o nome salvo no localStorage (se houver)
function carregarNomeSalvo() {
  const nomeSalvo = localStorage.getItem('nome') || 'Victor Cardoso';
  document.getElementById('inputNome').value = nomeSalvo;
  atualizarNome();
}

window.onload = carregarNomeSalvo;
function copiarTexto(idResultado, tipo) {
  const textoCopiado = document.getElementById(idResultado).innerText;
  copiarParaAreaDeTransferencia(textoCopiado);
  enviarMarcacao(tipo, textoCopiado);
}

function copiarParaAreaDeTransferencia(texto) {
  const tempInput = document.createElement('textarea');
  tempInput.value = texto;
  document.body.appendChild(tempInput);
  tempInput.select();
  const success = document.execCommand('copy');
  document.body.removeChild(tempInput);
  return success; // Retorna se a cópia foi bem-sucedida
}

async function enviarMarcacao(tipo, hora) {
  const nome = document.getElementById('inputNome').value || 'Victor Cardoso';
  const categoria = document.querySelector('input[name="categoria"]:checked')?.value || 'CLT';
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  const ponto = {
      nome: nome,
      categoria: categoria,
      tipo: tipo,
      data: dataAtual,
      hora: hora
  };

  try {
      const response = await fetch(`${baseURL}/pontos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ponto)
      });

      // Seleciona o ícone de validação correspondente
      const validationIcon = document.getElementById(`validation${tipo}`);
      
      if (response.ok) {
          validationIcon.textContent = "✔"; // Ícone de sucesso
          validationIcon.classList.add("success");
          validationIcon.classList.remove("error");
      } else {
          validationIcon.textContent = "✖"; // Ícone de erro
          validationIcon.classList.add("error");
          validationIcon.classList.remove("success");
      }

      validationIcon.style.display = "inline"; // Mostra o ícone
      setTimeout(() => {
          validationIcon.style.display = "none"; // Oculta após 2 segundos
          validationIcon.textContent = ""; // Limpa o ícone
      }, 2000);
  } catch (error) {
      const validationIcon = document.getElementById(`validation${tipo}`);
      validationIcon.textContent = "✖"; // Ícone de erro
      validationIcon.classList.add("error");
      validationIcon.classList.remove("success");
      validationIcon.style.display = "inline";
      
      setTimeout(() => {
          validationIcon.style.display = "none"; // Oculta após 2 segundos
          validationIcon.textContent = ""; // Limpa o ícone
      }, 2000);
  }
}
