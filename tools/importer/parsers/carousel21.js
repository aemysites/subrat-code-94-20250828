/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, matches example
  const headerRow = ['Carousel (carousel21)'];

  // Slides: each row is [image, text block]
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;
  
  // Image
  const img = cardBody.querySelector('img');
  const slideImg = img || '';

  // Text cell: collect all content except the image
  // If there are multiple text elements, include them all
  const textCellContents = [];

  // Heading
  const heading = cardBody.querySelector('.h4-heading');
  if (heading) {
    const h4 = document.createElement('h4');
    h4.textContent = heading.textContent;
    textCellContents.push(h4);
  }

  // Description or additional content: any non-heading, non-image text nodes
  // Get all children except <img> and .h4-heading
  Array.from(cardBody.childNodes).forEach(child => {
    if (
      (child.nodeType === 1 && child !== img && child !== heading) ||
      (child.nodeType === 3 && child.textContent.trim())
    ) {
      textCellContents.push(child);
    }
  });

  // If nothing in text cell, use empty string
  const textCell = textCellContents.length > 0 ? textCellContents : '';

  const cells = [
    headerRow,
    [slideImg, textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
