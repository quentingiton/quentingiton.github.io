<template>
  <div class="profile-card">
    <div class="profile-left">
      <img src="../assets/pic_Q.jpg" alt="Quentin Giton's profile picture" class="profile-image" />

      <!-- LMO link with logo -->
      <a href="https://www.imo.universite-paris-saclay.fr/fr/" target="_blank" class="logo-link">
        <div class="text-with-logo">
          <p>LMO</p>
          <img src="../assets/LogoIMO.png" alt="LMO logo" class="link-logo" />
        </div>
      </a>

      <!-- UPS link with logo -->
      <a href="https://www.universite-paris-saclay.fr/" target="_blank" class="logo-link">
        <div class="text-with-logo">
          <p>Université Paris-Saclay</p>
          <img src="../assets/LogoParisSaclay.jpg" alt="UPS logo" class="link-logo" />
        </div>
      </a>

      <div class="contact-icons">
<!--        <img src="@/assets/email-icon.png" alt="Email" />-->
<!--        <img src="@/assets/google-icon.png" alt="Google Scholar" />-->
      </div>
    </div>
    <div class="profile-right">
      <h1>Quentin Giton</h1>
      <p>Doctoral student in Mathematics at University of Paris-Saclay</p>
      <h2>About me</h2>
        <div class="text-container">
          <p>
            My research focuses on a particular type of generative model:
            continuous normalising flows. These models, which are closely
            related to the theories of optimal transport and partial differential
            equations, offer a promising perspective for their theoretical analysis. <br /><br />

            My aim is to provide solid theoretical guarantees for the use of
            these models in data generation and density estimation,
            an aspect that is still little explored in the field of generative models.
            This advance could potentially fill an important gap and open up
            new avenues for safe and robust applications. <br /><br />

            If you are interested in this topic or would like to discuss it further,
            please do not hesitate to contact me by e-mail.
          </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
};
</script>

<style scoped>
.profile-card {
  display: flex;
  align-items: flex-start; /* Align items at the start (top) */
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.profile-left {
  text-align: center;
  width: 30%; /* Adjusted width to balance the content */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image {
  width: 150px;
  height: 150px;          
  object-fit: cover;      
  border-radius: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.position {
  color: gray;
  margin-bottom: 10px;
}

.department,
.university {
  color: #0066cc;
  margin-bottom: 10px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: purple;
  font-size: 1.2em;
  margin-bottom: 10px;
}


.logo-link {
  text-decoration: none;
  color: purple;
  font-size: 1.2em;
  margin-bottom: 10px;
  display: flex;
  
}

.text-with-logo {
  display: flex;
  align-items: center;
}

.link-logo {
  height: 30px;
  margin-left: 10px;
  object-fit: contain;
}

.contact-icons img {
  width: 30px;
  margin: 10px;
}

.profile-right {
  width: 65%; /* Adjusted width to balance the content */
  align-items: center;
}

.profile-right h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.profile-right p {
  font-size: 18px;
  margin-bottom: 20px;
}

.profile-right h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.text-container p {
  text-align: justify;
  line-height: 1.6;
}
</style>
