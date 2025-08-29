/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (contains all columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const gridColumns = Array.from(grid.children);

  // Build the content for each column cell
  const columnCells = gridColumns.map(col => {
    // For the column, keep all its direct children (usually contains a div holding the img)
    // This ensures all content (not just img) is included in each cell
    return Array.from(col.children);
  });

  // Table rows: header row is a single cell, content row contains one cell per column
  const cells = [
    ['Columns (columns16)'],
    columnCells
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
