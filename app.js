var wordList = ["ALIGN", "TORSO", "PHASE"];
var myButton = document.getElementById("myButton");
var rowCount = 0;
var roundCount = 0;
var todaysWord = "ALIGN";

var backButton = document.getElementById("back");
var modalButton= document.getElementById("modalbutton");
var moreGames = document.getElementById("more");
var modal = document.getElementById("modal1");
var overlay = document.getElementById("overlay");

myButton.onclick = function main() {
    todaysWord = wordList[roundCount];

    let myInput = document.querySelector("#myInput").value.toUpperCase();
    let row = document.getElementById("board").children[rowCount].children;

    if (myInput.length !== 5) {
        alert("The word must contain five letters");
    } else {
        changeColor(myInput, row);
        rowCount = rowCount+1;
        if ((myInput == todaysWord)||(rowCount==6)){
            gameEnd(myInput);
        }
        
    }
    document.querySelector('#myInput').value = '';

}

function changeColor(myInput, row) {
    for (let i = 0; i < 5; i++) {
        if (myInput[i] == todaysWord[i]) {
            row[i].style.background = 'rgba(40,128,40,0.8)';
        } else if (todaysWord.includes(myInput[i])) {
            row[i].style.background = 'rgba(225,173,50,0.8)';
        } else {
            row[i].style.background = 'rgba(100,100,100,0.8)';
        }

        txt = row[i].children[0];
        txt.innerHTML = myInput[i];
    }
    

}

function gameEnd(myInput){
    modal.style.display = 'initial';
    overlay.style.display = 'initial';
    result = document.getElementById("result");
    sndpart = document.getElementById("sndpart");

    if ((myInput==todaysWord)){
        result.innerHTML = "Success! The correct word is : "+ todaysWord +".";
    }else{
        result.innerHTML = "The correct word was : " +todaysWord+ ".";
    }

    if (roundCount<2){
        sndpart.innerHTML = "Try another round?";
    }else{
        moreGames.style.display = 'none';
        sndpart.innerHTML = "That's all three rounds. Thanks for playing."
    }


}

//NEW ROUND

backButton.onclick = function goBack(){
   
    location.href = "../index.html";
}


moreGames.onclick = function newRound(){  
    roundCount = roundCount +1;
    todaysWord = wordList [roundCount];
    modal.style.display = 'none';
    overlay.style.display = 'none';

    
    //reset board
    rowCount = 0;
    let tiles = document.getElementsByClassName('tile');
    let alps = document.getElementsByClassName('alp');

    for (let i = 0; i <30; i++){
        tiles[i].style.background = 'rgba(179, 187, 229, 0.8)';
        alps[i].innerHTML = '';
    }
}



