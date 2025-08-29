/* global WebImporter */
export default function parse(element, { document }) {
  // Header for the block, exactly as specified
  const headerRow = ['Cards (cards17)'];

  // Each card is an immediate child div (with .utility-aspect-1x1), containing an <img>
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For this specific HTML, there is only an image for each card and no text content is present.
  // We must preserve the 2-column layout as per block rules: image in col 1, text in col 2 (empty in this case)
  const rows = cardDivs.map(div => {
    const img = div.querySelector('img'); // reference the existing <img> element
    // Defensive: if for some reason no <img> exists, use empty string
    return [img || '', ''];
  });

  // Compose the rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}