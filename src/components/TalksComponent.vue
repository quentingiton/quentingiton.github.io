<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Talks</h1>
    </div>
    <div class="column-right">
      <div class="content">
        <div class="info-box">
          <i class="fas fa-circle-info" />
          <p>
            You can find the complete list of talks I gave
            <RouterLink to="/talks" courses="allTalks">here</RouterLink>
          </p>
        </div>
        <PresentationComponent
          v-for="talk in recentTalks"
          :key="talk.id"
          :talk="talk"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import PresentationComponent from "./PresentationComponent.vue";

const props = defineProps({
  talks: {
    type: Array,
    default(rawProps) {
      return [];
    },
  },
});

const { talks } = props;

const recentTalks = talks
  .sort((a, b) => {
    if (a.year == b.year) {
      if (a.month == b.month) {
        return b.day - a.day;
      } else {
        return b.month - a.month;
      }
    }
    return b.year - a.year;
  })
  .slice(0, 4);
</script>

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.fullpage {
  /* background-color: #eeeeee99; */
}
</style>
