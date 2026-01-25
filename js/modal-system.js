/**
 * Modal System
 * Unified popup handler for desktop and mobile
 */

const ModalSystem = (function() {
  'use strict';

  let activeModal = null;

  /**
   * Open a modal by ID
   */
  function open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    activeModal = modal;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('modal--active');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();
  }

  /**
   * Close the active modal
   */
  function close() {
    if (!activeModal) return;

    activeModal.setAttribute('aria-hidden', 'true');
    activeModal.classList.remove('modal--active');
    document.body.style.overflow = '';
    activeModal = null;
  }

  /**
   * Initialize modal system
   */
  function init() {
    // Open triggers - any element with data-modal-open="modal-id"
    document.querySelectorAll('[data-modal-open]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        open(trigger.getAttribute('data-modal-open'));
      });
    });

    // Close triggers - .modal__close and .modal__backdrop
    document.querySelectorAll('.modal__close, .modal__backdrop').forEach(el => {
      el.addEventListener('click', close);
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Prevent clicks inside modal content from closing
    document.querySelectorAll('.modal__content').forEach(content => {
      content.addEventListener('click', (e) => e.stopPropagation());
    });
  }

  // Public API
  return { init, open, close };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', ModalSystem.init);
