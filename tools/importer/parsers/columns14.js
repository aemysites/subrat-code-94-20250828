/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child columns from the grid layout
  const columns = Array.from(grid.children);
  // Robustly filter out empty columns (edge case, usually unnecessary)
  const contentColumns = columns.filter(col => col && (col.textContent.trim() || col.querySelector('*')));

  // Table header row: single cell only, per requirements
  const headerRow = ['Columns (columns14)'];
  // Table content row: as many columns as in the layout
  const contentRow = contentColumns;

  // Create the table (with a single header cell row, then content row(s))
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the correctly structured table
  element.replaceWith(table);
}
