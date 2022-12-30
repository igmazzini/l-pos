<template>
  <div class="display-reventado-bet">
    <p>{{ betLabel }}</p>
    <p @click="onBustedBet">{{ bet }}</p>
    <div  class="form-check form-switch">
      <input ref="switchInput" :disabled="!busteEnabled"  @change="onBustedChange" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
      <label class="form-check-label" for="flexSwitchCheckDefault">{{reventadosLabel}}</label>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default { 
  name:'DisplayBustedBet',
  props: {
    bet: String,
    betLabel: String,
    reventadosLabel: String,
    busteEnabled:Boolean,    
  },
  emits:['on-busted-bet','on-busted-change'],
  setup(props,context){    

    const switchInput = ref(null);  

    const onBustedChange = (event)=>{      
      context.emit("on-busted-change",event.target.checked);
    }
    const onBustedBet = ()=>{      
      context.emit("on-busted-bet");
    }

    const bustedOff = () =>{
        if( switchInput.value.checked ){
          switchInput.value.checked = false;
        }
    }

    return{
      switchInput,
      onBustedChange,
      onBustedBet,
      bustedOff
    }
  }
};
</script>

<style lang="scss" scoped>
.display-reventado-bet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.display-reventado-bet p {
  margin: 0;
  padding: 0;
  font-family: RobotoRegular;
  text-transform: uppercase;
  text-align: center;
}
.display-reventado-bet p:nth-child(1) {
  font-size: 1.1rem;
  color: black;
}
.display-reventado-bet p:nth-child(2){
  font-size: 3.3rem;
  font-family: RobotoLight;
  color: var(--info-color);
}
.form-check-label{
  text-transform: uppercase;
  margin-top: 0.3em;
  margin-left: 1em;
  cursor: pointer;
}
.form-switch .form-check-input {
    width: 2.9em;
    height: 1.8em;  
    cursor: pointer;  
}

.form-switch .form-check-input:checked {
    background-position: right center;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(0, 119, 173)'/%3e%3c/svg%3e");
}

.form-check-input:checked {
    background-color: #acd2e4;
    border-color: #acd2e4;
}

.form-check-input:focus {
    border-color: #acd2e4;
    outline: 0;
    box-shadow: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
}
</style>