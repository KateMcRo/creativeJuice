const wordAPI_KEY = '57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23'
const colorApiKey = '57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23'
// Button Elements
const colorSubmitBtnEl = document.getElementById("colorSubmit")
const startOverBtnEl = document.getElementById("startOver")

// need to have an id for wordSubmit on button
const wordSubmitBtnEl = document.getElementById("wordSubmit");
// need an id for the wordInput
let wordInputEl = document.getElementById("wordText"); 


// API Keys (key is the same for both APIs)
let apiKey = "57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23"

let colorInputEl = document.getElementById("colorInput")

// Color API call
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
fetch('https://ai-color-generator.p.rapidapi.com/generate-color', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));





	





// Click Functions
function handleColorSubmit (event) {
    event.preventDefault()
    console.log("color")
}
// uses an API call from user input
function renderSynonyms(){
	let wordValueEl = document.querySelector('#wordText').value;
	const synonyms = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': wordAPI_KEY ,
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

