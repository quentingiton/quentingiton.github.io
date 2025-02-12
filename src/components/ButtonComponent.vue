<template>
  <a :href="link" class="button">{{ text }}</a>
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
  color: white;
  padding: 5px;
  background-color: @accent-blue;
  border-radius: 5%;
}
</style>
