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
})();

const gameController = (() =>{
    const mainBtn = document.getElementById("start-button");

    const playerOne = Player('x');
    const playerTwo = Player('o');

    mainBtn.onclick = () => {
        if(mainBtn.textContent == "Start")
        {
            mainBtn.setAttribute("id","restart-button");
            mainBtn.textContent = "Restart";
            console.log("test");
            const oneInput = document.getElementById("player-one-name");
            const twoInput = document.getElementById("two");
            playerOne.setName(oneInput.value);
            playerTwo.setName(twoInput.value);
        }
        else{
            mainBtn.setAttribute("id","start-button");
            mainBtn.textContent = "Start";
        }

    }
})();