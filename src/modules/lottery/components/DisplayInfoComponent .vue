<template>
  <table class="info-numbers">
    <tr v-for="(data, index) of numbers" :key="data">
      <td class="td-number">
        <span class="index">{{ getIndex(index) }}</span
        ><span v-for="num of data.numbers" :key="num" class="info-number">{{ num }}</span>
      </td>
      <td >{{ data.type }}</td>
      <td >{{ data.date }}</td>
      <td class="td-bet">
        {{ data.bet }}
        <span v-if="data.reventadoBet != ''">
            <span class="reventado-label">(R)</span>
            {{ data.reventadoBet }}
        </span>
      </td>
      <td>
        <Close @click="onDelete(index)" class="option-icon" />
      </td>
    </tr>
  </table>
</template>

<script>
import { Close } from "mdue";

export default {
  name: "DisplayInfoComponent",
  props: {
    numbers: Array,
  },
  components: {
    Close,
  },
  emits: ["on-delete"],
  setup(props, context) {
    return {
      onDelete: (index) => {
        context.emit("on-delete", index);
      },
      getIndex: (index) => {
        let alphabet = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        return alphabet[index];
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.info-numbers {
  width: 100%;
  font-size: 1.2rem;
}

.index {
  color: var(--primary-color);
  margin-right: 5px;
}

.info-number {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background-image: radial-gradient(#fff, #cfcdcd);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1em;
  margin: 0 2px;
}

td {
  padding: 0 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  vertical-align: center;
}

.td-bet {
  text-align: right;
}

.reventado-label {
  color: var(--primary-color);
  margin: 0 4px;
}

.td-number {
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-icon {
  font-size: 2rem;
  border-radius: 50%;
  border: 1px solid rgb(165, 164, 164);
  cursor: pointer;
}
</style>