<template>
  <div class="teaching-container">
    <h2 class="title">Teaching</h2>
    <div class="content">
      <div class="info-box">
        <i class="fas fa-circle-info" style="color: #1e95ff;"></i>
        <p>You can find the complete list of courses <a href="#" @click="showAllCourses">here</a></p>
      </div>
      <div v-for="course in recentCourses" :key="course.id" class="course-item">
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <div class="course-meta">
          <span>{{ course.instructor }}</span>
          <div class="course-links">
            <a v-if="course.LN" @click="() => openPDF(course.LN)" class="link">Lecture notes</a>
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
            title: 'L1 Statistics',
            instructor: 'Luc Joseph, Quentin Giton',
            LN: 'src/assets/teaching/24-25/L1/LN.pdf',
            ES: 'src/assets/teaching/24-25/L1/ES.pdf'
          },
          {
            id: 2,
            title: 'L2 Mathematics',
            // description: 'A comprehensive course on Vue.js fundamentals and best practices.',
            instructor: 'Luc Joseph, Quentin Giton',
            LN: 'src/assets/teaching/24-25/L2/LN.pdf',
            ES: 'src/assets/teaching/24-25/L2/ES.pdf'
          },
          // Add more courses as needed
        ]
      }
    },
    methods: {
      showAllCourses() {
        // Create a new window
        const newWindow = window.open("", "_blank");

        // Generate HTML content for the new window
        let htmlContent = `
          <html>
          <head>
            <title>All Courses</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
          
              h1 {
                text-align: center;
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
          </head>
          <body>
            <h1>All Courses</h1>
        `;
          
        // Add each course to the HTML content
        this.recentCourses.forEach(course => {
          htmlContent += `
            <div class="course-item">
              <h3>${course.title}</h3>
              <p>Instructors: ${course.instructor}</p>
              <div class="course-meta">
                <div class="course-links">
                  ${course.LN ? `<a href="${course.LN}" class="link" target="_blank">Lecture notes</a>` : ''}
                  ${course.ES ? `<a href="${course.ES}" class="link" target="_blank">Exercise sheets</a>` : ''}
                </div>
              </div>
            </div>
          `;
        });
      
        // Close the HTML content
        htmlContent += `
          </body>
          </html>
        `;
        
        // Write the content to the new window
        newWindow.document.write(htmlContent);
        newWindow.document.close(); // Close the document to render the content
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