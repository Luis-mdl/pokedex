// Elementos del DOM
const pokemonContainer = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');

let pokemones = [];

// Obtener datos desde archivo local con fetch
async function obtenerPokemones() {
    try {
        const response = await fetch('./assest/pokemons.json');
        const data = await response.json();
        pokemones = data;
        mostrarPokemones(pokemones);
    } catch (error) {
        console.error('Error al cargar pokemons.json:', error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

// Mostrar tarjetas de pokémon
function mostrarPokemones(lista) {
    pokemonContainer.innerHTML = '';

    if (lista.length === 0) {
        noResults.style.display = 'block';
        pokemonContainer.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    pokemonContainer.style.display = 'grid';

    lista.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <div class="pokemon-id">#${pokemon.number}</div>
            <div class="pokemon-image">
                <img src="${pokemon.ThumbnailImage}" alt="${pokemon.name}" style="width: 100px; height: 100px;">
            </div>
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-types">
                ${pokemon.type.map(tipo => `<span class="type-badge type-${tipo.toLowerCase()}">${tipo}</span>`).join('')}
            </div>
        `;
        card.addEventListener('click', () => mostrarDetalle(pokemon));
        pokemonContainer.appendChild(card);
    });
}

// Mostrar detalle en modal
function mostrarDetalle(pokemon) {
    modalTitle.innerHTML = `<i class="fas fa-info-circle me-2"></i> ${pokemon.name}`;

    modalBody.innerHTML = `
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Altura:</strong> ${pokemon.height}</p>
        <div>
            <strong>Habilidades:</strong>
            <div class="moves-grid">
                ${pokemon.abilities.map(ability => `<span class="move-badge">${ability}</span>`).join('')}
            </div>
        </div>
        <div>
            <strong>Debilidades:</strong>
            <div class="moves-grid">
                ${pokemon.weakness.map(weak => `<span class="move-badge">${weak}</span>`).join('')}
            </div>
        </div>
    `;

    modal.show();
}

// Buscar Pokémon por nombre
searchInput.addEventListener('input', (e) => {
    const valor = e.target.value.toLowerCase();
    const filtrados = pokemones.filter(p => p.name.toLowerCase().includes(valor));
    mostrarPokemones(filtrados);
});

// Iniciar carga
obtenerPokemones();
