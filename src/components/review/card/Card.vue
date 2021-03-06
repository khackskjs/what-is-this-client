<template>
  <div class="d-flex justify-content-center">
    <div
      id="card-div"
      class="card"
      :style="{ height: cardHeight }"
    >
      <div
        class="card-side front d-flex justify-content-center align-items-center"
        :style="{ height: cardHeight, transform: `${direction === 'up' ? 'rotateX(180deg)' : direction === 'down' ? 'rotateX(-180deg)' : ''}` }"
      >
        <review-badge
          class="status-badge"
          :result="card.lastReviewResult"
        />
        <div class="group-name">
          [{{ guidNameMap[card.guid] }}]
        </div>
        <review-count
          class="count-badge"
          :current="index + 1"
          :total="total"
        />
        <div class="card-text">
          {{ card.text1 }}
        </div>
        <div class="review-stage-badge">
          <span class="badge bg-primary">Level {{ card.reviewStage + 1 }}</span>
        </div>
      </div>
      <div
        class="card-side back d-flex justify-content-center align-items-center"
        :style="{ height: cardHeight, transform: `${direction === 'up' ? 'rotateX(0deg)' : direction === 'down' ? 'rotateX(-360deg)' : 'rotateX(-180deg)'}` }"
      >
        <review-badge
          class="status-badge"
          :result="card.lastReviewResult"
        />
        <div class="group-name">
          [{{ guidNameMap[card.guid] }}]
        </div>
        <review-count
          class="count-badge"
          :current="index + 1"
          :total="total"
        />
        <div
          v-if="!hiding"
          class="card-text"
        >
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
import { configCardTouch } from '@/services/touch.config'

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
    cardHeight: { type: String, default: () => '400px' }
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
    const el = document.getElementById('card-div')
    if (el) {
      el.addEventListener('touchend', configCardTouch.bind(this, el), false)
    }
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
.card-text {
  position: relative;
  line-height: 1 !important;
}

.card {
  border: 0;
  perspective: 150rem;
  position: relative;
  // height: 500px;
  width: 100%;
  box-shadow: none;
  background: none;
}

.card-side {
  // height: 500px;
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
  background-repeat: no-repeat;
  background-size: cover;
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
  background-repeat: no-repeat;
  background-size: cover;
}


.status-badge {
  font-size: 20px;
  left: 20px;
  position: absolute;
  top: 20px;
}
.group-name {
  font-size: 1rem;
  font-weight: 400;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 20px;
}
.count-badge {
  font-size: 15px;
  position: absolute;
  right: 10px;
  top: 40px;
}
.review-stage-badge {
  position: absolute;
  bottom: 10px;
  font-size: 1rem;
}
</style>
