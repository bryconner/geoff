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
      var m, chosenMove;
      if (i<0 || i>8 || !board || board[i]!=0) return;  //someone already moved here; skip rest. 
      board[i] = this.token[this.currentPlayer];
      gameMoves.push(i);
      this.currentPlayer=3-this.currentPlayer;
      if (this.currentPlayer == 2) {
        var movePlaces;
        switch (gameMoves[0]) {
          case 4:  // x moves center.   o plays in corner
            switch (gameMoves.length) {
              case 1:
                movePlaces = [0, 2, 6, 8];
                chosenMove = movePlaces[Math.floor(Math.random()*(movePlaces.length))];
                this.selectSquare(chosenMove);
                break;
              default:  //block all wins first or move randomly
                movePlaces = [];
                for (var x=0; x<9; x++)
                  if ((board[x]!="x" && board[x]!="o")) movePlaces.push(x); //add all open squares 
                m = Math.floor(Math.random()*movePlaces.length);  // fallback move to random available square
                console.log(board);
                movePlaces.forEach(function(item) {
                  switch (item) { // check for possible wins for x and block
                    case 0:
                      if (board[4]===board[8] || board[1] === board[2] ||
                      board[3] === board[6]) m=0;
                      break;
                    case 1:
                      if (board[0]===board[2] || board[4]===board[7]) m=1;
                      break;
                    case 2:
                      if (board[0] === board[1] || board[4] === board[6]
                        || board[5] === board[8]) m=2;
                      break;
                    case 3:
                      if (board[0] === board[6] || board[4]===board[5]) m=3;
                      break;
                    case 4:
                      if (board[0] === board[8] || board[1]===board[7] ||
                          board[2] === board[6] || board[3]===board[5]) m=4;
                      break;
                    case 5:
                      if (board[2] === board[8] || board[3]=== board[4]) m=5;
                      break;
                    case 6:
                      if (board[0] === board[3] || board[7] === board[8] || 
                      board[4] === board[2]) m=6;
                      break;
                    case 7:
                      if (board[6] === board[8] || board[1] === board[4]) m=7;
                      break;
                    case 8:
                      if (board[2] === board[5] || board[6]===board[7] || 
                      board[0]===board[4]) m=8;
                      break;
                  }
                });
                console.log("Possible Moves:"+movePlaces+"chosen: "+m);
                this.selectSquare(m);
                
             }
        } 
      }
    },
  },
};
</script>

<style scoped>
.board { float: left; width: 220px;}
</style>