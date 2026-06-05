<template>
  <div class="interactive-regression">
    <div class="mse-display">
      Mean Square Error (MSE): <strong>{{ mse.toFixed(2) }}</strong>
    </div>
    
    <div ref="plotContainer"></div>

    <div class="controls">
      <div class="slider-row">
        <label>Pente (m):</label>
        <input type="range" v-model.number="m" min="-3" max="5" step="0.01">
        <span class="value-display">{{ m.toFixed(2) }}</span>
      </div>
      
      <div class="slider-row">
        <label>Ordonnée (b):</label>
        <input type="range" v-model.number="b" min="-5" max="30" step="0.1">
        <span class="value-display">{{ b.toFixed(1) }}</span>
      </div>
      
      <button :disabled="isOptimizing" @click="animateOptimization">
        {{ isOptimizing ? 'Optimising...' : 'Optimise!' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Plotly from 'plotly.js-dist-min';

const plotContainer = ref(null);

const m = ref(-0.5);
const b = ref(22.0);
const mse = ref(0.0);
const isOptimizing = ref(false);

const x = [1.5, 2.38, 3.27, 4.16, 5.05, 5.94, 6.83, 7.72, 8.61, 9.5];
const y = [7.44, 8.08, 10.86, 13.78, 12.74, 14.34, 18.66, 19.05, 18.79, 21.91];
const m_opt = 1.63;
const b_opt = 5.25;

const drawPlot = () => {
  let lineX = [0, 11];
  let lineY = [m.value * 0 + b.value, m.value * 11 + b.value];
  let traces = [];
  let currentMse = 0;

  for(let i = 0; i < x.length; i++) {
    let y_pred = m.value * x[i] + b.value;
    currentMse += Math.pow(y[i] - y_pred, 2);
    traces.push({
      x: [x[i], x[i]], y: [y[i], y_pred],
      mode: 'lines', line: {color: 'gray', dash: 'dash'},
      showlegend: false, hoverinfo: 'none'
    });
  }
  
  mse.value = currentMse / x.length;

  traces.push({
    x: lineX, y: lineY, mode: 'lines',
    line: {color: '#7201A8', width: 3}, name: 'Regression line'
  });

  traces.push({
    x: x, y: y, mode: 'markers',
    marker: {color: '#D77E62', size: 10}, name: 'Data'
  });

  const layout = {
    xaxis: {range: [0, 11], title: 'X'},
    yaxis: {range: [0, 30], title: 'Y'},
    margin: {t: 20, b: 40, l: 40, r: 20},
    showlegend: false
  };

  Plotly.react(plotContainer.value, traces, layout);
};

watch([m, b], () => {
  drawPlot();
});

onMounted(() => {
  drawPlot();
});

const easeInOut = (t) => t * t * (3 - 2 * t);
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const animateOptimization = async () => {
  isOptimizing.value = true;
  let startM = m.value;
  let startB = b.value;
  let frames = 40;
  let pauseTime = 20; // ms per frame

  for(let i = 1; i <= frames; i++) {
    let t = easeInOut(i / frames);
    m.value = startM + (m_opt - startM) * t;
    await delay(pauseTime);
  }

  await delay(400);

  for(let i = 1; i <= frames; i++) {
    let t = easeInOut(i / frames);
    b.value = startB + (b_opt - startB) * t;
    await delay(pauseTime);
  }
  
  isOptimizing.value = false;
};
</script>

<style scoped>
.interactive-regression {
  font-family: sans-serif;
  max-width: 800px;
  margin: 0 auto;
}
.mse-display {
  font-size: 1.2em;
  text-align: center;
  color: #333;
  margin-bottom: 10px;
}
.controls {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10px;
}
.slider-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.slider-row label {
  width: 120px;
  font-weight: bold;
  color: #7201A8;
}
input[type=range] {
  flex-grow: 1;
  margin: 0 15px;
}
.value-display {
  width: 50px;
  text-align: right;
  font-family: monospace;
}
button {
  background: #D77E62;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: opacity 0.3s;
}
button:hover { background: #B7654B; }
button:disabled { background: #ccc; cursor: not-allowed; }
</style>