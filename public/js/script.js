async function main () {
    let pokemonUnorderedListElement = document.getElementById("pokemonUnorderedList");
    console.log(pokemonUnorderedListElement); 
    let data = await getPockemonList();
    //console.log(data.results);
    fillUnorderedList(pokemonUnorderedListElement, data.results);
}
main();

async function getPockemonList() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0");
    let data = await response.json();
    return data;
}

function fillUnorderedList(ul, results) {
    console.log(results);
    results.forEach((pokemonEntry, index) => {
        let li = document.createElement("li");
        let textNode = `${index + 1} ${pokemonEntry.name} >>> ${pokemonEntry.url}`;
        li.appendChild(document.createTextNode(textNode));
        ul.appendChild(li);
    });
}