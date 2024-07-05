let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");    
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;

//turn of player O , if false turn of player X
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7], 
    [2, 5, 8], 
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
    resetBtn.style.display = "inline-block";
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            //turn of player O
            box.style.color = "#F95738";
            box.innerText = "O";
            turnO = false;
        }
        else {
            //turn of player X
            box.style.color = "#0D3B66";
            box.innerText = "X";
            turnO = true;
        }
        count++;
        box.disabled = true;
        box.style.cursor = "not-allowed";

        checkWinner();
    });
});

const disableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = true;
        box.style.cursor = "not-allowed";
    }
};

const enableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = false;
        box.style.cursor = "default";
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    disableBoxes();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            msg.innerText = `Congratulations, Winner is ${winner}`;
            msgContainer.classList.remove("hide");
            resetBtn.style.display = "none";
            resolve("success!");
        }, 1000);
    }); 
};

const showDraw = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            msg.innerText = "Match is Draw!";
            msgContainer.classList.remove("hide");
            resetBtn.style.display = "none";
        }, 1000);
    });
}

const checkWinner = async () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;     

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                await showWinner(pos1Val);
                count = 0;
            }
    }
    if(count == 9) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);