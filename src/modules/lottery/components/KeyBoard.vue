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
         
          <span class="keyboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" :width="!mobile ? 68 : 58" :height="!mobile ? 68 : 58" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
              <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
              <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
            </svg>
          </span>
          {{ button.label }}
      </template>
      <template v-else-if="button.value  === 'insert' || button.value === 'confirm'">
          
          <span class="keyboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" :width="!mobile ? 68 : 58" :height="!mobile ? 68 : 58" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </span>
          {{ button.label }}
      </template>
      <template v-else>
        {{ button.label }}
      </template>
    </button>
  </div>
</template>

<script>

import { useRipple } from "@/modules/shared/composables/useRipple";
import { useI18n } from 'vue-i18n';
import { useUI } from '@/modules/shared/composables/useUI';

export default {
  props: {
    buttons: Array,
    acceptDisabled:Boolean,
    printDisabled:Boolean,
  }, 
  emits: ["keyboard-change"],
  setup(props, context) {

    const { t } = useI18n();   
    const { createRipple } = useRipple();
    const { mobile } = useUI();
   

    return {
      t,   
      createRipple,
      mobile,
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

  svg{
    vertical-align: middle;
  }
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