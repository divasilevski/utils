<template lang="pug">
  .sticky-bar
    .sticky-bar__item.text-26(
      v-for="(option, key) in options"
      :key="'sticky-' + key"
      :class="{active: active === key}"
      @click="scrollTo(`#${key}`)"
    )
      | {{ option }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      fixed: false,
      active: '',
    }
  },
  mounted() {
    const $stickyBar = this.$el as HTMLElement
    const offsetTop = $stickyBar.offsetTop

    this.active = this.$route.hash.slice(1, this.$route.hash.length - 1)
    this.scrollTo(`#${this.active}`)

    window.onscroll = () => {
      if (window.pageYOffset >= offsetTop) {
        $stickyBar.classList.add('fixed')
      } else {
        $stickyBar.classList.remove('fixed')
      }
      let fromTop = window.pageYOffset || document.documentElement.scrollTop
      Object.keys(this.options).forEach((key) => {
        let section = document.querySelector(`#${key}`) as HTMLElement
        if (
          document.documentElement.scrollHeight -
            fromTop -
            document.documentElement.clientHeight <
          50
        ) {
          if (location.hash !== `#insta`) {
            history.replaceState({}, '', `#insta`)
            this.active = 'insta'
          }
        } else if (
          section.offsetTop - 150 <= fromTop &&
          section.offsetTop - 150 + section.offsetHeight > fromTop
        ) {
          if (location.hash !== `#${key}`) {
            this.active = key
            history.replaceState({}, '', `#${key}`)
          }
        }
      })
    }
  },
  methods: {
    scrollTo(hash: string) {
      const $el = document.querySelector(hash) as HTMLElement
      if ($el) {
        window.scrollTo({ top: $el.offsetTop - 100, behavior: 'smooth' })
        // history.pushState({}, '', hash)
      }
    },
  },
  beforeDestroy() {
    window.onscroll = null
  },
})
</script>

<style lang="scss" scoped>
.sticky-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin: 8px 0;
  z-index: 18;
  &.fixed {
    position: fixed;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: flex-start;
    background: linear-gradient(180deg, #ffffff 50%, transparent 100%);
    .sticky-bar__item {
      margin-top: 22px;
    }
  }
  .sticky-bar__item {
    position: relative;
    cursor: pointer;
    z-index: 19;
    &:not(:last-child) {
      margin-right: 40px;
    }
    a {
      text-decoration: none;
      color: var(--color);
    }
    &.active {
      font-weight: bold;
      &::after {
        content: '';
        z-index: -1;
        position: absolute;
        top: -8px;
        bottom: -8px;
        left: -20px;
        right: -20px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
        border-radius: 30px;
        background: var(--color-secondary);
      }
    }
  }
}

section {
  border-top: 100px solid transparent;
  margin-top: -100px;
  background-clip: padding-box;
}
</style>
