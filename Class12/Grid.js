let bg_block = document.getElementsByClassName("bg_block");
let cellLength = bg_block.length;
let board = new Array(4);
let scoreDiv = document.getElementById("score");
let startbtn = document.getElementById("start");
let startUI = document.getElementById("GameStartUI");
let endbtn = document.getElementById("end");
let endUI = document.getElementById("GameEndUI");
let endScore = document.getElementById("endScore");
let score = 0;

let overCheck = 1;
let numCheck = 1;
let gameState = 0;

var cnt = Math.floor(Math.random() * 2.99);


for(let i=0; i<4; i++){
    board[i] = new Array(4);
}

for(let i=0; i<4; i++) {
    for(let j=0; j<4; j++) {
        if(i==0 || j==0 || i==3 || j==3) {
            board[i][j] = 0;
        }
    }
}
//클릭 이벤트
startbtn.addEventListener("click", function(){
    gameState = 1;
    startUI.style.display = "none";
    if(gameState == 1){
        window.addEventListener("keydown", (e)=> {
            const keyCode = e.keyCode;
            if(keyCode == 37) {
                moveLeft();
            }
            if(keyCode == 38) {
                moveUp();
            }
            if(keyCode == 39) {
                moveRight();
            }
            if(keyCode == 40) {
                moveDown();
            }
        });
    }
});
endbtn.addEventListener("click", function(){
    
    window.location.reload();
});

init();
//초기화 함수
function init(){
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            board[i][j] = 0;
        }
    }
    if(cnt == 0){
        randomNum();
    }
    if(cnt == 1){
        randomNum1();
    }
    if(cnt == 2){
        randomNum();
        randomNum1();
    }
    update();
}
//업데이트 
function update(){
    let count = 0;
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            bg_block[count].innerHTML = board[i][j] == 0 ? "" : board[i][j];
            count++;
        }
    }
    scoreDiv.innerHTML = "score : " + score;
}
//2 생성
function randomNum(){
    ranPlaceX = parseInt(Math.random() * 3.99); 
    ranPlaceY = parseInt(Math.random() * 3.99);

    if(board[ranPlaceX][ranPlaceY] == 0) {
        board[ranPlaceX][ranPlaceY] = 2;
        //update();
    } else{
        randomNum();
    }
   
}
//4 생성
function randomNum1(){
    ranPlaceX = parseInt(Math.random() * 3.99); 
    ranPlaceY = parseInt(Math.random() * 3.99);

    if(board[ranPlaceX][ranPlaceY] == 0) {
        board[ranPlaceX][ranPlaceY] = 4;
    } else{
        randomNum1();
    }
    //update();
}
//왼쪽 이동
function moveLeftNum() { //배열 값 이동
    let k;
    numCheck = 1

    for(let i = 0; i < 4; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[i][j] != 0) {
                k = j;
                while(1) {
                    if(board[i][k-1] != 0) { //왼쪽 값이 0이 아니면
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

function moveLeft() { //값 더해줌
    gameOver();
    moveLeftNum();
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(board[i][j] == board[i][j+1] && board[i][j] != 0) {
                numCheck = 0;
                // score += board[i][j];
                board[i][j] *= 2;
                board[i][j+1] = 0;
            }
        }
    }
    if(!numCheck) {
        score++;
        moveLeftNum();
        randomNum();
        update();
    }
}
//위쪽 이동
function moveUpNum() {
    let k;

    numCheck = 1;

    for(let i = 0; i < 4; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[j][i] != 0) {
                k = j;
                while(1) {
                    if(k == 0) {
                        break;
                    }
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
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[j][i] == board[j+1][i] && board[j][i] != 0) {
                // score += board[j][i];
                board[j][i] *= 2;
                board[j+1][i] = 0; 
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {
        score++;
        moveUpNum();
        randomNum();
        update();
    }
}
//오른쪽 이동
function moveRightNum() {
    let k;

    numCheck = 1;

    for(let i = 0; i < 4; i++) {
        for(let j = 2; j > -1; j--) {
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
    for(let i = 0; i < 4; i++) {
        for(let j = 3; j > 0; j--) {
            if(board[i][j] == board[i][j-1] && board[i][j] != 0) {
                board[i][j] *= 2;
                board[i][j-1] = 0;
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {
        score++;
        moveRightNum();
        randomNum();
        update();
    }
}
//아래쪽 이동
function moveDownNum() {
    let k;

    numCheck = 1;

    for(let i = 0; i < 4; i++) {
        for(let j = 2; j > -1; j--) {
            if(board[j][i] != 0) {
                k = j;
                while(1) {
                    if(k == 3) {
                        break;
                    }
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
    for(let i = 0; i < 4; i++) {
        for(let j = 3; j > 0; j--) {
            if(board[j][i] == board[j-1][i] && board[j][i] != 0) {
                // score += board[j][i];
                board[j][i] *= 2;
                board[j-1][i] = 0;
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {     
        score++;
        moveDownNum();
        randomNum();
        update();
    }
}
//게임오버 체크
function rowCheck() {
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == board[i][j+1]) {
                overCheck = 0;
            }
        }
    }
}

function columnCheck() {
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[j][i] == board[j+1][i]) {
                overCheck = 0;
            }
        }
    }
}

function gameOver() { //게임오버
    let fullCheck = 1;
   
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(board[i][j] == 0) {
                fullCheck = 0;
            }
        }
    }
    rowCheck();
    columnCheck();
    if(fullCheck && overCheck) {
        gameState = 2;

    }

    if(gameState == 2){
        endScore.innerHTML = "score : " + score;
        endUI.style.display = "block";
    }
    overCheck = 1;
}
