/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, as specified
  const headerRow = ['Cards (cards7)'];

  // Each card is a direct child div (aspect wrapper), with an image inside
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, first cell = the <img>, second cell = blank (since no text present)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // If there is no image, handle edge case with blank
    return [img || '', ''];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}