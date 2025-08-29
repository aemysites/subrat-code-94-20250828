/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: match exactly
  const headerRow = ['Columns (columns11)'];

  // Get the main container
  const container = element.querySelector('.container');
  // Get the first two-column grid: content and author/button
  const mainGrid = container && container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftCellContent = [];
  if (mainGrid) {
    // First column: headline and eyebrow
    if (mainGrid.children[0]) leftCellContent.push(mainGrid.children[0]);
    // Second column: paragraph, author, button
    if (mainGrid.children[1]) leftCellContent.push(mainGrid.children[1]);
  }

  // Get the second grid: two images
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let rightCellContent = [];
  if (imageGrid) {
    const imageDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    imageDivs.forEach(div => {
      // Only add if contains an img
      if (div.querySelector('img')) {
        rightCellContent.push(div);
      }
    });
  }

  // If either content side is empty, preserve structure with empty array
  const cells = [
    headerRow,
    [leftCellContent.length ? leftCellContent : '', rightCellContent.length ? rightCellContent : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
