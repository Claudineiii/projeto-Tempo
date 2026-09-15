import { carregarHistorico } from "../storage/loadhistory";

export function renderizarHistorico(aoSelecionarCidade: (cidade: string) => void): void {
  const container = document.querySelector(".tags-cidades");

  if (!container) {
    console.error("Elemento não encontrado.");
    return;
  }

  container.replaceChildren();

  const historico = carregarHistorico();

  if (historico.length === 0) {
    return;
  }

  const pesquisasRecentes = historico.slice(0, 3);

  pesquisasRecentes.forEach((item, index) => {
    const botao = document.createElement("button");

    botao.className = "tag-cidade";

    if (index === 0) {
      botao.classList.add("active");
    }

    botao.textContent = item.name.toUpperCase();

    botao.addEventListener("click", () => {
      aoSelecionarCidade(item.name);
    });

    container.appendChild(botao);
  });
}
