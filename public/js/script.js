function simpleTemplating(data) {
    let html = '<ul>';
    $.each(data, function(index, item) {
        let pokemonEntry = `${item[0]}. ${item[1]}`;
        html += "<li class='pokemonEntry'>"+ "<p>" + pokemonEntry + "</p>" + "<p hidden>" + item[2] + "</p>" + "</li>"; 
    });
    html += "</ul>";
    //console.log("html = ", html);
    return html;
}

async function main () {
    let data = await getPockemonList();
    //console.log(data.results);
    let pokemonEntryList = [];
    data.results.forEach((elem, index) => {
        let pokemonName = niceName(elem.name);
        pokemonEntryList.push([index + 1, pokemonName, elem.url]);
    });

    //console.log(pokemonEntryList);

    $('#pagination-container').pagination({
        dataSource: pokemonEntryList,
        callback: function(data, pagination) {
            // template method of yourself
            let html = simpleTemplating(data);
            $('#data-container').html(html);
            addFuntionPokemonEntry();
        }
    });

}
main();

async function getPockemonList() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0");
    let data = await response.json();
    return data;
}

function niceName(name) {
    name = name.replace(/-/g, ' '); // Replace all hyphens with spaces
    name = name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()); //Capitalize all words
    return name;
}

function addFuntionPokemonEntry() {
    let pokemonEntryList = document.getElementsByClassName("pokemonEntry");
    for (let li of pokemonEntryList) {
        li.addEventListener("click", myFFunction);
    }
}

/*
function fillUnorderedList(ul, results) {
    console.log(results);
    results.forEach((pokemonEntry, index) => {
        let li = document.createElement("li");
        let pokemonName = niceName(pokemonEntry.name);

        // Pokemon Index + Name
        let p1Tag = document.createElement("p");
        p1Tag.appendChild(document.createTextNode(`${index + 1}. ${pokemonName}`));
        p1Tag.classList.add("Name");
                  
        // Pokemon URL
        let p2Tag = document.createElement("p");
        p2Tag.appendChild(document.createTextNode(pokemonEntry.url));
        p2Tag.style.display = "none";
        
        li.append(p1Tag, p2Tag);
        li.addEventListener("click", myFunction);
        ul.appendChild(li);
    });
}
*/
async function myFFunction() {
    let pokemonUrl = this.childNodes[1].innerHTML;
    
    let response = await fetch(pokemonUrl);
    let pokemonData = await response.json();
    let pokemonName = niceName(pokemonData.name);

    let pokemonOfficialArtUrl = pokemonData["sprites"]["other"]["official-artwork"]["front_default"];
    if (!pokemonOfficialArtUrl) {
        pokemonOfficialArtUrl = "public/imgs/no_found_pokemon.png";
    }
    console.log(pokemonOfficialArtUrl);
    
    document.getElementById("pokemonImage").src = pokemonOfficialArtUrl;
    document.getElementById("pokemonId").innerHTML = `Id: ${pokemonData.id}`;
    document.getElementById("pokemonName").innerHTML = `Name: ${pokemonName}`;
    document.getElementById("pokemonHeight").innerHTML = `Height: ${pokemonData.height}`;
    document.getElementById("pokemonWeight").innerHTML = `Weight: ${pokemonData.weight}`;
    document.getElementById("pokemonURL").innerHTML = `URL: ${pokemonUrl}`;
}