let humanScore = 0;
let computerScore = 0;
let hasGameStarted = false;

function getComputerChoice() {
    let choice;
    const randomNumber = Math.random();
    if (randomNumber <= 1/3) {
        choice = "rock"
    } else if (randomNumber > 2/3) {
        choice = "paper"
    } else {
        choice = "scissors"
    }
    
    return choice;
}

function getHumanChoice() {
    const ans = prompt("Do you choose rock, paper or scissors?");
    return ans;
}

function updateScoreInDOM() {
    humanScoreDOM.textContent = humanScore;
    computerScoreDOM.textContent = computerScore;
}

function playRound(humanChoice, computerChoice) {
    const choiceBeats = {
        rock: "scissors",
        scissors: "paper",
        paper: "rock"
    }

    if (choiceBeats[humanChoice] == computerChoice) {
        humanScore += 1;
        displayMessageInDOM(`${humanChoice} beats ${computerChoice}!`)
    } else if (humanChoice == computerChoice) {
        displayMessageInDOM(`Draw! Both got ${humanChoice}`);
    } else if (choiceBeats[computerChoice] == humanChoice){
        computerScore += 1;
        displayMessageInDOM(`${computerChoice} beats ${humanChoice}!`)
    } else {
        playRound(getHumanChoice(), computerChoice)
    }

    updateScoreInDOM();
    
}

function displayMessageInDOM(msg) {
    const para = messageDOM.querySelector("p");
    para.textContent = msg;
}
function endGame() {
    hasGameStarted = false;
    const winner = humanScore > computerScore ? 'Human' : humanScore == computerScore ? '' : 'Computer';
    humanScore = 0;
    computerScore = 0;
    displayMessageInDOM(winner)
    updateStartButton();
    updateScoreInDOM();
}

function shouldGameEnd() {
    if ( humanScore == 5 || computerScore == 5) {
        return true;
    }
    return false;
}

function canChoiceBeMade() {
    if (hasGameStarted) {
        return true
    }
    return false
}

function makeChoice(choice) {
    if (canChoiceBeMade()) {
        playRound(choice, getComputerChoice());
    }
    if (shouldGameEnd()) {
        endGame();
    }
}

function updateStartButton() {
    if (hasGameStarted) {
        startButton.setAttribute("disabled", "");
        return
    }
    startButton.removeAttribute("disabled", "");
}

function manageGameStartingConditions() {
    hasGameStarted = true;
    updateStartButton();


    computerScore = 0;
    humanScore = 0;
}



function playGame() {
    manageGameStartingConditions();
}

window.addEventListener("click", (event) => {
    const id = event.target.id;
    switch (id) {
        case 'startGame':
            playGame();
            break
        case 'rock':
            makeChoice('rock')
            break;
        case 'paper':
            makeChoice('paper')
            break;
        case 'scissors':
            makeChoice('scissors')
            break;
    }
}) 


const startButton = document.querySelector("button#startGame");
const computerScoreDOM = document.querySelector("#computer-score");
const humanScoreDOM = document.querySelector("#human-score");
const messageDOM = document.querySelector("div.message");