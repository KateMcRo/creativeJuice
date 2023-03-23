// Button Elements
const wordSubmitBtnEl = document.getElementById("wordSubmit");
const startOverBtnEl = document.getElementById("startOver");

// Word Elements
const wordCard1 = document.getElementById("word1");
const wordCard2 = document.getElementById("word2");
const wordCard3 = document.getElementById("word3");
const wordCard4 = document.getElementById("word4");
const synonymGenEl = document.getElementById("wordForm")
let synonymArray = [];

// API Keys (key is the same for both APIs)
const apiKey = "57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23"

const colorPickerContainerEl = document.getElementById("pickerDiv")
const colorPickerArray = [
    "#000000",
    "#A6a6a6",
    "#Ffffff",
    "#F6F1EA",
    "#C6B2A2",
    "#62351B",
    "#Ff3131",
    "#Ff5757",
    "#Ff66c4",
    "#Cb6ce6",
    "#8c52ff",
    "#5e17eb",
    "#0097b2",
    "#0cc0df",
    "#5ce1e6",
    "#38b6ff",
    "#5271ff",
    "#004aad",
    "#00bf63",
    "#7ed957",
    "#C1ff72",
    "#Ffde59",
    "#Ffbd59",
    "#Ff914d",
]

// Color Elements
const colorTilesAll = document.getElementsByClassName("colorTile")
const colorTile0 = document.getElementById("color0");
const colorTile1 = document.getElementById("color1");
const colorTile2 = document.getElementById("color2");
const colorTile3 = document.getElementById("color3");
const colorTile4 = document.getElementById("color4");

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
    
    const hex0 = colorObject.colorList[0]
    colorTile0.style.background = hex0
    colorTile0.innerText = hex0

    const hex1 = colorObject.colorList[1]
    colorTile1.style.background = hex1
    colorTile1.innerText = hex1

    const hex2 = colorObject.colorList[2]
    colorTile2.style.background = hex2
    colorTile2.innerText = hex2

    const hex3 = colorObject.colorList[3]
    colorTile3.style.background = hex3
    colorTile3.innerText = hex3

    const hex4 = colorObject.colorList[4]
    colorTile4.style.background = hex4
    colorTile4.innerText = hex4
}

// Adds event listeners to each color square
function handleColorPicker (){
    colorPickerContainerEl.style.width = "21rem"
    colorPickerContainerEl.style.height = "16rem"
    colorPickerContainerEl.style.flexDirection = "row"
    colorPickerContainerEl.style.alignContent = "space-around"
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
    pickerContainer.style.width = "2rem"
    pickerContainer.style.height = "2rem"
    pickerContainer.style.border = "solid 1px #d9d9d9"
    pickerContainer.style.margin = ".75rem" // this styling can be done in CSS
    return pickerContainer
}

// Click Functions
async function handleColorSubmit (event) {
    const hexCode = event.target.id
    await getColorData(hexCode)
    handlePopulateTiles()
}
function handleWordNotFound(){
    console.log("ERROR");

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
            handleWordNotFound();
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
	//console.log(synonymArray)
    let fourSynonyms = [];
    for (let i = 0; i < 4; i++){
        if(synonymArray[i]){
            fourSynonyms.push(synonymArray[i]);
        }
        
        //console.log(fourSynonyms);
    }
    console.log(fourSynonyms);
    
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
}

// Show/Hide Functions
function hideModule(element) {
    return element.style.display = "none"
}

function showModule(element) {
    // can be updated with if statements as needed
    return element.style.display = "block"
}

// Event Listeners
startOverBtnEl.addEventListener("click", restartTest)
wordSubmitBtnEl.addEventListener("click", renderSynonyms)

// this will need to be moved to the end of the word input
handleColorPicker()

