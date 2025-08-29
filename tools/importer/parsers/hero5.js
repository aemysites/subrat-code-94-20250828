/* global WebImporter */
export default function parse(element, { document }) {
  // Block Header
  const headerRow = ['Hero (hero5)'];

  // Find the main grid container within the section
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid
  const gridChildren = mainGrid.querySelectorAll(':scope > *');

  // Find image (background visual for row 2)
  let imageEl = null;
  for (const child of gridChildren) {
    if (child.tagName.toLowerCase() === 'img') {
      imageEl = child;
      break;
    }
  }

  // Find content block (for row 3)
  let contentBlock = null;
  for (const child of gridChildren) {
    if (
      child.querySelector('h1, h2, h3, h4, h5, h6') ||
      child.querySelector('.rich-text, .w-richtext') ||
      child.querySelector('.button-group')
    ) {
      contentBlock = child;
      break;
    }
  }
  // If contentBlock is a container grid, drill one level deeper if needed
  if (contentBlock && contentBlock.children.length === 1) {
    const onlyChild = contentBlock.children[0];
    if (
      onlyChild.querySelector('h1, h2, h3, h4, h5, h6') ||
      onlyChild.querySelector('.rich-text, .w-richtext') ||
      onlyChild.querySelector('.button-group')
    ) {
      contentBlock = onlyChild;
    }
  }

  // Compose content for row 3
  const contentElements = [];
  if (contentBlock) {
    // Headings
    const headingEls = contentBlock.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headingEls.forEach(h => contentElements.push(h));

    // Rich text paragraphs
    contentBlock.querySelectorAll('.rich-text, .w-richtext').forEach(rt => {
      Array.from(rt.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          contentElements.push(node);
        }
      });
    });

    // Standalone paragraphs (outside rich-text containers)
    contentBlock.querySelectorAll(':scope > p').forEach(p => {
      contentElements.push(p);
    });

    // CTA button group
    const buttonGroup = contentBlock.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }

  // Build the table cells array
  const cells = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentElements.length ? contentElements : '']
  ];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
