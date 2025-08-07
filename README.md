# 🚁 Simulador de Entregas com Drones

Simulação de um sistema logístico com drones em área urbana, desenvolvido como desafio técnico para uma vaga na DTI. O objetivo é otimizar a entrega de pacotes com múltiplos drones respeitando regras de capacidade, alcance e prioridade. 

---

## 🛠️ Tecnologias Utilizadas

- ✅ **HTML5**
- ✅ **CSS3**
- ✅ **JavaScript (ES6)**

---

## ✨ Funcionalidades Implementadas

### 📦 Pedidos
- Cadastro de pedidos com:
  - Localização (X, Y)
  - Peso do pacote
  - Prioridade: `Alta`, `Média`, `Baixa`

### 🤖 Drones
- Múltiplos drones com:
  - Capacidade máxima: `10 kg`
  - Alcance máximo: `20 km` (ida e volta)
- Alocação otimizada dos pedidos entre drones

### 📊 Simulação
- Distribuição de pedidos com base em **prioridade e capacidade**
- Múltiplos pedidos por viagem
- Relatório com:
  - Total de entregas
  - Número de viagens
  - Distância média por viagem
---

## 📈 Exemplo de Saída

Drone 1
└── Viagem 1
├── Pedido 1 - Distância: 2.83 km
└── Pedido 2 - Distância: 3.61 km


Drone 2
└── Viagem 1
└── Pedido 3 - Distância: 1.41 km

Resumo:
✔ Total de Entregas: 3
✔ Total de Viagens: 2
✔ Distância Média por Viagem: 7.42 km


---

## 🚀 Como Usar

1. Clone ou baixe os arquivos:
   - `index.html`
   - `style.css`
   - `script.js`

2. Abra o arquivo `index.html` no navegador.

3. Preencha os dados do pedido e clique em **"Adicionar Pedido"**.

4. Após inserir todos os pedidos, informe a **quantidade de drones** e clique em **"Executar Simulação"**.

5. Veja o resultado das entregas direto na tela!

---

## 📌 Regras de Negócio

- Cada drone pode carregar até **10 kg**
- Cada viagem pode cobrir até **20 km**
- A distância é calculada com base em **coordenadas cartesianas (ida e volta)**
- Pedidos fora dos limites são recusados com alerta na interface

---

## 🔮 Funcionalidades Futuras

Essas melhorias estão planejadas para versões futuras:

- 📦 Testes automatizados de alocação e carga
- ⭐ Destaque para o drone mais eficiente
- 🗺️ Visualização em mapa (ASCII ou canvas)
- 📊 Gráfico de desempenho por drone
- 🔋 **Recarga automática**: drones retornam à base quando atingem 80% do alcance
- 📍 **Status do pedido** com base na distância do cliente

---

## 👤 Desenvolvido por

[Yuri Cidrini]  
Este projeto foi desenvolvido em 3 dias como parte de um processo seletivo.

---
