/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches block name
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Find grid with cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 1. Main feature card: first <a> child of grid
  const allChildren = Array.from(grid.children);
  let cardSections = [];

  // Find the left/main card
  const mainCard = allChildren.find((child) => child.tagName === 'A');
  if (mainCard) cardSections.push(mainCard);

  // Find flex card groups (text and image cards)
  const flexGroups = allChildren.filter((child) => child.matches('.flex-horizontal.flex-vertical.flex-gap-sm'));

  // The first flex group contains two image cards
  if (flexGroups[0]) {
    Array.from(flexGroups[0].querySelectorAll('a.utility-link-content-block')).forEach(card => {
      cardSections.push(card);
    });
  }

  // The second flex group contains only text cards
  if (flexGroups[1]) {
    Array.from(flexGroups[1].querySelectorAll('a.utility-link-content-block')).forEach(card => {
      cardSections.push(card);
    });
  }
  // Now cardSections contains all cards in order

  cardSections.forEach(card => {
    // If there's an image in a child div, grab it for first cell
    let img = null;
    // find any img descendant (should be the card image)
    img = card.querySelector('img');

    // Compose text cell:
    const content = [];
    // If there's a tag group, include it
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) content.push(tagGroup);
    // Heading (h2/h3)
    let heading = card.querySelector('h3, .h2-heading, .h4-heading');
    if (heading) content.push(heading);
    // Description paragraph
    let desc = card.querySelector('p');
    if (desc) content.push(desc);

    rows.push([
      img || '',
      content
    ]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
