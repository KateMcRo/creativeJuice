// Button Elements
const wordSubmitBtnEl = document.getElementById("wordSubmit");
const colorSubmitBtnEl = document.getElementById("colorSubmit");
const startOverBtnEl = document.getElementById("startOver");

// API Keys (key is the same for both APIs)
const apiKey = "57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23"

// Input Elements
let wordInputEl = document.getElementById("wordText"); 
let colorInputEl = document.getElementById("colorInput")

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
function handlePopulateColor (colorList){
    colorObject = handleColorObject()
    console.log(colorObject)
    for (let i = 1; i < colorObjectArray.length; i++) {
    const hex = handlePopulateColor(colorList[i])
    const currentHex = generateCard(hex)
    colorObjectArray.push(currentHex)
        console.log(colorObjectArray)
    }
}

// Card Test
function generateCard(colorList){
    
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

