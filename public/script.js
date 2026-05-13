// =========================
// BASE DE DADOS JSON
// =========================

const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 15",
            preco: 5500,
            categoria: "Celulares",
            imagem: "https://picsum.photos/300/200?1",
            descricao: "Smartphone Apple de última geração.",
            emEstoque: true
        },

        {
            id: 2,
            nome: "Galaxy S24",
            preco: 4200,
            categoria: "Celulares",
            imagem: "https://picsum.photos/300/200?2",
            descricao: "Smartphone Samsung premium.",
            emEstoque: true
        },

        {
            id: 3,
            nome: "Notebook Dell",
            preco: 3800,
            categoria: "Notebooks",
            imagem: "https://picsum.photos/300/200?3",
            descricao: "Notebook ideal para trabalho.",
            emEstoque: false
        },

        {
            id: 4,
            nome: "Mouse Gamer",
            preco: 250,
            categoria: "Acessórios",
            imagem: "https://picsum.photos/300/200?4",
            descricao: "Mouse RGB para jogos.",
            emEstoque: true
        },

        {
            id: 5,
            nome: "Teclado Mecânico",
            preco: 450,
            categoria: "Acessórios",
            imagem: "https://picsum.photos/300/200?5",
            descricao: "Teclado mecânico com switch blue.",
            emEstoque: true
        },

        {
            id: 6,
            nome: "PlayStation 5",
            preco: 3900,
            categoria: "Games",
            imagem: "https://picsum.photos/300/200?6",
            descricao: "Console da Sony.",
            emEstoque: true
        },

        {
            id: 7,
            nome: "Xbox Series X",
            preco: 3700,
            categoria: "Games",
            imagem: "https://picsum.photos/300/200?7",
            descricao: "Console da Microsoft.",
            emEstoque: false
        },

        {
            id: 8,
            nome: "MacBook Air",
            preco: 7500,
            categoria: "Notebooks",
            imagem: "https://picsum.photos/300/200?8",
            descricao: "Notebook Apple ultrafino.",
            emEstoque: true
        }
    ]
};

// =========================
// SELEÇÃO DE ELEMENTOS
// =========================

// getElementById
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

// querySelector
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// =========================
// FUNÇÕES
// =========================

function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {

    const card = document.createElement("div");

    // setAttribute
    card.setAttribute("data-id", produto.id);

    // classList.add
    card.classList.add("card");

    // style
    card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

    const title = document.createElement("h3");
    title.textContent = produto.nome;

    const image = document.createElement("img");
    image.setAttribute("src", produto.imagem);

    const price = document.createElement("p");
    price.textContent = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.textContent = produto.categoria;

    // Botão detalhes
    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "Ver detalhes";

    detailsBtn.addEventListener("click", () => {
        showProductDetails(produto);
    });

    // Botão destacar
    const highlightBtn = document.createElement("button");
    highlightBtn.textContent = "Destacar";

    highlightBtn.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    // appendChild
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(detailsBtn);
    card.appendChild(highlightBtn);

    return card;
}

function renderProducts(produtos) {

    // innerHTML
    productList.innerHTML = "";

    produtos.forEach(produto => {
        const card = createProductCard(produto);

        // appendChild
        productList.appendChild(card);
    });

    // querySelectorAll
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        console.log("Card ID:", card.dataset.id);

        card.style.transition = "0.3s";
    });
}

function renderCategories() {

    const categorias = [...new Set(data.produtos.map(produto => produto.categoria))];

    categorySelect.innerHTML = `<option value="Todas">Todas</option>`;

    categorias.forEach(categoria => {

        const option = document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {

    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>

        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>

        <p><strong>Categoria:</strong> ${produto.categoria}</p>

        <p><strong>Estoque:</strong> 
        ${produto.emEstoque ? "Disponível" : "Indisponível"}
        </p>

        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categorySelect.value;

    return data.produtos.filter(produto => {

        const matchName =
            produto.nome.toLowerCase().includes(searchText);

        const matchCategory =
            selectedCategory === "Todas" ||
            produto.categoria === selectedCategory;

        return matchName && matchCategory;
    });
}

// =========================
// EVENTOS
// =========================

searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});

// =========================
// INICIALIZAÇÃO
// =========================

renderCategories();

renderProducts(data.produtos);