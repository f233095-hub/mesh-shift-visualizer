export function renderControlPanel(container, state, onUpdate, onSimulate) {
  container.innerHTML = `
    <div class="panel control-panel">
      <div class="input-group">
        <label for="p-input">p (Nodes - Perfect Square 4-64)</label>
        <input type="number" id="p-input" value="${state.p}" min="4" max="64" step="1">
      </div>
      <div class="input-group">
        <label for="q-input">q (Shift amount 1 to p-1)</label>
        <input type="number" id="q-input" value="${state.q}" min="1" max="${state.p - 1}">
      </div>
      <div class="flex-row">
        <button id="update-btn" class="btn-primary" style="flex: 1;">Update Values</button>
        <button id="sim-btn" class="btn-secondary" style="flex: 1;">Run Animation</button>
      </div>
    </div>
  `;

  document.getElementById('update-btn').addEventListener('click', () => {
    const pVal = parseInt(document.getElementById('p-input').value, 10);
    const qVal = parseInt(document.getElementById('q-input').value, 10);
    
    // Validation
    if (![4, 9, 16, 25, 36, 49, 64].includes(pVal)) {
      alert("p must be a perfect square between 4 and 64.");
      return;
    }
    if (qVal < 1 || qVal >= pVal) {
      alert(`q must be between 1 and ${pVal - 1}.`);
      return;
    }
    onUpdate(pVal, qVal);
  });

  document.getElementById('sim-btn').addEventListener('click', onSimulate);
}
