/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one cell containing the block name
  const headerRow = ['Columns (columns38)'];

  // Each direct child of the grid is a column; each column may contain multiple elements
  const columns = Array.from(element.children);

  // For robustness, put all child nodes of each column div into one cell (could be image, text, list, etc.)
  const columnCells = columns.map(col => {
    const cellContents = Array.from(col.childNodes).filter(node => {
      // Only include Element nodes and non-empty text nodes
      return (node.nodeType === Node.ELEMENT_NODE) ||
        (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    });
    // If only one node, return that directly, else return array
    return cellContents.length === 1 ? cellContents[0] : cellContents;
  });

  // Compose the table: header row, then the columns row
  const cells = [
    headerRow,
    columnCells
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
