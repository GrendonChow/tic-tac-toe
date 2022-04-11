const gameBoard = (() => {
    let board = [];
})();

//Factory for creatign Playyer objects
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
})();

const gameController = (() =>{
    const startBtn = document.getElementById("start-button");
    const playerOne = Player('x');
    const playerTwo = Player('o');

    startBtn.onclick = () => {
        const oneInput = document.getElementById("player-one-name");
        const twoInput = document.getElementById("two");
        playerOne.setName(oneInput.value);
        playerTwo.setName(twoInput.value);
    }
})();