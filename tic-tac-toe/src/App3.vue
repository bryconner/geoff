<template>
<div class="board">
    <div v-if="isWinner('x')"><h3>x wins</h3></div>
    <div v-if="isWinner('o')"><h3>o wins</h3></div>
<form class="board">
  <div v-for="i in 9" :key="i">
    <button 
        v-on:click.prevent="selectSquare(i-1)" 
        :style="cursorStyles(currentPlayer)" >
      <img height="40" width="40" :src="tokenImg(i-1)"/>
    </button>
  </div>
  <button @click="restart">clear</button>
 </form>
 </div>
</template>

<script>
var gameDone = false;
var board = [0,0,0,0,0,0,0,0,0];
var currentPlayer = 1;
const path = ["img/0.png","img/x.png","img/o.png"];
const token = [0, "x", "o"];
const moveData = [[0, [0, [4, 8]]], [1, [0, [1, 2]]], 
                  [2, [0, [3, 6]]], [3, [1, [0, 2]]], 
                  [4, [1, [4, 7]]], [5, [2, [0, 1]]], 
                  [6, [2, [4, 6]]], [7, [2, [5, 8]]],
                  [8, [3, [0, 6]]], [9, [3, [4, 5]]], 
                  [10, [4, [0, 8]]], [11, [4, [1, 7]]], 
                  [12, [4, [2, 6]]], [13, [4, [3, 5]]], 
                  [14, [5, [2, 8]]], [15, [5, [3, 4]]],
                  [16, [6, [0, 3]]], [17, [6, [7, 8]]],
                  [18, [6, [2, 4]]], [19, [7, [6, 8]]],
                  [20, [7, [1, 4]]], [21, [8, [2, 5]]],
                  [22, [8, [6, 7]]], [23, [8, [0, 4]]] ];
var gameMoves = [];
export default {
  name: "App",
  data() {
    return {
      gameDone,
      board,
      currentPlayer,
      path,
      token,
      moveData,
      gameMoves,
    };
  },
  methods: {
    tokenImg(i) {
      var pathi, x;
      x = token.indexOf(board[i]);
      pathi = path[x];
      return require(`./${pathi}`);
    },
    cursorStyles(i) {
      var pathi = path[i];
      return {
        cursor: "url("+require(`./${pathi}`)+"), grab",
        float: "left",
        width: "70px",
        height: "70px",
      }
    },
    restart() {
      board = [0,0,0,0,0,0,0,0,0];
      gameMoves = [];
      currentPlayer = 1;
      gameDone = false;
    },
    isWinner(player) {
      var flag;
      flag = (
          (board[0] == player &&
           board[1] == player &&
           board[2] == player) ||
          (board[3] == player &&
           board[4] == player &&
           board[5] == player) ||
          (board[6] == player &&
           board[7] == player &&
           board[8] == player) ||
          (board[0] == player &&
           board[3] == player &&
           board[6] == player) ||
          (board[1] == player &&
           board[4] == player &&
           board[7] == player) ||
          (board[2] == player &&
           board[5] == player &&
           board[8] == player) ||
          (board[0] == player &&
           board[4] == player &&
           board[8] == player) ||
          (board[2] == player &&
           board[4] == player &&
           board[6] == player)
      );
      if (flag) gameDone = true;
      return flag;
    },
    boardLogic(x, y, z){
      if ((this.board[y] === this.board[z]) && this.board[y])
        if (this.board[y] === 'o')
          return [moveData[x][0], 2];
        else if (this.board[y] === 'x')
          return [moveData[x][0], 1];
      else return [];
    },
    selectSquare(i) {
      var m = -1, movePlaces;
      var bestMove = [], betterMovePlaces = [];
      if (board[i]||gameDone) return;  // bad click or possibly bad recursion
      board[i] = this.token[this.currentPlayer];
      gameMoves.push(i);
      this.currentPlayer = 3-this.currentPlayer;
      // logic for 'o'
      if (this.currentPlayer == 2) {
        if (gameMoves.length<3) {
          // x moves center.   o plays in corner
          movePlaces = [0, 2, 6, 8];
          m = movePlaces[Math.floor(Math.random()*movePlaces.length)];
        } else {
          //block all wins first but better is to move to win
          movePlaces = []; 
          for (var x=0; x<9; x++) 
            if (!board[x]) movePlaces.push(x); 
          bestMove = [];
          var n = [];
          for (x=0; x<moveData.length; x++) {
            n = this.boardLogic(x, moveData[x][1][0], moveData[x][1][1]);
            console.log(n);
            if (!n || !n.length) continue;
            if (n[1]==this.currentPlayer) bestMove.push(n[0]);
            else betterMovePlaces.push(n[0]);
          }
        }
        if (bestMove.length) m = bestMove[Math.floor(Math.random() * bestMove.length)];
        else if (betterMovePlaces.length) m = betterMovePlaces[Math.floor(Math.random()*betterMovePlaces)];
        else if (movePlaces.length) m = movePlaces[Math.floor(Math.random() * movePlaces.length)];
        else m = movePlaces[Math.floor(Math.random()*movePlaces.length)];
        console.log("Possible Moves: "+movePlaces);
        console.log("Move Candidates:"+betterMovePlaces);
        console.log("Best: "+bestMove);
        console.log("Chosen"+m);
          this.selectSquare(m);
//        gameMoves.push(m);
//        board[m] = this.token[this.currentPlayer];
//        this.currentPlayer = 3-this.currentPlayer;
      } 
    },
  },
};
</script>

<style scoped>
.board { float: left; width: 220px;}
</style>