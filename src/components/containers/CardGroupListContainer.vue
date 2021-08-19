<template>
  <card-group-list
    :list="cardGroupList"
    @select:cardGroup="onSelectCardGroup"
  />
</template>

<script>
import { createNamespacedHelpers, mapActions } from 'vuex'
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
    ...mapActions(['selectCardGroupUuid']),
    async init() {
      await this.getCardGroupList()
    },
    async onSelectCardGroup({ guid }) {
      await this.selectCardGroupUuid(guid)
    },
  },
}
</script>

<style>

</style>