import Vue from 'vue'
import Arrow from '~/assets/svg/arrow.svg?inline'
import { hintCurator } from '~/assets/js/hint.constants'

export default Vue.extend({
  components: { Arrow },
  data() {
    return {
      hintCurator,
      toggle: true,
    }
  },
  computed: {
    isAuth(): object | null {
      return this.$store.state.user.data
    },
    isNewUser() {
      return true
    },
    curator(): boolean {
      return this.$store.state.course.withCurator
    },
  },
  methods: {
    openCourseHandler() {
      this.$store.dispatch('course/openModal')
    },
    changeCurator(value: any) {
      this.$store.commit('course/setCurator', value)
    },
  },
})

<template lang="pug">
  .price-tag(:class="{season: isSeason}")
    .price-tag__top
      .price-tag__head
        ToggleSwitch(
          :value="curator"
          @input="changeCurator($event)"
          :isBlack="!isSeason"
          :isPink="isSeason"
          isSmall
        )
        .text-14.semibold {{ curator ? 'с&nbsp;куратором' : 'без&nbsp;куратора' }} 
        Hint(:isInvert="!isSeason")
          | {{ hintCurator }}
      .price-tag__price.price(v-html="price")

    .price-tag__bot
      Button(v-if="isAuth && !isNewUser" @click="openCourseHandler" :isPink="isSeason") Записаться на курс
      a(v-else-if="demo" :href="demo" target="_BLANK" rel="noopener noreferrer")
        Button(:isPink="isSeason") Посмотреть демоверсию

      .price-tag__subscribe(v-if="isAuth && isNewUser" @click="openCourseHandler")
        .text-14.semibold Записаться на курс
        Arrow
      a.price-tag__subscribe(v-else-if="isAuth && demo" :href="demo" target="_BLANK" rel="noopener noreferrer")
        .text-14.semibold Посмотреть демоверсию
        Arrow

</template>

<script lang="ts">
import Vue from 'vue'
import PriceTag from './price-tag.mixin'

export default Vue.extend({
  mixins: [PriceTag],
  props: {
    isSeason: {
      type: Boolean,
      default: false,
    },
    price: {
      type: String,
      default: 'Цена',
    },
    demo: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" src="./style.scss" scoped></style>


 section.container
    .price-tag-inset(
      :style="{'background-image': options.gradient ? `url(${options.gradient})` : ''}"
    )
      .price-tag-inset__title.h2(v-if="options.title" v-html="options.title || ''")
      
      .price-tag-inset__right
        .price-tag-inset__top
          .price-tag-inset__head
            ToggleSwitch(
              :value="curator"
              @input="changeCurator($event)"
              isSmall
              isTransparent
            )
            .text-14.semibold {{ curator ? 'с&nbsp;куратором' : 'без&nbsp;куратора' }} 
            Hint(isWhite)
              | {{ hintCurator }}
          .price-tag-inset__price.price(v-html="options.price")

        .price-tag-inset__bot
          Button(v-if="isAuth && !isNewUser" @click="openCourseHandler" isBlack) Записаться на курс
          a(v-else-if="options.demo" :href="options.demo" target="_BLANK" rel="noopener noreferrer")
            Button(isBlack) Посмотреть демоверсию

          .price-tag-inset__subscribe(v-if="isAuth && isNewUser" @click="openCourseHandler")
            .text-14.semibold Записаться на курс
            Arrow
          a.price-tag-inset__subscribe(v-else-if="isAuth && options.demo" :href="options.demo" target="_BLANK" rel="noopener noreferrer")
            .text-14.semibold Посмотреть демоверсию
            Arrow
</template>

<script lang="ts">
import Vue from 'vue'
import PriceTag from '~/components/CourseHero/PriceTag/price-tag.mixin'

export default Vue.extend({
  mixins: [PriceTag],
  props: {
    content: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>
