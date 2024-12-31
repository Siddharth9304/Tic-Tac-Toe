const gameBox = document.getElementById("gameBox");

let chance = "O";
let count = 0;
let playerOScore = 0;
let playerXScore = 0;

// how player can win
const winner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// check winner
function checkWinner(player){
    for(let [ind1, ind2, ind3] of winner){
        if((game[ind1]!="E") && (game[ind1] === player && game[ind2] === player && game[ind3] === player))
        {
            document.getElementById(`${ind1+1}`).style.backgroundColor = "lightgreen";
            document.getElementById(`${ind2+1}`).style.backgroundColor = "lightgreen";
            document.getElementById(`${ind3+1}`).style.backgroundColor = "lightgreen";
            return true;
        }
    }
    return false;
}

// array to contain game
let game = new Array(9).fill("E");

// game play logic
const gamePlay = (event)=>{
    if(event.target.className === "box")
    {
        const ind = Number(event.target.id);
        if(game[ind-1]!="E")
            return;
        event.target.innerHTML = chance;
        if(chance ===  "O")
        {
            game[ind-1] = "O";
            if(checkWinner("O"))
            {
                document.getElementById("result").innerHTML = "O Won";
                gameBox.removeEventListener('click', gamePlay);
                playerOScore++;
                document.getElementById("player1Name").innerHTML = `Player O : ${playerOScore}`;
                return;
            }
            chance = "X";
            document.getElementById("imgO").style.height = "20vw";
            document.getElementById("imgX").style.height = "28vw"
        }
        else
        {
            game[ind-1] = "X";
            if(checkWinner("X"))
            {
                document.getElementById("result").innerHTML = "X Won";
                gameBox.removeEventListener('click', gamePlay);
                playerXScore++;
                document.getElementById("player2Name").innerHTML = `Player X : ${playerXScore}`;
                return;
            }
            chance = "O";
            document.getElementById("imgO").style.height = "28vw";
            document.getElementById("imgX").style.height = "20vw"
        }
        count++;
        if(count==9)
        {
            document.getElementById("result").innerHTML = "Game Draw";
            gameBox.removeEventListener('click', gamePlay);
        }
    }

}

// restart
const restart = document.getElementById("restart");
restart.addEventListener('click',(event)=>{
    const boxes = Array.from(document.getElementsByClassName("box"));
    for(let box of boxes)
    {
        box.innerHTML = "";
        box.style.backgroundColor = "white"
    }
    document.getElementById("result").innerHTML = ""
    document.getElementById("imgO").style.height = "28vw";
    document.getElementById("imgX").style.height = "20vw";
    game = new Array(9).fill("E");
    count = 0;
    chance = "O";
    gameBox.addEventListener('click',gamePlay);
})

gameBox.addEventListener('click',gamePlay)
