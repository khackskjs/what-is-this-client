<template>
  <div class="d-flex justify-content-center">
    <div
      id="card-div"
      class="card"
    >
      <div
        class="card-side front d-flex justify-content-center align-items-center"
        :style="{ transform: `${direction === 'up' ? 'rotateX(180deg)' : direction === 'down' ? 'rotateX(-180deg)' : ''}` }"
      >
        <review-badge
          class="status-badge"
          :result="card.lastReviewResult"
        />
        <div class="group-name">
          {{ guidNameMap[card.guid] }}
        </div>
        <review-count
          class="count-badge"
          :current="index + 1"
          :total="total"
        />
        <div>
          {{ card.text1 }}
        </div>
        <div class="review-stage-badge">
          <span class="badge bg-primary">Level {{ card.reviewStage + 1 }}</span>
        </div>
      </div>
      <div
        class="card-side back d-flex justify-content-center align-items-center"
        :style="{ transform: `${direction === 'up' ? 'rotateX(0deg)' : direction === 'down' ? 'rotateX(-360deg)' : 'rotateX(-180deg)'}` }"
      >
        <review-badge
          class="status-badge"
          :result="card.lastReviewResult"
        />
        <div class="group-name">
          {{ guidNameMap[card.guid] }}
        </div>
        <review-count
          class="count-badge"
          :current="index + 1"
          :total="total"
        />
        <div v-if="!hiding">
          {{ card.text2 }}
        </div>
        <div class="review-stage-badge">
          <span class="badge bg-primary">Level {{ card.reviewStage + 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewBadge from './ReviewBadge.vue'
import ReviewCount from './ReviewCount.vue'

export default {
  name: 'Card',
  components: {
    ReviewBadge,
    ReviewCount,
  },
  props: {
    card: { type: Object, default: () => ({}) },
    index: { type: Number, default: () => 0 },
    total: { type: Number, default: () => 0 },
    guidNameMap: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      hiding: false,
      direction: 'front',
      currentCardSideFront: true,
    }
  },
  watch: {
    card: {
      immediate: false,
      handler() {
        this.hiding = this.direction !== 'front'
        this.flipCard('front')
      },
    },
  },
  mounted() {
    var el = document.getElementById('card-div')
    const left = el.offsetLeft
    const top = el.offsetTop
    const width = el.clientWidth
    const w1 = width / 3 + left
    const w2 = width / 3 * 2 + left
    const height = el.clientHeight
    const h1 = height / 3 + top
    const h2 = height / 3 * 2 + top
    const eDx = height / width
    
    function calculateLeftRight(x, y) { // 1사분면 상의 x=y 에 대한 좌우 
      return -eDx * x + height < y ? 'right' : 'left'
    }

    function calculateUpDown(x, y) { // 4사분면 상의 x=-y 에 대한 위아래
      return eDx * x < y ? 'down' : 'up'
    }

    el.addEventListener('touchstart', (evt) => {
      const point = evt.touches[0]
      if (point) {
        const _x = point.pageX
        const x = _x - left
        const _y = point.pageY
        const y = _y - top
        const xp = _x < w1 ? 'w1' : _x < w2 ? 'w2' : 'w3'
        const yp = _y < h1 ? 'h1' : _y < h2 ? 'h2' : 'h3'
        const vertical = calculateUpDown(x, y)
        const horizontal = calculateLeftRight(x, y)

        if (yp === 'h1' && vertical === 'up' && horizontal === 'left') { // 상
          this.$emit('touch:card', 'up')
        } else if (xp === 'w3' && vertical === 'up' && horizontal === 'right') { // 우
          this.$emit('touch:card', 'right')
        } else if (yp === 'h3' && vertical === 'down' && horizontal === 'right') { // 하
          this.$emit('touch:card', 'down')
        } else if (xp === 'w1' && vertical === 'down' && horizontal === 'left') { // 좌
          this.$emit('touch:card', 'left')
        } else if (xp === 'w2' && yp === 'h2') { // 중앙
          this.$emit('touch:card', 'center')
        }
      }
    }, false)
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  methods: {
    flipCard(direction = 'front') {
      this.direction = direction

      if (direction === 'up') {
        this.hiding = false
      } else if (direction === 'down') {
        this.hiding = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  border: 0;
  perspective: 150rem;
  position: relative;
  height: 20rem;
  width: 800px;
  box-shadow: none;
  background: none;
}

.card-side {
  height: 20rem;
  border-radius: 15px;
  transition: all 0.8s ease;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 2rem;
  padding:2rem;
  color: black;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.card-side.back {
  transform: rotateX(-180deg);
}
.card-side.back::before {
  content: '';
  opacity: .3;
  position: absolute;
  border-radius: 15px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url('https://cdn.pixabay.com/photo/2021/09/15/15/26/glass-6627131_960_720.jpg');
}


.card-side.front {
  position: relative;
}
.card-side.front::before {
  content: '';
  opacity: .3;
  position: absolute;
  border-radius: 15px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url('https://cdn.pixabay.com/photo/2021/09/14/14/17/himalayan-salt-6624128_960_720.jpg');
}


.status-badge {
  font-size: 20px;
  left: 20px;
  position: absolute;
  top: 20px;
}
.group-name {
  font-size: 15px;
  position: absolute;
  top: 20px;
}
.count-badge {
  font-size: 15px;
  position: absolute;
  right: 20px;
  top: 20px;
}
.review-stage-badge {
  position: absolute;
  bottom: 10px;
  font-size: 1rem;
}
</style>
