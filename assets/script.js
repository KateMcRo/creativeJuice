// Button Elements
const wordSubmitBtnEl = document.getElementById("wordSubmit");
const startOverBtnEl = document.getElementById("startOver");
const startBtnEl = document.getElementById("startBtn");

// container elements
const contentGrid = document.getElementById("content-grid") // targeted entire results grid & added an event listener
const savedColorsEl = document.getElementById("savedColors")
const savedWordsEl = document.getElementById("savedWords");

// Word Elements
const wordCard1 = document.getElementById("word1");
const wordCard2 = document.getElementById("word2");
const wordCard3 = document.getElementById("word3");
const wordCard4 = document.getElementById("word4");
const synonymGenEl = document.getElementById("wordForm")
let synonymArray = [];
let favoritesArray = []
let synArray =[];

function handleFavoriteWord(){
    // empties out favorites array
    synArray = []
    // gets everything out of local storage & pushes back in
    const prevFavorites = JSON.parse(localStorage.getItem("savedSynonyms"))
    console.log(prevFavorites)
    prevFavorites?.forEach((item) => {
        synArray.push(item)
        console.log(synArray)
    })
    // empties out saved colors
    savedWordsEl.innerHTML = ""
    // loops over array to see if ids in array are found on the content grid & sets their styling to indicatate if they have been favorited
    console.log(synArray)
    synArray.forEach((item) => {
        const icon = document.getElementById(`${item}`)
        if (icon) {
            icon.setAttribute("style", "color: black; margin-right: 1rem;")
        }
        // creates the color drop down cells and ads them to the saved colors dropdown div
        const cell = document.createElement("div")

        const hex = item.split("-")[1]
        cell.setAttribute("style", `background: ${hex}; color: black;`)
        cell.innerText = hex
        savedWordsEl.append(cell)
    })
}
function wordFavorite(e){
     // if they click on something other than the thumbtack:
     if (e.target.tagName !== "I") {
        return null
    }
    // pulls ID off of thumbtack that is created on line 97
    const id = e.target.id
    const clickedFavorite = document.getElementById(id)
    synArray = [];
    // gets any previous favorites out of local storage
    const prevFavoriteSyn = JSON.parse(localStorage.getItem("savedSynonyms"))
    console.log(prevFavoriteSyn)
    // loops over previous favorites and pushes them into favorites array
    prevFavoriteSyn?.forEach((item) => {
        synArray.push(item)
    })
    // checks to see if the favorite is already in local storage (? is a null check operator in case previous favorites is null or undefined)
    const favorited = prevFavoriteSyn?.find((item) => item === id)
    // if it has been favorited, this applies styling to indicate its no longer favorited/removes from array/stores new array in local storage
    if (favorited) {
        clickedFavorite.setAttribute("style", "color: white; margin-right: 1rem;")
        synArray = synArray.filter((item) => item !== id)
        localStorage.setItem("savedSynonyms", JSON.stringify(synArray))
    // if not favorited does the oposite of previous if statement
    } else if (!favorited) {
        clickedFavorite.setAttribute("style", "color: black; margin-right: 1rem;")
        synArray.push(id)
        localStorage.setItem("savedSynonyms", JSON.stringify(synArray))
    }
    // calls function to add any favorites to the color dropdown
    handleFavoriteWord()
}



// API Keys (key is the same for both APIs)
const apiKey = "57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23"

const colorPickerContainerEl = document.getElementById("pickerDiv")
const colorPickerArray = [
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
    "#000000",
    "#A6A6A6",
    "#FFFFFF",
    "#F6F1EA",
    "#C6B2A2",
    "#62351B",
    "#FF914D",
    "#FFBD59",
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
        // thumbtack creation for color tiles
        currentTile.innerHTML = `<div id="parent-${hex}" style="display:flex; align-items:center;"> <i id="icon-${hex}" class="fa fa-thumbtack favorite-icon" style="color:white; margin-right: 1rem;"></i>${hex}</div>`
        currentTile.style.background = hex
        currentTile.style.color = "white"
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
           // localStorage.setItem("data", JSON.stringify(data))
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
                
              
                synonymArray.push(data.synonyms[i]);
            }
            // if(synonymArray < 4){
                //     fourSynonyms.push(synonymArray)
                // }
                console.log(synonymArray)
                let fourSynonyms = [];
                for (let i = 0; i < 4; i++){
                  
                    if(synonymArray[i] !== undefined){
                        
                        var randomWord = synonymArray[Math.floor(Math.random() * synonymArray.length)];
                        
                        if(!fourSynonyms.includes(randomWord)){
                            
                            fourSynonyms.push(randomWord);
                            
                        }
                      
                    }}
                    
                    // first call a for loop using math.floor(math.random () * array.length)
                    // use an if statement to check for duplicates  
        // push elements into new array

        //console.log(fourSynonyms);
    
  //  console.log(fourSynonyms);
    

    
        // searchedWord.innerHTML=""
        
        // searchedWord.innerText = wordValueEl;
        // searchedWord.innerHTML = `<div id="parent-${searchedWord}" style="display:flex; align-items:center;"> <i id="icon-${searchedWord}" class="fa fa-thumbtack favorite-icon" style="color:white; margin-right: 1rem;"></i>${searchedWord}</div>`
        for(let i =1; i < 5; i++){
        
            let element = document.getElementById("word" + i);
            element.innerText = fourSynonyms[i-1] || "";
            let thumbEl = fourSynonyms[i-1];
            element.innerHTML = `<div id="parent-${thumbEl}" style="display:flex; align-items:center;"> <i id="icon-${thumbEl}" class="fa fa-thumbtack favorite-icon" style="color:white; margin-right: 1rem;"></i>${thumbEl}</div>`
            element.style.color = "white"
            element.style.backgroundColor = "#d9d9d9"
            element.style.textShadow = "#ABABAB 2px 2px 2px;"
            // currentTile.style.background = thumbEl
            // currentTile.style.color = "white"
            // currentTile.setAttribute("id", thumbEl)
        }
    })
        

    
    // for(let i =1; i < 5; i++){
        
    //     let element = document.getElementById("word" + i);
    //     element.innerText = fourSynonyms[i-1] || "";
    //     let thumbEl = fourSynonyms[i-1];
    //     element.innerHTML = `<div id="parent-${thumbEl}" style="display:flex; align-items:center;"> <i id="icon-${thumbEl}" class="fa fa-thumbtack favorite-icon" style="color:white; margin-right: 1rem;"></i>${thumbEl}</div>`
        
    //     currentTile.style.background = thumbEl
    //     currentTile.style.color = "white"
    //     currentTile.setAttribute("id", thumbEl)
    // }

    

//    let savedSearches = localStorage.getItem("savedSynonyms");
// 	if (!savedSearches){
//         savedSearches = [];
// }   else{
//     // console.log(savedSearches);
//     // console.log(typeof savedSearches);
//     savedSearches = JSON.parse(savedSearches)





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
    // if they click on something other than the thumbtack:
    if (e.target.tagName !== "I") {
        return null
    }
    // pulls ID off of thumbtack that is created on line 97
    const id = e.target.id
    const clickedFavorite = document.getElementById(id)
    favoritesArray = []
    // gets any previous favorites out of local storage
    const prevFavorites = JSON.parse(localStorage.getItem("favorites"))
    // loops over previous favorites and pushes them into favorites array
    prevFavorites?.forEach((item) => {
        favoritesArray.push(item)
    })
    // checks to see if the favorite is already in local storage (? is a null check operator in case previous favorites is null or undefined)
    const favorited = prevFavorites?.find((item) => item === id)
    // if it has been favorited, this applies styling to indicate its no longer favorited/removes from array/stores new array in local storage
    if (favorited) {
        clickedFavorite.setAttribute("style", "color: white; margin-right: 1rem;")
        favoritesArray = favoritesArray.filter((item) => item !== id)
        localStorage.setItem("favorites", JSON.stringify(favoritesArray))
    // if not favorited does the oposite of previous if statement
    } else if (!favorited) {
        clickedFavorite.setAttribute("style", "color: black; margin-right: 1rem;")
        favoritesArray.push(id)
        localStorage.setItem("favorites", JSON.stringify(favoritesArray))
    }
    // calls function to add any favorites to the color dropdown
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
function sorter(e){
    console.log(e.target)
    if(e.target.id.includes("#")){
        handleFavorites(e);
    } else {
        wordFavorite(e);
    }
}
hideResults();
// Event Listeners
startOverBtnEl.addEventListener("click", restartTest);
wordSubmitBtnEl.addEventListener("click", renderSynonyms);
startBtnEl.addEventListener("click", hideLanding);
startOverBtnEl.addEventListener('click', hideResults);
contentGrid.addEventListener("click", (e) => sorter(e))



// this will need to be moved to the end of the word input
handleColorPicker();
