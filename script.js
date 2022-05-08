//global variables
let pos1 = document.querySelector('#one')
let pos2 = document.querySelector('#two')
let pos3 = document.querySelector('#three')
let pos4 = document.querySelector('#four')
let pos5 = document.querySelector('#five')
let pos6 = document.querySelector('#six')
let pos7 = document.querySelector('#seven')
let pos8 = document.querySelector('#eight')
let pos9 = document.querySelector('#nine')
let anyPos = document.querySelectorAll('.block')
let winner = document.querySelector('.winnerText')
let singlePlayer = document.querySelector('#single')
let multiPlayer = document.querySelector('#multi')
let xTurn = true;
let numberOfPlayers = 2

anyPos.forEach((block)=>{
  block.addEventListener('click', markPos)
});
singlePlayer.addEventListener('click', singlePlayerGame)
multiPlayer.addEventListener('click', multiPlayerGame)
document.querySelectorAll('.reset').forEach(button => {
  button.addEventListener('click', reset)
})

//activate single player game
function singlePlayerGame() {
  singlePlayer.classList.add('active');
  multiPlayer.classList.remove('active');
  numberOfPlayers = 1 
  xTurn = true
  reset()
  console.log(numberOfPlayers)
}
//activate multi player game
function multiPlayerGame() {
  multiPlayer.classList.add('active');
  singlePlayer.classList.remove('active');
  numberOfPlayers = 2
  reset()
  console.log(numberOfPlayers)
}

//place markers
function markPos(){
  if (numberOfPlayers == 2 && winner.innerText == ''){
      if (xTurn && this.innerText === '') {
        this.innerText = 'X'
        winCheck()
        xTurn = false
      } else if (!xTurn && this.innerText === '') {
          this.innerText = 'O'
          winCheck()
          xTurn = true
    }
  } else if( numberOfPlayers == 1 && winner.innerText == ''){
       if (xTurn && this.innerText === '') {
        console.log('single Player Mode Activated')
         this.innerText = 'X'
         xTurn = false
        winCheck()
         if (winner.innerText == ''){
          setTimeout(() => {
            let emptyPos =  [...anyPos].filter(pos => pos.innerText === '')
            let index = Math.floor(Math.random() * emptyPos.length)
            emptyPos[index].innerText = 'O'
            winCheck() 
            xTurn = true
          }, Math.random() * 1500) 
          
         }
      } 
  }
}
//check for winner
function winCheck() {
  // Wins
  let winningPlayer = ''
  let allPos = [
    pos1.innerText,
    pos2.innerText, 
    pos3.innerText, 
    pos4.innerText, 
    pos5.innerText, 
    pos6.innerText, 
    pos7.innerText, 
    pos8.innerText, 
    pos9.innerText
  ]
  let noWinner =  allPos.map(block => block != '' ? block = 1 :  block = 0).reduce((acc, num) => acc + num, 0)
  let strike = ''
  console.log('strike =' + strike)
  let winCases = {
    win123:[pos1, pos2, pos3],
    win456:[pos4, pos5, pos6],
    win789:[pos7, pos8, pos9],
    win147:[pos1, pos4, pos7],
    win258:[pos2, pos5, pos8],
    win369:[pos3, pos6, pos9],
    win159:[pos1, pos5, pos9],
    win357:[pos3, pos5, pos7]
  }

  for (let key in winCases){
    let isWin = winCases[key].every(pos => pos.innerText && pos.innerText === winCases[key][0].innerText)
    if (isWin){
      strike = key
      document.querySelector('.'+strike).style.visibility = 'visible'
      winningPlayer = winCases[key][0].innerText
      break
    }
  }
  if (winningPlayer != '') { 
    winner.innerText = `${winningPlayer} Wins!!`
    document.querySelector('.popup').classList.remove('invisible')
  }else if (noWinner == 9){
    winner.innerText = 'Draw!'
    document.querySelector('.popup').classList.remove('invisible')
  }
}

//reset resets board on click
function reset() {
  document.querySelectorAll('.block').forEach((block)=>{
    block.innerText = ""
  })
  winner.innerText = ""
  xTurn = true
  document.querySelectorAll('.strike').forEach((line)=>{
    line.style.visibility = 'hidden'
  })
  document.querySelector('.popup').classList.add('invisible')
}

// Reset game at site load
reset()

// color picker
let colors = ['blue', 'pink', 'green']
colors.forEach((color)=>{
  let element = document.getElementById(color)
  element.addEventListener('click', () => {makeColor(element)})
})

function makeColor(e){
  let color = e.getAttribute('id')
  document.querySelector('body').classList.remove('blue', 'pink', 'green')//add loop on colors to remove IDs 
  document.querySelector('body').classList.add(color)
}

