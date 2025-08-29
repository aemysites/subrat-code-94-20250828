/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example exactly
  const headerRow = ['Cards (cards37)'];
  const cells = [headerRow];

  // 2. Find the main grid of cards (robust to nested grids)
  let container = element.querySelector('.container');
  if (!container) container = element; // fallback
  let mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) mainGrid = container;

  // 3. Gather all card elements (flatten nested grid-layouts)
  let directCards = Array.from(mainGrid.children);
  let cardEls = [];
  directCards.forEach(child => {
    if (child.classList.contains('grid-layout')) {
      // nested grid, get its cards
      cardEls.push(...Array.from(child.children).filter(e=>e.classList.contains('utility-link-content-block')));
    } else if (child.classList.contains('utility-link-content-block')) {
      cardEls.push(child);
    }
  });

  // 4. For each card, extract image (in aspect wrapper) and text content
  cardEls.forEach(card => {
    // Image: first img in card
    const img = card.querySelector('img');
    let imageCell = null;
    if (img) {
      // Use closest aspect-ratio wrapper if present
      const aspect = img.closest('[class*=utility-aspect]');
      imageCell = aspect ? aspect : img;
    }
    // Text: heading (prefer h2/h3/h4), then p, then optional button
    // Use .utility-padding-all-2rem if present (for main card), else direct children
    const textWrapper = card.querySelector('.utility-padding-all-2rem') || card;
    // Find heading (h2, h3, h4, h5)
    let heading = textWrapper.querySelector('h2, h3, h4, h5');
    let desc = null;
    if (heading) {
      // Find first p after heading
      let next = heading.nextElementSibling;
      while (next) {
        if (next.tagName.toLowerCase() === 'p') {
          desc = next;
          break;
        }
        next = next.nextElementSibling;
      }
    }
    if (!desc) {
      desc = textWrapper.querySelector('p');
    }
    // Optional CTA/button
    const cta = textWrapper.querySelector('.button, a.button, button');
    // Compose cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    // If only one element, use directly
    cells.push([imageCell, textCell.length === 1 ? textCell[0] : textCell]);
  });

  // 5. Replace element with block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
