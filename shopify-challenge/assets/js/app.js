// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Get the "Show More" button by its ID
  const showMoreBtn = document.getElementById('show-more-btn');
  
  // Get all elements with the class "extra-item"
  const extraItems = document.querySelectorAll('.extra-item');

  // Function to make an item fade in
  function fadeInItem(item) {
    // 1) Remove the "hidden" class so the element is no longer display: none
    item.classList.remove('hidden');
    // 2) Add the "fade-in" class to initialize opacity at 0
    item.classList.add('fade-in');
    // 3) Force a reflow and then set opacity to 1 using the "show" class
    requestAnimationFrame(() => {
      item.classList.add('show');
    });
  }

  // Function to hide an item with a fade-out effect
  function hideItem(item) {
    // Remove the "show" class so opacity transitions from 1 to 0
    item.classList.remove('show');
    
    // Listen for the end of the transition
    item.addEventListener('transitionend', function onEnd() {
      // Once opacity reaches 0, completely hide the item
      item.classList.remove('fade-in');
      item.classList.add('hidden');
      // Remove the transition event listener after it fires
      item.removeEventListener('transitionend', onEnd);
    });
  }

  // Add a click event listener to the "Show More" button
  showMoreBtn.addEventListener('click', () => {
    // Check if at least one item is currently hidden
    const anyHidden = Array.from(extraItems).some(item => item.classList.contains('hidden'));

    if (anyHidden) {
      // ---- SHOW MORE ----
      extraItems.forEach(item => {
        // If the item is hidden, animate it to make it visible
        if (item.classList.contains('hidden')) {
          fadeInItem(item);
        }
      });
      // Update the button text to "Show Less"
      showMoreBtn.textContent = 'Show Less';
    } else {
      // ---- SHOW LESS ----
      extraItems.forEach(item => {
        // Hide all items with a fade-out effect
        hideItem(item);
      });
      // Update the button text to "Show More"
      showMoreBtn.textContent = 'Show More';
    }
  });
});
