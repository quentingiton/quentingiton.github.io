<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Publications</h1>
    </div>
    <div class="column-right">
      <div class="content">
        <PubliComponent
          v-for="publi in allPublis"
          :key="publi.id"
          :publi="publi"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import publis from "@/assets/json/publications.json";
import PubliComponent from "@/components/PubliComponent.vue";

const allPublis = publis.sort((a, b) => {
  if (a.year == b.year) {
    return b.month - a.month;
  }
  return b.year - a.year;
});
</script>
