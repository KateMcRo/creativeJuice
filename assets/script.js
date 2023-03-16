const colorApiKey = '57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23'
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23',
		'X-RapidAPI-Host': 'ai-color-generator.p.rapidapi.com'
	},
	body: '{"colorList":["#FBE18F","#1F271B"]}'
};
fetch('https://ai-color-generator.p.rapidapi.com/generate-color', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));



const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '57fdf6d363msh1895db180f9cc69p1d283ejsna643fadf6b23',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

fetch('https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf', options2)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
