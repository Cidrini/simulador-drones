// Classe que representa um Pedido
class Pedido {
  constructor(id, x, y, peso, prioridade) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.peso = peso;
    this.prioridade = prioridade;
  }

  // Distância até o cliente (ida e volta)
  calcularDistancia(x, y) {
    return Math.sqrt(this.x ** 2 + this.y ** 2) * 2;
  }
}

function calcularDistanciaSolo(x, y) {
    return Math.sqrt(x ** 2 + y ** 2) * 2;
  }

// Classe que representa uma Viagem
class Viagem {
  constructor() {
    this.pedidos = [];
    this.pesoTotal = 0;
    this.distanciaTotal = 0;
  }

  // Verifica se o pedido pode ser adicionado respeitando peso/distância
  podeAdicionar(pedido, capacidadeMax, alcanceMax) {
    const novaDistancia = this.distanciaTotal + pedido.calcularDistancia();
    const novoPeso = this.pesoTotal + pedido.peso;
    return novoPeso <= capacidadeMax && novaDistancia <= alcanceMax;
  }

  adicionarPedido(pedido) {
    this.pedidos.push(pedido);
    this.pesoTotal += pedido.peso;
    this.distanciaTotal += pedido.calcularDistancia();
  }
}

// Classe que representa um Drone
class Drone {
  constructor(id, capacidadeMax, alcanceMax) {
    this.id = id;
    this.capacidadeMax = capacidadeMax;
    this.alcanceMax = alcanceMax;
    this.viagens = [];
  }

  // Aloca uma lista de pedidos nesse drone
  alocarPedidos(pedidos) {
    const prioridadeValor = { alta: 1, media: 2, baixa: 3 };
    pedidos.sort((a, b) => prioridadeValor[a.prioridade] - prioridadeValor[b.prioridade]);

    for (let pedido of pedidos) {
      let alocado = false;

      for (let viagem of this.viagens) {
        if (viagem.podeAdicionar(pedido, this.capacidadeMax, this.alcanceMax)) {
          viagem.adicionarPedido(pedido);
          alocado = true;
          break;
        }
      }

      if (!alocado) {
        const novaViagem = new Viagem();
        if (novaViagem.podeAdicionar(pedido, this.capacidadeMax, this.alcanceMax)) {
          novaViagem.adicionarPedido(pedido);
          this.viagens.push(novaViagem);
        } else {
          alert(`Pedido ${pedido.id} não pode ser entregue: excede os limites do drone ${this.id}.`);
        }
      }
    }
  }
}

//Variaveis 
let pedidos = [];
let contadorPedidos = 1;

// DOM Elements
const form = document.getElementById("pedidoForm");
const resultadoDiv = document.getElementById("resultado");
const resumoDiv = document.getElementById("resumo");

// Adicionar pedidos
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const x = parseFloat(document.getElementById("x").value);
  const y = parseFloat(document.getElementById("y").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const prioridade = document.getElementById("prioridade").value;

  if (isNaN(x) || isNaN(y) || isNaN(peso)) {
    return alert("Preencha todos os campos corretamente: Distância e/ou peso não é um número.");
  }

  if(peso <= 0 || peso > 10){
    return alert("Preencha todos os campos corretamente: O peso do pedido não pode ser 0 ou maior que 10.");
  }

  const distanciaKm = calcularDistanciaSolo(x, y);
  if (distanciaKm > 20){
    return alert("Distância máxima ultrapassada: Mais de 20km");
  }

  const novoPedido = new Pedido(contadorPedidos++, x, y, peso, prioridade);
  pedidos.push(novoPedido);
  alert(`Pedido ${novoPedido.id} adicionado.`);
  form.reset();
});


// Executar a simulação

document.getElementById("executarBtn").addEventListener("click", () => {
  if (pedidos.length == 0){
    return alert("Adicione pedidos antes de fazer uma simulação.");
  }
  resultadoDiv.innerHTML = "";
  resumoDiv.innerHTML = "";

  const qtdDrones = parseInt(document.getElementById("quantidadeDrones").value);
  if (isNaN(qtdDrones) || qtdDrones < 1) {
    alert("Insira uma quantidade válida de drones.");
  }

  // Criar drones
  const drones = [];
  for (let i = 0; i < qtdDrones; i++) {
    drones.push(new Drone(i + 1, 10, 20)); // capacidade 5kg, alcance 20km
  }

  // Distribuir pedidos entre drones sequencialmente
  for (let pedido of pedidos) {
  let melhorDrone = null;
  let menorCarga = Infinity;

  for (let drone of drones) {
    // Cria uma viagem temporária para testar
    const viagemTeste = new Viagem();
    if (viagemTeste.podeAdicionar(pedido, drone.capacidadeMax, drone.alcanceMax)) {
      const cargaAtual = drone.viagens.length; // ou soma das distâncias, se quiser
      if (cargaAtual < menorCarga) {
        melhorDrone = drone;
        menorCarga = cargaAtual;
      }
    }
  }

  if (melhorDrone) {
    melhorDrone.alocarPedidos([pedido]);
  } else {
    alert(`Pedido ${pedido.id} não pôde ser alocado em nenhum drone disponível.`);
  }
}

  // Gerar relatório
  let totalEntregas = 0;
  let totalDistancia = 0;
  let totalViagens = 0;

  drones.forEach(drone => {
    const container = document.createElement("div");
    container.innerHTML = `<h3>Drone ${drone.id}</h3>`;

    drone.viagens.forEach((viagem, index) => {
      const viagemDiv = document.createElement("div");
      viagemDiv.innerHTML = `
        <strong>Viagem ${index + 1}</strong>
        <ul>
          ${viagem.pedidos.map(p => `<li>Pedido ${p.id} - Distância: ${(p.calcularDistancia() / 2).toFixed(2)} km</li>`).join("")}
        </ul>
        <p>Peso Total: ${viagem.pesoTotal.toFixed(2)} kg</p>
        <p>Distância Total: ${viagem.distanciaTotal.toFixed(2)} km</p>
      `;
      container.appendChild(viagemDiv);

      totalEntregas += viagem.pedidos.length;
      totalDistancia += viagem.distanciaTotal;
      totalViagens++;
    });

    resultadoDiv.appendChild(container);
  });

  const mediaDistancia = totalViagens > 0 ? totalDistancia / totalViagens : 0;
  resumoDiv.innerHTML = `
    <p>Total de Entregas: ${totalEntregas}</p>
    <p>Total de Viagens: ${totalViagens}</p>
    <p>Distância Média por Viagem: ${mediaDistancia.toFixed(2)} km</p>
  `;
});