const nameInput = document.getElementById("name")
const form = document.getElementById("form")
const cardContainer = document.getElementById("card-container")
const characterComboBox = document.getElementById("character-cbox")
const main = document.getElementById("main")
const header = document.getElementById("header")
const footer = document.getElementById("footer")

const baseUrl = "https://dragon-ball-super-api.herokuapp.com/api/characters/"

function createHtml(object){
    return `
    <div class="card">
        <div class="card-img" style="background-image: url('${object.imageUrl}');"></div>
        <h2>${object.name}</h2>
        <div class="atributes">
            <span>Especie </span><p class="card-desc">${object.specie}</p>
            <span>Rol </span><p class="card-desc">${object.role}</p>
            <span>Universo </span><p class="card-desc">${object.universe}</p>
        </div>
    </div>
    `
}

function createCharacterComboBoxOption(objCharacter){
    return `
    <option value="${objCharacter.name}">${objCharacter.name}</option>
    `
}

async function getAllCharacters(){
    try{
        const res = await fetch(baseUrl)
        const data = await res.json()
        const html = data.map(objCharacter => createCharacterComboBoxOption(objCharacter)).join();
        characterComboBox.innerHTML = html
        return data;
    }catch(error){
        console.log(error)
        return [];
    }
}

function getCharacterByName(event,characterName, arrayCharacters){
    event.preventDefault();
    console.log(arrayCharacters)
    pjElegido = arrayCharacters.filter(objCharacter => objCharacter.name == characterName)
    cardContainer.innerHTML = createHtml(pjElegido[0])
}

// function setMainHeight(){
//     const mainHeight = parseFloat(getComputedStyle(main).height);
//     const headerHeight = parseFloat(getComputedStyle(header).height);
//     const footerHeight = parseFloat(getComputedStyle(footer).height);
//     const windowHeight = parseFloat(window.innerHeight);
//     if (mainHeight < windowHeight - headerHeight - footerHeight -25 -30){   //25 margin top del header / 30 dos gaps de 15px en el body
//         main.style.height = (windowHeight - headerHeight - footerHeight -25 -30)+"px" //45px altura header y 40px altura footer
//     }else{
//         main.style.height = "auto"
//     }
// }


function init(){
    // setMainHeight()
    getAllCharacters()
    .then(arrayCharacters => {
        form.addEventListener("submit", function(){
            getCharacterByName(event,characterComboBox.value, arrayCharacters)
        })
    })
}

init()