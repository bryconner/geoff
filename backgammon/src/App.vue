<template>
  <div id="backgammon">
  <div id="board">
    <div id="section1">
      <div v-for="i in 6" :key="i">
        <iconx name="icon-pip" :class="pip+(i%2)" :id="pip+(i+0)"></iconx>
      </div>
    </div>
    <div id="section2">
      <div v-for="i in 6" :key="i">
        <iconx name="icon-pip" :class="pip+(i%2)" :id="pip+(i+6)"></iconx>
      </div>     
    </div>
    <div id="section3">
      <div v-for="i in 6" :key="i">
        <iconx name="icon-pip" :class="pip+(i%2)" :id="pip+(i+12)"></iconx>
      </div>
    </div>
    <div id="section4">
      <div v-for="i in 6" :key="i">
        <iconx name="icon-pip" :class="pip+(i%2)" :id="pip+(i+18)"></iconx>
      </div>
    </div>
  <div id="panel">
  </div>
  </div>
  </div>
  
</template>
<script>
import iconx from "vue-svg-iconx";
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(require.context("./assets/svg/", false, /\.svg$/));
export default {
  name: "App",
  components: { iconx },
  data() {
    return {

    };
  },
}
</script>
<style>
#board { background: url(./assets/board.jpg); width: .80vw;}
.pip0 { color: rgb(26, 26, 26);}
.pip1 { color: rgb(223, 223, 223);}
#backgammon, #board, #section1, #section2, #section3, #section4, #panel { float: left; }
</style>
