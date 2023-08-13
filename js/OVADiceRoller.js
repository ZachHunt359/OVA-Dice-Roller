function rollDice() {
    const bonusesInput = document.getElementById("bonuses");
    const numDiceInput = document.getElementById("numDice");
    const resultInput = document.getElementById("result");

    let numBonus = parseInt(bonusesInput.value);
    let numDice = parseInt(numDiceInput.textContent);
    let isNegative = (numBonus < 0); //Are we doing a 'Negative Dice' roll?
    let total = 0;
    let resultText = "";
    const rolls = [];

    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1; // Simulating a 6-sided dice
        rolls.push(roll);
    }

    rolls.sort(); // Sort the rolls array
    rolls.reverse(); // Reverse that sort, so it's in descending order

    const rollCounts = {};
    for (const roll of rolls) {
        if (rollCounts[roll]) {
            if (!isNegative) {
                rollCounts[roll] += roll;
            } else {
                rollCounts[roll] = roll; //Duplicate dice are never added together when rolling 'Negative Dice'
            }

        } else {
            rollCounts[roll] = roll;
        }
    }

    let highestValue = 0;
    let lowestValue = Infinity;

    for (const [roll, value] of Object.entries(rollCounts)) {
        if (value > highestValue) {
            highestValue = value;
        }
        if (value < lowestValue) {
            lowestValue = value;
        }
    }
    if (!isNegative) {
        resultText = `Total: ${highestValue}` + "\n\n";
    } else {
        resultText = `Total (Lowest): ${lowestValue}` + "\n\n";
    }

    resultText += "Rolls: " + rolls.join(", ");
    resultInput.value = resultText;
	
	// Add click event listener to the copy button
    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", function() {
        copyTextToClipboard(resultInput);
    });
}

function updateNumDice() {
    const bonusesInput = document.getElementById("bonuses");
    const numDiceInput = document.getElementById("numDice");

    const bonuses = parseInt(bonusesInput.value);
    let numDice = bonuses + 2;
    if (bonuses < 0) {
        numDice = Math.abs(bonuses)
    }
    numDiceInput.textContent = numDice;
}
// Function to copy text to the clipboard
function copyTextToClipboard(element) {
    element.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // Clear the selection
}
