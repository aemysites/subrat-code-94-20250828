/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid containing the columns (two column layout)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // 2. Get the columns: for this layout, first is image, second is text block
  const columns = Array.from(grid.children);
  // Defensive: expect at least two columns, but allow for more
  const cells = [];
  // Header row must match: Columns (columns32)
  cells.push(['Columns (columns32)']);
  // Content row: one cell per column, reference existing elements
  cells.push(columns.map((col) => col));
  // 3. Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // 4. Replace the original element with the block table
  element.replaceWith(block);
}
