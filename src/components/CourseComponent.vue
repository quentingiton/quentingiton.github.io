<template>
  <div class="course-item">
    <div class="title-with-buttons">
      <h2>{{ course.title }}</h2>
      <div class="course-links">
        <ButtonComponent
          v-if="course.LN"
          text="Lecture Notes"
          :onclick="() => openUrl(course.LN)"
        />
        <ButtonComponent
          v-if="course.ES"
          text="Exercise sheets"
          :onclick="() => openUrl(course.ES)"
        />
      </div>
    </div>
    <div class="text-container">
      <p v-if="course.description">{{ course.description }}</p>
    </div>
    <div class="course-meta">
      <span>{{ course.instructors }}</span>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";

const props = defineProps({
  course: {
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
