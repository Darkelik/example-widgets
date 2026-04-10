/**
 * divmap – heatmap-style grid of divs from array-of-arrays numeric data.
 * AnyWidget-compatible ESM: exports default { render }.
 *
 * Model:
 *   - colors: 'mono' | 'reds' | 'blues' | 'greens'
 *   - data: number[][] (rows = outer length, cols = max row length)
 */

const COLOR_OPTIONS = ['mono', 'reds', 'blues', 'greens'];

/**
 * Check if value is a finite number.
 * @param {unknown} x
 * @returns {x is number}
 */
function isNumber(x) {
  return typeof x === 'number' && Number.isFinite(x);
}

/**
 * Check if data is a list of lists of numbers (rows can have different lengths).
 * @param {unknown} data
 * @returns {{ ok: true, rows: number[][] } | { ok: false, message: string }}
 */
function parseData(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return { ok: false, message: 'data must be a non-empty array of arrays of numbers' };
  }
  const rows = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!Array.isArray(row)) {
      return { ok: false, message: `data[${i}] is not an array` };
    }
    const numRow = [];
    for (let j = 0; j < row.length; j++) {
      const v = row[j];
      if (!isNumber(v)) {
        return { ok: false, message: `data[${i}][${j}] is not a number (got ${typeof v})` };
      }
      numRow.push(v);
    }
    rows.push(numRow);
  }
  return { ok: true, rows };
}

/**
 * Compute min and max over all values in rows.
 * @param {number[][]} rows
 * @returns {{ min: number, max: number }}
 */
function dataRange(rows) {
  let min = Infinity;
  let max = -Infinity;
  for (const row of rows) {
    for (const v of row) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  return { min, max };
}

/**
 * Map normalized value t in [0, 1] to HSL background.
 * High (t=1) = full saturation color; low (t=0) = almost black.
 * @param {number} t 0..1
 * @param {string} scheme 'mono' | 'reds' | 'blues' | 'greens'
 * @returns {string} CSS color (e.g. hsl(...))
 */
function valueToColor(t, scheme) {
  const almostBlackLightness = 2;
  const fullColorLightness = 58;
  const monoHighLightness = 92;

  const lightness =
    scheme === 'mono'
      ? almostBlackLightness + t * (monoHighLightness - almostBlackLightness)
      : almostBlackLightness + t * (fullColorLightness - almostBlackLightness);

  if (scheme === 'mono') {
    return `hsl(0, 0%, ${lightness}%)`;
  }
  const hue = { reds: 0, greens: 120, blues: 240 }[scheme] ?? 0;
  return `hsl(${hue}, 100%, ${lightness}%)`;
}

/**
 * Render an error message into the container.
 * @param {Element} el
 * @param {string} message
 */
function showError(el, message) {
  const err = document.createElement('div');
  Object.assign(err.style, {
    padding: '12px',
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fecaca',
    borderRadius: '4px',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '14px',
  });
  err.textContent = `divmap: ${message}`;
  el.appendChild(err);
}

export default {
  async render({ model, el }) {
    const colors = model.get('colors') ?? 'mono';
    if (!COLOR_OPTIONS.includes(colors)) {
      showError(el, `colors must be one of: ${COLOR_OPTIONS.join(', ')} (got: ${colors})`);
      return;
    }

    const data = model.get('data');
    const parsed = parseData(data);
    if (!parsed.ok) {
      showError(el, parsed.message);
      return;
    }

    const { rows } = parsed;
    const { min, max } = dataRange(rows);
    const range = max - min;
    const normalize = (v) => (range === 0 ? 0.5 : (v - min) / range);

    const numCols = Math.max(0, ...rows.map((r) => r.length));

    const grid = document.createElement('div');
    Object.assign(grid.style, {
      display: 'grid',
      gridTemplateRows: `repeat(${rows.length}, 24px)`,
      gridTemplateColumns: `repeat(${numCols}, 24px)`,
      gap: '2px',
      width: 'max-content',
    });

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < numCols; j++) {
        const cell = document.createElement('div');
        const value = row[j];
        const t = value !== undefined ? normalize(value) : 0;
        cell.style.backgroundColor = valueToColor(t, colors);
        cell.style.maxWidth = '24px';
        cell.style.maxHeight = '24px';
        cell.style.minWidth = '24px';
        cell.style.minHeight = '24px';
        cell.style.boxSizing = 'border-box';
        grid.appendChild(cell);
      }
    }

    el.appendChild(grid);
    return () => {
      grid.remove();
    };
  },
};
