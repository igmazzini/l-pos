<template>
  <div class="keyboard-buttons">
    <button
      v-for="(button, index) of buttons"
      :key="index"
      :class="getClass(button.value)"  
      :disabled="getDisabled(button.value)"    
      @click.stop="onSelect(button.value)"
    >
      <template v-if="button.value === 'print'"> 
          <Printer class="keyboard-icon"/>
          {{ button.label }}
      </template>
      <template v-else-if="button.value  === 'insert' || button.value === 'confirm'">
          <KeyboardReturn class="keyboard-icon"/>
          {{ button.label }}
      </template>
      <template v-else>
        {{ button.label }}
      </template>
    </button>
  </div>
</template>

<script>

import { useRipple } from "../../shared/composables/useRipple";
import { Printer, KeyboardReturn} from 'mdue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    buttons: Array,
    acceptDisabled:Boolean,
    printDisabled:Boolean,
  },
  components:{
      Printer,
      KeyboardReturn
  },
  emits: ["keyboard-change"],
  setup(props, context) {
    const { t } = useI18n();   
    const { createRipple } = useRipple();
   

    return {
      t,   
      createRipple,
      onSelect: (val) => {
        createRipple(event);
       
        context.emit("keyboard-change", val);
      },
      getClass: (val) => {
        let outClass = "btn keyboard-button";

        if (val === 'print') {
          outClass += " keyboard-button--imprimir";
        }
        if (val === 'insert' || val === 'confirm') {
          outClass += " keyboard-button--aceptar";
        }
        if (val === 'delete' || val === "<" ) {
          outClass += " keyboard-button--secondary";
        }
        if(val === 'delete') {
          outClass += " keyboard-button--delete";
        }
        

        return outClass;
      },
      getDisabled(val){
        if(val === 'print' && props.printDisabled){
          return true;
        }else{
          return false;
        }
      }
    };
  },
};
</script>

<style lang="scss" scoped >
.keyboard-buttons {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 7px;
}

.keyboard-button {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  color: white;
  font-size: 2.7rem;
  font-family: RobotoBlack;
  text-transform: uppercase;
  border: none;
  box-shadow: none;
  background-color: var(--primary-color);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.keyboard-button:nth-child(4),
.keyboard-button:nth-child(11),
.keyboard-button:nth-child(14){
    font-size: 1.5rem;
}

.keyboard-button:active {
    color: var(--secondary-color);
}

.keyboard-button--imprimir {
  background-color: var(--info-color);
  grid-column: 4;
  grid-row: 1/3;
  width: 95%;
  margin-left: 5%;
}
.keyboard-button--aceptar {
  background-color: var(--success-color);
  grid-column: 4;
  grid-row: 3/5;
  width: 95%;
  margin-left: 5%;
}

.keyboard-button--delete{}

.keyboard-button--secondary{
  background-color: var(--secondary-color);
}

.keyboard-icon{
    font-size: 5rem;
    color: white;
}




</style>