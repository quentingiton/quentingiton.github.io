<template>
  <header>
    <nav id="desktop-nav">
      <div class="logo">Quentin Giton</div>
      <div>
        <ul class="nav-links">
          <li><a href="/#teaching">Teaching</a></li>
          <li><a href="/#publications">Publications</a></li>
          <li><a href="/#conferences">Conferences</a></li>
          <li>
            <RouterLink to="/"
              ><i class="fas fa-house" style="color: #000000"></i
            ></RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
