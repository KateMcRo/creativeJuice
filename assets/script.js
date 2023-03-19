// Button Elements
const colorSubmitBtnEl = document.getElementById("colorSubmit")
const startOverBtnEl = document.getElementById("startOver")

// Click Functions
function colorTest () {
    console.log("color")
}

function restartTest () {
    console.log("Start Over")
}

// Event Listeners
colorSubmitBtnEl.addEventListener("click", colorTest)
startOverBtnEl.addEventListener("click", restartTest)