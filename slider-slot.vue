.slider
  .slider-wrapper
    .slider-bg.bg-animation(:class="{ 'amimate-prev': anim.prev, 'amimate-next': anim.next }")
      .slider-inner
        .cards-wrapper
          .cards
            .card.card-after(v-for="(slot, index) in content" :class="classes[index]")
              Render(:vnode="slot" :name="'item-' + index")
  
  .btn-prev(@click="changeSlide('next')")
    svg-icon(name="utils/arrow-left")
  .btn-next(@click="changeSlide('prev')")
    svg-icon(name="utils/arrow-right")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {
    Render: {
      functional: true,
      render: (f: Function, context: any) => {
        return context.props.vnode
      },
    },
  },
  data: () => ({
    anim: {
      next: false,
      prev: false,
    },
    content: [] as any,
    classes: ['animate-one', 'animate-two', 'animate-three'],
  }),
  created() {
    const slots = this.$slots.default as any
    this.content.push(slots[0])
    this.content.push(slots[slots.length - 1])
    this.content.push(slots[1])
  },
  methods: {
    changeSlide(direction: 'prev' | 'next') {
      if (this.anim.next || this.anim.prev) return
      this.anim[direction] = true
      const slots = this.$slots.default as any

      setTimeout(() => {
        if (direction === 'next') {
          const index = slots.findIndex((el: any) => el === this.content[2])

          this.content[1] = this.content[0]
          this.content[0] = this.content[2]
          this.content[2] = slots[index <= slots.length - 2 ? index + 1 : 0]
        } else {
          const index = slots.findIndex((el: any) => el === this.content[1])
          this.content[2] = this.content[0]
          this.content[0] = this.content[1]
          this.content[1] = slots[index > 0 ? index - 1 : slots.length - 1]
        }

        this.anim[direction] = false
      }, 600)
    },
  },
})
</script>
