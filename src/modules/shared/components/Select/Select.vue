<template>
  <div class="select-container">
    <ul class="select-options">
      <li
        class="select-option"
        v-for="option of options"
        :key="option"
        @click="onSelect(option)"
      >
        {{ option?.label }}
      </li>
    </ul>
    <div class="select-value-container">
      <input
        ref="inputValue"
        class="select-value"
        @blur="onBlur"
        @click="openOptions"
        readonly
        type="text"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "Select",
  props: {
    options: {
      type: Array,
      required: true,
    },
    selectedOption: {
      type: Number,
    },
  },
  emits: ["on-select"],
  setup(props, contex) {
    const inputValue = ref(null);
    const showOptions = ref(false);

    const onSelect = (option) => {
      inputValue.value.value = option.label;

      console.log(inputValue.value.value);

      contex.emit("on-select", option);

      onBlur();
    };

    const onBlur = () => {
      setTimeout(() => {
        document.querySelector(".select-options").classList.add("hide-menu");
        document.querySelector(".select-options").classList.remove("show-menu");
      }, 150);
    };

    const openOptions = () => {
      document.querySelector(".select-options").classList.remove("hide-menu");
      document.querySelector(".select-options").classList.add("show-menu");
    };

    onMounted(() => {
      if (props.selectedOption) {
        inputValue.value.value = props.options[props.selectedOption].label;
      } else {
        inputValue.value.value = props.options[0].label;
      }
    });

    return {
      inputValue,
      showOptions,
      openOptions,
      onSelect,
      onBlur,
    };
  },
};
</script>

<style lang='scss' scoped>
.select-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  z-index: 1000;
}

.select-value-container {
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: var(--info-color);
}

.select-value {
  width: 100%;
  font-family: RobotoLight;
  font-size: 1em;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  color: var(--info-color);
  padding: 3px;
  border: none;
}

.select-options {
  list-style: none;
  position: absolute;
  top: -30px;
  opacity: 0;
  left: 0px;
  width: 100%;
  padding: 0;
  background-color: whitesmoke;
  z-index: 9;
  border: 1px solid var(--info-color);
  pointer-events: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all;
}

.select-option {
  font-family: RobotoLight;
  font-size: 1em;
  color: var(--info-color);
  padding: 3px;
  cursor: pointer;
}

.select-option:hover {
  background-color: #2ca6df60;
}

.show-menu {
  animation: show-animation ease-in-out;
  animation-duration: 300ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  pointer-events: all;
}

.hide-menu {
  animation: hide-animation ease-in-out;
  animation-duration: 300ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  pointer-events: none;
}

@keyframes show-animation {
  0% {
    opacity: 0;
    top: -35px;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    top: 35px;
  }
}

@keyframes hide-animation {
  0% {
    opacity: 1;
    top: 35px;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    top: -35px;
  }
}

@media screen and(max-width:1300px) {


    .select-options{
       
       padding: 5px;
       width: auto;
       transform: translateX(-20%);
       
    }

    .select-option {
        font-size: 1.5em;
    }


  @keyframes show-animation {
    0% {
      opacity: 0;
      top: -25px;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      top: 25px;
    }
  }

  @keyframes hide-animation {
    0% {
      opacity: 1;
      top: 25px;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      top: -25px;
    }
  }
}
</style>