<template>
  <div class="container">
    <div class="column-left">
      <h1 class="title">
        Teaching
      </h1>
    </div>
    <div class="column-right">
      <div class="content">
        <div class="info-box">
          <i
            class="fas fa-circle-info"
            style="color: #1e95ff;"
          />
          <p>
            You can find the complete list of courses <a
              href="#"
              @click="showAllCourses"
            >here</a>
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
  import CourseComponent from './CourseComponent.vue';

  const props = defineProps({
    courses: Array,
  });

  const recentCourses = props.courses
    .sort((a,b) => {
    if (a.year == b.year) {
      return b.semester - a.semester;
    }
    return b.year - a.year;
    }).slice(0,4);

  //TODO ajouter fonction pour affichage liste complete
  //TODO finir nettoyer code :)
  

  // export default {
  //   
  //   methods: {
  //     
  //     showAllCourses() {
  //       // Create a new window
  //       const newWindow = window.open("", "_blank");

  //       // Generate HTML content for the new window
  //       let htmlContent = `
  //         <html>
  //         <head>
  //           <title>All Courses</title>
  //           <style>
  //             body {
  //               font-family: Arial, sans-serif;
  //               padding: 20px;
  //             }
          
  //             h1 {
  //               text-align: center;
  //             }
          
  //             .course-item {
  //               margin-bottom: 20px;
  //             }
          
  //             .course-meta {
  //               display: flex;
  //               justify-content: space-between;
  //               align-items: center;
  //               font-size: 0.9em;
  //               color: #666;
  //             }
          
  //             .course-links .link {
  //               margin-left: 10px;
  //               color: #007bff;
  //               text-decoration: none;
  //             }
          
  //             .course-links .link:hover {
  //               text-decoration: underline;
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <h1>All Courses</h1>
  //       `;
          
  //       // Add each course to the HTML content
  //       this.courses.forEach(course => {
  //         htmlContent += `
  //           <div class="course-item">
  //             <h3>${course.title}</h3>
  //             <p>Instructors: ${course.instructors}</p>
  //             <div class="course-meta">
  //               <div class="course-links">
  //                 ${course.LN ? `<a href="${course.LN}" class="link" target="_blank">Lecture notes</a>` : ''}
  //                 ${course.ES ? `<a href="${course.ES}" class="link" target="_blank">Exercise sheets</a>` : ''}
  //               </div>
  //             </div>
  //           </div>
  //         `;
  //       });
      
  //       // Close the HTML content
  //       htmlContent += `
  //         </body>
  //         </html>
  //       `;
        
  //       // Write the content to the new window
  //       newWindow.document.write(htmlContent);
  //       newWindow.document.close(); // Close the document to render the content
  //    },
  //   }
  // }
  </script>

  <style scoped>
  .content {
    flex: 2;
  }

  .info-box {
    background-color: #e6f3ff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    max-width: max-content; /* Ensures the box wraps tightly around the text */
    display: flex; /* Ensures icon and text stay aligned */
    align-items: center; /* Vertically center the icon with the text */
  }

  .info-box p {
    margin-left: 5px; /* Add a small margin between the icon and the text */
  }

  .info-icon {
    margin-right: 5px;
  }
  </style>