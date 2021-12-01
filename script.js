/* pseudo code ver.

gameboard object needs to be created, use a module since only need one of something

    this gameboard object will have an array with the gamestate in it

    will have some event listeners to modify the array that I guess I add to the window

    will have the ability to display the gamestate in a grid as a method

    need to prevent players from playing in spots already taken
    
    turn counter to alternate x's and o's. x's occur on odd turns (1st, 3rd, etc.)

    check for game conclusion

two player objects, created via factory
    methods to add score I guess? barely need
    player x and player o


*/



const gameboard = (() => {

    let gs = ['','','','','','','','',''];

    const renderGrid = () => {
        
        const container = document.querySelector('.container');

        // reset DOM every time rendered
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const squareWidth = 100;

        for (let i = 0; i < 9; i ++) {
            const ticSquare = document.createElement('div');

            ticSquare.classList.add('ticSquare');
            ticSquare.setAttribute('id',i);
            ticSquare.textContent = gs[i]; 

            container.appendChild(ticSquare);
            ticSquare.addEventListener('click', updategs);
        };
    }

    let turnNumber = 1;

    const checkForWin = () => {
        let winning = 0;
        let winningToken = '';
        //check win algo here
        if (gs[0] === gs[1] && gs[1] === gs[2] && gs[0]){
            winning = 1;
            winningToken = gs[0];
        } else if (gs[3] === gs[4] && gs[4] === gs[5] && gs[3]) {
            winning = 1;
            winningToken = gs[3];
        } else if (gs[6] === gs[7] && gs[7] === gs[8] && gs[6]) {
            winning = 1;
            winningToken = gs[6];
        } else if (gs[0] === gs[3] && gs[3] === gs[6] && gs[0]) {
            winning = 1;
            winningToken = gs[0];
        } else if (gs[1] === gs[4] && gs[4] === gs[7] && gs[1]) {
            winning = 1;
            winningToken = gs[1];
        } else if (gs[2] === gs[5] && gs[5] === gs[8] && gs[2]) {
            winning = 1;
            winningToken = gs[2];
        } else if (gs[0] === gs[4] && gs[4] === gs[8] && gs[0]) {
            winning = 1;
            winningToken = gs[0];
        } else if (gs[2] === gs[4] && gs[4] === gs[6] && gs[2]) {
            winning = 1;
            winningToken = gs[2];
        }
        
        if (winning) {
            alert(`The player with the ${winningToken} won!`)
            resetGame();
        }

        // check for grid being full
        if (turnNumber === 10) {
            alert('The game is a tie!')
            resetGame();
        }



    }

    const updategs = (e) => {

        if (gs[e.currentTarget.id] !== '') {
            return;
        }

        if (turnNumber % 2 === 1) {
            gs[e.currentTarget.id] = 'x';
            turnNumber += 1;
        } else {
            gs[e.currentTarget.id] = 'o';
            turnNumber += 1;
        };
        renderGrid();
        checkForWin();
    };

   const resetGame = () => {
    gs = ['','','','','','','','',''];
    turnNumber = 1;
    renderGrid();
   }


    return {
        gs,
        renderGrid,
        turnNumber,
        updategs,
        resetGame,
    };

})();


const startButton = document.querySelector('button');
startButton.addEventListener('click',gameboard.resetGame);

gameboard.renderGrid();
