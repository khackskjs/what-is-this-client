<template>
  <div class="d-flex justify-content-center">
    <div class="card">
      <div
        class="card-side front d-flex justify-content-center align-items-center"
        :style="{ transform: `${direction === 'up' ? 'rotateX(180deg)' : direction === 'down' ? 'rotateX(-180deg)' : ''}` }"
      >
        <review-badge
          class="status-badge"
          :result="card.lastReviewResult"
        />
        <review-count
          class="count-badge"
          :index="index"
          :total="total"
        />
        <div>
          {{ card.text1 }}
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
        <review-count
          :index="index"
          :total="total"
        />
        <div v-if="!hiding">
          {{ card.text2 }}
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
        console.log('WATCH card - hiding', this.hiding)
      },
    },
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
  margin: 2rem;
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
  color: white
}

.card-side.back {
  transform: rotateX(-180deg);
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%,#C850C0 46%, #FFCC70 100%);
}

.card-side.front {
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
}

.status-badge {
  font-size: 20px;
  left: 20px;
  position: absolute;
  top: 20px;
}
.count-badge {
  font-size: 15px;
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
