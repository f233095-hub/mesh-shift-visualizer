export function renderMeshGrid(container, p, initialState) {
  const sq = Math.sqrt(p);
  
  // Calculate grid container size to position elements absolutely
  // Cell: 64px, Gap: 16px
  const width = sq * 64 + (sq - 1) * 16;
  const height = width; // square mesh
  
  // 1. Structural CSS Grid for background
  let gridHtml = `
    <div class="status-bar" id="animation-status">Initial State</div>
    <div class="grid-container" style="width: ${width}px; height: ${height}px; margin-top: 3rem;">
      <div class="mesh-grid" style="grid-template-columns: repeat(${sq}, 64px); grid-template-rows: repeat(${sq}, 64px);">
  `;
  
  for (let i = 0; i < p; i++) {
    gridHtml += `
      <div class="mesh-cell" id="cell-${i}">
        <span class="cell-index">${i}</span>
      </div>
    `;
  }
  
  gridHtml += `
      </div>
      <div id="packets-container"></div>
    </div>
  `;
  
  container.innerHTML = gridHtml;
  
  // 2. Render initial packets
  const packetsContainer = document.getElementById('packets-container');
  updatePackets(packetsContainer, initialState, sq);
}

export function updatePackets(container, stateArray, sq) {
  // If packets don't exist yet, construct them. Otherwise, transition them.
  let html = '';
  
  stateArray.forEach((node, currentIndex) => {
    const r = Math.floor(currentIndex / sq);
    const c = currentIndex % sq;
    
    // CELL_SIZE = 64, GAP = 16, centering offset = 10
    const left = c * (64 + 16) + 10;
    const top = r * (64 + 16) + 10;
    
    // Use the persistent dataId to keep the same DOM element for transitions, 
    // but in vanilla JS innerHTML replacement destroys DOM unless we diff.
    // Instead of innerHTML for updates, let's check if they exist.
    
    const existingPacket = document.getElementById(`packet-${node.dataId}`);
    if (existingPacket) {
      existingPacket.style.transform = `translate(${left}px, ${top}px)`;
    } else {
      // Create it initially at the translation
      html += `
        <div class="data-packet" id="packet-${node.dataId}" style="transform: translate(${left}px, ${top}px);">
          ${node.dataId}
        </div>
      `;
    }
  });

  if (html !== '') {
    container.innerHTML = html;
  }
}

export function updateStatus(text) {
  const el = document.getElementById('animation-status');
  if (el) el.innerText = text;
}
