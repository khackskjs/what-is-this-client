<template>
  <div>
    <card-group-list
      v-if="!cardGroupList || cardGroupList.length"
      :list="cardGroupList"
      @select:cardGroup="onSelectCardGroup"
    />
    <div
      v-else
      class="d-flex justify-content-center mt-3"
    >
      <div class="no-card-title">
        {{ $t('card_group_list__no_item_title') }}
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapActions, mapGetters } from 'vuex'
import CardGroupList from '@/components/cards/CardGroupList'

const cardModule = createNamespacedHelpers('card')
const userModule = createNamespacedHelpers('user')

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
    ...userModule.mapGetters(['uuid']),
    ...mapGetters(['selectedCardGroupUuid']),
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
      // 순서 중요. 카드 리스트를 가져온 후 root state 변경 해야 함
      await this.getCardList(guid)
      await this.selectCardGroupUuid(guid)
      this.$emit('select', guid)
    },
  },
}
</script>

<style>
.no-card-title {
  font-size: 1.5rem;
}
</style>