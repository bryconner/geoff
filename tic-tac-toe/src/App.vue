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
var numMoves = 0;
var flag = false;
export default {
  name: "App",
  data() {
    return {
      numMoves,
      board,
      currentPlayer,
      path,
      token,
      flag
    };
  },
  methods: {
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
    },
    isWinner(player) {
      flag = (
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
      return flag;
    },
    selectSquare(i,j) {
      board[i-1][j-1] = this.token[this.currentPlayer];
      this.currentPlayer=3-this.currentPlayer;
    },
  },
};
</script>

<style scoped>
.board { float: left; width: 230px;}
</style>