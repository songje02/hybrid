let scoreDiv = document.getElementById("score"); //스코어 div
let bg_block = document.getElementsByClassName("bg_block"); //4x4 바탕 배경
let board = new Array(4); //4x4 배열

//시작화면 UI
let startbtn = document.getElementById("start"); //start 버튼
let startUI = document.getElementById("GameStartUI"); //start 화면 div

//종료화면 UI
let endUI = document.getElementById("GameEndUI"); //end 화면 div
let endScore = document.getElementById("endScore"); //end화면에 보이는 점수
let endbtn = document.getElementById("end"); //end 버튼

let clearUI = document.getElementById("GameClearUI"); //Clear 화면 div

let box_arr = []; //이동 블럭 넣어놓은 값
let score = 0; //점수 전역 변수 
 
let overCheck = 1; 
let numCheck = 1;
let gameState = 0; //게임 시작, 종료, 클리어 상태 확인 변수

for(let i=0; i<4; i++){  //4x4 배열 생성
    board[i] = new Array(4);
}

for(let i=0; i<4; i++) { //생성한 배열 값을 0으로 초기화
    for(let j=0; j<4; j++) {
        board[i][j] = 0;
    }
}

class BlockMap{ //2048 바탕 배경
    constructor(row,column){ 
        //새로운 배열을 만들고 값을 0으로 채움
        this.Map = Array.from(Array(row), ()=> Array(column).fill(0)); 
        this.div_app = document.getElementById("app"); //2048전체 div
    }
    addblock(x,y,block){ //이동 블럭 추가
        block.setactive(true); //이동 블럭 setActive 
        block.setcoord(x,y); //이동 블럭 위치 변경
        this.Map[x][y] = block; //이동 블럭을 배열에 넣어줌
        this.div_app.appendChild(block.Element); //2048전체 div의 자식 객체 배경에 이동 블럭 삽입
    }
    // removeblock(x,y,block){
    //     block.setactive(false);
    //     this.Map[x][y] = null;
    // } 
}

class Block{ //움직이는 블럭
    constructor(value){ //생성자 / value 2, 4 값
        this.Value = value;  
        this.Active = false;
        this.XPos = 20;
        this.YPos = 20;
        this.Element = document.createElement("div"); //div객체로 생성
        this.Element.setAttribute("class","box"); //본인 클래스 box로 변경
        // this.Element.innerHTML = this.Value;
    }
    changevalue(v){ //객체 안에 값 변경
        this.Value = v;
        this.Element.innerHTML = this.Value;
    }
    setactive(isActivated){ //이동 블럭 보이게 함
        this.Element.style.display = "block";
        this.Active = isActivated;        
    }
    setcoord(x,y){ //매개변수로 받아온 값을 통해 위치를 변경
        this.XPos += 150*x;
        this.YPos += 150*y;
        this.Element.style.left += this.XPos + "px";
        this.Element.style.top += this.YPos + "px";
    }
    // removeblock(){
    //     this.Element.style.display = "none"
    //     this.Active = false;
    //     // this.XPos = 20;
    //     // this.YPos = 20;
    // }
}

var blockmap = new BlockMap(4,4); //클래스를 통해 4x4배열 생성
let bl = [];
let arr = [];
arr = blockmap.Map;

//애니메이션이였것....
// function ani(){
//     box_arr[1].animate(
//         {
//             transform: [
//                 'translateX(0px)',
//                 'translateX(300px)'
//             ]
//         },
//         {
//             duration : 500,
//             fill : 'forwards',
//             easing : 'ease'
//         }
//     );
// }


//클릭 이벤트
startbtn.addEventListener("click", function btn(){ //시작 버튼 누르면 게임 시작할 수 있게 함
    gameState = 1;
    startUI.style.display = "none"; //게임 시작 시 UI를 화면에서 지움 
    if(gameState == 1){ 
        window.addEventListener("keydown", (e)=> {
            const keyCode = e.keyCode;
            if(keyCode == 37) { //왼쪽 키
                moveLeft();
            }
            if(keyCode == 38) { //위쪽 키
                moveUp();
            }
            if(keyCode == 39) { //오른쪽 키
                moveRight();
            }
            if(keyCode == 40) { //아래쪽 키
                moveDown();
            }
        });
    }
});
endbtn.addEventListener("click", function(){ //게임오버 시 나오는 restart버튼 클릭 시 새로 로드됨 
    window.location.reload();
});

init(); //초기화

//초기화 함수
function init(){
    var cnt = Math.floor(Math.random() * 2.99); //0~2 랜덤 수 

    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            board[i][j] = 0;
            bl.push(new Block(board[i][j])); //배열 안에 이동 불럭 push함
        }
    }
    if(cnt == 0){ //이동 블럭 2생성
        randomNum(); 
    }
    if(cnt == 1){ //이동 블럭 4생성
        randomNum1(); 
    }
    if(cnt == 2){ //이동 블럭 2,4 생성
        randomNum();
        randomNum1();
    }

    update(); //업데이트
}

//업데이트 함수
function update(){
    let count = 0;
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            bl.Element = board[i][j] == 0 ? "" : board[i][j];
            // console.log(bl.Element);
            // console.log(board[i][j]);
            count++;
        }
    }
    scoreDiv.innerHTML = "score : " + score; //스코어 div에 점수 삽입
}

//2 생성
function randomNum(){
    let count = 0;
    ranPlaceX = parseInt(Math.random() * 3.99); //0~3 난수
    ranPlaceY = parseInt(Math.random() * 3.99); //0~3 난수
    
    //bl = box_arr.shift(); //bl변수에 배열 안에 있는 맨 앞 값을 빼와서 넣음

    if(arr[ranPlaceX][ranPlaceY] == 0) { //생성될 위치 값이 0이면
        board[ranPlaceX][ranPlaceY] = 2; //2 값을 넣어줌
        bl[count].changevalue(board[ranPlaceX][ranPlaceY]); //이동 블럭에 있는 값 바꾸는 함수 사용 
        blockmap.addblock(ranPlaceX,ranPlaceY,bl.shift()); //이동 블럭 생성
    } else{
        
        randomNum(); //0이 아니면 또 함수 호출
    }
   count++;
}

//4 생성
function randomNum1(){
    let count = 0;
    ranPlaceX = parseInt(Math.random() * 3.99); //0~3 난수
    ranPlaceY = parseInt(Math.random() * 3.99); //0~3 난수

    //bl = box_arr.shift(); //bl변수에 배열 안에 있는 맨 앞 값을 빼와서 넣음
    console.log(arr);
    if(arr[ranPlaceX][ranPlaceY] == 0) { //생성될 위치 값이 0이면
        board[ranPlaceX][ranPlaceY] = 4; //4 값을 넣어줌
        bl[count].changevalue(board[ranPlaceX][ranPlaceY]); //이동 블럭에 있는 값 바꾸는 함수 사용 
        blockmap.addblock(ranPlaceX,ranPlaceY,bl.shift()); //이동 블럭 생성
    } else{
        randomNum1(); //0이 아니면 또 함수 호출
    }
    count++;
}
//왼쪽 이동
function moveLeftNum() { //배열 값 이동 함수
    let k;
    let count = 0;
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
                count++;
            }
        }
    }
}

function moveLeft() { //값 더해줌
    gameOver();
    gameClear();
    moveLeftNum();
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(board[i][j] == board[i][j+1] && board[i][j] != 0) {
                numCheck = 0;
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
function moveUpNum() { //배열 값 이동 함수
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
    gameClear();
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
function moveRightNum() { //배열 값 이동 함수
    let k;

    numCheck = 1;
    for(let i = 0; i < 4; i++) {
        for(let j = 2; j > -1; j--) {
            if(arr[i][j] != 0) {
                k = j;
                while(1) {
                    if(arr[i][k+1] != 0) {
                        break;
                    }
                    arr[i][k+1] = arr[i][k];
                    arr[i][k] = 0;
                    k++;
                    numCheck = 0;
                }
            }
        }
    }
    console.log(arr);
}

function moveRight() {
    gameOver();
    gameClear();
    moveRightNum();
    for(let i = 0; i < 4; i++) {
        for(let j = 3; j > 0; j--) {
            if(arr[i][j] == arr[i][j-1] && arr[i][j] != 0) {

                arr[i][j] *= 2;
                arr[i][j-1] = 0;
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
function moveDownNum() { //배열 값 이동 함수
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
    gameClear();
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

function gameClear(){ //게임 클리어
    let clearCheck = 0;

    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == 2048) {
                clearCheck = 1;
            }
        }
    }

    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[j][i] == 2048) {
                clearCheck = 1;
            }
        }
    }

    if(clearCheck){
        gameState = 3;
    }

    if(gameState == 3){
        endScore.innerHTML = "score : " + score;
        clearUI.style.display = "none";
        gameState = 0;
    }
}

