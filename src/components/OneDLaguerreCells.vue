<template>
  <div class="interactive-transport">
    <div ref="plotContainer"></div>

    <div class="controls">
      <div class="slider-row">
        <label>Theta 1 :</label>
        <input type="range" v-model.number="t1" min="-4" max="4" step="0.05">
        <span class="value-display">{{ t1.toFixed(2) }}</span>
      </div>
      
      <div class="slider-row">
        <label>Theta 2 :</label>
        <input type="range" v-model.number="t2" min="-4" max="4" step="0.05">
        <span class="value-display">{{ t2.toFixed(2) }}</span>
      </div>

      <div class="slider-row">
        <label>Theta 3 :</label>
        <input type="range" v-model.number="t3" min="-4" max="4" step="0.05">
        <span class="value-display">{{ t3.toFixed(2) }}</span>
      </div>
      
      <button :disabled="isOptimizing" @click="animateOptimization">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Plotly from 'plotly.js-dist-min';

const plotContainer = ref(null);

const t1 = ref(0.0);
const t2 = ref(0.0);
const t3 = ref(0.0);
const isOptimizing = ref(false);
const btnText = ref('Optimise!');

const c1 = -2, c2 = 0, c3 = 1;

const dx_metrics = 0.02;
const grid_metrics = [];
for (let x = -10; x <= 10; x += dx_metrics) {
  grid_metrics.push({
    x,
    b1: Math.exp(-Math.pow(x - c1, 2)),
    b2: Math.exp(-Math.pow(x - c2, 2)),
    b3: Math.exp(-Math.pow(x - c3, 2))
  });
}

const dx_plot = 0.015;
const grid_plot = [];
for (let x = -4; x <= 3.5; x += dx_plot) {
  grid_plot.push({
    x,
    b1: Math.exp(-Math.pow(x - c1, 2)),
    b2: Math.exp(-Math.pow(x - c2, 2)),
    b3: Math.exp(-Math.pow(x - c3, 2))
  });
}

const computeMetrics = (val_t1, val_t2, val_t3) => {
  let m1 = 0, m2 = 0, m3 = 0;
  let mom1 = 0, mom2 = 0, mom3 = 0;

  let exp_t1 = Math.exp(val_t1);
  let exp_t2 = Math.exp(val_t2);
  let exp_t3 = Math.exp(val_t3);

  for (let i = 0; i < grid_metrics.length; i++) {
    let pt = grid_metrics[i];
    
    let u1 = exp_t1 * pt.b1;
    let u2 = exp_t2 * pt.b2;
    let u3 = exp_t3 * pt.b3;
    
    let maxU = Math.max(u1, u2, u3);
    
    if (maxU === u1) {
      m1 += maxU;
      mom1 += pt.x * maxU;
    } else if (maxU === u2) {
      m2 += maxU;
      mom2 += pt.x * maxU;
    } else {
      m3 += maxU;
      mom3 += pt.x * maxU;
    }
  }

  let bary1 = mom1 / m1;
  let bary2 = mom2 / m2;
  let bary3 = mom3 / m3;

  m1 *= dx_metrics;
  m2 *= dx_metrics;
  m3 *= dx_metrics;

  let Z = m1 + m2 + m3;

  return { 
    m1: m1/Z, m2: m2/Z, m3: m3/Z, 
    bary1: bary1,
    bary2: bary2, 
    bary3: bary3, 
    Z: Z 
  };
};

const drawPlot = () => {
  const metrics = computeMetrics(t1.value, t2.value, t3.value);
  
  let x_curve = [], y_curve = [];
  let x1 = [], y1 = [], x2 = [], y2 = [], x3 = [], y3 = [];
  
  let exp_t1 = Math.exp(t1.value);
  let exp_t2 = Math.exp(t2.value);
  let exp_t3 = Math.exp(t3.value);
  let invZ = 1 / metrics.Z;

  for (let i = 0; i < grid_plot.length; i++) {
    let pt = grid_plot[i];
    let u1 = exp_t1 * pt.b1;
    let u2 = exp_t2 * pt.b2;
    let u3 = exp_t3 * pt.b3;
    
    let maxU = Math.max(u1, u2, u3);
    let density = maxU * invZ;
    
    x_curve.push(pt.x);
    y_curve.push(density);

    if (maxU === u1) { x1.push(pt.x); y1.push(density); }
    else if (maxU === u2) { x2.push(pt.x); y2.push(density); }
    else { x3.push(pt.x); y3.push(density); }
  }

  let traces = [];

  traces.push({ x: x1, y: y1, fill: 'tozeroy', mode: 'none', fillcolor: 'rgba(220, 191, 232, 0.6)', xaxis: 'x1', yaxis: 'y1', hoverinfo: 'skip' });
  traces.push({ x: x2, y: y2, fill: 'tozeroy', mode: 'none', fillcolor: 'rgba(220, 191, 232, 0.8)', xaxis: 'x1', yaxis: 'y1', hoverinfo: 'skip' });
  traces.push({ x: x3, y: y3, fill: 'tozeroy', mode: 'none', fillcolor: 'rgba(220, 191, 232, 0.6)', xaxis: 'x1', yaxis: 'y1', hoverinfo: 'skip' });

  traces.push({
    x: x_curve, y: y_curve, mode: 'lines',
    line: { color: 'purple', width: 2 }, xaxis: 'x1', yaxis: 'y1', hoverinfo: 'none'
  });

  const peaks = [exp_t1 * invZ, exp_t2 * invZ, exp_t3 * invZ];
  
  [c1, c2, c3].forEach((c, idx) => {
    traces.push({
      x: [c, c],
      y: [0, peaks[idx]],
      mode: 'lines',
      line: { color: 'gray', dash: 'dot', width: 2 },
      xaxis: 'x1',
      yaxis: 'y1',
      hoverinfo: 'skip'
    });
  });

  traces.push({
    x: [metrics.bary1, metrics.bary2, metrics.bary3],
    y: [0, 0, 0],
    mode: 'markers',
    marker: { color: 'purple', size: 8 },
    xaxis: 'x1',
    yaxis: 'y1',
    hoverinfo: 'skip'
  });

  const masses = [metrics.m1, metrics.m2, metrics.m3];
  traces.push({
    x: ['Cell 1', 'Cell 2', 'Cell 3'],
    y: masses,
    type: 'bar',
    xaxis: 'x2',
    yaxis: 'y2',
    marker: {
      color: masses.map(m => Math.abs(m - 1/3) < 0.005 ? '#d77e62' : '#dcbfe8')
    }
  });

  const layout = {
    title: false,
    margin: { t: 40, b: 40, l: 40, r: 20 },
    showlegend: false,
    datarevision: Date.now(),
    xaxis: { domain: [0, 0.75], range: [-4, 3.5], title: "Probability density $\\rho$", zeroline: false },
    yaxis: { range: [-0.15, 0.8] },
    xaxis2: { domain: [0.82, 1] },
    yaxis2: { anchor: 'x2', range: [0, 0.6], title: 'Masses' },
    shapes: [
      { type: 'line', xref: 'x1', yref: 'y1', x0: -4, x1: 3.5, y0: 0, y1: 0, line: { color: 'black', width: 1 } },
      { type: 'line', xref: 'x2', yref: 'y2', x0: -0.5, x1: 2.5, y0: 1/3, y1: 1/3, line: { color: '#d77e62', dash: 'dash' } }
    ],
    annotations: [
      { x: c1, y: peaks[0] + 0.05, text: '$\\hat{x}_1$', showarrow: false, font: { color: '#d77e62', size: 14 } },
      { x: c2, y: peaks[1] + 0.05, text: '$\\hat{x}_2$', showarrow: false, font: { color: '#d77e62', size: 14 } },
      { x: c3, y: peaks[2] + 0.05, text: '$\\hat{x}_3$', showarrow: false, font: { color: '#d77e62', size: 14 } },

      { x: metrics.bary1, y: -0.05, text: '$\\hat{x}_1^{(n+1)}$', showarrow: false, font: { color: 'purple', size: 14 } },
      { x: metrics.bary2, y: -0.05, text: '$\\hat{x}_2^{(n+1)}$', showarrow: false, font: { color: 'purple', size: 14 } },
      { x: metrics.bary3, y: -0.05, text: '$\\hat{x}_3^{(n+1)}$', showarrow: false, font: { color: 'purple', size: 14 } }
    ]
  };

  Plotly.react(plotContainer.value, traces, layout);
};

let isDrawing = false;

watch([t1, t2, t3], () => {
  if (isDrawing) return;
  
  isDrawing = true;
  requestAnimationFrame(() => {
    if (plotContainer.value) {
      drawPlot();
    }
    isDrawing = false;
  });
});

onMounted(() => {
  drawPlot();
});

const easeInOut = (t) => t * t * (3 - 2 * t);
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const animateOptimization = async () => {
  if (isOptimizing.value) return;
  isOptimizing.value = true;
  btnText.value = "Optimising...";
  
  let opt_t2 = t2.value;
  let opt_t3 = t3.value;
  let lr = 2.0;
  
  for (let i = 0; i < 200; i++) {
    let m = computeMetrics(t1.value, opt_t2, opt_t3);
    opt_t2 -= lr * (m.m2 - 1/3);
    opt_t3 -= lr * (m.m3 - 1/3);
  }

  let start_t2 = t2.value;
  let start_t3 = t3.value;
  let frames = 40;
  let pauseTime = 15;

  btnText.value = "Theta 2...";
  for (let i = 1; i <= frames; i++) {
    let t = easeInOut(i / frames);
    t2.value = start_t2 + (opt_t2 - start_t2) * t;
    await delay(pauseTime);
  }

  await delay(200);

  btnText.value = "Theta 3...";
  for (let i = 1; i <= frames; i++) {
    let t = easeInOut(i / frames);
    t3.value = start_t3 + (opt_t3 - start_t3) * t;
    await delay(pauseTime);
  }

  btnText.value = "Optimise!";
  isOptimizing.value = false;
};
</script>

<style scoped>
.interactive-transport {
  font-family: sans-serif;
  max-width: 1000px;
  margin: 0 auto;
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
  width: 100px;
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
  transition: background 0.3s;
}
button:hover { background: #eecacc; }
button:disabled { background: #ccc; cursor: not-allowed; }
</style>