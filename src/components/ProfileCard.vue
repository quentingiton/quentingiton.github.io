<template>
  <div class="container">
    <div class="column-left">
      <img
        src="@/assets/images/quentin_profile.jpg"
        alt="Quentin Giton's profile picture"
        class="profile-image"
      >
      <div class="profile-infos">
        <h1 class="title">
          Quentin Giton
        </h1>
        <p class="subtitle">
          PhD student in Mathematics at 
          <a
            href="https://www.imo.universite-paris-saclay.fr/fr/"
            target="_blank"
          >University of Paris-Saclay
          </a>
        </p>
      </div>      

      <div class="contact-icons">
        <a href="mailto:quentin.giton@universite-paris-saclay.fr"><i class="fa-solid fa-square-envelope fa-2x" /></a>
        <a href="https://scholar.google.fr/"><i class="ai ai-google-scholar-square ai-2x" /></a>
      </div>
    </div>
    <div class="column-right">
      <h1>About me</h1>
      <div class="text-container">
        <p>
          My research focuses on a particular type of generative model:
          continuous normalising flows. These models, which are closely
          related to the theories of optimal transport and partial differential
          equations, offer a promising perspective for their theoretical analysis. <br><br>

          My aim is to provide solid theoretical guarantees for the use of
          these models in data generation and density estimation,
          an aspect that is still little explored in the field of generative models.
          This advance could potentially fill an important gap and open up
          new avenues for safe and robust applications. <br><br>

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

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.profile-image {
  align-self: center;
  width: 200px;
  height: 200px;
  object-fit: cover;      
  border-radius: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
}

.profile-infos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 36px;
}

.subtitle {
  text-align: center;
}

.contact-icons {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: @accent-blue;
}

.contact-icons i {
  margin: 5px;
}

.text-container p {
  text-align: justify;
  line-height: 1.6;
}
</style>
