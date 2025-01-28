document.addEventListener('DOMContentLoaded', () => {
  const showMoreBtn = document.getElementById('show-more-btn');
  const extraItems = document.querySelectorAll('.extra-item');

  // Solo se ejecuta en mobile, pues en desktop las tarjetas no están ocultas
  showMoreBtn.addEventListener('click', () => {
    // Cambiamos la clase "hidden" en cada tarjeta extra
    extraItems.forEach(item => {
      item.classList.toggle('hidden');
    });

    // Ajustamos el texto del botón
    const anyHidden = [...extraItems].some(item => item.classList.contains('hidden'));
    showMoreBtn.textContent = anyHidden ? 'Show More' : 'Show Less';
  });
});
