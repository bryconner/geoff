<template>
<div class="board">
    <div v-if="isWinner('x')"><h3>x wins</h3></div>
    <div v-if="isWinner('o')"><h3>o wins</h3></div>
<form class="board">
  <div v-for="i in 3" :key="i">
    <div v-for="j in 3" :key="j">
      <button 
          v-on:click.prevent="selectSquare(i,j)" 
          :style="cursorStyles(currentPlayer)" >
        <img height="40" width="40" :src="tokenImg(i,j)"/>
      </button>
    </div>
  </div>
  <button @click="restart">clear</button>
 </form>
 </div>
</template>

<script>
var board = [[0,0,0], [0,0,0], [0,0,0]];
var currentPlayer = 1;
const path = ["img/0.png","img/x.png","img/o.png"];
const token = [0, "x", "o"];
var gameMoves = [];
export default {
  name: "App",
  data() {
    return {
      board,
      currentPlayer,
      path,
      token,
      gameMoves,
    };
  },
  methods: {
    convertMove(i, j) {
      const boardtoMove = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
      return boardtoMove[i,j];
    },
    reverseConvertMove(m) {
      const movetoBoard = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [2, 3]];
      return movetoBoard[m];
    },
    computerMoves(i, j) {
      var move;
      var movePlaces;
      var chosenMove;
      i = j;
      j = i;
        switch (gameMoves[0]) {
        case [5]:  // x moves center.   o plays in corner
          movePlaces = [0, 2, 6, 8];
          chosenMove = movePlaces[Math.random(movePlaces.length)];
          if (!this) console.log("This is missing.");
          move = this.reverseConvertMove(chosenMove);
          selectSquare(move[0], move[1]);
          break;
      }
    },
    tokenImg(i,j) {
      var pathij = path[token.indexOf(board[i-1][j-1])];
      return require(`./${pathij}`);
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
      this.board = [[0,0,0], [0,0,0], [0,0,0]];
      this.gameMoves = [];
      this.currentPlayer = 1;
    },
    isWinner(player) {
      return (
          (board[0][0] == player &&
           board[0][1] == player &&
           board[0][2] == player) ||
          (board[1][0] == player &&
           board[1][1] == player &&
           board[1][2] == player) ||
          (board[2][0] == player &&
           board[2][1] == player &&
           board[2][2] == player) ||
          (board[0][0] == player &&
           board[1][0] == player &&
           board[2][0] == player) ||
          (board[0][1] == player &&
           board[1][1] == player &&
           board[2][1] == player) ||
          (board[0][2] == player &&
           board[1][2] == player &&
           board[2][2] == player) ||
          (board[0][0] == player &&
           board[1][1] == player &&
           board[2][2] == player) ||
          (board[0][2] == player &&
           board[1][1] == player &&
           board[2][0] == player)
      );
    },
    selectSquare(i,j) {
      var moved;
      board[i-1][j-1] = this.token[this.currentPlayer];
      currentPlayer=3-currentPlayer;
      moved = convertMove(i, j);
      gameMoves += moved;
      console.log(gameMoves);
      if (this.currentPlayer == 2) {
        computerMoves(i, j);
      }
    },
  },
};
</script>

<style scoped>
.board { float: left; width: 220px;}
</style>