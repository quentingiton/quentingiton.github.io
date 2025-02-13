<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Teaching</h1>
    </div>
    <div class="column-right">
      <div class="content">
        <CourseComponent
          v-for="course in allCourses"
          :key="course.id"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import courses from "@/assets/json/teaching.json";
import CourseComponent from "@/components/CourseComponent.vue";

const allCourses = courses.sort((a, b) => {
  if (a.year == b.year) {
    return b.semester - a.semester;
  }
  return b.year - a.year;
});
</script>
