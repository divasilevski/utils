      const $includes = document.querySelector('[data-section-includes]')
      const $cards = $includes?.querySelectorAll('.card-includes')

      if ($cards) {
        const $lastCard = $cards[$cards?.length - 1]
        const $firstCard = $cards[1]
        const distance = $lastCard.getBoundingClientRect().height + 60
        console.log($firstCard.getBoundingClientRect().bottom)

        setTimeout(() => {
          this.$store.commit('course/setCurator', value)
          console.log($lastCard.getBoundingClientRect().bottom > 0)

          if (!value && $lastCard.getBoundingClientRect().bottom > 0) {
            scrollBy({ top: -distance })
          } else if (value && $lastCard.getBoundingClientRect().top > 0) {
            scrollBy({ top: 388 })
          } else if (value && $lastCard.getBoundingClientRect().bottom > 0) {
            setTimeout(() => {
              scrollBy({ top: 388 })
            })
          }
        })
      } else {
        this.$store.commit('course/setCurator', value)
      }
