/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the relevant content
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the block's main content)
  const children = Array.from(grid.children);

  // Create a container div to hold all column content in a single cell
  const wrapper = document.createElement('div');
  children.forEach(child => {
    wrapper.appendChild(child);
  });

  // Form the block table: header row and one content row (one column)
  const cells = [
    ['Columns (columns18)'],
    [wrapper]
  ];
  
  // Create and insert the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
