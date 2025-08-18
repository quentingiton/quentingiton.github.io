<template>
    <div class="course-item">
      <div class="title-with-buttons">
        <h2>{{ note.title }}</h2>
        <div class="course-links">
          <ButtonComponent
            v-if="note.LN"
            text="PDF"
            :onclick="() => openUrl(note.LN)"
          />
        </div>
      </div>
      <div class="text-container">
        <p v-if="note.description">{{ note.description }}</p>
      </div>
      <div class="course-meta">
        <span>{{ note.authors }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import ButtonComponent from "./ButtonComponent.vue";
  
  const props = defineProps({
    note: {
      type: Object,
      default(rawProps) {
        return {};
      },
    },
  });
  
  function openUrl(link) {
    window.open(link, "_blank");
  }
  </script>
  