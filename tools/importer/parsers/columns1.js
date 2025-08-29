/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns (children of the grid)
  const columns = Array.from(grid.children);

  // Defensive: there should be two columns, but generalize for other counts
  // Each cell contains the entire column's content (e.g., image or text/buttons)
  const headerRow = ['Columns (columns1)'];
  const contentRow = columns.map(col => col);

  // Build block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
