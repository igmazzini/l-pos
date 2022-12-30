<template>
  <div class="display-bet">
    <p>{{ betLabel }}</p>
    <p @click="onBet" >{{ bet }}</p>
  </div>
</template>

<script>

export default { 
  props: {
    bet: String,
    betLabel: String,
  },
  emits:['on-bet'],
  setup(props,context){

   

    const onBet = () =>{
      context.emit('on-bet');
    }

    return{
      onBet,
    
    }
  }
};
</script>

<style lang="scss" scoped>
.display-bet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.display-bet p {
  margin: 0;
  padding: 0;
  font-family: RobotoRegular;
  text-transform: uppercase;
  text-align: center;
}
.display-bet p:first-child {
  font-size: 1.1rem;
  color: black;
}
.display-bet p:last-child {
  font-size: 3.3rem;
  font-family: RobotoLight;
  color: var(--info-color);
}
</style>