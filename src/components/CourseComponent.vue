<template>
  <div class="course-item">
    <h3>{{ course.title }}</h3>
    <p>{{ course.description }}</p>
    <div class="course-meta">
      <span>{{ course.instructors }}</span>
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
