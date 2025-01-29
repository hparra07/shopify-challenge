# Best Sellers Section

This README covers all steps **I** took to build the **Best Sellers** feature, from implementing **HTML/CSS/JS** locally to creating a **Liquid file (with schema)** and uploading it to Shopify as a bonus.

---

## 1. Project Overview

### Purpose
- **Mobile**: Show only the first 4 product cards, with a _Show More_ button to reveal additional cards (smoothly via a fade-in).
- **Desktop**: Display all product cards in a horizontal scroll (carousel-like) layout.

### Bonus
- Migrate this design into a **Shopify Section** (`.liquid + schema`) so it can be added/configured in a Shopify theme.

---

## 2. Local Implementation (HTML, CSS, JS)

### 2.1. HTML Structure

- **`index.html`**:
  - Uses **Tailwind CSS** via CDN for styling and utility classes.
  - Contains a header, a main container for product cards, and a “Show More” button (visible only on mobile).
  - Each product card includes:
    - Two images (main + hover).
    - Optional “pills” (e.g., “New,” “Sale”) positioned absolutely on the image.
    - Title, vendor, rating (stars), review count, and price.
  - **Responsive behavior**:
    - **Mobile** (default): a grid of 2 columns, showing the first 4 cards; the rest are hidden.
    - **Desktop** (`md:` breakpoint): a flex container with `overflow-x-auto` for horizontal scrolling.

### 2.2. CSS

- **Scrollbar Customization**  
  - `.scroll-container::-webkit-scrollbar` with `height: 5px;` and a custom thumb color.  
  - On hover, the scrollbar height increases to `6px`.

- **Fade-in Animation**  
  - A `.fade-in` class starts with `opacity: 0; transition: opacity 0.3s ease-in-out;`.  
  - When `.fade-in.show` is added, the element transitions to `opacity: 1;`.

- **Additional Classes**  
  - `.stars` adds a small margin between the SVG star icons.

### 2.3. JavaScript

- I created a small script that toggles hidden product cards in mobile.  
- On _Show More_, it removes the `hidden` class and applies a fade-in animation.  
- On _Show Less_, it does the reverse, fading them out and reapplying `hidden`.

---

## 3. Shopify Section (Bonus)

### 3.1. Creating the Liquid File

- **`best-sellers.liquid`**:
  - I moved the relevant HTML into a `<section>...</section>` structure.
  - Replaced hardcoded values (titles, images, rating, etc.) with Liquid variables/conditions.
  - Added a `{% schema %}...{% endschema %}` block defining section settings and “product_card” blocks.

- **Inline Script**  
  - Kept the “Show More” JS in a `<script>` at the bottom so it executes in Shopify’s environment.

- **CSS**  
  - Either placed inline in the Liquid file (via `<style>...</style>`) or in the theme’s main CSS (like `theme.css.liquid`) for classes such as `.scroll-container` or `.fade-in`.

### 3.2. Uploading to Shopify

- **Via Shopify CLI** (developer-friendly approach):

  ```
  npm install -g @shopify/cli @shopify/theme
- From the local folder containing my theme files, I can run:
```
shopify theme pull --store=your-dev-store.myshopify.com
```
- (to retrieve the latest version of the theme), then:
```
shopify theme push --store=your-dev-store.myshopify.com

```
- (to upload my changes, including the new best-sellers.liquid in sections/).

- Once pushed, the new section (Best Sellers) appears under sections/ in the theme. I can then go to the Shopify Theme Editor (“Customize”), click Add Section, and select my newly added section.
