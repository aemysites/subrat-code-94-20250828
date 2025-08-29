/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that holds columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child nodes of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row: one cell, 'Columns (columns3)'
  const headerRow = ['Columns (columns3)'];

  // The second row: as many columns as present in the grid
  const contentRow = columns;

  // Build table
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create the table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
