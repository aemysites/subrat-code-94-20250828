/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block header exactly as in the example
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Each tab is a set of cards
  const tabPanes = element.querySelectorAll('[class*=w-tab-pane]');

  tabPanes.forEach(tabPane => {
    // Find the grid layout inside each tab
    const grid = tabPane.querySelector('[class*=grid-layout]');
    if (!grid) return;
    // Each direct child <a> of grid is a card
    Array.from(grid.children)
      .filter(card => card.tagName === 'A')
      .forEach(card => {
        // Try to find the image within each card
        let img = card.querySelector('img');
        // Text content: heading and description
        const textParts = [];
        const heading = card.querySelector('h3, .h4-heading');
        if (heading) textParts.push(heading);
        const para = card.querySelector('div.paragraph-sm, .paragraph-sm');
        if (para) textParts.push(para);
        // If no heading/para found, try fallback for any remaining text
        if (textParts.length === 0) {
          Array.from(card.childNodes).forEach(node => {
            if (node.nodeType === 3 && node.textContent.trim()) {
              const span = document.createElement('span');
              span.textContent = node.textContent.trim();
              textParts.push(span);
            } else if (node.nodeType === 1 && node.tagName !== 'IMG') {
              textParts.push(node);
            }
          });
        }
        // Each card is a row: [image, text content]
        rows.push([
          img ? img : '',
          textParts.length === 1 ? textParts[0] : textParts
        ]);
      });
  });
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
