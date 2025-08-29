/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  let grid = null;
  const container = element.querySelector('.container');
  if (container) {
    grid = container.querySelector('.grid-layout');
  }
  if (!grid) {
    grid = element.querySelector('.grid-layout');
  }
  if (!grid) {
    // fallback to element itself if no grid
    grid = element;
  }

  // Get all direct children of grid (these are the columns, usually 2)
  let gridChildren = Array.from(grid.children).filter(child => {
    // Only keep element nodes that are not empty
    if (child.nodeType === Node.ELEMENT_NODE) {
      // If it's an image, keep it
      if (child.tagName === 'IMG') return true;
      // If it has text or elements inside, keep it
      if (child.textContent.trim().length > 0 || child.children.length > 0) return true;
    }
    return false;
  });

  // If we still have less than 2 columns, fallback to grid's own children
  if (gridChildren.length < 2) {
    gridChildren = Array.from(grid.children);
  }

  // For each column, collect all its relevant content (preserve text, headings, buttons, etc)
  const contentRow = gridChildren.map(col => {
    // Use a fragment to gather everything
    const frag = document.createDocumentFragment();
    Array.from(col.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        frag.appendChild(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
        frag.appendChild(document.createTextNode(node.textContent));
      }
    });
    // If column is an image itself (not wrapped in a div), use the image directly
    if (col.tagName === 'IMG') {
      return col;
    }
    // If nothing was appended but column had text, fallback to the column itself
    return frag.childNodes.length > 0 ? frag : col;
  });

  // Ensure the number of columns matches the grid
  // If less than 2, fill with empty string
  while (contentRow.length < 2) {
    contentRow.push('');
  }

  // Table header row, matches block name exactly and is a single column spanning all cols
  // The createTable implementation expects the first row's length to set the number of columns, but for Columns block,
  // the header is always a single cell (not colspanned), so we follow that convention as in the example.
  const cells = [
    ['Columns (columns15)'],
    contentRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
