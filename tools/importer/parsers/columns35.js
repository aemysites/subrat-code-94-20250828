/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const cols = Array.from(grid.children);
  if (cols.length === 0) return;

  // The header row must be a single cell (spans all columns)
  const headerRow = ['Columns (columns35)'];
  // The next row contains as many columns as needed
  const contentRow = cols.map((col) => col);

  // Build the table: first row is always a single cell header
  const tableData = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
