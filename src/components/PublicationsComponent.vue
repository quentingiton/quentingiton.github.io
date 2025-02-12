<template>
  <div class="fullpage">
    <div class="container">
      <div class="column-left">
        <h1 class="section-title">Publications</h1>
      </div>
      <div class="column-right">
        <div class="content">
          <div class="info-box">
            <i class="fas fa-circle-info" />
            <p>
              You can find the complete list of my publications
              <a href="#" @click="showAllPublis">here</a>
            </p>
          </div>
          <PubliComponent
            v-for="publi in recentPublis"
            :key="publi.id"
            :publi="publi"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PubliComponent from "./PubliComponent.vue";

const props = defineProps({
  publis: {
    type: Array,
    default(rawProps) {
      return [];
    },
  },
});

const { publis } = props;

const recentPublis = publis
  .sort((a, b) => {
    if (a.year == b.year) {
      return b.month - a.month;
    }
    return b.year - a.year;
  })
  .slice(0, 4);

//   showAllPublis() {
//     // Create a new window
//     const newWindow = window.open("", "_blank");

//     // Generate HTML content for the new window
//     let htmlContent = `
//       <html>
//       <head>
//         <title>Publications</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             padding: 20px;
//           }

//           h1 {
//             text-align: center;
//           }

//           .publi-item {
//             margin-bottom: 20px;
//           }

//           .publi-meta {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             font-size: 0.9em;
//             color: #666;
//           }

//           .publi-links .link {
//             margin-left: 10px;
//             color: #007bff;
//             text-decoration: none;
//           }

//           .publi-links .link:hover {
//             text-decoration: underline;
//           }
//         </style>
//       </head>
//       <body>
//         <h1>All Publications</h1>
//     `;

//     // Add each publication to the HTML content
//     this.publis.forEach(publi => {
//       htmlContent += `
//         <div class="publi-item">
//           <h3>${publi.title}</h3>
//           <p>Authors: ${publi.authors}</p>
//           <div class="publi-meta">
//             <div class="publi-links">
//               ${publi.file ? `<a href="${publi.file}" class="link" target="_blank">PDF</a>` : ''}
//             </div>
//           </div>
//         </div>
//       `;
//     });

//     // Close the HTML content
//     htmlContent += `
//       </body>
//       </html>
//     `;

//     // Write the content to the new window
//     newWindow.document.write(htmlContent);
//     newWindow.document.close(); // Close the document to render the content
//  },
//   openPDF(pdfUrl) {
//     // Implement the logic to open the PDF
//     console.log('Opening PDF:', pdfUrl)
//     window.open(pdfUrl, '_blank')
//   }
</script>
