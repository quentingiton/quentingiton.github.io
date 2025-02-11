<template>
  <div class="course-item">
    <h3>{{ course.title }}</h3>
    <p>{{ course.description }}</p>
    <div class="course-meta">
      <span>{{ course.instructors }}</span>
      <div class="course-links">
        <a
          v-if="course.LN"
          class="link"
          @click="() => openPDF(`../assets/pdf/teaching/${course.LN}`)"
        >Lecture notes</a>
        <a
          v-if="course.ES"
          class="link"
          @click="() => openPDF(course.ES)"
        >Exercise sheets</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    course: Object,
});

function openPDF(pdfUrl) {
    // TODO fixme
    // Implement the logic to open the PDF
    console.log('Opening PDF:', pdfUrl)
    window.open(pdfUrl, '_blank')
  }
</script>

<style scoped>
.course-item {
    margin-bottom: 20px;
  }

  .course-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
    color: #666;
  }

  .course-links .link {
    margin-left: 10px;
    color: #007bff;
    text-decoration: none;
  }

  .course-links .link:hover {
    text-decoration: underline;
  }

  .link{
    cursor: pointer;
  }
</style>