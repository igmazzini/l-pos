<template>
  <div class="date-buttons">
    <button
      :disabled="getDateDisabled()"
      :class="getActive()"
      @click.stop="onSelectDate"
    >
      {{ weekDay }} {{ date }}
    </button>
    <button
      :disabled="getTimeDisabled(time)"
      v-for="(time, index) of times"
      :key="index"
      :class="getTimeActive(index)"
      @click.stop="onSelectTime(index)"
    >
      {{ time }}
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  props: {
    index: Number,
    date: String,
    weekDay: String,
    times: Array,
    morningTime: String,
    nightTime: String,
    today: Boolean,
    default: Number,
  },
  emits: ["date-change", "time-change"],
  setup(props, context) {
    const data = { on: "", time: "", index: "" };
    const currentTimeIndex = ref(0);
    const dateOn = ref(false);
    let disabled = false;
    let morningDisabled = false;

    const checkLimitTime = () => {
      let currentDate = new Date();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();
      let nowTime = hours + ":" + minutes + ":" + seconds;
      let limitMorningTime = props.morningTime + ":00";
      let limitNightTime = props.nightTime + ":00";

      let nowDate = new Date(currentDate.getTime());
      nowDate.setHours(nowTime.split(":")[0]);
      nowDate.setMinutes(nowTime.split(":")[1]);
      nowDate.setSeconds(nowTime.split(":")[2]);

      let limitMorningDate = new Date(currentDate.getTime());
      limitMorningDate.setHours(limitMorningTime.split(":")[0]);
      limitMorningDate.setMinutes(limitMorningTime.split(":")[1]);
      limitMorningDate.setSeconds(limitMorningTime.split(":")[2]);

      let limitNightDate = new Date(currentDate.getTime());
      limitNightDate.setHours(limitNightTime.split(":")[0]);
      limitNightDate.setMinutes(limitNightTime.split(":")[1]);
      limitNightDate.setSeconds(limitNightTime.split(":")[2]);

      if (props.today) {
        if (nowDate > limitMorningDate) {
          morningDisabled = true;
          currentTimeIndex.value = 1;
        } else {
          morningDisabled = false;
          currentTimeIndex.value = 0;
        }

        dateOn.value = true;

        if (nowDate > limitNightDate) {
          dateOn.value = false;
          disabled = true;
          currentTimeIndex.value = 0;
        } else {
          disabled = false;

          if (props.default == props.index) {
            dateOn.value = true;
          }
        }
      } else {
        disabled = false;

        if (props.default == props.index) {
          dateOn.value = true;
        }
      }
    };

    const getDateDisabled = () => {
      return disabled;
    };

    const getTimeDisabled = (time) => {
      if (disabled) {
        return true;
      }

      if (time.toLowerCase() == "m" && morningDisabled) {
        return true;
      } else {
        return false;
      }
    };

    onMounted(() => {
      checkLimitTime();
    });

    return {
      currentTimeIndex,
      dateOn,
      getDateDisabled,
      getTimeDisabled,
      onSelectTime: (index) => {
        if (!data.on) return;
        currentTimeIndex.value = index;
        data.on = dateOn.value;
        data.time = currentTimeIndex.value;
        data.index = props.index;
        context.emit("time-change", data);
      },
      onSelectDate: () => {
        dateOn.value = !dateOn.value;
        data.on = dateOn.value;
        if (!data.on) {
          currentTimeIndex.value = 0;
        } else {
          checkLimitTime();
        }

        data.time = currentTimeIndex.value;
        data.index = props.index;
        context.emit("date-change", data);
      },
      getActive: () => {
        if (dateOn.value) {
          return "btn date-button date-button--active";
        } else {
          return "btn date-button";
        }
      },
      getTimeActive: (index) => {
        if (currentTimeIndex.value === index && dateOn.value) {
          return "btn time-button time-button--active";
        } else {
          return "btn time-button";
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped >
.date-buttons {
  width: 100%;
  margin: 0;
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
}

.date-button,
.time-button {
  height: 40px;
  width: 100%;
  border-radius: 5px;
  color: white;
  font-size: 1.3rem;
  font-family: RobotoBlack;
  text-transform: uppercase;
  border: none;
  box-shadow: none;
  padding: 2px;
  background-color: var(--secondary-color);
}
.date-button {
  grid-column: 1/3;
  grid-row: 1;
  height: 50px;
}
.time-button:first-child {
  grid-column: 1/2;
  grid-row: 2;
}
.time-button:last-child {
  grid-column: 2/3;
  grid-row: 2;
}

.date-button--active,
.time-button--active {
  background-color: var(--warning-color);
}

@media screen and (max-width: 1300px) {
  .date-button,
  .time-button {
    height: 35px;
  }
}
</style>