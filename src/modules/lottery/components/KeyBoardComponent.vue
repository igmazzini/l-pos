<template>
  <div class="keyboard-buttons">
    <button
      v-for="(button, index) of buttons"
      :key="button"
      :class="getActive(index)"      
      @click.stop="onSelect(index)"
    >
      <template v-if="String(button).toLowerCase() === 'imprimir'"> 
          <Printer class="keyboard-icon"/>
          {{ button }}
      </template>
      <template v-else-if="String(button).toLowerCase() === 'aceptar'">
          <KeyboardReturn class="keyboard-icon"/>
          {{ button }}
      </template>
      <template v-else>
        {{ button }}
      </template>
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRipple } from "../../shared/composables/useRipple";
import { Printer, KeyboardReturn} from 'mdue';

export default {
  props: {
    buttons: Array,
  },
  components:{
      Printer,
      KeyboardReturn
  },
  emits: ["keyboard-change"],
  setup(props, context) {
    let currentIndex = ref(0);
    const { createRipple } = useRipple();

    return {
      currentIndex,
      createRipple,
      onSelect: (index) => {
        createRipple(event);
        currentIndex.value = index;
        context.emit("keyboard-change", currentIndex.value);
      },
      getActive: (index) => {
        let outClass = "btn keyboard-button";

        if (props.buttons[index].toLowerCase() === "imprimir") {
          outClass += " keyboard-button--imprimir";
        }
        if (props.buttons[index].toLowerCase() === "aceptar") {
          outClass += " keyboard-button--aceptar";
        }

        return outClass;
      },
    };
  },
};
</script>

<style lang="scss" scoped >
.keyboard-buttons {
  width: 50%;
  height: 60%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 5px;
}

.keyboard-button {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  color: white;
  font-size: 2.7rem;
  font-family: RobotoBlack;
  text-transform: uppercase;
  border: none;
  box-shadow: none;
  background-color: var(--primary-color);
  position: relative;
  overflow: hidden;
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
}
.keyboard-button--aceptar {
  background-color: var(--success-color);
  grid-column: 4;
  grid-row: 3/5;
}

.keyboard-icon{
    font-size: 5rem;
    color: white;
}


</style>