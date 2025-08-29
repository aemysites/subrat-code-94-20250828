/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Hero (hero39)'];

  // --- Row 2: Background Image ---
  // Find <img> (background)
  let backgroundImg = null;
  // Per the block description, only images with a src should be used
  const img = element.querySelector('img[src]');
  if (img) backgroundImg = img;

  // --- Row 3: Content Section (headline, subheading, CTA) ---
  // Find the right grid cell with content
  // The structure is: header > div.grid-layout > div (content)
  // It's the div with class 'container'
  let contentCell = null;
  const gridDivs = element.querySelectorAll('.w-layout-grid.grid-layout > div');
  // We want the div with class 'container' (not the image div)
  let contentDiv = null;
  gridDivs.forEach(div => {
    if (div.classList.contains('container')) {
      contentDiv = div;
    }
  });
  if (contentDiv) {
    // Inside this, there's another grid-layout/div
    // Get the deepest content block as one fragment
    // It contains h1, p, and a
    const innerGrid = contentDiv.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Create a fragment to hold all children in order
      const frag = document.createDocumentFragment();
      Array.from(innerGrid.childNodes).forEach(child => {
        frag.appendChild(child);
      });
      contentCell = frag;
    } else {
      // Fallback: use all children of contentDiv
      const fragAlt = document.createDocumentFragment();
      Array.from(contentDiv.childNodes).forEach(child => {
        fragAlt.appendChild(child);
      });
      contentCell = fragAlt;
    }
  }

  // Table structure: 1 column, 3 rows
  const rows = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentCell ? contentCell : '']
  ];

  // Create table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
