/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row exactly as specified
  const headerRow = ['Cards (cards24)'];
  // All direct children that are cards
  const cards = element.querySelectorAll(':scope > a');
  const rows = [headerRow];

  cards.forEach((card) => {
    // First cell: image element as is (not clone)
    let img = card.querySelector('img');

    // Second cell: all text content for the card
    // This includes tag/date and heading
    const textNodes = [];
    // Tag/date row (if present)
    const metaRow = card.querySelector(':scope > .flex-horizontal');
    if (metaRow) {
      textNodes.push(metaRow);
    }
    // Heading
    const heading = card.querySelector(':scope > h3, :scope > .h4-heading');
    if (heading) {
      textNodes.push(heading);
    }

    rows.push([
      img ? img : '',
      textNodes.length ? textNodes : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
