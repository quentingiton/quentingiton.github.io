<template>
  <a :href="link" class="button" target="_blank" rel="noopener noreferrer">{{
    text
  }}</a>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.button {
  text-decoration: none !important;
  color: @accent-blue;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid @accent-blue;
  font-size: small;

  &:hover {
    background-color: @accent-blue;
    color: white;
  }
}
</style>
