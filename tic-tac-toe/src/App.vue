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
      var m;
      if (!i || !j || i<0 || i>3 || j<0 || j>3 || !board || board[i-1][j-1]!=0) return;  //someone already moved here; skip rest. 
      board[i-1][j-1] = this.token[this.currentPlayer];
      this.currentPlayer=3-this.currentPlayer;
      m = (i-1)*3+(j-1)%3;
      gameMoves.push(m);
      if (this.currentPlayer == 2) {
        var move = [-1,-1];
        var movePlaces;
        var chosenMove;
        switch (gameMoves[0]) {
          case 4:  // x moves center.   o plays in corner
            switch (gameMoves.length) {
              case 1:
                movePlaces = [0, 2, 6, 8];
                console.log(movePlaces);
                chosenMove = movePlaces[Math.floor(Math.random()*(movePlaces.length+1))];
                move = [Math.floor(chosenMove/3+1), chosenMove%3+1];
                console.log(move);
                this.selectSquare(move[0], move[1]);
                break;
              default:  //block all wins first or move randomly
                movePlaces = [];
                for (var x=0; x<3; x++)
                  for (var y=0; y<3; y++)
                    if (!board[x][y]) movePlaces.push(x*3+y%3); //add all open squares
                console.log(movePlaces);
                m = Math.ceil(Math.random*movePlaces.length);
                for(var item=0; item<movePlaces.length; item++) {
                  switch (item) { // check for possible wins for x and block
                    case 0:
                      if (board[1][1]==board[2][2] || board[0][1] == board[0][2] ||
                      board[1][0] == board[2][0]) m=item;
                      break;
                    case 1:
                      if (board[0][0]==board[0][2] || board[1][1]==board[2][1]) m=item;
                      break;
                    case 2:
                      if (board[0][0] == board[0][1] || board[1][1] == board[2][0]
                      || board[1][2] == board[2][2]) m=item;
                      break;
                    case 3:
                      if (board[0][0] == board[2][0] || board[1][1]==board[1][2]) m=item;
                      break;
                    case 4:
                      if (board[0][0] == board[2][2] || board[0][1]==board[2][1] ||
                          board[0][2] == board[2][0] || board[1][0]==board[1][2]) m=item;
                      break;
                    case 5:
                      if (board[0][2] == board[2][2] || board[1][0]== board[1][1]) m=item;
                      break;
                    case 6:
                      if (board[0][0] == board[1][0] || board[2][1] == board[2][2] || 
                      board[1][1] == board[0][2]) m=item;
                      break;
                    case 7:
                      if (board[2][0] == board[2][2] || board[0][1] == board[1][1]) m=item;
                      break;
                    case 8:
                      if (board[0][2] == board[1][2] || board[2][0]==board[2][1] || 
                      board[0][0]==board[1][1]) m = item;
                      break;
                  }
                }
                move = [Math.floor((m)/3+1), (m)%3+1];
                this.selectSquare(move[0], move[1]);
                console.log("m: "+m+"; Move: "+move);
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