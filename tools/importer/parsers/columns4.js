/* global WebImporter */
export default function parse(element, { document }) {
  // Gather the column divs from the grid (each contains an image)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The header row is a single column: ['Columns (columns4)']
  const headerRow = ['Columns (columns4)'];

  // The content row contains all columns in a single row, each cell is a column's entire div
  const contentRow = columns;

  // Cells array for createTable: first row is header, second row is all columns
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}
