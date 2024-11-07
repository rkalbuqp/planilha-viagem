// Lista de despesas com valores iniciais
let despesas = [
  { descricao: "Carol", valor: 100 },
  { descricao: "Almoço", valor: 100 },
  { descricao: "Flat", valor: 194 * 2 },
  { descricao: "Feira + vinho", valor: 300 },
  { descricao: "Ifood", valor: 80 },
  { descricao: "Cinema", valor: 160 },
  { descricao: "Uber e carro pra campina", valor: 110 },
  { descricao: "Transporte", valor: 100 },
];

// Função para calcular o total das despesas (multiplicado por 2)
function calcularTotalDespesas() {
  return despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
}

// Função para calcular os totais individuais para Kassia e Micaela
function calcularTotaisIndividuais() {
  const totalKassia = despesas.reduce(
    (acc, despesa) => acc + despesa.valor / 2,
    0
  );
  const totalMicaela = despesas.reduce(
    (acc, despesa) => acc + despesa.valor / 2,
    0
  );
  return { totalKassia, totalMicaela };
}

function atualizarValores() {
  const valorTotalDisponivel = 1400;
  const totalDespesasMultiplicado = calcularTotalDespesas();
  const saldoFinal = (valorTotalDisponivel - totalDespesasMultiplicado) / 2;

  // Atualizar valor total disponível
  document.getElementById(
    "valor_total_disponivel"
  ).innerText = `R$ ${valorTotalDisponivel.toFixed(2)}`;

  // Atualizar tabela de despesas
  const tabelaDespesas = document.getElementById("tabela_despesas");
  tabelaDespesas.innerHTML = ""; // Limpa a tabela antes de adicionar novas linhas
  despesas.forEach((despesa, index) => {
    const valorKassia = despesa.valor / 2; // Metade do valor total para Kassia
    const valorMicaela = despesa.valor / 2; // Metade do valor total para Micaela

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${despesa.descricao}</td>
            <td>R$ <input type="number" value="${
              despesa.valor
            }" onchange="editarValor(${index}, this.value)"></td>
            <td>R$ ${valorKassia.toFixed(2)}</td>
            <td>R$ ${valorMicaela.toFixed(2)}</td>
            <td><button onclick="removerDespesa(${index})">Remover</button></td>
          `;
    tabelaDespesas.appendChild(row);
  });

  // Atualizar total de despesas e saldo final
  document.getElementById(
    "total_despesas"
  ).innerText = `Total Despesas (Multiplicado por 2): R$ ${totalDespesasMultiplicado.toFixed(
    2
  )}`;
  document.getElementById(
    "saldo_final"
  ).innerText = `Saldo Disponível após Despesas: R$ ${saldoFinal.toFixed(2)}`;

  // Atualizar a tabela de totais individuais
  atualizarTabelaTotaisIndividuais();
}

function atualizarTabelaTotaisIndividuais() {
  const { totalKassia, totalMicaela } = calcularTotaisIndividuais();
  const totalGeral = totalKassia + totalMicaela;

  const tabelaTotais = document.getElementById("tabela_totais");
  tabelaTotais.innerHTML = `
      <tr>
        <td>Total Geral</td>
        <td>R$ ${totalGeral.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Total Gasto por Kassia</td>
        <td>R$ ${totalKassia.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Total Gasto por Micaela</td>
        <td>R$ ${totalMicaela.toFixed(2)}</td>
      </tr>
    `;
}

function adicionarDespesa() {
  // Adiciona uma nova despesa com valor inicial 0 e descrição vazia
  despesas.push({ descricao: "Nova Despesa", valor: 0 });
  atualizarValores();
}

function editarValor(index, novoValor) {
  despesas[index].valor = parseFloat(novoValor) || 0; // Garante que seja um número
  atualizarValores();
}

function removerDespesa(index) {
  despesas.splice(index, 1); // Remove a despesa pelo índice
  atualizarValores();
}

// Chamar a função para inicializar valores
atualizarValores();
