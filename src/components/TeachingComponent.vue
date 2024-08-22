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
              <!-- Tout ce qui suit ne fonctionne pas x) -->
              <!-- <a href="../assets/others/L2_maths_ex_sheet.pdf" target="_blank">Exercise sheet</a> -->
              <a v-if="course.LN" :href="course.LN" class="link">Lecture notes</a>
              <a v-if="course.ES" :href="course.title" @click.prevent="openPDF(course.ES)" class="link">Exercise sheets</a>
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
            title: 'L2 Mathematics',
            // description: 'A comprehensive course on Vue.js fundamentals and best practices.',
            instructor: 'Luc Joseph, Quentin Giton',
            LN: '#',
            ES: '../assets/others/L2_maths_ex_sheet.pdf'
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
      const width = 800;
      const height = 600;
      const left = (screen.width / 2) - (width / 2);
      const top = (screen.height / 2) - (height / 2);
      
      window.open(
        encodeURIComponent(pdfUrl),
        '_blank',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
        );
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
  </style>