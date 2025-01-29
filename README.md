# Best Sellers Section
This README covers all steps taken to build the Best Sellers feature, from implementing HTML/CSS/JS locally to creating a Liquid file (with schema) and uploading it to Shopify as a bonus.

1. Project Overview
Purpose:
Display a set of “Best Sellers” product cards, responsive for mobile and desktop.

Mobile: shows only the first 4 cards, with a “Show More” button to reveal additional cards (smoothly with a fade-in).
Desktop: shows all cards in a horizontal scroll (carousel‐like) layout.
Bonus:
Migrate this design into a Shopify Section (.liquid + schema) so it can be added/configured in a Shopify theme.

2. Local Implementation (HTML, CSS, JS)
2.1. HTML Structure
index.html:

Uses Tailwind CSS via CDN for styling and utility classes.
Contains a header, a main container displaying product cards, and a “Show More” button (visible only in mobile).
Each product card has:
Two images (main + hover).
Optional “pills” (e.g., “New,” “Sale”) positioned absolutely on the image.
Title, vendor, rating (stars), review count, and a price.
Responsive Behavior:

In mobile, the container is set to a 2-column grid showing the first 4 product cards; the rest are hidden by default.
In desktop (Tailwind md: breakpoint), the container becomes flex + overflow-x-auto for horizontal scrolling.
2.2. CSS
Scrollbar Customization

.scroll-container::-webkit-scrollbar with height: 5px and custom thumb color.
By hovering the container, the scrollbar height increases to 6px.
Fade-in Animation for “Show More” in mobile

A .fade-in class starts with opacity: 0; transition: opacity 0.3s ease-in-out;.
When .fade-in.show is added, the element transitions to opacity: 1.
Additional Classes

.stars class adds a small margin between SVG star icons.
2.3. JavaScript
app.js (or similar):
js
Copy
Edit
document.addEventListener('DOMContentLoaded', () => {
  const showMoreBtn = document.getElementById('show-more-btn');
  const extraItems = document.querySelectorAll('.extra-item');

  function fadeInItem(item) {
    item.classList.remove('hidden'); // unhide
    item.classList.add('fade-in');   // starts at opacity: 0
    requestAnimationFrame(() => {
      item.classList.add('show');    // transitions to opacity: 1
    });
  }

  function hideItem(item) {
    item.classList.remove('show');
    item.addEventListener('transitionend', function onEnd() {
      item.classList.remove('fade-in');
      item.classList.add('hidden');
      item.removeEventListener('transitionend', onEnd);
    });
  }

  showMoreBtn.addEventListener('click', () => {
    // check if any are still hidden
    const anyHidden = Array.from(extraItems).some(item =>
      item.classList.contains('hidden')
    );

    if (anyHidden) {
      // Show More
      extraItems.forEach(item => {
        if (item.classList.contains('hidden')) {
          fadeInItem(item);
        }
      });
      showMoreBtn.textContent = 'Show Less';
    } else {
      // Show Less
      extraItems.forEach(item => {
        hideItem(item);
      });
      showMoreBtn.textContent = 'Show More';
    }
  });
});
This toggles “hidden” + a fade animation on the 6 extra product cards in mobile.
3. Shopify Section (Bonus)
3.1. Creating the Liquid File
best-sellers.liquid:

Move the HTML into a <section>...</section> structure.
Replace hardcoded values (titles, images, rating, etc.) with Liquid variables/conditions.
Include a {% schema %}...{% endschema %} block at the end defining your section’s settings and blocks (e.g., product_card).
Schema Example:

liquid
Copy
Edit
{% schema %}
{
  "name": "Best Sellers (Custom)",
  "settings": [
    {
      "id": "section_title",
      "type": "text",
      "label": "Section Title",
      "default": "Best Sellers"
    }
  ],
  "blocks": [
    {
      "type": "product_card",
      "name": "Product Card",
      "settings": [
        { "id": "main_image", "type": "image_picker", "label": "Main Image" },
        { "id": "hover_image", "type": "image_picker", "label": "Hover Image" },
        { "id": "product_title", "type": "text", "label": "Title", "default": "Product Name" },
        { "id": "vendor", "type": "text", "label": "Vendor", "default": "Vendor" },
        { "id": "rating_filled", "type": "number", "label": "Stars Filled", "default": 4 },
        { "id": "rating_empty", "type": "number", "label": "Stars Empty", "default": 1 },
        { "id": "reviews_count", "type": "number", "label": "Reviews Count", "default": 426 },
        { "id": "price", "type": "text", "label": "Price", "default": "$20.00" }
      ]
    }
  ],
  "max_blocks": 10
}
{% endschema %}
This defines a user-friendly interface in the Theme Editor for adding product cards, customizing the text/images, etc.
Inline Script

Keep the “Show More” JS inside a <script> tag at the bottom of the .liquid so it works in Shopify’s environment.
CSS

Either inline <style> in your .liquid or place it in your theme’s main CSS file (e.g., theme.css.liquid) to handle .scroll-container, .fade-in, etc.
3.2. Uploading to Shopify
Via Shopify web editor:

Go to “Online Store” → “Themes” → “Edit code”.
Create/upload best-sellers.liquid into the sections/ folder.
Save. Check for errors in the schema JSON.
In the Theme Editor (Customize), click “Add section” → “Best Sellers (Custom)” and configure your blocks.
Via Shopify CLI (recommended for developer workflow):

Install or update the CLI:
bash
Copy
Edit
npm install -g @shopify/cli @shopify/theme
From your local folder, either do shopify theme pull (to get the latest theme) or shopify theme push to upload your changes:
bash
Copy
Edit
shopify theme push --store=your-dev-store.myshopify.com
Verify the section appears under sections/ in the theme, then use “Customize” to add it.
4. Final Notes
We implemented:

Mobile: Grid of 2 columns, 4 visible, plus a “Show More” button that reveals extras with a fade-in.
Desktop: A flex container with horizontal scroll, custom scrollbar.
Bonus: Converted to a Shopify Section with Liquid schema, so it can be added to a theme and configured via the Theme Editor.
If you see any issues (e.g., the section not appearing in the Editor), double-check:

No trailing commas or syntax errors in the JSON schema.
The .liquid file is truly in sections/.
The theme is the correct one if you have multiple themes.
That’s all!
We have a fully responsive “Best Sellers” layout, plus a Shopify-Section-ready version for easy integration.
