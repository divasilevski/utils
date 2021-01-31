--gradient-pink: linear-gradient(90deg, #fdaba2 0.28%, #fc8290 100%);

Button
isPink: {
  type: Boolean,
  default: false,
},
    
&.pink {
  background: var(--gradient-pink);
  color: var(--color-secondary);
}

Hint
isInvert: {
  type: Boolean,
  default: false,
}
  &.white::after {
    background: var(--color-secondary);
    opacity: 1;
  }

  &.invert {
    .hint__icon {
      color: var(--color-secondary);
    }

    &::after {
      background: var(--color-secondary);
      opacity: 0.2;
    }
  }
  
  WatchBanner
<template lang="pug">
  .watch-banner
    .watch-banner__title.h2 Удобное место и время
    .watch-banner__info.text-16 Можно пройти из любой точки мира — нужны только кроссовки и доступ к интернету. Время и место тренировок вы выбираете сами.
    .watch-banner__btn
      .watch-banner__icon
        Triangle
      .text-14.semibold Посмотри как это будет
</template>

<script lang="ts">
import Vue from 'vue'
import Triangle from '~/assets/svg/triangle.svg?inline'

export default Vue.extend({
  components: { Triangle },
})
</script>

<style lang="scss" scoped>
.watch-banner {
  padding: 60px 100px;
  background: var(--gradient-gray);
  height: 380px;

  .watch-banner__title {
    margin-bottom: 40px;
  }
  .watch-banner__info {
    margin-bottom: 40px;
    max-width: 480px;
  }
  .watch-banner__btn {
    display: flex;
    align-items: center;

    .watch-banner__icon {
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      background: var(--gradient);
      border-radius: 50%;

      svg {
        margin-left: 5px;
      }
    }

    & > div {
      cursor: pointer;
    }
  }

}
</style>

CardPriceTag
<template lang="pug">
  .card-price-tag(:class="{season: isSeason}")
    .card-price-tag__head
      ToggleSwitch(v-model="toggle" :isBlack="!isSeason" :isPink="isSeason" isSmall)
      .text-14.semibold с куратором
      Hint(:isInvert="!isSeason")
    .card-price-tag__price.text-26 7500 ₽ #[span.text-16 / 3 недели]
    Button(:isPink="isSeason") {{ isAuth && !isNewUser ? 'Записаться на курс' : 'Попробовать бесплатно' }}
    .card-price-tag__subscribe(v-if="isAuth")
      .text-14.semibold {{ isNewUser ? 'Записаться на курс' : 'Попробовать бесплатно' }}
      Arrow

</template>

<script lang="ts">
import Vue from 'vue'
import Arrow from '~/assets/svg/arrow.svg?inline'

export default Vue.extend({
  components: { Arrow },
  props: {
    isSeason: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isAuth() {
      return true
    },
    isNewUser() {
      return false
    },
  },
  data() {
    return {
      toggle: true,
    }
  },
})
</script>

<style lang="scss" scoped>
.card-price-tag {
  position: relative;
  width: 380px;
  padding: 40px;
  background: var(--bg);
  color: var(--color-secondary);
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.2);

  .card-price-tag__head {
    display: flex;
    margin-bottom: 40px;

    &::v-deep .switch {
      margin-right: 10px;
    }

    &::v-deep .hint {
      margin-left: 10px;
    }
  }

  .card-price-tag__price {
    margin-bottom: 20px;
  }

  .card-price-tag__subscribe {
    display: flex;
    align-items: center;
    margin-top: 20px;
    cursor: pointer;

    svg {
      stroke: var(--color-secondary);
      margin-left: 20px;
    }
  }

  // Custom styles
  &.season {
    background: var(--color-secondary);
    color: var(--color);

    svg {
      stroke: var(--color);
    }
  }
}
</style>

DownloadFile
<template lang="pug">
  .download-file
    .download-file__icon.file-icon
      .file-icon__line
      .file-icon__line
      .file-icon__line.file-icon__line--small
    div
      a.download-file__filename.text-14(:href="href" target="_BLANK" rel="noopener noreferrer") Пример меню на день PDF 1.5 mb
      a.download-file__load(:href="href" download)
        Download
        .text-14.semibold Скачать

</template>

<script lang="ts">
import Vue from 'vue'
import Download from '~/assets/svg/download.svg?inline'

export default Vue.extend({
  components: { Download },
  props: {
    href: {
      type: String,
      default: './docs/example.pdf',
    },
  },
})
</script>

<style lang="scss" scoped>
.download-file {
  display: flex;
  align-items: center;
  height: fit-content;

  .download-file__icon {
    margin-right: 40px;
  }

  .download-file__filename {
    display: block;
    margin-bottom: 10px;
  }

  .download-file__load {
    width: 180px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 15px;
    }
  }
}

// icon
.file-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 60px;
  width: 60px;
  height: 80px;
  background: var(--gradient);
  border-radius: 5px;
  padding: 12px;

  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;

    border: 12.5px solid transparent;
    border-top: 12.5px solid var(--color-secondary);
    border-right: 12.5px solid var(--color-secondary);
  }

  .file-icon__line {
    height: 2px;
    width: 100%;
    background: var(--bg);
    margin-top: 4px;
  }

  .file-icon__line--small {
    width: calc(100% / 3 * 2);
  }
}
</style>

TextBlock
<template lang="pug">
  section.text-block
    h2.h2.text-block__title Программы питания
    .text-blockn__text.text-16 #[br] Медийная реклама транслирует показ баннера. Не факт, что повышение жизненных стандартов достижимо в разумные сроки. Стратегическое планирование, вопреки мнению П.Друкера, синхронизирует эмпирический целевой сегмент рынка. Продвижение проекта наиболее полно притягивает фирменный охват аудитории.
    slot

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.text-block {
  display: flex;
  margin-bottom: 90px;

  .text-block__title {
    min-width: 280px;
    margin-right: 20px;
  }

  .text-block__center {
    width: 480px;
    margin-right: 120px;
  }
}
</style>


ToggleSwitch
<template lang="pug">
  label.switch(:class="{small: isSmall, black: isBlack, pink: isPink}")
    input(
      type="checkbox"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
    )
    span.switch-slider
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isBlack: {
      type: Boolean,
      default: false,
    },
    isPink: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 72px;
  height: 36px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .switch-slider {
      background: var(--gradient);
    }

    &:checked + .switch-slider:before {
      transform: translateX(36px);
    }
  }

  .switch-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient);
    border-radius: 25px;
    transition: transform 0.3s;

    &:before {
      position: absolute;
      content: '';
      height: 30px;
      width: 30px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.3s;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    }
  }

  // Custom styles
  &.small {
    width: 44px;
    height: 22px;

    .switch-slider {
      background: var(--bg);

      &:before {
        height: 18px;
        width: 18px;
        left: 2px;
        bottom: 2px;
      }
    }

    input:checked + .switch-slider:before {
      transform: translateX(calc(44px - 18px - 4px));
    }
  }

  &.black {
    .switch-slider {
      background: var(--gradient);

      &:before {
        background: var(--bg);
      }
    }
  }

  &.pink {
    .switch-slider {
      background: var(--bg);
    }
    input:checked + .switch-slider {
      background: var(--gradient-pink);
    }
  }
}
</style>


