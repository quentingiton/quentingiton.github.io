<template>
  <div class="course-item">
    <h3>{{ publi.title }}</h3>
    <div class="course-meta">
      <span>{{ publi.authors }}</span>
      <div class="course-links">
        <ButtonComponent v-if="publi.file" text="PDF" :link="publi.file" />
      </div>
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

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.course-item {
  margin-bottom: 20px;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
}

.course-links .link {
  margin-left: 10px;
  color: @accent-blue;
  text-decoration: none;
}

.course-links .link:hover {
  text-decoration: underline;
}

.link {
  cursor: pointer;
}
</style>
