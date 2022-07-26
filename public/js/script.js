function simpleTemplating(data) {
    var html = '<ul>';
    $.each(data, function(index, item){
        html += '<li>'+ item +'</li>';
    });
    html += '</ul>';
    return html;
}

$('#pagination-container').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ,14, 15, 16, 17, 18, 19 ,20, 195],
    callback: function(data, pagination) {
        // template method of yourself
        var html = simpleTemplating(data);
        $('#data-container').html(html);
    }
})

/*async function main () {

    let pokemonUnorderedListElement = document.getElementById("pokemonUL");
    //console.log(pokemonUnorderedListElement); 
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

function niceName(name) {
    name = name.replace(/-/g, ' '); // Replace all hyphens with spaces
    name = name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()); //Capitalize all words
    return name;
}

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

async function myFunction() {
    //console.log(this);
    let pokemonUrl = this.childNodes[1].innerHTML;

    let response = await fetch(pokemonUrl);
    let pokemonData = await response.json();
    let pokemonName = niceName(pokemonData.name);
    
    document.getElementById("pokemonId").innerHTML = `Id: ${pokemonData.id}`;
    document.getElementById("pokemonName").innerHTML = `Name: ${pokemonName}`;
    document.getElementById("pokemonHeight").innerHTML = `Height: ${pokemonData.height}`;
    document.getElementById("pokemonWeight").innerHTML = `Weight: ${pokemonData.weight}`;
}*/