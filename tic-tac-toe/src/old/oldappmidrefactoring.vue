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
var board = [0,0,0,0,0,0,0,0,0];
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
      this.board = [0,0,0,0,0,0,0,0,0];
      this.gameMoves = [];
      this.currentPlayer = 1;
    },
    isWinner(player) {
      return (
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
    },
    selectSquare(i) {
      var m, movePlaces;
      if (board[i]) return;  // bad click or possibly bad recursion
      board[i] = this.token[this.currentPlayer];
      gameMoves.push(i);
      this.currentPlayer=3-this.currentPlayer;
      if (this.currentPlayer == 2) {
        if (gameMoves.length==1) {
          // x moves center.   o plays in corner
        movePlaces = [0, 2, 6, 8];
        m = movePlaces[Math.floor(Math.random()*movePlaces.length)];
        console.log(m);
        } else {
          //block all wins first
          movePlaces = [];
          for (var x=0; x<9; x++) 
            if (board[x]===0) movePlaces.push(x); //add all open squares to possible move list
          movePlaces.every(item => {
            if (item==0) { 
              if (board[4]===board[8] || board[1] === board[2] || board[3] === board[6]) 
              { m=0; return false; }
            } else if (item==1) {
              if (board[0]===board[2] || board[4]===board[7]) 
                { m=1; return false; }
            } else if (item==2) {
              if (board[0] === board[1] || board[4] === board[6] || board[5] === board[8]) 
                { m=2; return false; }
            } else if (item==3) {
              if (board[0] === board[6] || board[4]===board[5]) 
                { m=3; return false; }
            } else if (item==4) {
              if (board[0] === board[8] || board[1]===board[7] || board[2] === board[6] || board[3]===board[5]) 
                { m=4; return false; }
            } else if (item==5) {
              if (board[2] === board[8] || board[3]=== board[4]) 
                { m=5; return false; }
            } else if (item == 6) {
              if (board[0] === board[3] || board[7] === board[8] || board[4] === board[2]) 
                { m=6; return false; }
            } else if (item == 7) {
              if (board[6] === board[8] || board[1] === board[4])
                { m=7; return false; }
            } else if (item == 8) {
              if (board[2] === board[5] || board[6]===board[7] || board[0]===board[4]) 
                { m=8; return false; }
            } else return true;
          })
        }
        if (isNaN(m)) m = movePlaces[Math.floor(Math.random()*movePlaces.length)];
        console.log("Possible Moves: "+movePlaces+" chosen: "+m);
        gameMoves.push(m);
        board[m]=this.token[this.currentPlayer];
        this.currentPlayer = 3-this.currentPlayer;
      }
    },
  },
};
</script>

<style scoped>
.board { float: left; width: 220px;}
</style>