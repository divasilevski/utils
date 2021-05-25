<template lang="pug">
.balance-chart
  svg(class="svg" viewBox="0 0 500 350" preserveAspectRatio="none")
    path(
      stroke="#181818"
      opacity="0.05"
      stroke-width="1"
      :d="path"
      fill="none")
  .image
    img(:src="require('~/assets/images/balance.png')")
  .elements
</template>

<script>
const D_RADIUS = 30
const WIDTH = 500
const HEIGHT = 350

function getRad(deg) {
  return (deg * Math.PI) / 180
}

function createPoligon(array) {
  array = array.map((coords) => `${coords.x}% ${coords.y}%`)
  return `polygon(${array.join(', ')})`
}

function polarToCartesian({ angle, radius }) {
  const cos = Math.cos(getRad(angle))
  const sin = Math.sin(getRad(angle))
  const x = radius * cos
  const y = radius * sin
  return coordsShift({ x, y })
}

function coordsToPercents({ x, y }) {
  return {
    x: (x / WIDTH) * 100,
    y: (y / HEIGHT) * 100,
  }
}

function coordsShift({ x, y }) {
  return {
    x: x + WIDTH / 2,
    y: y + HEIGHT / 2,
  }
}

function specifyCoords({ x, y }, { width, height }, angle) {
  const center = { x: width / 2, y: height / 2 }
  const tan = Math.tan(getRad(angle))

  let dwidth = 0
  let dheight = 0

  const signW = Math.sign(Math.cos(getRad(angle)))
  const signH = Math.sign(Math.sin(getRad(angle)))

  const w = width / 2
  const h = height / 2

  if (Math.abs(tan) > 1) {
    dwidth = (signW * h) / tan
    dheight = signH * h
  } else {
    dwidth = signW * w
    dheight = signH * h * tan
    console.log()
  }

  console.log(signW, signH, Math.abs(tan) > 1)
  // const dheight = console.log(angle, tan)
  return {
    x: x - center.x + dwidth,
    y: y - center.y + dheight,
  }
}

export default {
  data() {
    return { path: '' }
  },
  mounted() {
    const data = [
      { title: 'Здоровье и спорт', value: 4 },
      { title: 'Финансы', value: 1 },
      { title: 'Карьера', value: 3 },
      { title: 'Отношения' },
      { title: 'Красота' },
      { title: 'Отдых' },
      { title: 'Творчество' },
    ]
    let path = ''
    const names = data.length
    const circles = 5
    const angle = 360 / names

    // BG
    for (let i = 0; i < circles + 1; i++) {
      for (let j = 0; j < names + 1; j++) {
        const polar = { angle: angle * j - 90, radius: i * D_RADIUS }
        const coords = polarToCartesian(polar)
        path +=
          j === 0 ? `M ${coords.x}, ${coords.y}` : `L ${coords.x}, ${coords.y}`
      }
    }
    this.path = path

    // Текст
    const $elements = this.$el.querySelector('.elements')
    for (let i = 0; i < names; i++) {
      const polar = { angle: angle * i - 90, radius: D_RADIUS * circles }

      const $label = document.createElement('div')
      $label.innerText = data[i].title
      $label.className = 'label'

      $elements.appendChild($label)

      console.log(data[i].title)

      const cartesian = specifyCoords(
        polarToCartesian(polar),
        $label.getBoundingClientRect(),
        polar.angle
      )
      const coords = coordsToPercents(cartesian)
      $label.style.top = coords.y + '%'
      $label.style.left = coords.x + '%'
    }

    // Точки
    const coordinates = []
    for (let i = 0; i < names; i++) {
      if (data[i] && data[i].value) {
        const polar = {
          angle: angle * i - 90,
          radius: D_RADIUS * data[i].value,
        }
        const polar2 = {
          angle: angle * i - 90,
          radius: D_RADIUS * data[i].value + 8,
        }

        const $point = document.createElement('div')
        $point.className = 'point'
        const c = polarToCartesian(polar)

        const coords = coordsToPercents({ x: c.x - 4, y: c.y - 4 })
        coordinates.push(coordsToPercents(polarToCartesian(polar)))
        coordinates.unshift(coordsToPercents(polarToCartesian(polar2)))

        $point.style.top = coords.y + '%'
        $point.style.left = coords.x + '%'

        $elements.appendChild($point)
      }
    }

    const $img = this.$el.querySelector('.image')
    console.log(coordinates)
    $img.style.clipPath = createPoligon(coordinates)
  },
}
</script>

<style lang="scss" scoped>
.balance-chart ::v-deep {
  position: relative;
  max-width: 500px;
  width: 100%;
  overflow: hidden;

  .image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .svg {
    border: 1px solid red;
  }
  .elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .label {
      position: absolute;
    }
    .point {
      position: absolute;
      width: 10px;
      height: 10px;
      background: black;
      border-radius: 10px;
    }
  }
}
</style>
