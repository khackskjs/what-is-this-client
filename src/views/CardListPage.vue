<template>
  <div>
    <card-group-list-container
      @select="onSelect"
    />
    <card-group-form-container
      ref="cg-form-container"
    />
  </div>
</template>

<script>
import CardGroupListContainer from '@/components/containers/CardGroupListContainer'
import CardGroupFormContainer from '@/components/containers/CardGroupFormContainer'

export default {
  name: 'CardListPage',
  components: {
    CardGroupListContainer,
    CardGroupFormContainer,
  },
  methods: {
    onSelect() {
      this.$refs['cg-form-container'].show()
    }
  }
}
</script>

<style>

</style>