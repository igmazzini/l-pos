<template>
  <div class="game-layout">
    <div class="game-layout-info">Info</div>
    <div class="game-layout-display">      
      <SelectTypeComponent :buttons="['test', 'test', 'test']" />
    </div>
    <div class="game-layout-controls">Controls</div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: "Lotto",
  components:{    
    SelectTypeComponent:defineAsyncComponent( ()=> import('../components/SelectTypeComponent.vue')) 
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/tresMonazos.scss";
</style>