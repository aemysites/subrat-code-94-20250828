/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost grid layout (the actual columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Per block requirements: block name in header
  const headerRow = ['Columns (columns30)'];

  // Second row: each column's entire direct content as a cell
  const contentRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
