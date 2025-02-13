<template>
  <button class="button" @click="onclick()">{{ text }}</button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  onclick: {
    type: Function,
    default() {
      return "Default function";
    },
  },
});
</script>

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.button {
  text-decoration: none !important;
  color: @accent-color;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid @accent-color;
  font-size: small;

  &:hover {
    background-color: @accent-color;
    color: white;
  }
}
</style>
