const goButton = document.getElementById("go-button");
let wordList = ["ALIGN", "TORSO", "PHASE"];
let rowCount = 0;
let roundCount = 0;
let todaysWord = wordList[roundCount]

const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const result = document.getElementById("result");
const sndpart = document.getElementById("sndpart");
const backButton = document.getElementById("back-button");
const moreButton = document.getElementById("more-button");

// Take input when clicking "Go" button or pressing "Enter".
goButton.onclick = takeInput; 
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        takeInput();
    }
});

function takeInput() {
    let myGuess = document.querySelector("#guess").value.toUpperCase();
    if (validInput(myGuess)){                                                   // If the input is valid.
        let row = document.getElementsByClassName('row')[rowCount].children;    // Tiles in the current row.
        changeColor(myGuess, row);                                              // Change colour of current row.

        if ((myGuess == todaysWord)||(rowCount==5)){                            // If the guess is correct or if the 6th row was reached,
            gameEnd(myGuess);                                                   // End the game.
        }

        rowCount = rowCount+1;                                                  // Update row count.
    }
        
    document.querySelector('#guess').value = '';                                // Reset input.

}

function validInput(myGuess){
    if (myGuess.length !== 5) {
        alert("The input must contain five letters.");
        return false;
    } else if (!/^[A-Z]+$/.test(myGuess)){
        alert("The input must be alphabetical.")
        return false;
    } else{
        return true;
    }
}

function changeColor(myGuess, row) {
    for (let i = 0; i < 5; i++) {
        if (myGuess[i] == todaysWord[i]) {
            row[i].style.background = 'rgba(40,128,40,0.8)';
        } else if (todaysWord.includes(myGuess[i])) {
            row[i].style.background = 'rgba(225,173,50,0.8)';
        } else {
            row[i].style.background = 'rgba(100,100,100,0.8)';
        }

        let txt = row[i].children[0];
        txt.innerHTML = myGuess[i];
    }

}

function gameEnd(myGuess){
    modal.style.display = 'initial';
    overlay.style.display = 'initial';
    

    if ((myGuess==todaysWord)){
        result.innerHTML = "Success! The correct word is : "+ todaysWord +".";
    }else{
        result.innerHTML = "The correct word was : " +todaysWord+ ".";
    }

    if (roundCount<2){
        sndpart.innerHTML = "Try another round?";
    }else{
        moreButton.style.display = 'none';
        sndpart.innerHTML = "That's all three rounds. Thanks for playing."
    }


}

// MODAL BUTTONS

backButton.onclick = function goBack(){
    location.href = "http://www.reganhw.site";
}


moreButton.onclick = function newRound(){ 

    // Close modal.
    modal.style.display = 'none';
    overlay.style.display = 'none';

    // Update round count.
    roundCount = roundCount +1;
    todaysWord = wordList[roundCount];
    
    // Reset board.
    rowCount = 0;
    let tiles = document.getElementsByClassName('tile');
    let alps = document.getElementsByClassName('alp');

    for (let i = 0; i <30; i++){
        tiles[i].style.background = 'rgba(179, 187, 229, 0.8)';  // Tile colour reset.
        alps[i].innerHTML = '';                                  // Letters erased.
    }
}



