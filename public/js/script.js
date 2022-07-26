async function main () {
    let pokemonUnorderedListElement = document.getElementById("pokemonUnorderedList");
    //console.log(pokemonUnorderedListElement); 
    let data = await getPockemonList();
    //console.log(data.results);
    fillUnorderedList(pokemonUnorderedListElement, data.results);

    let a = document.createElement('a');
    let linkText = document.createTextNode("my title text");
    a.appendChild(linkText);
    a.title = "my title text";
    a.href = "http://example.com";
    document.body.appendChild(a);

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
        let pokemonName = pokemonEntry.name.replace(/-/g, ' '); // Replace all hyphens with spaces
        let capitalizedPokemonName = pokemonName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()); //Capitalize all words
        //let txtNode = document.createTextNode(`${index + 1}. ${capitalizedPokemonName}, ${pokemonEntry.url}`); 
        /*let link = `${index + 1}. ${capitalizedPokemonName}, ${pokemonEntry.url}`;
        a.appendChild(link); 
        a.title = `${index + 1}. ${capitalizedPokemonName}, ${pokemonEntry.url}`;
        a.href = `${pokemonEntry.url}`;
        li.appendChild(a);*/

        // Create anchor element.
        let a = document.createElement('a'); 
                  
        // Create the text node for anchor element.
        let entryText = `${index + 1}. ${capitalizedPokemonName}`;
        let link = document.createTextNode(entryText);
            
        // Append the text node to anchor element.
        a.appendChild(link); 
            
        // Set the title.
        a.title = entryText; 
            
        // Set the href property.
        //a.href = pokemonEntry.url;
        
        li.append(a);
        li.addEventListener("click", myFunction);
        ul.appendChild(li);
    });
}

async function myFunction() {
    //console.log(this);
    let child = this.childNodes[0];
    console.log(child.innerHTML);

    let pokemonNameElem = document.getElementById("pokemonName");
    let pokemonId = child.innerHTML.split(" ")[0].replace(".", "");
    let pokemonName = child.innerHTML.split(" ")[1];

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
    let pokemonData = await response.json();
    
    document.getElementById("pokemonId").innerHTML = `id: ${pokemonData.id}`;
    document.getElementById("pokemonName").innerHTML = `name: ${pokemonData.name}`;
    document.getElementById("pokemonHeight").innerHTML = `height: ${pokemonData.height}`;
    document.getElementById("pokemonWeight").innerHTML = `weight: ${pokemonData.height}`;
}