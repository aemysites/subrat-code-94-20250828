/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block spec
  const headerRow = ['Cards (cards33)'];

  // Find all cards (direct children <a> of the grid)
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [];

  cardEls.forEach(cardEl => {
    // First image (should always be present)
    const img = cardEl.querySelector('img');

    // Find the main text content container (first div after image)
    let textDiv = img;
    while (textDiv && textDiv.tagName !== 'DIV') {
      textDiv = textDiv.nextElementSibling;
    }
    if (!textDiv) {
      // Fallback: just use the card itself as text container
      textDiv = cardEl;
    }

    // For the text cell, collect:
    // - meta row (tag and read time)
    // - heading
    // - description
    // - CTA (Read)
    const textCellEls = [];
    // Meta row
    const meta = textDiv.querySelector('.flex-horizontal');
    if (meta) textCellEls.push(meta);
    // Heading (h3 or .h4-heading)
    const heading = textDiv.querySelector('h3, .h4-heading');
    if (heading) textCellEls.push(heading);
    // Description (first p)
    const desc = textDiv.querySelector('p');
    if (desc) textCellEls.push(desc);
    // CTA (last div direct child with text 'Read')
    const directDivs = Array.from(textDiv.children).filter(e => e.tagName === 'DIV');
    const ctaDiv = directDivs.find(d => d.textContent && d.textContent.trim().toLowerCase() === 'read');
    if (ctaDiv) textCellEls.push(ctaDiv);

    // Add row: [img, [text cell elements]]
    rows.push([img, textCellEls]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
