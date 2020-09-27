<template lang="pug">
.blog-page
  .page-head
    img.page-head__img(src='/blog.jpg')
    .container
      .page-head__title Блог

  .container
    nuxt-link(to='/blog/create')
      button.default.blue.blog-page__create(
        v-if="$store.state.user.permissions.includes('ADMIN') || $store.state.user.permissions.includes('WRITER')"
      ) Добавить статью

  .container
    .left-side
      template(v-if="posts && posts.results && posts.results.length > 0")
        .left-side__filters(v-if="filterMassage")
          .left-side__filters-results Показаны результаты по {{ filterMassage }}.
          .left-side__filters-reset(@click="filterQuery(['tag', 'search', 'month', 'page'])") Сбросить x

        BlogPostCard(
          v-for="post in posts.results"
          :key="'posts-' + post.slug"
          :post="post"
          @category="selectByCategory($event)"
        )
        PaginationBlock(
          v-if="posts.total_pages > 1"
          :currentPage="+$route.query.page || 1"
          :count="posts.total_pages"
          style="margin-top: 40px"
          @input="filterQuery([], { page: $event})"
        )
      template(v-else) Нет постов

    .right-side
      .right-side__search
        CustomInput(
          placeholder="Поиск статей по названию",
          v-model="searchPost",
          @keypress.enter="filterQuery(['tag', 'month', 'page'], { search: searchPost })"
        )
          template(v-slot:after-input-inner)
            .search-icon-w(v-if="!searchPost")
              svg-icon.search-icon(name="search" fill="#B3B3B3" stroke="#B3B3B3" width="15" height="15")
            .search-icon-w(v-else @click="searchPost = ''" style="cursor: pointer;")
              svg-icon.search-icon(name="common/close" fill="#B3B3B3" width="15" height="15")

      .right-side__section
        .right-side__title Категории
        .right-side__content
          .right-side__link(
            v-for="category in categories"
            :key="'category-' + category.id"
            :class="{ active: category.id === ($route.query.category || '1') }"
            @click="filterQuery(['page'], { category: category.id})"
          ) {{ category.name }}

      .right-side__section(v-if="popularPosts && popularPosts.results && popularPosts.results.length > 0")
        .right-side__title Популярные статьи
        .right-side__content
          BlogPostCard(
            v-for="post in popularPosts.results"
            :key="'small-' + post.slug"
            :post="post"
            small
          )

      .right-side__section(v-if="tags && tags.length > 0")
        .right-side__title Теги
        .right-side__content
          .right-side__tags
            .right-side__tag(
              v-for="(tag, index) in tags"
              :key="'tag-' + index"
              @click="filterQuery(['search', 'month', 'page'], { tag: tag.id})"
            ) {{ tag.name }}

      .right-side__section
        .right-side__title Архив
        .right-side__content
          CustomSelectTwo(
            name="month"
            placeholder="Выберите месяц"
            :items="months || []"
            :selected="{ id: $route.query.month}"
            @input="filterQuery(['tag', 'search', 'page'], { month: $event.id})"
            displayTitleById
          )
</template>

<script>
import api from '~/assets/js/api'

import BlogPostCard from '~/components/Blog/BlogPostCard'
import CustomInput from '~/components/Inputs/CustomInput'
import CustomSelectTwo from '~/components/Inputs/Select/SelectTwo'
import PaginationBlock from '~/components/Pagination/PaginationBlock'

export default {
  components: {
    BlogPostCard,
    CustomInput,
    CustomSelectTwo,
    PaginationBlock,
  },
  async asyncData({ $axios, query }) {
    const params = {
      ...query,
      page_size: 5,
      ordering: 'created_at',
    }

    const [categories, months, tags, posts, popularPosts] = await Promise.all([
      api.getCategories($axios),
      api.getMonths($axios),
      api.getTags($axios),
      api.getBlogPosts($axios, { params }),
      api.getPopularBlogPosts($axios),
    ])

    return { categories, months, tags, posts, popularPosts }
  },
  data: () => ({
    searchPost: '',
  }),
  computed: {
    filterMassage() {
      const query = this.$route.query

      if (query.search) {
        return `поиску: ${query.search}`
      } else if (query.tag) {
        return `тегу: ${this.tags.find((el) => el.id === query.tag).name}`
      } else if (query.month) {
        return `архиву: ${
          this.months.find((el) => el.id === query.month).title
        }`
      }

      return ''
    },
    isAuthorized() {
      return this.$store.state.isAuthorized
    },
  },
  scrollToTop: false,
  watchQuery: true,
  watch: {
    '$route.query': 'scrollUp',
  },
  methods: {
    filterQuery(queryToRemove, queryToAdd = {}) {
      const query = { ...this.$route.query }

      for (const key in queryToAdd) {
        queryToAdd[key] = `${queryToAdd[key]}`.trim()
        if (queryToAdd[key] === query[key]) return
        if (!queryToAdd[key]) {
          delete queryToAdd[key]
          queryToRemove.push(key)
        }
      }

      for (const value of queryToRemove) delete query[value]
      this.$router.push({ path: this.$route.path })
      this.$router.push({
        query: { ...query, ...queryToAdd },
      })
    },

    scrollUp() {
      const scrollPosition = 427 + this.isAuthorized * 50

      if (window.pageYOffset > scrollPosition) {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        })
      }
    },
  },
}
</script>

<style lang="scss" src="./style.scss"></style>
