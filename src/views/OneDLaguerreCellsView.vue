<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">1D Laguerre Cells</h1>
      <br>
      <RouterLink to="/scripts" class="back-link">
        <i class="fas fa-arrow-left"></i> Back to the scripts
      </RouterLink>
    </div>
    <div class="column-right">
      <div class="content">
        <p>Adjust the Kantorovich potentials values and try to equate the three areas. Or use the optimise button (but that's cheating)</p>
        <OneDLaguerreCells /> 
      </div>
    </div>
  </div>
</template>

<script setup>
import OneDLaguerreCells from '@/components/OneDLaguerreCells.vue';
</script>

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.back-link {
  color: @text-color; /* Uses your global text color variable */
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}
</style>