function updateTime(idTextoParaCopiar, idResultado) {
  const timeElement = document.getElementById(idTextoParaCopiar);
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}h${minutes}`;
  timeElement.textContent = timeString;
  document.getElementById(idResultado).textContent = timeString;
}


setInterval(function () {
  updateTime('textoParaCopiarEntrada', 'resultadoEntrada');
  updateTime('textoParaCopiarAlmoco', 'resultadoAlmoco');
  updateTime('textoParaCopiarCafe', 'resultadoCafe');
  updateTime('textoParaCopiarRetorno', 'resultadoRetorno');
  updateTime('textoParaCopiarSaida', 'resultadoSaida');
}, 1000);


updateTime('textoParaCopiarEntrada', 'resultadoEntrada');
updateTime('textoParaCopiarAlmoco', 'resultadoAlmoco');
updateTime('textoParaCopiarCafe', 'resultadoCafe');
updateTime('textoParaCopiarRetorno', 'resultadoRetorno');
updateTime('textoParaCopiarSaida', 'resultadoSaida');


function copiarTexto(idResultado) {

  let textoCopiado = document.getElementById(idResultado).innerText;
  const tempInput = document.createElement('textarea');
  tempInput.value = textoCopiado;
  tempInput.style.fontFamily = 'monospace';
  tempInput.style.fontSize = '12px'; 
  tempInput.style.whiteSpace = 'pre'; 
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); 
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}



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

console.clear();

const TAIL_LENGTH = 20;

const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let cursorCircles;
let cursorHistory = Array(TAIL_LENGTH).fill({x: 0, y: 0});

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let div = document.createElement('div');
    div.classList.add('cursor-circle') ;
    cursor.append(div);
  }
  cursorCircles = Array.from(document.querySelectorAll('.cursor-circle'));
}

function updateCursor() {  
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });
    
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];
    
    let xDiff = next.x - current.x;
    let yDiff = next.y - current.y;
    
    current.x += xDiff * 0.25;
    current.y += yDiff * 0.25;
    cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i/TAIL_LENGTH})`;  
  }
  requestAnimationFrame(updateCursor)
}

document.addEventListener('mousemove', onMouseMove, false);

initCursor();
updateCursor();

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
