<template lang="pug">
  .hint(:class="classList" @mouseover="hover")
    .hint__icon.text-16 {{ iconType }}

    template(v-if="$slots.default")
      .hint__content(ref="content" :style="`left: ${shift}px;`")
        .text-14
          slot
      .hint__tip
        .hint__arrow
        .hint__relief

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isInvert: {
      type: Boolean,
      default: false,
    },
    isWhite: {
      type: Boolean,
      default: false,
    },
    isMetro: {
      type: Boolean,
      default: false,
    },
    isInfo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { shift: 0 }
  },
  computed: {
    classList(): object {
      return {
        invert: this.isInvert,
        white: this.isWhite,
        metro: this.isMetro,
        info: this.isInfo,
      }
    },
    iconType(): string {
      return this.isInfo ? '!' : this.isMetro ? 'M' : 'i'
    },
  },
  methods: {
    hover() {
      this.$nextTick(() => {
        const $el = this.$refs.content as HTMLElement
        const width = document.documentElement.offsetWidth
        const rect = $el.getBoundingClientRect()

        if (rect.left < 0) {
          this.shift = -this.shift + rect.left + 30
        } else if (rect.right > width) {
          this.shift = this.shift - (rect.right - width) - 15
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped>
$zIndex: 200;

.hint {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 22px;
  width: 100%;
  height: 22px;

  &:hover {
    .hint__tip,
    .hint__content {
      display: block;
    }
  }

  .hint__tip,
  .hint__content {
    display: none;
  }

  .hint__content {
    position: absolute;
    color: var(--color);
    bottom: 42px;
    max-width: 340px;
    transform: translateX(-50%);
    width: calc(100vw - 60px);
    padding: 20px;
    border-radius: 10px;
    z-index: $zIndex;
    background: var(--gradient-gray);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);

    @include mw(719px) {
      width: calc(100vw - 30px);
      padding: 15px;
    }
  }

  .hint__tip {
    .hint__arrow {
      position: absolute;
      width: 16px;
      height: 16px;
      left: 4px;
      bottom: 36px;
      background: var(--gradient-gray);
      border-radius: 3px 0px;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.15);
      z-index: $zIndex + 1;
    }

    .hint__relief {
      position: absolute;
      bottom: 42px;
      z-index: $zIndex + 2;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        width: 24px;
        height: 14px;
      }

      &::before {
        left: -25px;
        border-bottom-right-radius: 100%;
        background-image: radial-gradient(
          ellipse at 0% 100%,
          transparent 24px,
          #f7f7fa calc(24px + 2px)
        );
      }

      &::after {
        left: -1px;
        border-bottom-left-radius: 100%;
        background-image: radial-gradient(
          ellipse at 100% 100%,
          transparent 24px,
          #f7f7fa calc(24px + 2px)
        );
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--bg);
    border-radius: 50%;
    opacity: 0.1;
    cursor: pointer;
  }

  .hint__icon {
    margin-top: 2px;
    color: var(--color);
    font-style: italic;
  }

  // Custom styles
  &.invert {
    .hint__icon {
      color: var(--color-secondary);
    }
    &::after {
      background: var(--color-secondary);
      opacity: 0.2;
    }
  }
  &.white::after {
    background: var(--color-secondary);
    opacity: 0.2;
  }
  &.metro .hint__icon {
    font-style: normal;
  }
  &.info .hint__icon {
    font-style: normal;
  }
}
</style>
