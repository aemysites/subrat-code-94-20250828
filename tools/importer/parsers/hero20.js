/* global WebImporter */
export default function parse(element, { document }) {
  // --- Table header ---
  const headerRow = ['Hero (hero20)'];

  // --- Background Images (row 2) ---
  // Find the collage of images under .ix-hero-scale-3x-to-1x > .grid-layout
  let bgImgs = [];
  const bgRoot = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (bgRoot) {
    const collageGrid = bgRoot.querySelector('.grid-layout');
    if (collageGrid) {
      collageGrid.querySelectorAll('img').forEach(img => {
        bgImgs.push(img);
      });
    }
  }
  // If none found, leave empty string cell
  const imagesRow = [bgImgs.length ? bgImgs : ''];

  // --- Main Content (row 3) ---
  // Find the content container for heading, subheading, and CTAs
  let contentElements = [];
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Heading (h1)
    const heading = contentContainer.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTAs
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // All <a> in buttonGroup (usually two)
      buttonGroup.querySelectorAll('a').forEach(a => contentElements.push(a));
    }
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // Compose table
  const cells = [
    headerRow,
    imagesRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
