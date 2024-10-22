document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('productContainer');
    const productFilter = document.getElementById('productFilter');
    let products = [];

    // Función para cargar productos desde la API
    async function loadProducts() {
        const response = await fetch('https://fakestoreapi.com/products');
        const allProducts = await response.json();
        products = allProducts.slice(0, 15);  // Tomar solo los primeros 15 productos
        displayProducts(products);
        populateFilter(products);
    }

    // Función para mostrar las cards
    function displayProducts(productsToShow) {
        productContainer.innerHTML = ''; // Limpiar contenedor
        productsToShow.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card', 'p-4', 'bg-white', 'rounded', 'shadow', 'hover:shadow-lg');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
            `;
            productContainer.appendChild(card);
        });
    }

    // Función para cargar los nombres de los productos en el filtro
    function populateFilter(products) {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.title;
            productFilter.appendChild(option);
        });
    }

    // Evento para filtrar productos
    productFilter.addEventListener('change', function () {
        const selectedProductId = productFilter.value;
        if (selectedProductId === 'all') {
            displayProducts(products);
        } else {
            const filteredProduct = products.filter(product => product.id == selectedProductId);
            displayProducts(filteredProduct);
        }
    });

    // Cargar los productos cuando la página se cargue
    loadProducts();
});


