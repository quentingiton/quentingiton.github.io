<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Teaching</h1>
    </div>
    <div class="column-right">
      <div class="content">
        <div class="info-box">
          <i class="fas fa-circle-info" />
          <p>
            You can find the complete list of courses
            <RouterLink to="/teaching" courses="allCourses">here</RouterLink>
          </p>
        </div>
        <CourseComponent
          v-for="course in recentCourses"
          :key="course.id"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CourseComponent from "./CourseComponent.vue";

const props = defineProps({
  courses: {
    type: Array,
    default(rawProps) {
      return [];
    },
  },
});

const { courses } = props;

const recentCourses = courses
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
