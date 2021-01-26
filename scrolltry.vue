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
// nuxt-link(:to="`#${key}`")

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
      active: Object.keys(this.options)[0],
    }
  },
  mounted() {
    const $stickyBar = this.$el as HTMLElement
    const offsetTop = $stickyBar.offsetTop

    window.onhashchange = function (e: any) {
      e.preventDefault()
    }

    window.onscroll = () => {
      if (window.pageYOffset >= offsetTop) {
        $stickyBar.classList.add('fixed')
      } else {
        $stickyBar.classList.remove('fixed')
      }

      let fromTop = window.pageYOffset || document.documentElement.scrollTop

      Object.keys(this.options).forEach((key) => {
        let section = document.querySelector(`#${key}`) as HTMLElement
        // if (key === 'certificates')
        // console.log(fromTop, section.offsetTop - 150)
        // console.log(section.offsetTop - 150 - fromTop)
        if (document) {
          console.log(fromTop, document.documentElement.scrollHeight)
        }
        if (
          section.offsetTop - 150 <= fromTop &&
          section.offsetTop - 150 + section.offsetHeight > fromTop
        ) {
          this.active = key
          // window.location.hash = `#${key}`
          // this.$router.push(`#${key}`)
        }
      })
    }
  },
  methods: {
    scrollTo(hash: string) {
      const $el = document.querySelector(hash) as HTMLElement
      if ($el) {
        window.scrollTo({ top: $el.offsetTop - 100, behavior: 'smooth' })
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
</style>
