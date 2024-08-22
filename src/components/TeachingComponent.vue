<template>
  <div class="teaching-container">
    <h2 class="title">Teaching</h2>
    <div class="content">
      <div class="info-box">
        <i class="fas fa-circle-info" style="color: #1e95ff;"></i>
        <a href="#" @click="showAllCourses">Complete list of courses here.</a>
      </div>
      <div v-for="course in recentCourses" :key="course.id" class="course-item">
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <div class="course-meta">
          <span>{{ course.instructor }}</span>
          <div class="course-links">
            <a v-if="course.LN" :href="course.LN" class="link">Lecture notes</a>
            <a v-if="course.ES" @click="() => openPDF(course.ES)" class="link">Exercise sheets</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  export default {
    name: 'TeachingComponent',
    data() {
      return {
        recentCourses: [
          {
            id: 1,
            title: 'L1 Mathematics',
            instructor: 'AAAAAAA, BBBBBBB',
            LN: '#',
            ES: 'src/assets/others/L1_stats_ex_sheet.pdf'
          },
          {
            id: 2,
            title: 'L2 Mathematics',
            // description: 'A comprehensive course on Vue.js fundamentals and best practices.',
            instructor: 'Luc Joseph, Quentin Giton',
            LN: '#',
            ES: 'src/assets/others/L2_maths_ex_sheet.pdf'
          },
          // Add more courses as needed
        ]
      }
    },
    methods: {
      showAllCourses() {
        // Implement the logic to show all courses
        console.log('Showing all courses')
      },
      openPDF(pdfUrl) {
        // Implement the logic to open the PDF
        console.log('Opening PDF:', pdfUrl)
        window.open(pdfUrl, '_blank')
      }
    }
  }
  </script>

  <style scoped>
  .teaching-container {
    display: flex;
    font-family: Arial, sans-serif;
  }

  .title {
    flex: 1;
    font-size: 2em;
    color: #333;
  }

  .content {
    flex: 2;
  }

  .info-box {
    background-color: #e6f3ff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .info-icon {
    margin-right: 5px;
  }

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