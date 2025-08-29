/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be 4: logo/social, Trends, Inspire, Explore)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First cell: the first grid child (logo/social)
  const leftCell = gridChildren[0];

  // Second cell: group the remaining grid children into a fragment
  const rightCell = document.createDocumentFragment();
  for (let i = 1; i < gridChildren.length; i++) {
    rightCell.appendChild(gridChildren[i]);
  }

  // Build the block table: header row, then data row with two columns
  const headerRow = ['Columns (columns9)'];
  const dataRow = [leftCell, rightCell];
  const cells = [headerRow, dataRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
