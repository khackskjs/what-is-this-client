<template>
  <card-list />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import CardList from '@/components/cards/CardList'

const cardModule = createNamespacedHelpers('card')

export default {
  name: 'CardListContainer',
  components: {
    CardList,
  },
  computed: {
    
  },
  mounted() {
    this.init()
  },
  methods: {
    ...cardModule.mapActions(['getCardGroupList', 'getCardList']),
    async init() {
      await this.getCardGroupList()
    }
  },
}
</script>

<style>

</style>