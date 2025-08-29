/* global WebImporter */
export default function parse(element, { document }) {
  // Block header, must match example exactly
  const headerRow = ['Hero (hero12)'];

  // Row 2: Background/main image (first image in the block, usually absolute positioned)
  let bgImg = element.querySelector('img.cover-image.utility-position-absolute')
    || element.querySelector('img.cover-image');
  // If no image found, cell will be empty
  const imgCell = bgImg ? bgImg : '';

  // Row 3: Content block (headline, subheadings, features, CTA)
  // Find the inner card body container
  const cardBody = element.querySelector('.card-body');
  // If not found, fall back to the main text container or empty string
  const contentCell = cardBody ? cardBody : '';

  // Table structure: 1 column, 3 rows
  const cells = [
    headerRow,
    [imgCell],
    [contentCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
