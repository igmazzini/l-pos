<template>
  <div class="display-bet">
    <p>{{ betLabel }}</p>
    <p>{{ bet }}</p>
  </div>
</template>

<script>
export default {
  name: "DisplayBetComponent",
  props: {
    bet: Number,
    betLabel: String,
  },
};
</script>

<style lang="scss" scoped>
.display-bet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.display-bet p {
  margin: 0;
  padding: 0;
  font-family: RobotoRegular;
  text-transform: uppercase;
  text-align: center;
}
.display-bet p:first-child {
  font-size: 2rem;
  color: black;
}
.display-bet p:last-child {
  font-size: 4rem;
  font-family: RobotoLight;
  color: var(--info-color);
}
</style>