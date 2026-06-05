<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Scripts</h1>
    </div>
    
    <div class="column-right">
      <div class="content">
        <p>A collection of scripts and pedagogical tools</p>

        <div class="image-grid">
          
          <RouterLink to="/scripts/linear-regression" class="grid-item">
            <img src="@/assets/images/LinReg.png" alt="Linear Regression">
            <div class="overlay">
              <span>Linear Regression</span>
            </div>
          </RouterLink>

          <RouterLink to="/scripts/1d-laguerre-cells" class="grid-item">
            <img src="@/assets/images/1dLagCells.png" alt="1D Laguerre Cells">
            <div class="overlay">
              <span>1D Laguerre Cells</span>
            </div>
          </RouterLink>

          </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 1.5rem;
}

.grid-item {
  position: relative;
  display: block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.grid-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  padding: 8px 12px;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
}
</style>