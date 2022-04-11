const gameBoard = (() => {
    let board = [];
})();

//Factory for creating Playyer objects
const Player = (sign) => { 
    let name = sign;
    const getSign = () => sign;
    const getName = () => name;
    const setName = inName => {
        if(inName != "")
        {
           name = inName
        }
    };
    return { getSign, getName, setName}
};

const displayController = (() => {
    //do stuff
    const infoDisplay = document.getElementById("info-display");
    const nextTurn = () => infoDisplay.textContent = "Somones turn";
    const clearBoard = () => console.log("CLEAR BOARD");
    return{
        nextTurn,
        clearBoard,
    };
})();

const gameController = (() =>{
    const mainBtn = document.getElementById("start-button");
    const playerOne = Player('x');
    const playerTwo = Player('o');

    mainBtn.onclick = () => {
        const oneInput = document.getElementById("player-one-name");
        const twoInput = document.getElementById("player-two-name");
        if(mainBtn.textContent == "Start")
        {
            mainBtn.setAttribute("id","restart-button");
            mainBtn.textContent = "Restart";


            if(oneInput.value == "")
            {
                console.log("ADSASD")
                oneInput.value = "×";
            }
            if(twoInput.value == ""){
                twoInput.value = "○";
            }

            playerOne.setName(oneInput.value);
            playerTwo.setName(twoInput.value);
            displayController.nextTurn();
            oneInput.disabled = true;
            twoInput.disabled = true;
        }
        else{
            mainBtn.setAttribute("id","start-button");
            mainBtn.textContent = "Start";
            displayController.clearBoard();
            oneInput.disabled = false;
            twoInput.disabled = false;
        }

    }
})();