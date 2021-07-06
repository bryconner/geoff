<template>
<div class="board" v-if="xWins || oWins">
    <div v-if="xWins">x wins</div>
    <div v-if="oWins">o wins</div>
    <button @click="restart">restart</button>
</div>
<form class="board" v-else >
  <div v-for="i in 3" :key="i">
    <div v-on:click.prevent="selectSquare(i,j)" v-for="j in 3" :key="j">
      <button :style="cursorStyles(currentPlayer)" >
        <img height="40" width="40" :src="tokenImg(i,j)"/>
      </button>
    </div>
  </div>
  <button @click="restart">clear</button>
</form>

</template>

<script>
var board = [[0,0,0], [0,0,0], [0,0,0]];
var currentPlayer = 1;
const path = ["img/0.png","img/x.png","img/o.png"];
const token = [0, "x", "o"];
export default {
  name: "App",
  data() {
    return {
      board,
      currentPlayer,
      path,
      token
    };
  },
  computed: 
  {
    xWins() {
      return this.isWinner("x");
    },
    oWins() {
      return this.isWinner("o");
    },
    playerNum() { return currentPlayer; },
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
      const {board} = this;
      console.log(player+":"+board[0][0]);
      var flag = (
          (board[0][0] === player &&
           board[0][1] === player &&
           board[0][2] === player) ||
          (board[1][0] === player &&
           board[1][1] === player &&
           board[1][2] === player) ||
          (board[2][0] === player &&
           board[2][1] === player &&
           board[2][2] === player) ||
          (board[0][0] === player &&
           board[1][0] === player &&
           board[2][0] === player) ||
          (board[0][1] === player &&
           board[1][1] === player &&
           board[2][1] === player) ||
          (board[0][2] === player &&
           board[1][2] === player &&
           board[2][2] === player) ||
          (board[0][0] === player &&
           board[1][1] === player &&
           board[2][2] === player) ||
          (board[0][2] === player &&
           board[1][1] === player &&
           board[2][0] === player)
      );
      console.log(flag);
      return flag;
    },
    selectSquare(i,j) {
     if (board[i-1][j-1]!=0) return;
      board[i-1][j-1] = this.token[this.currentPlayer];
      this.currentPlayer=3-this.currentPlayer;
    },
  },
};
</script>

<style scoped>
.board { float: left; width: 230px;}
</style>