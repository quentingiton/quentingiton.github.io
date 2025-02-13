<template>
  <div class="fullpage">
    <div class="container">
      <div class="column-left">
        <h1 class="section-title">Publications</h1>
      </div>
      <div class="column-right">
        <div class="content">
          <div class="info-box">
            <i class="fas fa-circle-info" />
            <p>
              You can find the complete list of my publications
              <RouterLink to="/publications">here</RouterLink>
            </p>
          </div>
          <PubliComponent
            v-for="publi in recentPublis"
            :key="publi.id"
            :publi="publi"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PubliComponent from "./PubliComponent.vue";

const props = defineProps({
  publis: {
    type: Array,
    default(rawProps) {
      return [];
    },
  },
});

const { publis } = props;

const recentPublis = publis
  .sort((a, b) => {
    if (a.year == b.year) {
      return b.month - a.month;
    }
    return b.year - a.year;
  })
  .slice(0, 4);
</script>
