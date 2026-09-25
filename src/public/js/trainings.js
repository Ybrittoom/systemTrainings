import {
    getTrainings,
    postTraining
} from "./training.api.js";

import formatDate from "./utils.js";

// AUTENTICAÇÃO
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login";
}


// ELEMENTOS
const elements = {

    btnAddTreino:
        document.getElementById("btnAddTreino"),

    btnAdicionarVazio:
        document.getElementById("btnAdicionarVazio"),

    btnFecharTreino:
        document.getElementById("btnFecharTreino"),

    btnCancelarTreino:
        document.getElementById("btnCancelarTreino"),

    btnFecharModalidade:
        document.getElementById("btnFecharModalidade"),

    listaTreinos:
        document.getElementById("listaTreinos"),

    msgVazia:
        document.getElementById("msgVazia"),

    modalTreino:
        document.getElementById("modalTreino"),

    modalModalidade:
        document.getElementById("modalModalidade"),

    formTreino:
        document.getElementById("formTreino"),

    errorMessage:
        document.getElementById("errorMessage"),

    distance:
        document.getElementById("distance_trainings"),

    duration:
        document.getElementById("duration_trainings"),

    pace:
        document.getElementById("pace_trainings"),

    periodo:
        document.getElementById("filtroPeriodo"),

    modalidadeSelecionada:
        document.getElementById("modalidadeSelecionada"),

    tituloModal:
        document.getElementById("modalTreinoTitulo")

};


// VARIÁVEIS
let todosTreinos = [];
let filtroEsporte = "todos";
let filtroPeriodo = "todos";
let esporteSelecionado = "corrida";


// NORMALIZAR ESPORTE
//definindo qual treino é atravez do titulo, ex: run = corrida tendeu?
function normalizarEsporte(treino) {
    const texto = String(treino.title_sport || "").toLowerCase();

    const id = Number(
        treino.id_sport
    );

    if (
        id === 1 ||
        texto.includes("corrida") ||
        texto.includes("run")
    ) {
        return "corrida";
    }


    if (
        id === 2 ||
        texto.includes("cicl") ||
        texto.includes("bike")
    ) {
        return "ciclismo";
    }


    if (
        id === 3 ||
        texto.includes("nata") ||
        texto.includes("swim")
    ) {
        return "natacao";
    }


    return "outro";
}


// ÍCONE DO ESPORTE
function obterIconeEsporte(esporte) {

    switch (esporte) {

        case "corrida":
            return "↗";

        case "ciclismo":
            return "◉";

        case "natacao":
            return "≋";

        default:
            return "•";
    }
}


// NOME DO ESPORTE

function obterNomeEsporte(esporte) {

    switch (esporte) {

        case "corrida":
            return "Corrida";

        case "ciclismo":
            return "Ciclismo";

        case "natacao":
            return "Natação";

        default:
            return "Outro";
    }
}


// FORMATAR DURAÇÃO

function formatarDuracao(valor) {

    const minutos =
        Number(valor);

    if (
        !Number.isFinite(minutos) ||
        minutos <= 0
    ) {
        return "--";
    }


    const horas =
        Math.floor(minutos / 60);

    const resto =
        Math.round(minutos % 60);


    if (horas > 0) {

        return `${horas}h ${String(resto).padStart(2, "0")}min`;

    }


    return `${resto} min`;
}


// FORMATAR NÚMERO

function formatarNumero(
    valor,
    casas = 1
) {

    const numero =
        Number(valor);

    if (!Number.isFinite(numero)) {
        return "--";
    }

    return numero.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: casas
        }
    );
}


// CARD

function criarCardTreino(treino) {

    const card = document.createElement("article");
    card.className = "treino-card";

    const esporte = normalizarEsporte(treino);
    const nomeEsporte = obterNomeEsporte(esporte);
    const icone = obterIconeEsporte(esporte);
    const titulo = treino.title_sport ||
        nomeEsporte;
    const data = formatDate(
        treino.training_date
    );
    const distancia = formatarNumero(
        treino.distance_trainings,
        2
    );
    const duracao = formatarDuracao(
        treino.duration_trainings
    );
    const pace = treino.pace_trainings
        ? `${treino.pace_trainings}`
        : "--";
    const velocidade = treino.speed_trainings
        ? `${formatarNumero(treino.speed_trainings, 1)} km/h`
        : "--";
    const calorias = treino.calories_trainings
        ? `${formatarNumero(treino.calories_trainings, 0)} kcal`
        : "--";
    const intensidade = treino.intensity_trainings ||
        "--";


    card.innerHTML = `

        <div class="treino-cabecalho">

            <div class="treino-identificacao">

                <div class="treino-esporte-icone">
                    ${icone}
                </div>

                <div>

                    <h3 class="treino-titulo">
                        ${titulo}
                    </h3>

                    <span class="treino-modalidade">
                        ${nomeEsporte}
                    </span>

                </div>

            </div>


            <span class="treino-data">
                ${data}
            </span>

        </div>


        <div class="treino-metricas">

            <div class="treino-metrica">

                <span class="treino-metrica-label">
                    Distância
                </span>

                <span class="treino-metrica-valor">
                    ${distancia} km
                </span>

            </div>


            <div class="treino-metrica">

                <span class="treino-metrica-label">
                    Duração
                </span>

                <span class="treino-metrica-valor">
                    ${duracao}
                </span>

            </div>


            <div class="treino-metrica">

                <span class="treino-metrica-label">
                    ${esporte === "corrida"
            ? "Pace"
            : "Velocidade"
        }
                </span>

                <span class="treino-metrica-valor">
                    ${esporte === "corrida"
            ? `${pace} min/km`
            : velocidade
        }
                </span>

            </div>

        </div>


        <div class="treino-extra">

            <div class="treino-extra-info">

                🔥

                <span>
                    ${calorias}
                </span>

            </div>


            <span class="treino-intensidade">
                ${intensidade}
            </span>

        </div>


        ${treino.notes_trainings
            ? `
                    <div class="treino-notas">
                        ${treino.notes_trainings}
                    </div>
                  `
            : ""
        }

    `;


    return card;
}


// MOSTRAR TREINOS

function listarTreinos(treinos) {

    elements.listaTreinos.innerHTML = "";


    if (!treinos.length) {

        elements.msgVazia.hidden = false;

        return;
    }


    elements.msgVazia.hidden = true;


    treinos.forEach(
        (treino) => {

            const card =
                criarCardTreino(
                    treino
                );

            elements.listaTreinos.appendChild(
                card
            );

        }
    );
}


// FILTRO DE PERÍODO

function passaFiltroPeriodo(treino) {

    if (
        filtroPeriodo === "todos"
    ) {
        return true;
    }


    if (!treino.training_date) {
        return false;
    }


    const data =
        new Date(
            `${treino.training_date}T00:00:00`
        );


    const agora =
        new Date();


    if (
        filtroPeriodo === "mes"
    ) {

        return (
            data.getMonth() === agora.getMonth() &&
            data.getFullYear() === agora.getFullYear()
        );

    }


    if (
        filtroPeriodo === "ultimos3"
    ) {

        const limite =
            new Date();

        limite.setMonth(
            limite.getMonth() - 3
        );

        return data >= limite;
    }


    if (
        filtroPeriodo === "ano"
    ) {

        return (
            data.getFullYear() ===
            agora.getFullYear()
        );

    }


    return true;
}


// APLICAR FILTROS

function aplicarFiltros() {

    const filtrados =
        todosTreinos.filter(
            (treino) => {

                const esporte =
                    normalizarEsporte(
                        treino
                    );


                const passouEsporte =
                    filtroEsporte === "todos" ||
                    esporte === filtroEsporte;


                const passouPeriodo =
                    passaFiltroPeriodo(
                        treino
                    );


                return (
                    passouEsporte &&
                    passouPeriodo
                );

            }
        );


    listarTreinos(
        filtrados
    );
}


// CARREGAR TREINOS

async function carregarTreinos() {

    try {

        const treinos =
            await getTrainings();


        todosTreinos =
            Array.isArray(treinos)
                ? treinos
                : [];


        aplicarFiltros();

    } catch (error) {

        console.error(
            "Erro ao carregar treinos:",
            error
        );


        localStorage.removeItem(
            "token"
        );


        window.location.href =
            "/login";
    }
}


// MODAL DE MODALIDADE

function abrirModalModalidade() {

    elements.modalModalidade.style.display =
        "flex";
}


function fecharModalModalidade() {

    elements.modalModalidade.style.display =
        "none";
}


// ABRIR MODAL DE CADASTRO

function abrirModalTreino(
    esporte
) {

    esporteSelecionado =
        esporte;


    elements.formTreino.reset();


    elements.errorMessage.textContent =
        "";


    // Corrida neste momento
    if (esporte === "corrida") {

        document.getElementById(
            "id_sport"
        ).value = "1";


        elements.modalidadeSelecionada.textContent =
            "CORRIDA";


        elements.tituloModal.textContent =
            "Registrar corrida";

    }


    /*
     * Ciclismo e natação ficam preparados
     * para a próxima implementação.
     */

    if (esporte === "ciclismo") {

        document.getElementById(
            "id_sport"
        ).value = "2";


        elements.modalidadeSelecionada.textContent =
            "CICLISMO";


        elements.tituloModal.textContent =
            "Registrar ciclismo";
    }


    if (esporte === "natacao") {

        document.getElementById(
            "id_sport"
        ).value = "3";


        elements.modalidadeSelecionada.textContent =
            "NATAÇÃO";


        elements.tituloModal.textContent =
            "Registrar natação";
    }


    fecharModalModalidade();


    elements.modalTreino.style.display =
        "flex";
}


// BOTÃO ADICIONAR

elements.btnAddTreino.addEventListener(
    "click",
    abrirModalModalidade
);


if (elements.btnAdicionarVazio) {

    elements.btnAdicionarVazio.addEventListener(
        "click",
        abrirModalModalidade
    );

}


// SELEÇÃO DE MODALIDADE

document
    .querySelectorAll(
        ".modalidade-card"
    )
    .forEach(
        (botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const esporte =
                        botao.dataset.esporte;


                    /*
                     * Por enquanto o cadastro
                     * completo está sendo feito
                     * para corrida.
                     *
                     * Ciclismo e natação serão
                     * implementados depois.
                     */

                    if (
                        esporte === "ciclismo" ||
                        esporte === "natacao"
                    ) {

                        alert(
                            "O cadastro desta modalidade será disponibilizado em breve."
                        );

                        return;
                    }


                    abrirModalTreino(
                        esporte
                    );

                }
            );

        }
    );


// FECHAR MODAIS

function fecharModalTreino() {

    elements.modalTreino.style.display =
        "none";
}


elements.btnFecharTreino.addEventListener(
    "click",
    fecharModalTreino
);


elements.btnCancelarTreino.addEventListener(
    "click",
    fecharModalTreino
);


elements.btnFecharModalidade.addEventListener(
    "click",
    fecharModalModalidade
);


// CLICAR FORA DO MODAL

window.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            elements.modalTreino
        ) {

            fecharModalTreino();
        }


        if (
            event.target ===
            elements.modalModalidade
        ) {

            fecharModalModalidade();
        }

    }
);


// FILTROS DE MODALIDADE

document
    .querySelectorAll(
        ".filtro-btn"
    )
    .forEach(
        (botao) => {

            botao.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filtro-btn"
                        )
                        .forEach(
                            (item) => {
                                item.classList.remove(
                                    "ativo"
                                );
                            }
                        );


                    botao.classList.add(
                        "ativo"
                    );


                    filtroEsporte =
                        botao.dataset.filter;


                    aplicarFiltros();

                }
            );

        }
    );


// FILTRO DE PERÍODO

elements.periodo.addEventListener(
    "change",
    () => {

        filtroPeriodo =
            elements.periodo.value;


        aplicarFiltros();

    }
);


// CONVERTER PACE PARA DECIMAL

function converterPaceParaDecimal(paceTexto) {

    if (!paceTexto) {
        return 0;
    }

    const texto = String(paceTexto).trim();

    if (!texto.includes(":")) {
        const valor = Number(texto);
        return Number.isFinite(valor) ? valor : 0;
    }

    const [minutos, segundos] = texto
        .split(":")
        .map(Number);

    if (!Number.isFinite(minutos) || !Number.isFinite(segundos)) {
        return 0;
    }

    return Number(
        (minutos + (segundos / 60)).toFixed(2)
    );
}


// CALCULAR PACE

function calcularPace() {

    const distancia =
        Number(
            elements.distance.value
        );


    const duracao =
        Number(
            elements.duration.value
        );


    if (
        !distancia ||
        !duracao ||
        distancia <= 0 ||
        duracao <= 0
    ) {

        elements.pace.value = "";

        return;
    }


    /*
     * Pace =
     *
     * minutos / quilômetros
     */


    const paceDecimal =
        duracao / distancia;


    const minutos =
        Math.floor(
            paceDecimal
        );


    const segundos =
        Math.round(
            (paceDecimal - minutos) * 60
        );


    let minutosFinais =
        minutos;


    let segundosFinais =
        segundos;


    /*
     * Exemplo:
     *
     * 45 min / 8 km
     *
     * = 5.625 min/km
     *
     * = 5:38 min/km
     */


    if (
        segundosFinais >= 60
    ) {

        minutosFinais += 1;

        segundosFinais = 0;

    }


    elements.pace.value =
        `${minutosFinais}.${String(
            segundosFinais
        ).padStart(2, "0")}`;

}


// ATUALIZAR PACE AUTOMATICAMENTE

elements.distance.addEventListener(
    "input",
    calcularPace
);


elements.duration.addEventListener(
    "input",
    calcularPace
);


// ENVIAR TREINO

elements.formTreino.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        elements.errorMessage.textContent =
            "";


        /*
         * Garante que o pace esteja
         * atualizado antes de enviar.
         */

        calcularPace();


        const formData =
            new FormData(
                elements.formTreino
            );


        const novoTreino = {

            id_sport:
                Number(
                    formData.get(
                        "id_sport"
                    )
                ),


            title_sport:
                formData.get(
                    "title_sport"
                ),


            distance_trainings:
                Number(
                    formData.get(
                        "distance_trainings"
                    )
                ),


            duration_trainings:
                Number(
                    formData.get(
                        "duration_trainings"
                    )
                ),


            /*
             * Agora o pace NÃO vem
             * digitado pelo usuário.
             *
             * Ele foi calculado acima,
             * mas precisamos salvar em decimal
             * para o banco aceitar.
             */

            pace_trainings:
                converterPaceParaDecimal(
                    elements.pace.value
                ),


            calories_trainings:
                Number(
                    formData.get(
                        "calories_trainings"
                    )
                ),


            intensity_trainings:
                formData.get(
                    "intensity_trainings"
                ),


            training_date:
                formData.get(
                    "training_date"
                ),


            notes_trainings:
                formData.get(
                    "notes_trainings"
                ) || null

        };


        try {

            await postTraining(
                novoTreino
            );


            fecharModalTreino();


            await carregarTreinos();


        } catch (error) {

            console.error(
                error
            );


            elements.errorMessage.textContent =
                error.message ||
                "Erro ao salvar o treino. Tente novamente.";

        }

    }
);


// INICIALIZAÇÃO

carregarTreinos();