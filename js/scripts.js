/*
---------------------------
HTML JS HANGMAN DOCSTRING
---------------------------
Title: Javascript HANGMAN Assignment
Purpose:HANGMAN Game using HTML and Javascript
Author: Amr Fouad
Date of last edit: August 28, 2020 3:00 am
*/
/*
*===============================================
                HTML STRUCTURE
*===============================================
*/
/*
------------------------------------------------ 
Define document elements (Tags)
------------------------------------------------
*/
/* Divisions */
const gameDiv = document.createElement('div');
const wrongGuessDiv = document.createElement('div');
const drawingDiv = document.createElement('div');
const dashedWordDiv = document.createElement('div');
const counterDiv = document.createElement('div');
/* Footer */
const pageFooter = document.createElement('footer');
/* Generic breakline */
const lineBreak = document.createElement('br');
/* Headers */
const gameHeader = document.createElement('h1');
const wrongGuessHeader = document.createElement('h3');
/* Form */
const gameForm = document.createElement('form');
const enterGuessLabel = document.createElement('p');
const userGuessTxtBox = document.createElement('input');
const gameInputSubmt = document.createElement('input');
const playAgainForm = document.createElement('form');
const playAgainSubmt = document.createElement('input');
/* Wrong Char List */
const wrongGuessUL = document.createElement('ul');
const wrongGuessLI = document.createElement('li');
/* Paragraphs */
const footerPara = document.createElement('p');
const dashedWord = document.createElement('p');
const hint = document.createElement('p');
const chancescounter = document.createElement('p');
/* Images */
const hanmanImages = document.createElement('img')
/* 
------------------------------------------------
Assign elements parameters 
------------------------------------------------
*/
/* Elements IDs */
gameDiv.id = 'gamediv';
wrongGuessDiv.id = 'wrongguessdiv';
drawingDiv.id = "drawingdiv"
dashedWordDiv.id = 'dashedworddiv'
counterDiv.id = 'counterdiv';
enterGuessLabel.id = "enterguesslabel"
userGuessTxtBox.id = 'guessinputtxt';
gameInputSubmt.id = 'gusssubmitbtn'
pageFooter.id = 'pagefooter';
hanmanImages.id = 'hangmanimg'
dashedWord.id = 'dashedwordP';
chancescounter.id = 'chancescounterP';
hint.id = 'hintP';
/* Elements Text Content */
gameHeader.textContent = 'Hangman';
wrongGuessHeader.textContent = 'Ouch:';
enterGuessLabel.textContent = 'Feeling Lucky! ... Enter A Guess';
footerPara.textContent = "\251 Amr Fouad";
dashedWord.textContent = 'Liverpool';
/* Others */
userGuessTxtBox.placeholder = 'Enter a letter ';
gameInputSubmt.type = "Submit";
playAgainSubmt.type = "Submit";
playAgainSubmt.value = "Restart";
/*
------------------------------------------------ 
Layout he page structure (skeleton)
------------------------------------------------
*/
/* HTML Body */
document.body.appendChild(gameDiv);
document.body.appendChild(dashedWordDiv);
document.body.appendChild(drawingDiv);
document.body.appendChild(wrongGuessDiv);
document.body.appendChild(counterDiv);
document.body.appendChild(pageFooter);
/* HTML DIVs */
gameDiv.appendChild(gameHeader);
gameDiv.appendChild(gameForm);
wrongGuessDiv.appendChild(wrongGuessHeader);
wrongGuessDiv.appendChild(wrongGuessUL);
drawingDiv.appendChild(hanmanImages);
dashedWordDiv.appendChild(dashedWord);
dashedWordDiv.appendChild(playAgainForm);
counterDiv.appendChild(chancescounter);
dashedWordDiv.appendChild(hint);
/* HTML Forms */
gameForm.appendChild(enterGuessLabel);
gameForm.appendChild(lineBreak);
gameForm.appendChild(userGuessTxtBox);
gameForm.appendChild(lineBreak);
gameForm.appendChild(gameInputSubmt);
playAgainForm.appendChild(playAgainSubmt);
/* HTML UL */
wrongGuessUL.appendChild(wrongGuessLI);
/* HTML Footer */
pageFooter.appendChild(footerPara);
/*
*==================================================
                Game Logic
*==================================================
*/
/* Global Variables */
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
let guessedWrongLetters = [];
let guessRightLetters = [];
let buzzelWord = "";
let buzzelWordHint = "";
hint.textContent = buzzelWordHint;
let chancesCntr = 1;
let winner = Boolean(false);
let blinkTimer = "";
/* Start Game */
document.body.onload = initializeGame();
/* Game form event listener */
gameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    playAgainSubmt.style.visibility = "visible";
    if (chancesCntr < 8) {
        let userGuess = userGuessTxtBox.value;
        if (checkUserInput(userGuess)) {
            updateDashedWord(buzzelWord, userGuess);
        }
        userGuessTxtBox.value = "";
    }
    else if (guessRightLetters.join("") != buzzelWord.toLocaleLowerCase()) {
        gameOver();
    }

    if (chancesCntr == 8) {
        gameOver();
    }

    if (guessRightLetters.join("") == buzzelWord.toLocaleLowerCase()) {
        CallaWinner();
    }

    console.log(guessRightLetters);
});
/* Reset & Play Again form event listener */
playAgainForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (chancesCntr > 7 || winner == true) {
        initializeGame();
    }
    else {
        if (confirm("Restarting the Game! Are you Sure?")) {
            initializeGame();
        }
    }
});
/* Function that initializes the game when page is refreshed or user restarts*/
function initializeGame() {
    randomWord();
    console.log(buzzelWord)
    guessRightLetters = dashBuzzleArray(buzzelWord).split("");
    dashedWord.textContent = dashAword(buzzelWord);
    guessedWrongLetters = [];
    wrongGuessLI.textContent = guessedWrongLetters;
    chancesCntr = 1;
    userGuessTxtBox.value = "";
    hanmanImages.src = "img/hangman-0.gif";
    gameInputSubmt.style.backgroundColor = "#71be3e";
    playAgainSubmt.style.visibility = "hidden";
    gameInputSubmt.disabled = false;
    userGuessTxtBox.disabled = false;
    chancescounter.style.color = "#71be3e";
    chancescounter.textContent = `${8 - chancesCntr}`;
    playAgainSubmt.style.backgroundColor = "#ff0000";
    playAgainSubmt.value = "Restart";
    chancescounter.style.display = 'block';
    clearInterval(blinkTimer);
}
/* Function that converts a WORD into dashes */
function dashAword(wordToDash) {
    var tempWord = "";
    for (let i = 0; i < wordToDash.length; i++) {
        tempWord = tempWord.concat("_.");
    }
    return tempWord;
}
/* Function that converts a WORD into dashes in an array to track the progress*/
function dashBuzzleArray(wordToDash) {
    var tempWord = "";
    for (let i = 0; i < wordToDash.length; i++) {
        tempWord = tempWord.concat(" ");
    }
    return tempWord;
}
/* Function that validate the user input to make sure 
no empty entry or multiple letters were submitted */
function checkUserInput(checkIfChar) {
    checkIfChar = checkIfChar.toLowerCase();
    let validString = Boolean(true);
    if (checkIfChar.length > 1) {
        confirm("Invalid Entry: more than one letter was entered");
        userGuessTxtBox.value = "";
        validString = false;
    }
    else if (checkIfChar == "") {
        confirm("Invalid Entry: no letter was entered");
        validString = false;
    }
    else {
        ///const nonletterInd = alphabet.includes(checkIfChar);

        if (!alphabet.includes(checkIfChar)) {
            confirm("Invalid Entry: special character or number was entered");
            validString = false;
        }
    }
    return validString;
}
/* Function that updates the wrong guesses listing */
function updateWrongGuessesList(wrongGuess) {
    let repeatedWrongGuess = Boolean(false);
    for (let i = 0; i < guessedWrongLetters.length; i++) {
        if (wrongGuess == guessedWrongLetters[i]) {
            repeatedWrongGuess = true;
        }
    }
    if (repeatedWrongGuess == false) {
        guessedWrongLetters.push(wrongGuess);
        wrongGuessLI.textContent = guessedWrongLetters;
        hanmanImages.src = "img/hangman-" + chancesCntr + ".jpg";
        chancesCntr++;
        chancescounter.textContent = `${8 - chancesCntr}`;
        if ((8 - chancesCntr) < 4) {
            chancescounter.style.color = "#ff0000";
            clearInterval(blinkTimer);
            blinkCounter();
        }
    }
    else {
        confirm("Invalid Entry: Repeated Wrong Guess!");
    }
}
/* Function that updates the dashed word as it gets updated */
function updateDashedWord(buzzleWord = "", userInput = "") {
    let noUpdateInd = Boolean(true);
    buzzleWord = buzzleWord.toLowerCase();
    userInput = userInput.toLowerCase();
    let buzzelWordArray = buzzleWord.split("");
    for (let i = 0; i < buzzelWordArray.length; i++) {
        if (userInput == buzzelWordArray[i]) {
            guessRightLetters[i] = userInput;
            let tempDashedWord = dashedWord.textContent.split("");
            tempDashedWord[i * 2] = userInput;
            dashedWord.textContent = tempDashedWord.join('');
            noUpdateInd = false;
        }
    }
    if (noUpdateInd == true) {
        updateWrongGuessesList(userInput);

    }
}
/* Function that runs Game over sequance */
function gameOver() {
    hanmanImages.src = "img/gameover.jpg";
    gameInputSubmt.style.backgroundColor = "#D3D3D3";
    gameInputSubmt.disabled = true;
    userGuessTxtBox.disabled = true;
    playAgainSubmt.style.backgroundColor = "#ff0000";
    playAgainSubmt.value = "Play Again!";
}
/* Function that runsWinning sequance */
function CallaWinner() {
    hanmanImages.src = "img/youwin.jpg";
    playAgainSubmt.value = "Play Again!";
    playAgainSubmt.style.backgroundColor = "#71be3e";
    gameInputSubmt.disabled = true;
    userGuessTxtBox.disabled = true;
    gameInputSubmt.style.backgroundColor = "#D3D3D3";
    winner = true;

}
/* Function that generates random word with a hint */
function randomWord() {
    const wordsToPickFrom = {
        England: ['Manchester City', 'Chelsea', 'LiverPool', 'Manchester United', 'Southampton', 'Arsenal'],
        Spain: ['Real Madrid', 'Valencia', 'Atletico Madrid', 'Real Sociedad', 'Villarreal'],
        Germany: ['Bayern Munich', 'Eintracht Frankfurt', 'Borussia Dortmund', 'Union Berlin', 'Werder Bremen']
    };
    const hintsEquiv = ['England', 'Spain', 'Germany'];

    buzzelWordHint = hintsEquiv[Math.floor(Math.random() * hintsEquiv.length)];
    hint.textContent = `Football Club in ${buzzelWordHint}`;
    if (buzzelWordHint == 'England') {
        buzzelWord = wordsToPickFrom.England[Math.floor(Math.random() * wordsToPickFrom.England.length)];
    }
    else if (buzzelWordHint == 'Spain') {
        buzzelWord = wordsToPickFrom.Spain[Math.floor(Math.random() * wordsToPickFrom.Spain.length)];
    }
    else {
        buzzelWord = wordsToPickFrom.Germany[Math.floor(Math.random() * wordsToPickFrom.Germany.length)];
    }
}
/* Function that blinks the counter text when less than 4 */
function blinkCounter(){
    blinkTimer = setInterval(function () {
        chancescounter.style.display = (chancescounter.style.display == 'none' ? '' : 'none');
    }, 1000);
}