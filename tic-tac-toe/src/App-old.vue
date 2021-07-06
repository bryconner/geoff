<template>
  <div v-if="xWins || oWins">
    <div v-if="xWins">x wins</div>
    <div v-if="oWins">o wins</div>
    <button @click="restart">restart</button>
  </div>
  <form v-else>
    <div v-for="i in 3" :key="i">
      <span v-for="j in 3" :key="j">
        <input v-model.trim="board[i-1][j-1]" style="width: 20px" />
      </span>
    </div>
  </form>
</template>

<script>
const board = [[], [], []];

export default {
  name: "App",
  data() {
    return {
      board,
    };
  },
  computed: {
    xWins() {
      return this.isWinner("x");
    },
    oWins() {
      return this.isWinner("o");
    },
  },
  methods: {
    restart() {
      this.board = [[], [], []];
    },
    isWinner(player) {
      const { board } = this;
      return (
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
    },
  },
};
// completely from project book: Au-Yeung, John. 62 Vue 3 Beginner Projects (p. 233). Kindle Edition. 
</script>
