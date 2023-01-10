
const pokeApi = {}
const url = 'https://pokeapi.co/api/v2/pokemon'

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    const [stat] = stats

    const base_stats = pokeDetail.stats.map((base_statSlot) => base_statSlot.base_stat)
    const [base_stat] = base_stats

    pokemon.stats = stats
    pokemon.stat = stat
    pokemon.base_stats = base_stats
    pokemon.base_stat = base_stat

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const urlList = `${url}?offset=${offset}&limit=${limit}`

    return fetch(urlList)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (id) => {
    const urlIten = `${url}/${id}`

    return fetch(urlIten)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody)
        .then(convertPokeApiDetailToPokemon);

}



