//Winning combinations array 

const playerSquareClasses = {
  Player1: 'player1',
  Player2: 'player2'
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ]
  
  
  //accessing HTMl Elements using Jquery and storing them in variables.
  const $cellClickNL = $('.cell')
  const $winnerMessage = $('#playerTurn')
  const $resetButton = $('#resetBTN')
  
  //When reset is clicked, remove cell class to get rid of styling and render board
  const resetCellClass = () => {
    $($cellClickNL).each(function (idx, cell) {
      $(cell).removeClass(playerSquareClasses.Player1)
      $(cell).removeClass(playerSquareClasses.Player2)
      $(cell).text('')
    })
  }
  
  
  //initialize function-> When game loads or reset button clicked
  let turn, gameboardArr, winner
  const initialize = () => {
    turn = 1
    gameBoardArr = [null, null, null, null, null, null, null, null, null]
    winner = ''
    $winnerMessage.text(`Player ${turn} starts`)
    resetCellClass()
  }
  
 
  
  
  
  //Display message with player number once a winning combination is detected
  
  const displayWinnerMessage = () => {
    if (turn % 2 === 1) {
      winner = 'Player 1 has won!'
    } else { winner = 'Player 2 has won!' }
    $winnerMessage.text(winner)
  
  }
  
  //logic to determine winner
  function getWinner() {
    let playerHasWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
      const combo = winningCombinations[i]
  
  
      const winningComboSq1 = gameBoardArr[combo[0]]
      const winningComboSq2 = gameBoardArr[combo[1]]
      const winningComboSq3 = gameBoardArr[combo[2]]
  
  
      //Checking to make sure all 3 squares in the winning combo are the same and not equal too null
      playerHasWon = winningComboSq1 === winningComboSq2 && winningComboSq2 === winningComboSq3 && winningComboSq2 !== null
  
      if (playerHasWon) {
        displayWinnerMessage()
  
      }
      //Tie logic
      if (turn === 9 && !playerHasWon) { $winnerMessage.text('it is a tie!') }
  
  
    }
  }
  
  
  //Taking the clicked cell and adding a class to show X or O
  const addToGameBoard = (cell) => {
  
    if (gameBoardArr[cell.id] === null) {
      if (turn % 2 === 1) {
        gameBoardArr[cell.id] = 'red'
        $(cell).addClass(playerSquareClasses.Player1)
        $(cell).text('X')
      } else {
        gameBoardArr[cell.id] = 'blue'
        $(cell).addClass(playerSquareClasses.Player2)
        $(cell).text('O')
      }
      console.log(gameboardArr)
      getWinner();
      turn += 1
  
    }
  
  }
  
  //Event listeners for each of the cells
  const createGameClickHandlers = (arr) => {
    const iterateCells = $($cellClickNL).each(function (idx, $cell) {
      $($cell).on('click', () => addToGameBoard($cell))
    })
    $($resetButton).on('click', resetButtonClicked)
  }
  
  
  //When reset button is clicked, return the game back to initial state
  const resetButtonClicked = () => {
    initialize()
  }
  
  createGameClickHandlers()
  initialize()