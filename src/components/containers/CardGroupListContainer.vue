<template>
  <card-group-list
    :list="cardGroupList"
  />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import CardGroupList from '@/components/cards/CardGroupList'

const cardModule = createNamespacedHelpers('card')

export default {
  name: 'CardListContainer',
  components: {
    CardGroupList,
  },
  props: {
    
  },
  data() {
    return {
      // cardGroupList: [],
    }
  },
  computed: {
    ...cardModule.mapGetters(['groupList']),
    cardGroupList() {
      return this.groupList
    },
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