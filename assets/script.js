// Button Elements
const wordSubmitBtnEl = document.getElementById("wordSubmit");
const colorSubmitBtnEl = document.getElementById("colorSubmit");
const startOverBtnEl = document.getElementById("startOver");

// API Keys (key is the same for both APIs)
const apiKey = "57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23"

const colorPickerContainerEl = document.getElementById("pickerTest")
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

console.log(colorPickerArray)

// Input Elements
let wordInputEl = document.getElementById("wordText"); 
let colorInputEl = document.getElementById("colorInput");

const hexContainerEl = document.getElementById("hexTest");
let colorObjectArray = []



// Color Variable for parameter
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'ai-color-generator.p.rapidapi.com'
	},
    // colorList array takes up to 4 strings of hex codes, ex: "#1e91c1"
    // empty array generates totally random palette
	body: '{"colorList":[]}'
};
// Color API call
async function getColorData () {
    const response = await fetch('https://ai-color-generator.p.rapidapi.com/generate-color', options)
    const data = await response.json()
    localStorage.setItem("data", JSON.stringify(data))
}

getColorData()
handlePopulateColor()


// API Data
function handleColorObject () {
    const localJSON = localStorage.getItem("data")
    const colorObject = JSON.parse(localJSON)
    return colorObject
}

// Dom test
function handlePopulateColor (){
    // returns parsed version of what was in local storage
    colorObject = handleColorObject()

    for (let i = 0; i < colorObject.colorList.length; i++) {
    const hex = colorObject.colorList[i]
    const hexCard = generateCard(hex)
    console.log(hexCard)
    hexContainerEl.append(hexCard)
    }
}

// Card Test
function generateCard(hexCode){
    const colorContainer = document.createElement("div")
    const hexText = document.createElement("p")

    hexText.className = "hexFont"
    hexText.innerText = hexCode

    colorContainer.style.background = hexCode
    colorContainer.style.width = "10rem"
    colorContainer.appendChild(hexText)
    
    return colorContainer
}

// Color Picker for loop
function handleColorPicker (){
    // returns parsed version of what was in local storage
    //colorObject = handleColorObject()

    //for (let i = 0; i < colorObject.colorList.length; i++) {
    //const hex = colorObject.colorList[i]
    //const hexCard = generateCard(hex)
    //console.log(hexCard)
    //hexContainerEl.append(hexCard)
    //}
}

// Color Picker Test
function generateColorPicker(hexCode) {
    const pickerContainer = document.createElement("div")
    pickerContainer.style.background = hexCode
    pickerContainer.style.width = "5rem"
}

// Click Functions
function handleColorSubmit (event) {
    event.preventDefault()
    console.log("color")
}

// Word API call from user input
function renderSynonyms(){
	let wordValueEl = document.querySelector('#wordText').value;
	const synonyms = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': apiKey ,
			'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
			}
	};
		
	fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordValueEl}/synonyms`, synonyms)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
	
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
colorSubmitBtnEl.addEventListener("click", handleColorSubmit)
startOverBtnEl.addEventListener("click", restartTest)
wordSubmitBtnEl.addEventListener("click", renderSynonyms)

