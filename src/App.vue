<script setup>
import ProfileCard from "./components/ProfileCard.vue";
import ComponentManager from "./components/ComponentManager.vue";
</script>

<template>
  <header>
    <link rel="stylesheet" href="../dist/academicons-1.9.4/css/academicons.min.css"/>
    <nav id="desktop-nav">
      <div class="logo">Quentin Giton</div>
      <div>
        <ul class="nav-links">
          <li><a href="#about" class="active">About me</a></li>
          <li><a href="#teaching">Teaching</a></li>
          <li><a href="#conferences">Conferences</a></li>
          <li><a href="#talks">Talks</a></li>
          <li><a href="#publications">Publications</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#"><i class="fas fa-house" style="color: #000000;"></i></a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <ProfileCard id="#about"/>
    <ComponentManager />
  </main>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: Arial, sans-serif;
  }

  header {
    font-family: "Poppins", sans-serif;
    background-color: white;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  main {
    margin-top: 60px;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .logo {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-right: auto;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 15px;
  }

  .nav-links li {
    position: relative;
  }

  .nav-links a {
    text-decoration: none;
    color: #333;
    font-size: 18px;
    padding: 5px 10px;
  }

  .nav-links a.active {
    color: #0066cc;
    font-weight: bold;
  }

  .icons {
    display: flex;
    gap: 10px;
  }

  .icons a img {
    width: 20px;
    height: 20px;
  }
</style>