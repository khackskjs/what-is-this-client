<template>
  <div>
    <md-list>
      <md-list-item
        v-for="group of list"
        :key="group.guid"
        @click="onGroupClick(group)"
      >
        <md-icon>article</md-icon>
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
  methods: {
    onGroupClick(group) {
      this.$emit('select:cardGroup', { guid: group.guid })
    },
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
