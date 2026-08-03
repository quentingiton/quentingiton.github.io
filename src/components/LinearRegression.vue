<template>
  <div class="interactive-regression">
    <div class="mse-display">
      Mean Square Error (MSE): <strong>{{ mse.toFixed(2) }}</strong>
    </div>
    
    <div ref="plotContainer"></div>

    <div class="controls">
      <div class="slider-row">
        <label>Slope (a):</label>
        <input type="range" v-model.number="m" min="-3" max="5" step="0.01">
        <span class="value-display">{{ m.toFixed(2) }}</span>
      </div>
      
      <div class="slider-row">
        <label>Intercept (b):</label>
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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import Plotly from 'plotly.js-dist-min';

import { tween, pause, frameThrottle } from '@/utils/animate';

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

  // All ten residuals go in a single trace, separated by nulls, rather than one
  // trace each. Plotly reconciles traces individually, so ten of them meant ten
  // SVG groups rebuilt per frame to draw ten dashes.
  const residualX = [];
  const residualY = [];

  for(let i = 0; i < x.length; i++) {
    let y_pred = m.value * x[i] + b.value;
    currentMse += Math.pow(y[i] - y_pred, 2);
    residualX.push(x[i], x[i], null);
    residualY.push(y[i], y_pred, null);
  }

  traces.push({
    x: residualX, y: residualY,
    mode: 'lines', line: {color: 'gray', dash: 'dash'},
    showlegend: false, hoverinfo: 'none'
  });

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
    // Plotly 3 dropped the string shorthand for titles — it must be an object,
    // or the title is silently ignored.
    xaxis: {range: [0, 11], title: {text: 'X'}},
    yaxis: {range: [0, 30], title: {text: 'Y'}},
    margin: {t: 20, b: 40, l: 40, r: 20},
    showlegend: false
  };

  Plotly.react(plotContainer.value, traces, layout, PLOT_CONFIG);
};

const PLOT_CONFIG = { displayModeBar: false, responsive: false };

const scheduleDraw = frameThrottle(() => {
  if (plotContainer.value) drawPlot();
});

watch([m, b], scheduleDraw);

onMounted(() => {
  drawPlot();
});

onBeforeUnmount(() => {
  scheduleDraw.cancel();
  if (plotContainer.value) Plotly.purge(plotContainer.value);
});

const animateOptimization = async () => {
  isOptimizing.value = true;

  const startM = m.value;
  const startB = b.value;

  await tween(800, (t) => {
    m.value = startM + (m_opt - startM) * t;
  });

  await pause(400);

  await tween(800, (t) => {
    b.value = startB + (b_opt - startB) * t;
  });

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
  accent-color: #dd9ea4;
}
.value-display {
  width: 50px;
  text-align: right;
  font-family: monospace;
}
button {
  background: #dd9ea4;
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
button:hover { background: #eecacc; }
button:disabled { background: #ccc; cursor: not-allowed; }
</style>