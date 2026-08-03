<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Talks</h1>
    </div>
    <div class="column-right">
      <div class="content">
        <PresentationComponent
          v-for="talk in allTalks"
          :key="talk.id"
          :talk="talk"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import talks from "@/assets/json/talks.json";
import PresentationComponent from "@/components/PresentationComponent.vue";

const allTalks = talks.sort((a, b) => {
  if (a.year == b.year) {
    if (a.month == b.month) {
        return b.day - a.day;
    } else {
        return b.month - a.month;
    }
  }
  return b.year - a.year;
});
</script>
