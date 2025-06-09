// Dados mockados para demonstração
const vagasData = {
    destacadas: [
        {
            id: 1,
            titulo: "Estágio em Desenvolvimento de Software",
            empresa: "TechCorp Inovação",
            localizacao: "Santa Rita do Sapucaí, MG",
            salario: "R$ 1.800",
            descricao: "Oportunidade para estudantes de Engenharia de Software desenvolverem habilidades em React, Node.js e metodologias ágeis.",
            requisitos: ["Cursando Engenharia de Software", "Conhecimento em JavaScript", "Disponibilidade 6h/dia"],
            beneficios: ["Vale transporte", "Vale refeição", "Plano de saúde"],
            destacada: true
        },
        {
            id: 2,
            titulo: "Estágio em Telecomunicações",
            empresa: "Inatel Competence Center",
            localizacao: "Santa Rita do Sapucaí, MG",
            salario: "R$ 2.000",
            descricao: "Estágio em projetos de pesquisa e desenvolvimento em telecomunicações e IoT.",
            requisitos: ["Cursando Engenharia de Telecomunicações", "Conhecimento em redes", "Inglês intermediário"],
            beneficios: ["Vale transporte", "Vale refeição", "Certificações"],
            destacada: true
        }
    ],
    normais: [
        {
            id: 3,
            titulo: "Estágio em Análise de Dados",
            empresa: "DataTech Solutions",
            localizacao: "Pouso Alegre, MG",
            salario: "R$ 1.500",
            descricao: "Estágio focado em análise de dados e business intelligence.",
            requisitos: ["Cursando Ciência da Computação", "Conhecimento em Python", "SQL básico"],
            beneficios: ["Vale transporte", "Vale refeição"],
            destacada: false
        },
        {
            id: 4,
            titulo: "Estágio em Suporte Técnico",
            empresa: "TechSupport Ltda",
            localizacao: "Itajubá, MG",
            salario: "R$ 1.200",
            descricao: "Suporte técnico a clientes e manutenção de sistemas.",
            requisitos: ["Cursando área de TI", "Boa comunicação", "Disponibilidade integral"],
            beneficios: ["Vale transporte"],
            destacada: false
        },
        {
            id: 5,
            titulo: "Estágio em Marketing Digital",
            empresa: "Digital Marketing Pro",
            localizacao: "Varginha, MG",
            salario: "R$ 1.300",
            descricao: "Criação de conteúdo e gestão de redes sociais.",
            requisitos: ["Cursando Marketing ou Comunicação", "Conhecimento em redes sociais", "Criatividade"],
            beneficios: ["Vale transporte", "Vale refeição"],
            destacada: false
        }
    ]
};

const allVagas = [...vagasData.destacadas, ...vagasData.normais];
let favorites = new Set();

// Elementos do DOM
const DOM = {
    featuredVagasList: document.getElementById("featuredVagasList"),
    normalVagasList: document.getElementById("normalVagasList"),
    searchInput: document.getElementById("searchInput"),
    filterButton: document.getElementById("filterButton"),
    vagaDetailsModal: document.getElementById("vagaDetailsModal"),
    detailTitle: document.getElementById("detailTitle"),
    detailCompany: document.getElementById("detailCompany"),
    detailLocation: document.getElementById("detailLocation"),
    detailSalary: document.getElementById("detailSalary"),
    detailDescription: document.getElementById("detailDescription"),
    detailRequirements: document.getElementById("detailRequirements"),
    detailBenefits: document.getElementById("detailBenefits"),
    applyButton: document.getElementById("applyButton"),
    favoriteButton: document.getElementById("favoriteButton"),
    filterModal: document.getElementById("filterModal"),
    areaFilter: document.getElementById("areaFilter"),
    locationFilter: document.getElementById("locationFilter"),
    remuneradoFilter: document.getElementById("remuneradoFilter"),
    naoRemuneradoFilter: document.getElementById("naoRemuneradoFilter"),
    featuredOnlyFilter: document.getElementById("featuredOnlyFilter"),
    applyFiltersButton: document.getElementById("applyFiltersButton"),
    clearFiltersButton: document.getElementById("clearFiltersButton"),
    normalVagasSection: document.getElementById("normalVagas"),
    featuredVagasSection: document.getElementById("featuredVagas"),
};

// Funções de Renderização
const render = {
    vagaCard: (vaga) => {
        const vagaCard = document.createElement("div");
        vagaCard.classList.add("vaga-card");
        if (vaga.destacada) {
            vagaCard.classList.add("featured");
        }
        vagaCard.dataset.id = vaga.id;

        const isFavorite = favorites.has(vaga.id);
        const favoriteIconClass = isFavorite ? "favorite-icon active" : "favorite-icon";

        vagaCard.innerHTML = `
            <h3>${vaga.titulo}</h3>
            <p>${vaga.empresa}</p>
            <p>${vaga.localizacao}</p>
            <p><strong>${vaga.salario}</strong></p>
            <span class="${favoriteIconClass}" data-id="${vaga.id}">&#x2764;</span>
        `;

        vagaCard.querySelector(".favorite-icon").addEventListener("click", (e) => {
            e.stopPropagation();
            handlers.toggleFavorite(vaga.id);
        });

        vagaCard.addEventListener("click", () => {
            handlers.showVagaDetails(vaga);
        });
        return vagaCard;
    },

    vagasList: (vagas, container) => {
        container.innerHTML = "";
        vagas.forEach((vaga) => {
            container.appendChild(render.vagaCard(vaga));
        });
    },

    vagaDetails: (vaga) => {
        DOM.detailTitle.textContent = vaga.titulo;
        DOM.detailCompany.textContent = vaga.empresa;
        DOM.detailLocation.textContent = vaga.localizacao;
        DOM.detailSalary.textContent = vaga.salario;
        DOM.detailDescription.textContent = vaga.descricao;

        DOM.detailRequirements.innerHTML = "";
        vaga.requisitos.forEach((req) => {
            const li = document.createElement("li");
            li.textContent = req;
            DOM.detailRequirements.appendChild(li);
        });

        DOM.detailBenefits.innerHTML = "";
        vaga.beneficios.forEach((benefit) => {
            const span = document.createElement("span");
            span.textContent = benefit;
            DOM.detailBenefits.appendChild(span);
        });

        DOM.applyButton.onclick = () => alert(`Candidatando-se para: ${vaga.titulo}`);

        const updateFavoriteButton = () => {
            if (favorites.has(vaga.id)) {
                DOM.favoriteButton.textContent = "Remover dos Favoritos";
                DOM.favoriteButton.classList.add("active");
            } else {
                DOM.favoriteButton.textContent = "Adicionar aos Favoritos";
                DOM.favoriteButton.classList.remove("active");
            }
        };
        updateFavoriteButton();

        DOM.favoriteButton.onclick = () => {
            handlers.toggleFavorite(vaga.id);
            updateFavoriteButton();
        };

        DOM.vagaDetailsModal.style.display = "flex";
    },
};

// Funções de Manipulação de Eventos
const handlers = {
    filterAndRenderVagas: () => {
        const searchTerm = DOM.searchInput.value.toLowerCase();
        const selectedArea = DOM.areaFilter.value;
        const selectedLocation = DOM.locationFilter.value.toLowerCase();
        const isRemunerado = DOM.remuneradoFilter.checked;
        const isNaoRemunerado = DOM.naoRemuneradoFilter.checked;
        const isFeaturedOnly = DOM.featuredOnlyFilter.checked;

        const filterVagas = (vagas) => {
            return vagas.filter((vaga) => {
                const matchesSearch = vaga.titulo.toLowerCase().includes(searchTerm) || vaga.empresa.toLowerCase().includes(searchTerm);
                const matchesArea = selectedArea === "" || vaga.requisitos.some((req) => req.toLowerCase().includes(selectedArea));
                const matchesLocation = selectedLocation === "" || vaga.localizacao.toLowerCase().includes(selectedLocation);
                const matchesRemuneration = (isRemunerado && vaga.salario !== "") || (isNaoRemunerado && vaga.salario === "");

                return matchesSearch && matchesArea && matchesLocation && matchesRemuneration;
            });
        };

        let filteredFeaturedVagas = filterVagas(vagasData.destacadas);
        let filteredNormalVagas = filterVagas(vagasData.normais);

        if (isFeaturedOnly) {
            DOM.normalVagasSection.style.display = "none";
            DOM.featuredVagasSection.style.display = "block";
            render.vagasList(filteredFeaturedVagas, DOM.featuredVagasList);
        } else {
            DOM.normalVagasSection.style.display = "block";
            DOM.featuredVagasSection.style.display = "block";
            render.vagasList(filteredFeaturedVagas, DOM.featuredVagasList);
            render.vagasList(filteredNormalVagas, DOM.normalVagasList);
        }
    },

    showVagaDetails: (vaga) => {
        render.vagaDetails(vaga);
    },

    toggleFavorite: (vagaId) => {
        if (favorites.has(vagaId)) {
            favorites.delete(vagaId);
        } else {
            favorites.add(vagaId);
        }
        handlers.filterAndRenderVagas();
    },

    closeModal: (event) => {
        event.target.closest(".modal").style.display = "none";
    },

    clearFilters: () => {
        DOM.areaFilter.value = "";
        DOM.locationFilter.value = "";
        DOM.remuneradoFilter.checked = true;
        DOM.naoRemuneradoFilter.checked = true;
        DOM.featuredOnlyFilter.checked = false;
        handlers.filterAndRenderVagas();
        DOM.filterModal.style.display = "none";
    },
};

// Inicialização
const init = () => {
    // Event Listeners
    DOM.searchInput.addEventListener("keyup", handlers.filterAndRenderVagas);
    DOM.filterButton.addEventListener("click", () => {
        DOM.filterModal.style.display = "flex";
    });

    DOM.applyFiltersButton.addEventListener("click", () => {
        handlers.filterAndRenderVagas();
        DOM.filterModal.style.display = "none";
    });

    DOM.clearFiltersButton.addEventListener("click", handlers.clearFilters);

    document.querySelectorAll(".close-button").forEach((button) => {
        button.addEventListener("click", handlers.closeModal);
    });

    window.addEventListener("click", (e) => {
        if (e.target == DOM.vagaDetailsModal) {
            DOM.vagaDetailsModal.style.display = "none";
        }
        if (e.target == DOM.filterModal) {
            DOM.filterModal.style.display = "none";
        }
    });

    // Renderização inicial
    handlers.filterAndRenderVagas();
};

init();


