/* global WebImporter */
export default function parse(element, { document }) {
  // Table header - must exactly match spec
  const headerRow = ['Cards (cards19)'];

  // We expect all immediate children of 'element' to be cards
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach(card => {
    // First cell: Icon (always present, nested as .icon > svg)
    let iconCell = null;
    const icon = card.querySelector('.icon');
    if (icon) {
      iconCell = icon;
    } else {
      // Fallback: empty cell (shouldn't happen but guards against edge case)
      iconCell = document.createElement('span');
    }

    // Second cell: Text (the <p> inside the card)
    let textCell = null;
    const p = card.querySelector('p');
    if (p) {
      textCell = p;
    } else {
      // Fallback: empty cell if no text present
      textCell = document.createElement('span');
    }

    rows.push([iconCell, textCell]);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
