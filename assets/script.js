// Button Elements
const wordSubmitBtnEl = document.getElementById("wordSubmit");
const startOverBtnEl = document.getElementById("startOver");
const startBtnEl = document.getElementById("startBtn");

// container elements
const contentGrid = document.getElementById("content-grid")
const savedColorsEl = document.getElementById("savedColors")


// Word Elements
const wordCard1 = document.getElementById("word1");
const wordCard2 = document.getElementById("word2");
const wordCard3 = document.getElementById("word3");
const wordCard4 = document.getElementById("word4");
const synonymGenEl = document.getElementById("wordForm")
let synonymArray = [];
let favoritesArray = []



// API Keys (key is the same for both APIs)
const apiKey = "57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23"

const colorPickerContainerEl = document.getElementById("pickerDiv")
const colorPickerArray = [
    "#000000",
    "#A6A6A6",
    "#FFFFFF",
    "#F6F1EA",
    "#C6B2A2",
    "#62351B",
    "#FF3131",
    "#FF5757",
    "#FF66C4",
    "#CB6CE6",
    "#8C52FF",
    "#5E17EB",
    "#0097B2",
    "#0CC0DF",
    "#5CE1E6",
    "#38B6FF",
    "#5271FF",
    "#004AAD",
    "#00BF63",
    "#7ED957",
    "#C1FF72",
    "#FFDE59",
    "#FFBD59",
    "#FF914D",
]

// Color Elements
const colorTilesAll = document.querySelectorAll(".colorTile")

let colorObjectArray = []

// Input Elements
let wordInputEl = document.getElementById("wordText"); 

// Color API call
async function getColorData (hexCode) {
    // Color Variable for parameter
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'ai-color-generator.p.rapidapi.com'
        },
        // colorList array takes up to 4 strings of hex codes, ex: "#1e91c1"
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
    // returns parsed version of what was in local storage
    colorObject = handleColorObject()
    colorTilesAll.innerHTML = ""

    for(let i = 0; i<colorObject.colorList.length; i += 1) {
        const hex = colorObject.colorList[i]
        const currentTile = colorTilesAll[i]
        currentTile.innerHTML = `<div id="parent-${hex}" style="display:flex; align-items:center;"> <i id="icon-${hex}" class="fa fa-thumbtack favorite-icon" style="color:white; margin-right: 1rem;"></i>${hex}</div>`
        currentTile.style.background = hex
        currentTile.setAttribute("id", hex)
    }

    handleFavoriteColorDD()
    
}

// Adds event listeners to each color square
function handleColorPicker (){
    //colorPickerContainerEl.style.width = "21rem"
    //colorPickerContainerEl.style.height = "16rem"
    //colorPickerContainerEl.style.flexDirection = "row"
    //colorPickerContainerEl.style.alignContent = "space-around"
    // Above styling can be done in CSS
    
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
    // pickerContainer.style.margin = ".75rem" 
    return pickerContainer
}

// Click Functions
async function handleColorSubmit (event) {
    const hexCode = event.target.id
    await getColorData(hexCode)
    handlePopulateTiles()
    
}
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("wordSubmit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];




// When the user clicks the button, open the modal 
// btn.onclick = function() {
    // modal.style.display = "block";
    // }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
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
            console.log(response)
            if(response.status !== 200){
                modal.style.display = "block";
            } else{
                return response.json();
            }
            
        })
        .then(function(data){
            if(!data || !data.synonyms){
                return;
            }
            if (data.synonyms.length === 0 ){
                
                // display modal
                
            }
            console.log(data);
            console.log(data.synonyms);
            
            //displayWord.innerText = wordValueEl;
            let searchedWord = document.getElementById('searchedWord');
            searchedWord.innerText = wordValueEl;
            
            synonymArray = [];
            for(let i = 0; i < data.synonyms.length; i++){
                
                //console.log(data.synonyms[i])
                synonymArray.push(data.synonyms[i]);
            }
            // if(synonymArray < 4){
                //     fourSynonyms.push(synonymArray)
                // }
                console.log(synonymArray)
                let fourSynonyms = [];
                for (let i = 0; i < 4; i++){
                    console.log(i)
                    console.log(synonymArray[i])
                    if(synonymArray[i] !== undefined){
                        
                        var randomWord = synonymArray[Math.floor(Math.random() * synonymArray.length)];
                        //  console.log(!fourSynonyms.includes(randomWord))
                        if(!fourSynonyms.includes(randomWord)){
                            // console.log(true)  
                            //  console.log(randomWord)
                            // console.log(fourSynonyms);
                            fourSynonyms.push(randomWord);
                            
                        }
                      
                    }
                    
                    // first call a for loop using math.floor(math.random () * array.length)
                    // use an if statement to check for duplicates  
        // push elements into new array

        //console.log(fourSynonyms);
    }
  //  console.log(fourSynonyms);
    
    for(let i =1; i < 5; i++){
    
        let element = document.getElementById("word" + i);
        element.innerText = fourSynonyms[i-1] || "";

    }
	
	})
}
	


function retryWord(){

	console.log("retry")

};

function restartTest () {
    console.log("Start Over")
    landingContainer.style.display = "flex"
}

// Show/Hide Functions
function hideModule(element) {

    return element.style.display = "none"
}

function showModule(element) {
    // can be updated with if statements as needed
    return element.style.display = "block"
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
    
    if (e.target.tagName !== "I") {
        return null
    }
    const id = e.target.id
    const clickedFavorite = document.getElementById(id)
    favoritesArray = []
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
    favoritesArray = []
    const prevFavorites = JSON.parse(localStorage.getItem("favorites"))
    prevFavorites?.forEach((item) => {
        favoritesArray.push(item)
    })
    savedColorsEl.innerHTML = ""
    favoritesArray.forEach((item) => {
        const icon = document.getElementById(`${item}`)
        if (icon) {
            icon.setAttribute("style", "color: black; margin-right: 1rem;")
        }
        const cell = document.createElement("div")
        const hex = item.split("-")[1]
        cell.setAttribute("style", `background: ${hex}; color: black;`)
        cell.innerText = hex
        savedColorsEl.append(cell)
    })
}

hideResults();
// Event Listeners
startOverBtnEl.addEventListener("click", restartTest);
wordSubmitBtnEl.addEventListener("click", renderSynonyms);
startBtnEl.addEventListener("click", hideLanding);
startOverBtnEl.addEventListener('click', hideResults);
contentGrid.addEventListener("click", (e) => handleFavorites(e))

// this will need to be moved to the end of the word input
handleColorPicker();
