function showModal(modalId) {
  const modalOverlay = document.getElementById(modalId);
  const modalContent = modalOverlay.querySelector("#modal_content");

  // Remove pointer-events-none to make modal interactive
  modalOverlay.classList.remove('pointer-events-none');

  // Start the animations
  requestAnimationFrame(() => {
    modalOverlay.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  });

  // Close modal when clicking outside
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      hideModal(modalId);
    }
  });
}

function hideModal(modalId) {
  const modalOverlay = document.getElementById(modalId);
  const modalContent = modalOverlay.querySelector("#modal_content");

  // Start the animations
  modalOverlay.classList.add('opacity-0');
  modalContent.classList.remove('scale-100', 'opacity-100');
  modalContent.classList.add('scale-95', 'opacity-0');

  // Wait for animations to finish before hiding completely
  setTimeout(() => {
    modalOverlay.classList.add('pointer-events-none');
  }, 300); // Match this with the duration in the CSS transitions
}
