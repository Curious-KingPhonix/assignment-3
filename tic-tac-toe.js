// Copyright 2022 Kyle King
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let board = ['','','','','','','','','']
const winPaths = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [2,4,6]
]
const marks = ['O','X']
let player = 0
let gameOver = false
function winCondition(){
    let res = false
    winPaths.forEach(path => {
        if(
            marks[player] === board[path[0]]
            && board[path[0]] === board[path[1]] 
            && board[path[1]] === board[path[2]]
            ) res = true
    })
    return res
}

// Initalize all tiles in the game.
document.addEventListener('DOMContentLoaded',(evt)=>{
    const gameStatus = document.getElementById('status')
    const tiles = document.getElementById('board').children
    document.getElementsByClassName('btn')[0].onclick = (evt)=>{
        gameOver = false
        gameStatus.classList.remove("you-won")
        gameStatus.textContent = 'Move your mouse over a square and click to play an X or an O.'
        for( i = 0 ; i <tiles.length ; i++) tiles[i].textContent = '';
        board = ['','','','','','','','','']
    }
    for(i = 0 ; i < tiles.length ; i++){
        const tile = tiles[i]
        tile.classList.add('square')
        tile.id = `${i}`
        tile.addEventListener('click',(evt)=>{
            const index = evt.currentTarget.id
            if( board[index] === ''  && !gameOver) {
                const tile = document.getElementById(index)
                board[index] = marks[player]
                tile.classList.add(marks[player])
                tile.textContent = marks[player]
                gameOver = winCondition()
                if( gameOver ) {
                    gameStatus.classList.add('you-won')
                    gameStatus.textContent = `Congratulations! ${marks[player]} is the Winner!`
                }
                player = ++player % 2
            }
        })
        tile.addEventListener('mouseover',(evt)=>{
            document.getElementById(evt.currentTarget.id).classList.add('hover')
        })
        tile.addEventListener('mouseleave',(evt)=>{
            document.getElementById(evt.currentTarget.id).classList.remove('hover')
        })
    }
})