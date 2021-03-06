import { NuxtAxiosInstance } from '@nuxtjs/axios'

function setHeader(axios: NuxtAxiosInstance) {
  const token = process.browser
    ? localStorage.getItem('access_token') || ''
    : ''
  axios.setToken(token, 'Token')
}

export default {
  getOnlineCourses(axios: NuxtAxiosInstance) {
    setHeader(axios)
    return axios.$get('/online-courses')
  },
  getOnlineCourse(axios: NuxtAxiosInstance, courseTag: string) {
    setHeader(axios)
    return axios.$get(`/online-courses/${courseTag}`)
  },
}

  axios: {
    baseURL: process.env.BACKEND_URL,
    credentials: true
  },

 watch: {
    end() {
      this.checkShowing()
    },
  },
  
  const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

function nearestDate(startDates: any) {
  const strDates: string[] = Object.values(startDates)
  const dates = strDates.map((date) => new Date(date).getTime())
  const earliest = new Date(Math.min.apply(null, dates))
  const weekAgo = earliest.getTime() - 60 * 60 * 24 * 1000 * 7

  return {
    day: earliest.getDate(),
    month: months[earliest.getMonth()],
    start: new Date(weekAgo).toDateString(),
    end: earliest.toDateString(),
  }
}

export const evo = (course: any) => ({
  CourseHero: {
    gradient: '/images/online/evo/evo-gradient.jpg',
    price: `<span class="text-26">${course.prices[0].value} ₽</span> / неделя`,
    heroImage: '/images/online/evo/evo-hero.png',
    title: '<i class="black">Evolution</i>',
    description:
      'Комплексный и сбалансированный курс для людей без ограничений в физических нагрузках с любым уровнем подготовки. Подойдёт мужчинам и женщинам.',
  },

  SectionNearest: {
    start: `<span class="semibold">${nearestDate(course.dates).day}</span> ${
      nearestDate(course.dates).month
    }`,
    duration: `Длительность курса — <span class="semibold">${course.duration_in_weeks}</span> недель. Группы стартуют по понедельникам.`,
    counter: {
      start: nearestDate(course.dates).start,
      end: nearestDate(course.dates).end,
    },
  },

  SectionIncludes: {
    title: 'Что входит в курс',
    points: [
      {
        title: 'Тренировки',
        text:
          'От 15 до 50 минут в день. Волнообразная нагрузка с разными видами тренировок для повышения эффективности. Включает кардио, силовые, HIIT, стретчинг, комплексы на проблемные зоны.',
      },
      {
        title: 'Питание',
        text:
          'Четыре типа питания: что есть, когда и сколько для долгосрочного результата. Вы научитесь самостоятельно составлять рацион с пользой для здоровья и формы. Все рекомендации соответствуют актуальным научным исследованиям.',
      },
      {
        title: 'Диагностика',
        text:
          'Рекомендации от спортивного врача на основе медицинской анкеты*. Врач расскажет, нужно ли в вашем случае адаптировать тренировки и задания по питанию или порекомендует другой курс. <p class="text-14" style="margin-top: 20px; opacity: 0.4;">* Только на курсе с куратором</p>',
      },
      {
        title: 'Знания',
        text:
          'Еженедельный блок о физиологии и психологии похудения, мотивации, здоровом питании и эстетике тела. Вы узнаете, как надолго сохранить здоровые привычки и результат, что делать до и после тренировки, чтобы достичь максимального эффекта.',
      },
      {
        title: 'Планирование',
        text:
          'Подробное расписание и план тренировок на каждую неделю, удобный трекер привычек в личном кабинете. Научим вас составлять здоровый рацион на неделю и находить время на тренировки даже при загруженном графике.',
      },
      {
        title: 'Мотивация',
        text:
          'Учёт особенностей циклов мотивации — это поможет вам не перегореть и пройти курс до конца. Вы узнаете, как устроена мотивация, научитесь её контролировать и использовать свой ресурс для достижения целей.',
      },
      {
        title: 'Поддержка',
        text:
          'Чат с единомышленниками. По последним исследованиям поддержка окружения положительно влияет на результат при снижении веса, поэтому у каждой группы есть свой чат.',
      },
      {
        title: 'Дополнительно',
        text:
          'Рекомендации по уходу за кожей и работа с проблемными зонами. Изолированные тренировки на ягодицы, пресс и спину. Техника выполнения контрастного душа и самомассажа, советы по подготовке к тренировке для усиления эффекта.',
      },
    ],
  },

  SectionPriceInset: {
    gradient: '/images/online/evo/evo-gradient-small.jpg',
    price: `<span class="text-26">${course.prices[0].value} ₽</span> / неделя`,
    title:
      'Запишитесь сейчас и начните в понедельник — ваш образ жизни не будет прежним',
    button: 'Записаться на курс',
    link: {
      text: 'Попробовать бесплатно',
      to: '/',
    },
  },

  SectionWatch: {
    title: 'Тренировки онлайн',
    description:
      'Занимайтесь, где и когда удобно — нужны только кроссовки и доступ в интернет. В каждой тренировке — два варианта выполнения упражнений для повышения или снижения нагрузки. Мы научим вас самостоятельно контролировать уровень сложности, следить за пульсом и тренироваться осознанно.',
    actionLabel: 'Как это будет',
    backgroundPicture: '/images/online/evo/evo-demo.png',
    actionIconPosition: 'before',
  },

  SectionText: {
    title: 'Четыре типа питания',
    text:
      'Мы расскажем, как подобрать подходящий тип питания для достижения результата, разберём разные режимы питания и научим вас самостоятельно составлять свой рацион с пользой для здоровья и формы.',
  },

  SectionRation: {
    cards: [
      {
        image: '/images/ration/strog.png',
        title: 'Строгий',
        text:
          'Для людей без пищевых расстройств и не склонных к компенсации. Для тех, кто любит соблюдать правила и хочет увидеть быстрый результат.',
      },
      {
        image: '/images/ration/optim.png',
        title: 'Оптимальный',
        text: 'Для всех, кто не готов к жёстким ограничениям.',
      },
      {
        image: '/images/ration/highfat.png',
        title: 'Высокожировой',
        text:
          'Для людей с инсулинорезистентностью, склонных к полноте и тех, кто не может сбросить вес при питании с высоким содержанием углеводов.',
      },
      {
        image: '/images/ration/veg.png',
        title: 'Вегетарианский',
        text:
          'Для тех, кто хочет стать вегетарианцем или сделать текущий рацион более здоровым и похудеть.',
      },
    ],
  },

  SectionFAQ: [
    {
      title: 'Кому подходит?',
      text:
        'Мужчинам и женщинам. Если врач не запрещал и не ограничивал вас в физических нагрузках, курс #EVO вам подходит. <br> В каждой тренировке даётся базовый и упрощенный вариант упражнений, поэтому программа подойдет даже новичкам в спорте.',
    },
    {
      title: 'Как я буду получать задание?',
      text:
        'Весь курс вы будете проходить в личном кабинете на нашем сайте. Как он выглядит, смотрите в демоверсии.',
    },
    {
      title: 'Что мне понадобится для занятий?',
      text: 'Интернет, коврик, кроссовки и спортивная форма.',
    },
    {
      title: 'Тренироваться нужно в конкретное время?',
      text:
        'Нет. Можете тренироваться, когда вам удобно. Но утроворк логичней делать утром. 🙂',
    },
    {
      title: 'Доступ к тренировкам останется навсегда?',
      text:
        'Доступ к программе открыт на время оплаченного периода. Все, кто прошёл курс до конца, получают бонус: дополнительные три недели доступа, чтобы доделать пропущенные тренировки или повторить любимые.',
    },
    {
      title: 'Есть ли скидки?',
      text:
        'При единовременной оплате всего курса (10 недель) вы получаете последнюю неделю в подарок, при оплате 9 недель — последние 6 дней курса в подарок.',
    },
    {
      title: 'А если я заболею во время курса?',
      text:
        'Курс можно «заморозить» на период от 1 до 4 недель при наличии медицинской справки.',
    },
    {
      title: 'Не получается оплатить! Что делать?',
      text:
        'Напишите на почту info@sektaschool.ru или в онлайн-консультант — и наши администраторы вам помогут.',
    },
  ],
})

<template lang="pug">
  .course-page
    CourseHero(:options="options.CourseHero" @hasCurator="hasCurator = $event")
    SectionNearest(:options="options.SectionNearest")
    SectionIncludes(:options="options.SectionIncludes")
    SectionPriceInset(:options="options.SectionPriceInset")
    SectionWatch(:options="options.SectionWatch")
    SectionText(:options="options.SectionText")
    SectionRation(:options="options.SectionRation")

    Mailing
    InstagramSlider

    SectionPriceInset(:options="options.SectionPriceInset")
    SectionFAQ(:options="options.SectionFAQ")

    Journal

</template>

<script lang="js">
import Vue from 'vue'
import api from '~/assets/js/api'
import { evo } from './evo.constants'

export default Vue.extend({
  async asyncData({ $axios }) {
    const courses = await api.getOnlineCourse($axios, 'EVO')

    return { courses: courses.data, hasCurator: true }
  },
  computed: {
    course() {
      return this.courses[+this.hasCurator]
    },
    options() {
      return evo(this.course)
    },
  },
})
</script>

<style lang="scss" scoped>
.course-page {
  & > *:not(:first-child):not(:last-child) {
    margin-bottom: 90px;
  }
}
</style>
