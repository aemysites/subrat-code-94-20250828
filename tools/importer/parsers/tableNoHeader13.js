/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Table (no header, tableNoHeader13)'];
  const rows = [];
  // Find all .divider direct children
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  dividers.forEach(divider => {
    // For each divider, there's a .w-layout-grid containing question and answer
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      const children = Array.from(grid.children);
      // Defensive: if children missing, skip
      if (children.length >= 2) {
        // Use the original question and answer elements
        rows.push([children[0], children[1]]);
      } else if (children.length === 1) {
        // Edge case: only one child (should not happen with provided HTML but is more robust)
        rows.push([children[0], '']);
      }
      // else, skip empty grid
    }
  });
  // Only create the table if there is at least one data row
  if (rows.length > 0) {
    const tableRows = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(tableRows, document);
    element.replaceWith(table);
  }
}
