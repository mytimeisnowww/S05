class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.hoje = "ter";
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch("aulas.json");
      const aulas = await response.json();
      this.render(aulas);
    } catch (error) {
      console.error("Erro ao carregar os dados das aulas:", error);
    }
  }

  render(aulas) {
    const aulasDia = aulas.filter((a) => a.data === this.hoje);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "styles_componente.css";
    this.shadowRoot.appendChild(link);

    this.shadowRoot.innerHTML += `
        <div>
          ${aulasDia
            .map((a) => {
              // Variáveis para definir cor do texto e do fundo
              let notaStyle = "";
              if (a.nota) {
                const notaValue = parseFloat(a.nota);
                let textColor = "";
                let backgroundColor = "";
                if (notaValue < 6) {
                  textColor = "white";
                  backgroundColor = "red"; 
                } else if (notaValue < 8) {
                  textColor = "white";
                  backgroundColor = "orange";
                } else {
                  textColor = "white";
                  backgroundColor = "green";
                }
                notaStyle = `color: ${textColor}; background-color: ${backgroundColor};`;
              } else {
                notaStyle = "display: none;";
              }

              let provaDisplay = a.prova_alert ? "" : "display: none;";
              
              return `
              <div class="comp-aula">
                <p class="titulo_aula">${a.disciplina}</p>
                <p class="local_horario">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                <div class="lables">
                  <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                  <div class="lable-nota p_lable" style="${notaStyle}">NOTA: <b>${a.nota}</b></div>
                  <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      `;
  }
}

customElements.define("aulas-component", AulasComponent);
