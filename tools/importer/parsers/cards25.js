/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];
  // Get all direct children divs (each is a card or an image-only div)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  cardDivs.forEach(card => {
    // Find the first img inside this card div (mandatory)
    const img = card.querySelector('img');
    // Find text content (h3/h4 + p) inside the card if present
    let textContent = null;
    // Try to get the structured text block
    const textBlock = card.querySelector('.utility-position-relative .utility-padding-all-2rem');
    if (textBlock) {
      textContent = textBlock;
    } else {
      // If no text block, try to find h3/h4 and p directly under card
      const heading = card.querySelector('h3, h4');
      const para = card.querySelector('p');
      const contentEls = [];
      if (heading) contentEls.push(heading);
      if (para) contentEls.push(para);
      if (contentEls.length) {
        // Use the existing elements instead of cloning
        textContent = document.createElement('div');
        contentEls.forEach(el => textContent.appendChild(el));
      }
    }
    // If both image and text, add both
    if (img && textContent) {
      rows.push([img, textContent]);
    } else if (img) {
      // Image only card (no text)
      rows.push([img, '']);
    }
    // If no image, skip (all cards require image)
  });
  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
