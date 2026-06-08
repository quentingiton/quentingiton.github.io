<template>
  <div class="container">
    <div class="column-left">
      <img
        src="@/assets/images/quentin_profile.jpg"
        alt="Quentin Giton's profile picture"
        class="profile-image"
      />
      <div class="profile-infos">
        <h1 class="title">Quentin Giton</h1>
        <p class="subtitle">
          PhD student in Mathematics at
          <a
            href="https://www.imo.universite-paris-saclay.fr/fr/"
            target="_blank"
            rel="noopener noreferrer"
            >University of Paris-Saclay
          </a>
        </p>
      </div>

      <div class="contact-icons">
        <a href="mailto:quentin.giton@universite-paris-saclay.fr"
          ><i class="fa-solid fa-square-envelope fa-2x"
        /></a>
        <a
          href="https://scholar.google.com/citations?user=Q4aM2vkAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          ><i class="ai ai-google-scholar-square ai-2x"
        /></a>
      </div>
    </div>
    <div class="column-right">
      <h1>About me</h1>
      <div class="text-container">
        <p>
          I'm working on Lagragian schemes to simulate continuity 
          equation-type PDEs using their formulation as Wasserstein gradient flows.
          This topic is close to the theories of (semi-discrete) optimal transport, 
          PDEs (of course) and calculus of variations. <br /><br />

          Such particulate schemes can also be usefull in providing
          theoretical guarantees to some training methods
          of some generative models as normalising flows, diffusion 
          models or flow-matching models for instance. <br /><br />

          If you are interested in this topic or would like to discuss it 
          further, please do not hesitate to contact me by email.
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
  color: @accent-color;
}

.contact-icons i {
  margin: 5px;
}
</style>
