function rollDice() {
    const bonusesInput = document.getElementById("bonuses");
    const numDiceInput = document.getElementById("numDice");
    const resultDiv = document.getElementById("resultDiv");
  
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
    let highlightDice = 0;
  
    for (const [roll, value] of Object.entries(rollCounts)) {
      if (!isNegative && value > highestValue) {
        highestValue = value;
        highlightDice = roll;
      }
      if (isNegative && value < lowestValue) {
        lowestValue = value;
        highlightDice = roll;
      }
    }
    if (!isNegative) {
      resultText = `Total: ${highestValue}` + "\n\n";
    } else {
      resultText = `Total (Lowest): ${lowestValue}` + "\n\n";
    }
  
    resultText += "Rolls: " + rolls.join(", ");
    resultDiv.textContent = resultText;
    winningDice(highlightDice, resultDiv);
  
    // Add click event listener to the copy button
    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", function() {
      copyTextToClipboard(resultDiv);
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
    const plainText = element.innerText;
  
    const textArea = document.createElement("textarea");
    textArea.value = plainText;
    document.body.appendChild(textArea);
  
    textArea.select();
    document.execCommand("copy");
  
    document.body.removeChild(textArea);  
  }
  
  function winningDice(rolledNum, element) {
    const regex = new RegExp(`(?<=Rolls:.*)(\\b${rolledNum}\\b)`, 'g');
    const originalContent = element.innerHTML;
    const modifiedContent = originalContent.replace(regex, `<span class="winningDice">${rolledNum}</span>`);
  
    element.innerHTML = modifiedContent;
  }

const input = $('input[id=bonuses]')

const increment = () => {
  input.val(Number(input.val()) + 1)
}
const decrement = () => {
  input.val(Number(input.val()) - 1)
}

$('.spinner.increment').click(increment)
$('.spinner.decrement').click(decrement)
$('.spinner.increment').click(updateNumDice)
$('.spinner.decrement').click(updateNumDice)
