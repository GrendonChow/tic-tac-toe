const gameBoard = (() => {
    let board = [];
    const setSquare = (sign, index) =>{
        board[index] = sign;
    }
    const resetBoard = () =>{
        //Reset board array
    };
    return{setSquare, resetBoard};
})();

//Factory for creating Player objects
const Player = (sign) => {
    this.sign = sign;
    const getSign = () => sign;
    return { getSign }
};

const displayController = (() => {
    const oneInput = document.getElementById("player-one-name");
    const twoInput = document.getElementById("player-two-name");
    const infoDisplay = document.getElementById("info-display");
    const mainBtn = document.getElementById("start-button");
    const squareBtns = document.getElementsByClassName("square");

    mainBtn.onclick = () => { //Start button
        if(mainBtn.textContent == "Start") {
            mainBtn.setAttribute("id","restart-button");
            mainBtn.textContent = "Restart";

            toggleInput();
            setDefaultName();
            displayTurn();
        }
        else { //Restart button
            mainBtn.setAttribute("id","start-button");
            mainBtn.textContent = "Start";

            toggleInput();
            clearBoard();
            gameBoard.resetBoard();
        }
    };

    for (const square of squareBtns)
    {
        //Sets mark based on current player turn
        square.onclick = () => {
            square.textContent = displaySign(gameController.getCurrentSign());
            gameBoard.setSquare(gameController.getCurrentSign(), square.getAttribute('data-index'));
            gameController.playTurn();
            displayTurn();
        }
    }
    const displayTurn = () => {
        if(gameController.getCurrentSign() == 'x')
        {
            infoDisplay.textContent = `${oneInput.value}'s turn`
        }
        else{
            infoDisplay.textContent = `${twoInput.value}'s turn`
        }
    };

    const clearBoard = () => console.log("CLEAR BOARD");
    const toggleInput = ()  => {
        oneInput.disabled = !oneInput.disabled;
        twoInput.disabled = !twoInput.disabled;

    };
    //Sets input to display placeholder if empty
    const setDefaultName = () => {
        if(oneInput.value == "")
        {
            oneInput.value = "\u00D7";
        }
        if(twoInput.value == ""){
            twoInput.value = "\u25CB";
        }
    };

    const displaySign = (sign) => {
        return (sign == 'x'? `\u00D7`:`\u25CB`);
    }

    return{
        clearBoard,
        toggleInput,
        displaySign,
    };
})();

const gameController = (() =>{
    const playerOne = Player('x');
    const playerTwo = Player('o');
    var turn = 0;

    const playTurn = () => {
        turn++;
    };

    const getCurrentSign = () => {
        return (turn % 2 == 0? playerOne.getSign() : playerTwo.getSign())
    };

    return{
        playTurn,
        getCurrentSign,
    }
})();