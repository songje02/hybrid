const {createApp} = Vue;
        createApp({
            data(){
                return {
                    bg_block_Count : 16,
                }
            },
            mounted(){
                console.log("마운트함");
            }
        }).mount("#app");

const bg_block = document.querySelectorAll(".bg_block");
let cellLength = bg_block.length;
let board = new Array(6);
//var box = document.getElementsByClassName("box");

let overCheck = 1;
let numCheck = 1;

window.addEventListener("keydown", (e)=> {
    const keyCode = e.keyCode;
    if(keyCode == 37) {
        moveLeft();
    }
    else if(keyCode == 38) {
        moveUp();
    }
    else if(keyCode == 39) {
        moveRight();
    }
    else if(keyCode == 40) {
        moveDown();
    }
});

for(let i=0; i<6; i++){
    board[i] = new Array(6);
}

for(let i=0; i<6; i++) {
    for(let j=0; j<6; j++) {
        if(i==0 || j==0 || i==5 || j==5) {
            board[i][j] = 0;
        }
    }
}

init();
//초기화 함수
function init(){
    for(let i=1; i<5; i++) {
        for(let j=1; j<5; j++) {
            board[i][j] = 0;
        }
    }
    randomNum();
    randomNum();
    update();
}

function update(){
    let count = 0;
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            bg_block[count].innerHTML = board[i][j] == 0 ? "" : board[i][j];
            console.log(bg_block);
            count++;
        }
    }
    //setScore();
}



function randomNum(){
    ranPlaceX = Math.floor(Math.random() * 4 + 1);
    ranPlaceY = Math.floor(Math.random() * 4 + 1);
    if(board[ranPlaceX][ranPlaceY] == 0) {
        board[ranPlaceX][ranPlaceY] = 2;
    }
    else {
        randomNum();
    }
    update();
}

function moveLeftNum() {
    let k;

    numCheck = 1

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 5; j++) {
            if(board[i][j] != 0) {
                k = j;
                while(1) {
                    if(board[i][k-1] != 0) {
                        break;
                    }
                    board[i][k-1] = board[i][k];
                    board[i][k] = 0;
                    k--;
                    numCheck = 0;
                }
            }
        }
    }
}

function moveLeft() {
    gameOver();
    moveLeftNum();

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[i][j] == board[i][j+1] && board[i][j] != 0) {
                numCheck = 0;
                score += board[i][j];
                board[i][j] *= 2;
                board[i][j+1] = 0;
            }
        }
    }
    if(!numCheck) {
        moveLeftNum();
        randomNum();
        update();
    }
}


function moveUpNum() {
    let k;

    numCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 5; j++) {
            if(board[j][i] != 0) {
                k = j;
                while(1) {
                    if(board[k-1][i] != 0) {
                        break;
                    }
                    board[k-1][i] = board[k][i];
                    board[k][i] = 0;
                    k--;
                    numCheck = 0;
                }
            }
        }
    }
}

function moveUp() {
    gameOver();
    moveUpNum();

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[j][i] == board[j+1][i] && board[j][i] != 0) {
                score += board[j][i];
                board[j][i] *= 2;
                board[j+1][i] = 0;
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {
        moveUpNum();
        randomNum();
        update();
    }
}

function moveRightNum() {
    let k;

    numCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 4; j > 0; j--) {
            if(board[i][j] != 0) {
                k = j;
                while(1) {
                    if(board[i][k+1] != 0) {
                        break;
                    }
                    board[i][k+1] = board[i][k];
                    board[i][k] = 0;
                    k++;
                    numCheck = 0;
                }
            }
        }
    }
}

function moveRight() {
    gameOver();
    moveRightNum();

    for(let i = 1; i < 5; i++) {
        for(let j = 4; j >1; j--) {
            if(board[i][j] == board[i][j-1] && board[i][j] != 0) {
                score += board[i][j];
                board[i][j] *= 2;
                board[i][j-1] = 0;
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {
        moveRightNum();
        randomNum();
        update();
    }
}

function moveDownNum() {
    let k;

    numCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 4; j > 0; j--) {
            if(board[j][i] != 0) {
                k = j;
                while(1) {
                    if(board[k+1][i] != 0) {
                        break;
                    }
                    board[k+1][i] = board[k][i];
                    board[k][i] = 0;
                    k++; 
                    numCheck = 0;
                }
            }
        }
    }
}

function moveDown(){
    gameOver();
    moveDownNum();

    for(let i = 1; i < 5; i++) {
        for(let j = 4; j > 1; j--) {
            if(board[j][i] == board[j-1][i] && board[j][i] != 0) {
                score += board[j][i];
                board[j][i] *= 2;
                board[j-1][i] = 0;
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {     
        moveDownNum();
        randomNum();
        update();
    }
}

function rowCheck() {
    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[i][j] == board[i][j+1]) {
                overCheck = 0;
            }
        }
    }
}

function columnCheck() {
    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[j][i] == board[j+1][i]) {
                overCheck = 0;
            }
        }
    }
}


function gameOver() {
    let fullCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 5; j++) {
            if(board[i][j] == 0) {
                fullCheck = 0;
            }
        }
    }
    rowCheck();
    columnCheck();
    if(fullCheck && overCheck) {
        alert("Gameover\n" + "Score : " + score);
        window.location.reload();
    }

    overCheck = 1;
}
        

         
       