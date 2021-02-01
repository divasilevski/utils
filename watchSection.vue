<template lang="pug">
  section.container
    .section-watch
      .section-watch__title.h2 Удобное место и время
      .section-watch__info.text-16 Можно пройти из любой точки мира — нужны только кроссовки и доступ к интернету. Время и место тренировок вы выбираете сами.
      .section-watch__btn
        IconVideo
        .text-14.semibold Посмотри как это будет
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.section-watch {
  padding: 60px 100px;
  background: var(--gradient-gray);
  height: 380px;
  .section-watch__title {
    margin-bottom: 40px;
  }
  .section-watch__info {
    margin-bottom: 40px;
    max-width: 480px;
  }
  .section-watch__btn {
    display: flex;
    align-items: center;

    & > div {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
