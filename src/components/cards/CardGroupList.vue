<template>
  <!-- <div>
    CardList
    <md-list>
      <md-list-item>
        <md-icon>move_to_inbox</md-icon>
        <span class="md-list-item-text">Inbox</span>
      </md-list-item>
    </md-list>
  </div> -->
  <div>
    <md-list>
      <md-list-item
        v-for="group of list"
        :key="group.guid"
      >
        <md-icon>move_to_inbox</md-icon>
        <span class="md-list-item-text">{{ group.name }}</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'CardGroupList',
  props: {
    list: { type: Array, default: () => [], required: true },
  },
  mounted() {
    console.log('m', this.$props)
  },
}
</script>

<style lang="scss" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>
