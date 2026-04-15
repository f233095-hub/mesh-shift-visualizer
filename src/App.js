import { renderControlPanel } from './components/ControlPanel.js';
import { renderComplexityPanel } from './components/ComplexityPanel.js';
import { renderMeshGrid, updatePackets, updateStatus } from './components/MeshGrid.js';
import { generateInitialState, computeStage1State, computeStage2State, calculateShifts } from './utils/shiftLogic.js';

export class App {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    this.state = {
      p: 16,
      q: 5,
      isAnimating: false,
      gridState: []
    };
    
    // Setup basic layout
    this.root.className = 'app-container';
    this.root.innerHTML = `
      <header>
        <h1>Mesh Shift Visualizer</h1>
        <p>Interactive algorithm simulation for a circular q-shift on a 2D mesh.</p>
      </header>
      <aside>
        <div id="controls-container"></div>
        <div id="complexity-container"></div>
      </aside>
      <main>
        <div class="visualization-area" id="vis-container"></div>
      </main>
    `;
    
    this.init();
  }
  
  init() {
    this.state.gridState = generateInitialState(this.state.p);
    this.render();
  }
  
  handleUpdate(p, q) {
    if (this.state.isAnimating) return;
    this.state.p = p;
    this.state.q = q;
    this.state.gridState = generateInitialState(p);
    this.render();
  }

  async runAnimation() {
    if (this.state.isAnimating) return;
    this.state.isAnimating = true;
    
    // Disable buttons
    document.getElementById('sim-btn').disabled = true;
    document.getElementById('update-btn').disabled = true;
    
    const { sq, row_shift, col_shift } = calculateShifts(this.state.p, this.state.q);
    const packetsContainer = document.getElementById('packets-container');
    
    // Reset to Initial
    this.state.gridState = generateInitialState(this.state.p);
    updatePackets(packetsContainer, this.state.gridState, sq);
    updateStatus('Before Shift (Initial State)');
    
    await this.sleep(1500); // give user time to parse initial
    
    // Stage 1
    updateStatus(`Stage 1: Row Shift by ${row_shift}`);
    this.state.gridState = computeStage1State(this.state.gridState, sq, row_shift);
    updatePackets(packetsContainer, this.state.gridState, sq);
    
    await this.sleep(2000); // 1.5s transition + 0.5s pause
    
    // Stage 2
    updateStatus(`Stage 2: Column Shift by ${col_shift}`);
    this.state.gridState = computeStage2State(this.state.gridState, sq, col_shift);
    updatePackets(packetsContainer, this.state.gridState, sq);
    
    await this.sleep(2000);
    
    updateStatus(`Final State (After q-shift)`);
    this.state.isAnimating = false;
    document.getElementById('sim-btn').disabled = false;
    document.getElementById('update-btn').disabled = false;
  }
  
  sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
  
  render() {
    const controlsContainer = document.getElementById('controls-container');
    renderControlPanel(
      controlsContainer, 
      this.state, 
      this.handleUpdate.bind(this), 
      this.runAnimation.bind(this)
    );
    
    const complexityContainer = document.getElementById('complexity-container');
    renderComplexityPanel(complexityContainer, this.state.p, this.state.q);
    
    const visContainer = document.getElementById('vis-container');
    renderMeshGrid(visContainer, this.state.p, this.state.gridState);
  }
}
