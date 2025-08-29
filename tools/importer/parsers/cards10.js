/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const headerRow = ['Cards (cards10)'];

  // Get all card links (each card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // First cell: Image (always present)
    const img = card.querySelector('img');

    // Second cell: Text content
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const cellContent = [];

    // Tag (optional, styled as in source)
    const tagGroup = textContainer.querySelector('.tag-group');
    if (tagGroup) {
      // Reference the entire tagGroup (for future-proofing, in case multiple tags)
      cellContent.push(tagGroup);
    }

    // Heading (optional)
    const heading = textContainer.querySelector('h3, .h4-heading');
    if (heading) {
      cellContent.push(heading);
    }

    // Description (optional)
    const paragraph = textContainer.querySelector('p');
    if (paragraph) {
      cellContent.push(paragraph);
    }

    return [img, cellContent];
  });

  // Combine header and card rows
  const cells = [headerRow, ...rows];

  // Build the table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
