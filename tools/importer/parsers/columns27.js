/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the core grid columns
  const grid = element.querySelector('.container > .w-layout-grid');
  if (!grid) return;
  const cols = Array.from(grid.children);
  // There should be two columns: one content, one image
  let leftCol = null;
  let rightCol = null;
  for (const col of cols) {
    if (col.tagName.toLowerCase() === 'img') {
      rightCol = col;
    } else {
      leftCol = col;
    }
  }
  // Edge case: if either column is missing, return
  if (!leftCol || !rightCol) return;
  // Table header must match exactly
  const headerRow = ['Columns (columns27)'];
  // Table second row: left = all leftCol content, right = referenced image element
  const secondRow = [leftCol, rightCol];
  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);
  element.replaceWith(table);
}