/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero28)'];

  // -- Row 2: Background Image --
  // Find an img inside the hero image container
  let bgImg = null;
  // Find the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // Find all direct children of grid
    const gridChildren = grid.querySelectorAll(':scope > div');
    // First child is supposed to be image area, second is text
    for (const child of gridChildren) {
      // Look for an img within this child
      const img = child.querySelector('img');
      if (img) {
        bgImg = img;
        break;
      }
    }
  }
  // Fallback to searching anywhere inside the element if above fails
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // -- Row 3: Content (Heading, Subheading, CTA) --
  let contentCell;
  // Find the text column (container)
  let textContainer = null;
  if (grid) {
    // Second grid child is usually the text container
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      textContainer = gridChildren[1];
    }
  }
  // Fallback if not found
  if (!textContainer) {
    textContainer = element.querySelector('.container');
  }
  // Now, get all the heading, subheading, cta, etc.
  let contentGroup = [];
  if (textContainer) {
    // Usually a wrapper div with margin class
    let wrapper = textContainer.querySelector('.utility-margin-bottom-6rem');
    if (!wrapper) wrapper = textContainer;
    // Grab all direct children except empty button groups
    Array.from(wrapper.childNodes).forEach((node) => {
      // Only include non-empty elements and meaningful text
      if (node.nodeType === Node.ELEMENT_NODE) {
        // If button group and empty, skip
        if (node.classList.contains('button-group') && node.childNodes.length === 0) {
          return;
        }
        contentGroup.push(node);
      }
    });
  }
  // If nothing found, leave cell blank
  contentCell = contentGroup.length ? contentGroup : '';

  // Compose table
  const tableCells = [
    headerRow,
    bgImgRow,
    [contentCell]
  ];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}