const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokedex = document.getElementById('pokedex');
const pokemonDetail = document.getElementById('pokemon-detail');

const maxRecords = 151
const limit = 10
let offset = 0;


function returnPage() {
    location.reload();
    console.log('aqui');
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        
            <span class="number">#${pokemon.number}</span>
            <button onclick="loadPokemonDetails(${pokemon.number})">
            <span class="name">${pokemon.name}</span>
            </button>
            
           

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function convertPokemonToDiv(pokemon) {
    return `
        <h1>Pokemon</h1>
        
        <button onclick="returnPage()" type="button" class="back">Voltar</button>
        
        <div class="pokemon ${pokemon.type}">
        
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            
           

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
        </div>
    `
}

async function loadPokemonDetails(id) {
    const pokemon = await pokeApi.getPokemon(id);
    pokedex.classList.add('turnoff');
    pokemonDetail.classList.remove('turnoff');
    pokemonDetail.innerHTML += convertPokemonToDiv(pokemon)
    console.log(pokemon);
}


