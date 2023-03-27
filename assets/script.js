// Button Elements
const wordSubmitBtnEl = document.getElementById("wordSubmit");
const startOverBtnEl = document.getElementById("startOver");
const startBtnEl = document.getElementById("startBtn");

// API Keys (key is the same for both APIs)
const apiKey = "57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23"

// Container elements
const contentGrid = document.getElementById("content-grid") // targeted entire results grid & added an event listener
const savedColorsEl = document.getElementById("savedColors")
const savedWordsEl = document.getElementById("savedWords");

// Modal Elements
var modal = document.getElementById("myModal");
var btn = document.getElementById("wordSubmit");
var span = document.getElementsByClassName("close")[0];

// Color Elements
const colorTilesAll = document.querySelectorAll(".colorTile")
const colorPickerContainerEl = document.getElementById("pickerDiv")
const colorPickerArray = ["#FF3131","#FF5757","#FF66C4","#CB6CE6","#8C52FF","#5E17EB","#0097B2","#0CC0DF","#5CE1E6","#38B6FF","#5271FF","#004AAD","#00BF63","#7ED957","#C1FF72","#FFDE59","#000000","#A6A6A6","#FFFFFF","#F6F1EA","#C6B2A2","#62351B","#FF914D","#FFBD59"]
let colorObjectArray = []

// Word Elements

const synonymGenEl = document.getElementById("wordForm")
let synonymArray = [];
let synArray =[];

let favoritesArray = []

// Input Elements
let wordInputEl = document.getElementById("wordText"); 

// Color API call
async function getColorData (hexCode) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'ai-color-generator.p.rapidapi.com'
        },
        body: `{"colorList":["${hexCode}"]}`
    };
    const response = await fetch('https://ai-color-generator.p.rapidapi.com/generate-color', options)
    const data = await response.json()
    localStorage.setItem("data", JSON.stringify(data))
    handleFavoriteColorDD()
}

// API Data
function handleColorObject () {
    const localJSON = localStorage.getItem("data")
    const colorObject = JSON.parse(localJSON)
    return colorObject
}

// Displays color palette results
function handlePopulateTiles () {
    colorObject = handleColorObject()
    colorTilesAll.innerHTML = ""

    for(let i = 0; i<colorObject.colorList.length; i += 1) {
        const hex = colorObject.colorList[i]
        const currentTile = colorTilesAll[i]
        // thumbtack creation for color tiles
        currentTile.innerHTML = `<div id="parent-${hex}" style="display:flex; align-items:center;"> <i id="icon-${hex}" class="fa fa-thumbtack favorite-icon" style="color:white; margin-right: 1rem;"></i>${hex}</div>`
        currentTile.style.background = hex
        currentTile.style.color = "white"
        currentTile.style.textShadow = "#737373 2px 2px 2px"
        currentTile.setAttribute("id", hex)
    }
    handleFavoriteColorDD() 
}

// Adds event listeners to each color square
function handleColorPicker (){
    for (let i = 0; i < colorPickerArray.length; i++) {
        const hex = colorPickerArray[i]
        const pickHex = generateColorPicker(hex)
        pickHex.addEventListener("click", (e)=> handleColorSubmit(e))
        colorPickerContainerEl.appendChild(pickHex)
    }
}

// Creates Color Picker Squares in container
function generateColorPicker(hexCode) {
    const pickerContainer = document.createElement("div")
    
    pickerContainer.id = hexCode
    pickerContainer.className = "pickBox"
    pickerContainer.style.background = hexCode
    pickerContainer.style.width = "2.5rem"
    pickerContainer.style.height = "2.5rem"
    pickerContainer.style.border = "solid 1px #d9d9d9"
    return pickerContainer
}

// Click Functions
async function handleColorSubmit (event) {
    const hexCode = event.target.id
    await getColorData(hexCode)
    handlePopulateTiles()  
}

handleColorPicker();
    
// Functions to Open/Close modals
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
    
// Word API call from user input
function renderSynonyms(){
    let wordValueEl = document.querySelector('#wordText').value;
    
    const getSynonyms = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey ,
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordValueEl}/synonyms`, getSynonyms)
    .then(function(response){
        if(response.status !== 200){
            modal.style.display = "block";
        } else{
            return response.json();
        }  
    })

    .then(function(data){
        // localStorage.setItem("data", JSON.stringify(data))
        if(!data || !data.synonyms){
            return;
        }
        if (data.synonyms.length === 0 ){ 
            // display modal  
        }
        //displayWord.innerText = wordValueEl;
        let searchedWord = document.getElementById('searchedWord');
        searchedWord.innerHTML = `<i id="icon-${wordValueEl}" class="fa fa-thumbtack favorite-icon" style="color:white; margin-right: 1rem;"></i> ${wordValueEl}`;

        synonymArray = [];
        for(let i = 0; i < data.synonyms.length; i++){
            synonymArray.push(data.synonyms[i]);
        }
            let fourSynonyms = [];
            for (let i = 0; i < 4; i++){
                    var randomIndex = Math.floor(Math.random() * synonymArray.length)
                    var randomWord = synonymArray[randomIndex];
                    synonymArray.splice(randomIndex,1);
                        fourSynonyms.push(randomWord);       
            }
                // first call a for loop using math.floor(math.random () * array.length), use an if statement to check for duplicates, push elements into new array

    for(let i =1; i < 5; i++){
        let element = document.getElementById("word" + i);
        element.innerText = fourSynonyms[i-1] || "";
        let thumbEl = fourSynonyms[i-1];
        element.style.color = "white"
        
        if(thumbEl){
            element.innerHTML = `<div id="parent-${thumbEl}" style="display:flex; align-items:center;"> <i id="icon-${thumbEl}" class="fa fa-thumbtack favorite-icon" style="color:white; margin-right: 1rem;"></i>${thumbEl}</div>`

        } else {
            element.innerHTML = `<div style="display:flex; align-items:center;"> </div>`
        }  
    }
})
}

function hideResults(){
    let colorPick = document.getElementById("colorPick");
    colorPick.style.display = "none"
    let inputArea = document.getElementById("inputArea");
    inputArea.style.display = "none";
    let resultsPage  = document.querySelector(".columns");
    resultsPage.style.display = "none";
    let landingContainer = document.getElementById("landingContainer");
    landingContainer.style.display = "flex";
}

function hideLanding(){
    handleFavoriteColorDD()
    let landingContainer = document.getElementById("landingContainer");
    landingContainer.style.display = "none";
    let inputArea = document.getElementById("inputArea");
    inputArea.style.display = "flex";
    let colorPick = document.getElementById("colorPick");
    colorPick.style.display = "flex";
    let resultsPage  = document.querySelector(".columns");
    resultsPage.style.display = "flex"; 
}

function handleFavorites(e){
    // if they click on something other than the thumbtack:
    if (e.target.tagName !== "I") {
        return null
    }
    const id = e.target.id
    const clickedFavorite = document.getElementById(id)
    favoritesArray = []
    // gets any previous favorites out of local storage, loops, and pushes into favorites array
    const prevFavorites = JSON.parse(localStorage.getItem("favorites"))
    prevFavorites?.forEach((item) => {
        favoritesArray.push(item)
    })
    const favorited = prevFavorites?.find((item) => item === id)
    if (favorited) {
        clickedFavorite.setAttribute("style", "color: white; margin-right: 1rem;")
        favoritesArray = favoritesArray.filter((item) => item !== id)
        localStorage.setItem("favorites", JSON.stringify(favoritesArray))
    } else if (!favorited) {
        clickedFavorite.setAttribute("style", "color: black; margin-right: 1rem;")
        favoritesArray.push(id)
        localStorage.setItem("favorites", JSON.stringify(favoritesArray))
    }
    handleFavoriteColorDD()
}

function handleFavoriteColorDD () {
    // empties out favorites array
    favoritesArray = []
    // gets everything out of local storage & pushes back in
    const prevFavorites = JSON.parse(localStorage.getItem("favorites"))
    prevFavorites?.forEach((item) => {
        favoritesArray.push(item)
    })
    // empties out saved colors
    savedColorsEl.innerHTML = ""
    // loops over array to see if ids in array are found on the content grid & sets their styling to indicatate if they have been favorited
    favoritesArray.forEach((item) => {
        const icon = document.getElementById(`${item}`)
        if (icon) {
            icon.setAttribute("style", "color: black; margin-right: 1rem;")
        }
        // creates the color drop down cells and ads them to the saved colors dropdown div
        const cell = document.createElement("div")
        const hex = item.split("-")[1]
        cell.setAttribute("style", `background: ${hex}; color: black;`)
        cell.innerText = hex
        savedColorsEl.append(cell)
    })
}

function handleFavoriteWord(){
    // empties out favorites array
    synArray = []
    // gets everything out of local storage & pushes back in
    const prevFavorites = JSON.parse(localStorage.getItem("savedSynonyms"))
    console.log(prevFavorites)
    prevFavorites?.forEach((item) => {
        synArray.push(item)
    })
    // empties out saved words
    savedWordsEl.innerHTML = ""
    // loops over array to see if ids in array are found on the content grid & sets their styling to indicatate if they have been favorited
    synArray.forEach((item) => {
        const icon = document.getElementById(`${item}`)
        if (icon) {
            icon.setAttribute("style", "color: black; margin-right: 1rem;")
        }
        // creates the word drop down cells and ads them to the saved words dropdown div
        const cell = document.createElement("div")

        const hex = item.split("-")[1]
        cell.setAttribute("style", `background: ${hex}; color: black;`)
        cell.innerText = hex
        savedWordsEl.append(cell)
    })
}
function wordFavorite(e){
     if (e.target.tagName !== "I") {
        return null
    }
    const id = e.target.id
    const clickedFavorite = document.getElementById(id)
    synArray = [];
    const prevFavoriteSyn = JSON.parse(localStorage.getItem("savedSynonyms"))
    prevFavoriteSyn?.forEach((item) => {
        synArray.push(item)
    })
    const favorited = prevFavoriteSyn?.find((item) => item === id)
    if (favorited) {
        clickedFavorite.setAttribute("style", "color: white; margin-right: 1rem;")
        synArray = synArray.filter((item) => item !== id)
        localStorage.setItem("savedSynonyms", JSON.stringify(synArray))
    } else if (!favorited) {
        clickedFavorite.setAttribute("style", "color: black; margin-right: 1rem;")
        synArray.push(id)
        localStorage.setItem("savedSynonyms", JSON.stringify(synArray))
    }
    handleFavoriteWord()
}

function sorter(e){
    if(e.target.id.includes("#")){
        handleFavorites(e);
    } else {
        wordFavorite(e);
    }
}

hideResults();

// Event Listeners
wordSubmitBtnEl.addEventListener("click", renderSynonyms);
startBtnEl.addEventListener("click", hideLanding);
startOverBtnEl.addEventListener('click', hideResults);
contentGrid.addEventListener("click", (e) => sorter(e))
