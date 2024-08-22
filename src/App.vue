<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import ProfileCard from "@/components/ProfileCard.vue";
</script>

<template>
  <header>
    <link rel="stylesheet" href="/path/to/folder/css/academicons.min.css"/>
    <nav id="desktop-nav">
      <div class="logo">Quentin Giton</div>
      <div>
        <ul class="nav-links">
          <li><a href="#projects" class="active">Projects</a></li>
          <li><a href="#teaching">Teaching</a></li>
          <li><a href="#insterests">Interests</a></li>
          <li><a href="#posts">Posts</a></li>
          <li><a href="#conferences">Conferences</a></li>
          <li><a href="#research">Research</a></li>
          <li><a href="#home"><i class="fas fa-house" style="color: #000000;"></i></a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <ProfileCard />
  </main>
</template>

<style>
  body {
    font-family: Arial, sans-serif;
  }

  header {
    font-family: "Poppins", sans-serif;
    background-color: white;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .logo {
    font-size: 28px;
    font-weight: bold;
    color: #333;
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