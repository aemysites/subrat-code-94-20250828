/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, as required
  const headerRow = ['Columns (columns36)'];

  // Get the .container div
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid with columns
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: text content
  const leftCol = columns[0];
  const leftContent = Array.from(leftCol.children);

  // Second column: images
  const rightCol = columns[1];
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let rightContent = [];
  if (imagesGrid) {
    rightContent = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // The table structure: first row is header (one cell), second row is all content (each cell = one column)
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
