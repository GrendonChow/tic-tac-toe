const gameBoard = (() => {
    let board = [];
    const setSquare = (sign, index) =>{
        board[index] = sign;
    }
    const resetBoard = () =>{

    };
    return{setSquare, resetBoard};
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
    const oneInput = document.getElementById("player-one-name");
    const twoInput = document.getElementById("player-two-name");
    const infoDisplay = document.getElementById("info-display");

    const displayTurn = (player) => infoDisplay.textContent = `${player.getName()}'s turn`;
    const clearBoard = () => console.log("CLEAR BOARD");
    const toggleInput = ()  => {
        oneInput.disabled = !oneInput.disabled ;
        twoInput.disabled = !twoInput.disabled;

    };
    const setDisplayName = (playerOne, playerTwo) => {
        playerOne.setName(oneInput.value);
        playerTwo.setName(twoInput.value);

        //Sets input to display placeholder as name if empty
        if(oneInput.value == "")
        {
            oneInput.value = "×";
        }
        if(twoInput.value == ""){
            twoInput.value = "○";
        }
    };

    const displaySign = (sign) => {
        return (sign == 'x'? `&times;`:`&#9675;`);
    }

    return{
        displayTurn,
        clearBoard,
        toggleInput,
        setDisplayName,
        displaySign,
    };
})();

const gameController = (() =>{
    /**?
     * turn something like if(currentturn IS ODD/EVEN)
     */
    const mainBtn = document.getElementById("start-button");
    const squareBtns = document.getElementsByClassName("square");
    const playerOne = Player('x');
    const playerTwo = Player('o');
    var currentTurn = playerOne;

    mainBtn.onclick = () => {

        //Used to toggle start and restart button
        if(mainBtn.textContent == "Start")
        {
            mainBtn.setAttribute("id","restart-button");
            mainBtn.textContent = "Restart";

            displayController.toggleInput();
            displayController.setDisplayName(playerOne, playerTwo);
            displayController.displayTurn(currentTurn);
        }
        else{
            mainBtn.setAttribute("id","start-button");
            mainBtn.textContent = "Start";

            displayController.toggleInput();
            displayController.clearBoard();
        }
    };

    for (const square of squareBtns)
    {
        //Sets mark based on current player turn
        square.onclick = () => {
            
            square.innerHTML = displayController.displaySign(currentTurn.getSign());
            gameBoard.setSquare(currentTurn.getSign(), square.getAttribute('data-index'))
            currentTurn =  (currentTurn.getSign() == 'x'? playerTwo: playerOne)
        }
    }
})();