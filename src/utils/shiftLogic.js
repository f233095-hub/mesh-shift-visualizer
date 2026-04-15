export function calculateShifts(p, q) {
  const sq = Math.sqrt(p);
  const row_shift = q % sq;
  const col_shift = Math.floor(q / sq);
  
  const ring_steps = Math.min(q, p - q);
  const mesh_steps = row_shift + col_shift;
  
  return {
    sq,
    row_shift,
    col_shift,
    ring_steps,
    mesh_steps
  };
}

export function generateInitialState(p) {
  // Returns array of objects representing data at node i
  return Array.from({ length: p }, (_, i) => ({
    nodeIndex: i,
    dataId: `D${i}`
  }));
}

export function computeStage1State(prevState, sq, row_shift) {
  const nextState = [...prevState];
  // Create a copy array where data is shifted
  const result = new Array(prevState.length);
  
  for (let i = 0; i < prevState.length; i++) {
    const r = Math.floor(i / sq);
    const c = i % sq;
    // Stage 1: each node shifts within its row by (q mod sq)
    // Means data from (r, c) moves to (r, (c + row_shift) % sq)
    const new_c = (c + row_shift) % sq;
    const new_index = r * sq + new_c;
    result[new_index] = { ...prevState[i] };
  }
  
  return result;
}

export function computeStage2State(prevState, sq, col_shift) {
  const result = new Array(prevState.length);
  
  for (let i = 0; i < prevState.length; i++) {
    const r = Math.floor(i / sq);
    const c = i % sq;
    // Stage 2: each node shifts within its col by floor(q/sq)
    // Means data from (r, c) moves to ((r + col_shift) % sq, c)
    const new_r = (r + col_shift) % sq;
    const new_index = new_r * sq + c;
    result[new_index] = { ...prevState[i] };
  }
  
  return result;
}
