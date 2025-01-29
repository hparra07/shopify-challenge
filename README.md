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
app.js

3. Shopify Section (Bonus)
3.1. Creating the Liquid File
best-sellers.liquid:

Move the HTML into a <section>...</section> structure.
Replace hardcoded values (titles, images, rating, etc.) with Liquid variables/conditions.
Include a {% schema %}...{% endschema %} block at the end defining your section’s settings and blocks (e.g., product_card).
Inline Script

Keep the “Show More” JS inside a <script> tag at the bottom of the .liquid so it works in Shopify’s environment.
CSS

Either inline <style> in your .liquid or place it in your theme’s main CSS file (e.g., theme.css.liquid) to handle .scroll-container, .fade-in, etc.

3.2. Uploading to Shopify
Via Shopify CLI (recommended for developer workflow):

Install or update the CLI:

npm install -g @shopify/cli @shopify/theme

From your local folder, either do shopify theme pull (to get the latest theme) or shopify theme push to upload your changes:
bash

shopify theme push --store=your-dev-store.myshopify.com
Verify the section appears under sections/ in the theme, then use “Customize” to add it.
