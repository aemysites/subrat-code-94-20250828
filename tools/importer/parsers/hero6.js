/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (must match example exactly)
  const headerRow = ['Hero (hero6)'];

  // Get the first .w-layout-grid child
  const grid = element.querySelector(':scope > .w-layout-grid');

  let imageEl = null;
  let contentEl = null;

  if (grid) {
    // Get direct children
    const gridChildren = grid.children;
    // The first child contains the image
    if (gridChildren.length > 0) {
      const imgContainer = gridChildren[0];
      imageEl = imgContainer.querySelector('img');
      // If no image found, keep cell empty
    }
    // The second child contains the content block
    if (gridChildren.length > 1) {
      // Sometimes content is nested inside a grid then card
      let contentContainer = gridChildren[1];
      // Try to find the card block inside, otherwise use the container itself
      contentEl = contentContainer.querySelector('.card') || contentContainer.querySelector('.utility-max-width-md') || contentContainer.querySelector('.w-layout-grid') || contentContainer;
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentEl ? contentEl : '']
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  
  // Replace original element with new block table
  element.replaceWith(blockTable);
}
