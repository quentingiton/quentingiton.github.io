<template>
  <div class="course-item">
    <div class="title-with-buttons">
      <h2>{{ course.title }}</h2>
      <div class="course-links">
        <ButtonComponent
          v-if="course.LN"
          text="Lecture Notes"
          :link="course.LN"
        />
        <ButtonComponent
          v-if="course.ES"
          text="Exercise sheets"
          :link="course.ES"
        />
      </div>
    </div>
    <p>{{ course.description }}</p>
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

function openPDF(pdfUrl) {
  // TODO fixme
  // Implement the logic to open the PDF
  console.log("Opening PDF:", pdfUrl);
  window.open(pdfUrl, "_blank");
}
</script>
