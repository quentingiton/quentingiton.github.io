<template>
    <div class="container">
      <div class="column-left">
        <h1 class="section-title">Short notes</h1>
      </div>
      <div class="column-right">
        <div class="content">
          <div class="info-box">
            <i class="fas fa-circle-info" />
            <p>
              You can find the complete list of my notes
              <RouterLink to="/notes" notes="allNotes">here</RouterLink>
            </p>
          </div>
          <NotesComponent
            v-for="note in recentNotes"
            :key="note.id"
            :note="note"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import NotesComponent from "./NotesComponent.vue";
  
  const props = defineProps({
    notes: {
      type: Array,
      default(rawProps) {
        return [];
      },
    },
  });
  
  const { notes } = props;
  
  const recentNotes = notes
    .sort((a, b) => {
      if (a.year == b.year) {
        return b.semester - a.semester;
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
  