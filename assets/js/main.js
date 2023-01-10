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
        <h1>${pokemon.name}</h1>
        
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
        <div>
        <div class="tab">
            <button class="tablinks" onclick="openTab(event, 'About')">About</button>
            <button class="tablinks" onclick="openTab(event, 'BaseStats')">Base Stats</button>          
            <button class="tablinks" onclick="openTab(event, 'Moves')">Moves</button>
        </div>

        <div id="About" class="tabcontent">
           
        <span class="species">Height: ${pokemon.height}</span></br>
        <span class="species">Weight: ${pokemon.weight}</span></br>
        <span class="species">Abilities: </span> ${pokemon.abilities.map((ability) => `<span class="ability ${ability}">${ability}</span>`).join(', ')}
        
        </div>

        <div id="BaseStats" class="tabcontent">
          
            <div class="stats">        
                <div class="stats-label">
                    <ol class="stats-list">
                            ${pokemon.stats.map((stat) => `<li class="stat ${stat}">${stat}</li>`).join('')}
                    </ol>
                </div>
                <div class="stats-value">
                    <ol class="stats-list">
                            ${pokemon.base_stats.map((base_stat) => `<li class="base_stat ${base_stat}">${base_stat}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>

        <div id="Moves" class="tabcontent">
       
            <ol class="moves">
                    ${pokemon.moves.map((move) => `<li class="move ${move}">${move}</li>`).join('')}
            </ol>
        </div>      

</div>
    `
}

async function loadPokemonDetails(id) {
    const pokemon = await pokeApi.getPokemon(id);
    pokedex.classList.add('turnoff');
    pokemonDetail.classList.remove('turnoff');
    console.log(pokemon);
    pokemonDetail.innerHTML += convertPokemonToDiv(pokemon)
}


function openTab(event, tabName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}
