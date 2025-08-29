/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Tabs (tabs22)'];

  // Get all tab menu links (labels)
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];

  // Get all tab panes (contents)
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];

  // Build rows for each tab
  const rows = tabLinks.map((link, idx) => {
    // Extract the label, use .paragraph-lg if available
    let label = '';
    const para = link.querySelector('.paragraph-lg');
    if (para && para.textContent.trim()) {
      label = para.textContent.trim();
    } else {
      label = link.textContent.trim();
    }

    // Extract tab content
    let contentCell = '';
    const pane = tabPanes[idx];
    if (pane) {
      // Prefer the first child with class w-layout-grid as the content
      const grid = pane.querySelector('.w-layout-grid');
      if (grid) {
        contentCell = grid;
      } else {
        // fallback: use pane itself
        contentCell = pane;
      }
    }
    return [label, contentCell];
  });

  // If there are no tabs, do not create a block
  if (rows.length === 0) {
    // Remove the element as it is not meaningful
    element.remove();
    return;
  }

  // Build the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
