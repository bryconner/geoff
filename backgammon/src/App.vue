<template>
  <div class="board">
    <div id="section1">
      <div v-for="i in 6" :key="i">
        <iconx name="pip" :class="pip+i%2" :id="pip+(i+0)"></iconx>
      </div>
    </div>
    <div id="section2">
      <div v-for="i in 6" :key="i">
        <iconx name="pip" :class="pip+i%2" :id="pip+(i+6)"></iconx>
      </div>
      
    </div>
    <div id="section3">
      <div v-for="i in 6" :key="i">
        <iconx name="pip" :class="pip+i%2" :id="pip+(i+12)"></iconx>
      </div>
    </div>
    <div id="section4">
      <div v-for="i in 6" :key="i">
        <iconx name="pip" :class="pip+i%2" :id="pip+(i+18)"></iconx>
      </div>
    </div>
  </div>
  <div id="panel">
  </div>
</template>
