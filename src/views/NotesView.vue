<template>
    <div class="container">
      <div class="column-left">
        <h1 class="section-title">Short notes</h1>
      </div>
      <div class="column-right">
        <div class="content">
          <NotesComponent
            v-for="note in allNotes"
            :key="note.id"
            :note="note"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import notes from "@/assets/json/notes.json";
  import NotesComponent from "@/components/NotesComponent.vue";
  
  const allNotes = notes.sort((a, b) => {
    if (a.year == b.year) {
      return b.semester - a.semester;
    }
    return b.year - a.year;
  });
  </script>
  