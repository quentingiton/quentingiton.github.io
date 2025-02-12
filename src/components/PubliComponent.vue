<template>
  <div class="course-item">
    <div class="title-with-buttons">
      <h2>{{ publi.title }}</h2>
      <div class="course-links">
        <ButtonComponent v-if="publi.file" text="PDF" :link="publi.file" />
      </div>
    </div>
    <div class="course-meta">
      <span>{{ publi.authors }}</span>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";

const props = defineProps({
  publi: {
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
