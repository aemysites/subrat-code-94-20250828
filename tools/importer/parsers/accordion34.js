/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion header row from spec
  const headerRow = ['Accordion (accordion34)'];

  // Get all direct .accordion children (each is an accordion item)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));
  const rows = accordionItems.map((item) => {
    // Title cell
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Use the direct .paragraph-lg child, else all content in toggle
      const paragraph = toggle.querySelector('.paragraph-lg');
      titleCell = paragraph ? paragraph : toggle;
    }
    // Content cell
    let contentCell = '';
    const nav = item.querySelector('.accordion-content');
    if (nav) {
      // Find first element that likely holds the content
      // Some have .rich-text, some have .w-richtext, sometimes just div
      let contentWrapper = nav.querySelector('.rich-text, .w-richtext, .utility-padding-all-1rem');
      if (contentWrapper) {
        contentCell = contentWrapper;
      } else {
        // fallback: all direct children of nav (to preserve structure)
        const nodes = Array.from(nav.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
        if (nodes.length) {
          contentCell = nodes;
        } else {
          contentCell = nav;
        }
      }
    }
    return [titleCell, contentCell];
  });

  // Construct block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
