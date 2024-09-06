<template>
    <div class="publi-container">
      <h2 class="title">Publications</h2>
      <div class="content">
        <div class="info-box">
          <i class="fas fa-circle-info" style="color: #1e95ff;"></i>
          <p>You can find the complete list of my publications <a href="#" @click="showAllPublis">here</a></p>
        </div>
        <div v-for="publi in recentPublis" :key="publi.id" class="publi-item">
          <h3>{{ publi.title }}</h3>
          <div class="publi-meta">
            <span>{{ publi.authors }}</span>
            <div class="publi-links">
              <a v-if="publi.file" @click="() => openPDF(publi.file)" class="link">PDF</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
    <script>
    import axios from 'axios'
  
    export default {
      name: 'PublicationsComponent',
      data() {
        return {
          publis: [], // Full list
          recentPublis: [] // Only the 4 most recent courses
        }
      },
      created() {
        this.loadPublis();
      },
      methods: {
        loadPublis() {
          axios.get('publications/publications.json')
            .then(response => {
              this.publis = response.data;
  
              this.publis.sort((a,b) => {
                if (a.year == b.year) {
                  return b.month - a.month;
                }
                return b.year - a.year;
              });
  
              this.recentPublis = this.publis.slice(0,4);
            })
            .catch(error => {
              console.error("There was an error loading the publications:", error);
            });
        },
        showAllPublis() {
          // Create a new window
          const newWindow = window.open("", "_blank");
  
          // Generate HTML content for the new window
          let htmlContent = `
            <html>
            <head>
              <title>Publications</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
            
                h1 {
                  text-align: center;
                }
            
                .publi-item {
                  margin-bottom: 20px;
                }
            
                .publi-meta {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-size: 0.9em;
                  color: #666;
                }
            
                .publi-links .link {
                  margin-left: 10px;
                  color: #007bff;
                  text-decoration: none;
                }
            
                .publi-links .link:hover {
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <h1>All Publications</h1>
          `;
            
          // Add each publication to the HTML content
          this.publis.forEach(publi => {
            htmlContent += `
              <div class="publi-item">
                <h3>${publi.title}</h3>
                <p>Authors: ${publi.authors}</p>
                <div class="publi-meta">
                  <div class="publi-links">
                    ${publi.file ? `<a href="${publi.file}" class="link" target="_blank">PDF</a>` : ''}
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
    .publi-container {
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
  
    .publi-item {
      margin-bottom: 20px;
    }
  
    .publi-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9em;
      color: #666;
    }
  
    .publi-links .link {
      margin-left: 10px;
      color: #007bff;
      text-decoration: none;
    }
  
    .publi-links .link:hover {
      text-decoration: underline;
    }
  
    .link{
      cursor: pointer;
    }
    </style>