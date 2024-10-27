let humanScore = 0;
let computerScore = 0;

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

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice ?? ''
    
    humanChoice = humanChoice.toLowerCase();
    humanChoice = humanChoice.trim();

    const choiceBeats = {
        rock: "scissors",
        scissors: "paper",
        paper: "rock"
    }

    if (choiceBeats[humanChoice] == computerChoice) {
        humanScore += 1;
        console.log(`${humanChoice} beats ${computerChoice}!`)
    } else if (humanChoice == computerChoice) {
        console.log(`Draw! Both got ${humanChoice}`);
    } else if (choiceBeats[computerChoice] == humanChoice){
        computerScore += 1;
        console.log(`${computerChoice} beats ${humanChoice}!`)
    } else {
        playRound(getHumanChoice(), computerChoice)
    }
    
}

function playGame() {
    for (let i = 0; i < 5 ; i++) {
        playRound(
            getHumanChoice(),
            getComputerChoice()
        )
        console.log(`computer: ${computerScore} | human: ${humanScore}`)
    }
    console.log(humanScore > computerScore ? 'Human wins!' : humanScore == computerScore ? 'Draw!' : 'Computer wins!');
}

const button = document.querySelectorAll("button")[0];
button.addEventListener("click", () => {
    playGame();
});