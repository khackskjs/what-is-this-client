<template>
  <div>
    <div>
      Total : {{ total }}
    </div>
    <div class="d-flex justify-content-center">
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__shuffle_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__cancel_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__success_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__failure_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__prev_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__next_button') }}
      </md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCard',
  props: {
    cardList: { type: Array, default: () => [] },
  },
  data() {
    return {
      total: this.cardList.length,
    }
  },
  mounted() {
    console.log('keyup event added')
    window.addEventListener('keyup', e => {
      if (e.code === 'ArrowLeft') {
        this.prevCard()
      } else if (e.code === 'ArrowRight') {
        this.nextCard()
      } else if (e.code === 'ArrowUp') {
        this.successCard()
      } else if (e.code === 'ArrowDown') {
        this.failCard()
      } else if (e.code === 'Space') {
        this.cancelReview()
      }
    })
  },
  methods: {
    prevCard() {
      console.log('prev')
    },
    nextCard() {
      console.log('next')
    },
    cancelReview() {
      console.log('cancelReview')
    },
    successCard() {
      console.log('successCard')
    },
    failCard() {
      console.log('failCard')
    },
  },
}
</script>

<style>

</style>
