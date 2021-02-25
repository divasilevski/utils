<template lang="pug">
  .card-switch
    .card-switch__content
      .card-switch__title.h2(v-html="title")
      p.card-switch__description.text-16
        slot(name="description")

      nuxt-link.card-switch__action(:to="actionTo")
        slot(name="actionIcon")
          img.icon(v-if="actionIcon && actionIconPosition==='before'" :src="actionIcon")
        span.text-14.semibold {{ actionLabel }}
        img.icon(v-if="actionIcon && actionIconPosition==='after'" :src="actionIcon")
    .card-switch__picture(v-if="backgroundPicture")
      img(:src="backgroundPicture")
</template>

<script>
export default {
  name: 'CardsSwitcherCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    actionLabel: {
      type: String,
      default: '',
    },
    actionTo: {
      type: String,
      default: '/',
    },
    actionIcon: {
      type: String,
      default: '',
    },
    actionIconPosition: {
      type: String,
      default: 'before',
      validator: (value) => {
        return ['before', 'after'].includes(value)
      },
    },
    backgroundPicture: {
      type: String,
      default: '',
    },
    backgroundPictureAlign: {
      type: String,
      default: 'center',
      validator: (value) => {
        return ['bottom', 'center'].includes(value)
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.card-switch {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 380px;
  background: var(--gradient-gray);
  overflow: hidden;

  .card-switch__content {
    position: relative;
    padding: 60px 0 40px 100px;

    @include mw(1100px) {
      padding: 40px 60px;
    }

    @include mw(850px) {
      padding: 40px 50px;
    }

    @include mw(767px) {
      padding: 385px 30px 30px;
    }

    @include mw(540px) {
      padding-top: 300px;
    }

    @include mw(374px) {
      padding-top: 270px;
    }

    .card-switch__description {
      margin-top: 40px;
      overflow: hidden;
      margin-right: 430px;

      @include mw(1100px) {
        margin-top: 30px;
        margin-right: 345px;
      }

      @include mw(900px) {
        margin-right: 315px;
      }

      @include mw(767px) {
        margin-right: 0;
      }
    }

    .card-switch__action {
      display: inline-flex;
      align-items: center;
      min-height: 50px;
      margin-top: 40px;

      @include mw(1100px) {
        margin-top: 30px;
      }

      &.m-big {
        margin-top: 70px;
      }

      & > *:not(:last-child) {
        margin-right: 20px;
      }

      .icon {
        width: 50px;
        border-radius: 50%;
        min-width: 50px;
        min-height: 50px;
      }
    }
  }

  .card-switch__picture {
    position: absolute;
    top: 0;
    right: 0;

    img {
      @include mw(1100px) {
        max-height: 245px;
      }
      @include mw(767px) {
        max-height: 355px;
      }
      @include mw(540px) {
        max-height: 270px;
      }
      @include mw(540px) {
        max-height: 270px;
      }
      @include mw(374px) {
        max-height: auto;
        width: 100vw;
      }
    }
  }
}
</style>
