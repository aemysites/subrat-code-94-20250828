/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Header row: exactly one column, per example
  const headerRow = ['Columns (columns29)'];

  // Content row: as many columns as found in HTML
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
