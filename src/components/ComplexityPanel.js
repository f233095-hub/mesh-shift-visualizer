import { calculateShifts } from '../utils/shiftLogic.js';

export function renderComplexityPanel(container, p, q) {
  const { sq, row_shift, col_shift, ring_steps, mesh_steps } = calculateShifts(p, q);
  
  // Calculate max steps for bar scaling
  const max_steps = Math.max(ring_steps, mesh_steps, 1);
  const ring_pct = (ring_steps / max_steps) * 100;
  const mesh_pct = (mesh_steps / max_steps) * 100;

  const html = `
    <div class="panel complexity-panel">
      <h3>Complexity Analysis</h3>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-sub">Stage 1: Row Shift</div>
          <div class="stat-value">${row_shift}</div>
        </div>
        <div class="stat-card">
          <div class="stat-sub">Stage 2: Col Shift</div>
          <div class="stat-value">${col_shift}</div>
        </div>
      </div>

      <div class="formula-row">
        <span>Ring steps: min(q, p-q)</span>
        <span>${ring_steps}</span>
      </div>
      <div class="formula-row">
        <span>Mesh steps: (q mod &radic;p) + &lfloor;q/&radic;p&rfloor;</span>
        <span>${mesh_steps}</span>
      </div>

      <div class="bar-chart">
        <div class="bar-row">
          <div class="bar-label"><span>Naive 1D Ring</span> <span>${ring_steps} steps</span></div>
          <div class="bar-track">
            <div class="bar-fill bar-ring" style="width: ${ring_pct}%"></div>
          </div>
        </div>
        <div class="bar-row">
          <div class="bar-label"><span>2D Mesh</span> <span>${mesh_steps} steps</span></div>
          <div class="bar-track">
            <div class="bar-fill bar-mesh" style="width: ${mesh_pct}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  container.innerHTML = html;
}
