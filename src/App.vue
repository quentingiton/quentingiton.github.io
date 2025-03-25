<template>
  <header>
    <nav id="desktop-nav">
      <div class="logo"><RouterLink to="/">Quentin Giton</RouterLink></div>
      <div class="nav-links">
        <RouterLink to="/teaching" active-class="link-active"
          >Teaching</RouterLink
        >
        <RouterLink to="/publications" active-class="link-active"
          >Publications</RouterLink
        >
        <RouterLink to="/notes" active-class="link-active"
          >Notes</RouterLink
        >
        <RouterLink to="/"><i class="fas fa-house"></i></RouterLink>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
