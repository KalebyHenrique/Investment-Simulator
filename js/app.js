const submit = document.querySelector("#formulario");
const card = document.querySelector(".card");
const resultado = document.querySelector("#resultado");
const loading = document.querySelector("#loading");
const totalInvestido = document.querySelector("#total-investido");
const rendimentoPage = document.querySelector("#rendimento");
const rendimentoTotal = document.querySelector("#rendimento-total");
document.querySelector("#reset").addEventListener("click", reset);

submit.addEventListener("submit", function (e) {
  resultado.style.display = "none";
  loading.style.display = "block";
  setTimeout(() => calculateResults(e), 5000);
  e.preventDefault();
});

function calculateResults(e) {
  const inicial = Number(submit.inicial.value);
  const mensal = Number(submit.mensal.value);
  const tempo = Number(submit.meses.value);
  const tipo = submit.tipo.value;
  const taxaMensal = 0.000894;
  const taxaInicial = 0.001166666;
  const ipca = 2.548;
  if (inicial && mensal && tempo && tipo) {
    const taxaMensalTotal = taxaMensal * tempo;
    const mensalTotal = mensal * tempo;
    const taxaInicialTotal = taxaInicial * tempo;
    const valorInvestido = inicial + mensal * tempo;
    const mensalValor = taxaMensalTotal * mensalTotal;
    const inicialValor = inicial * taxaInicialTotal;
    let rendimento = 0;
    const total = 0;
    totalInvestido.value = valorInvestido.toFixed(2);
    if (tipo === "selic") {
      rendimento = (mensalValor + inicialValor).toFixed(2);
      rendimentoPage.value = rendimento;
    } else if (tipo === "ipca") {
      rendimento = ((mensalValor + inicialValor) * ipca).toFixed(2);
      rendimentoPage.value = rendimento;
    }
    rendimentoTotal.value = (
      Number(rendimento) + Number(valorInvestido)
    ).toFixed(2);
    resultado.style.display = "block";
    loading.style.display = "none";
  } else {
    resultado.style.display = "none";
    loading.style.display = "none";
    showError("Por favor preencha todos os campos corretamente");
  }
}

function showError(erro) {
  let erroDiv = document.createElement("div");
  erroDiv.className = "alert alert-danger";
  erroDiv.appendChild(document.createTextNode(erro));
  card.prepend(erroDiv);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
function reset() {
  window.location.reload();
}
