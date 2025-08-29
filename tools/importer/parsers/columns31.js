/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    columns = Array.from(grid.querySelectorAll(':scope > div'));
  }
  // Defensive: handle no columns found
  if (columns.length === 0) {
    columns = [document.createTextNode('')];
  }
  // Header row should be a single cell, per the requirements
  const headerRow = ['Columns (columns31)'];
  // Block table with header row (1 col) and content row (N cols)
  const cells = [
    headerRow,
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}