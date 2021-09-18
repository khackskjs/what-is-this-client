<template>
  <div class="d-flex justify-content-center">
    <div class="card">
      <div
        class="card-side front d-flex justify-content-center align-items-center"
        :style="{ transform: `${flip ? 'rotateX(180deg)' : ''}` }"
      >
        <div class="d-block">
          {{ card.text1 }}
        </div>
      </div>
      <div
        class="card-side back d-flex justify-content-center align-items-center"
        :style="{ transform: `${flip ? 'rotateX(0deg)' : 'rotateX(-180deg)'}` }"
      >
        <div>{{ card.text2 }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    card: { type: Object, default: () => ({}) },
    flip: { type: Boolean, default: false },
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

// .card:hover .card-side.front {
//   transform: rotateX(180deg);
// }
// .card:hover .card-side.back {
//   transform: rotateX(0deg);
// }
</style>
