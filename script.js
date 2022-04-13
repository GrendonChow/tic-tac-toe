const gameBoard = (() => {
    let board = ['','','','','','','','',''];

    const getBoard = () => board;
    const setSquare = (sign, index) => {
        board[index] = sign;
    }
    const resetBoard = () => {
        board = ['','','','','','','','',''];
    };
    return{
        getBoard,
        setSquare,
        resetBoard
    };
})();

//Factory for creating Player objects
const Player = (sign) => {
    this.sign = sign;
    let name = sign;
    const setName = (inName) => {
        name = inName;
    };
    const getName = () => name;
    const getSign = () => sign;
    return { getSign, setName, getName }
};

const displayController = (() => {
    const boardDisplay = document.querySelector(".game-container-hidden")
    const oneInput = document.getElementById("player-one-name");
    const twoInput = document.getElementById("player-two-name");
    const infoDisplay = document.getElementById("info-display");
    const mainBtn = document.getElementById("start-button");
    const squareBtns = document.getElementsByClassName("square");

    mainBtn.onclick = () => { //Start button
        if(mainBtn.textContent == "Start") {
            mainBtn.setAttribute("id","restart-button");
            mainBtn.textContent = "Restart";

            boardDisplay.classList.remove("game-container-hidden");
            boardDisplay.classList.add("game-container");

            toggleInput();
            setDefaultName();
            gameController.setPlayersName(oneInput.value, twoInput.value);
            displayTurn();
        }
        else { //Restart button
            mainBtn.setAttribute("id","start-button");
            mainBtn.textContent = "Start";
            infoDisplay.textContent = "Press Start";

            boardDisplay.classList.remove("game-container");
            boardDisplay.classList.add("game-container-hidden");

            toggleInput();
            gameBoard.resetBoard();
            gameController.resetBoard();
            updateBoard();
        }
    };

    for (const square of squareBtns) {
        //Places a mark on a square based on current player turn
        square.onclick = () => {
            if(!gameController.getGameover())
            {
                if(gameController.getCurrentSign() == `x`)
                {
                    square.style.color ='#013766';
                }
                else{
                    square.style.color ='#ac0e28';
                }
                square.textContent = displaySign(gameController.getCurrentSign());
                gameBoard.setSquare(gameController.getCurrentSign(), square.getAttribute('data-index'));
                displayTurn();
                gameController.checkWinner();
                gameController.playTurn();
            }
        }
    }

    const displayTurn = () => {
        if(gameController.getCurrentSign() == 'x')
        {
            displayStatus(`${oneInput.value}'s turn`);
        }
        else{
            displayStatus( `${twoInput.value}'s turn`);
        }
    };

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

    const updateBoard = () => {
        const board = gameBoard.getBoard();
        for(const square of squareBtns)
        {
            square.textContent = board[square.getAttribute('data-index')];
        }

    }

    const displayStatus = (text) =>{
        infoDisplay.textContent = text;
    }

    return{
        toggleInput,
        displaySign,
        displayStatus,
    };
})();

const gameController = (() => {
    const playerOne = Player('x');
    const playerTwo = Player('o');
    var turn = 0;
    var gameOver = false;

    const setPlayersName = (one, two) => {
        playerOne.setName(one);
        playerTwo.setName(two);
    }

    const playTurn = () => {
        turn++;
        if(turn == 9)
        {
            gameOver = true;
            displayController.displayStatus('Draw!')
            console.log(turn);
        }
        console.log(turn);
    };

    const checkWinner = () =>{
        const winCombin = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 8]
        ];

        const board = gameBoard.getBoard();

        for(var i = 0; i < winCombin.length; i++)
        {
            if(board[winCombin[i][0]] == `x`)
            {
                if(board[winCombin[i][1]] == `x`)
                {
                    if(board[winCombin[i][2]] == `x`)
                    {
                        gameOver = true;
                        displayController.displayStatus(`${playerOne.getName()} Wins!`)
                    }
                }
            }
            else if(board[winCombin[i][0]] == `o`)
            {
                if(board[winCombin[i][1]] == `o`)
                {
                    if(board[winCombin[i][2]] == `o`)
                    {
                        gameOver = true;
                        displayController.displayStatus(`${playerTwo.getName()} Wins!`)
                    }
                }
            }
        }
    }

    const getCurrentSign = () => {
        return (turn % 2 == 0? playerOne.getSign() : playerTwo.getSign())
    };

    const getGameover = () => gameOver;

    const resetBoard = () => { 
        turn = 0;
        gameOver = false;
    }

    return{
        setPlayersName,
        playTurn,
        checkWinner,
        getCurrentSign,
        getGameover,
        resetBoard,
        checkWinner,
    }
})();