/**
 * Bento Portfolio System
 * A modular, data-driven approach to rendering portfolio content
 */

const BentoSystem = (function() {
  'use strict';

  // ===== ALBUMS DATA =====
  // Top 9 albums - add/edit albums here
  const ALBUMS = [
    'Blonde_-_Frank_Ocean.jpg',
    'Igor_-_Tyler,_the_Creator.jpg',
    'Marvin-Gaye-Whats-Going-On-AlbumCover-web-optimised-820.jpg',
    'ModalMusic.jpg',
    'PiecesOfaMan_cover.jpg',
    '81CzfbO4CrL.jpg',
    '81W5Uwxo-ZL._UF894,1000_QL80_.jpg',
    '812EgYpATnL.jpg',
    'images.jpg'
  ];

  // ===== RENDER FUNCTIONS =====

  /**
   * Render albums grid from data array
   * Usage: <div id="albums-grid" class="albums-grid"></div>
   */
  function renderAlbums(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ALBUMS.map(img => {
      const webpSrc = 'images/covers/' + img.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `
      <div class="album-cover">
        <picture>
          <source srcset="${webpSrc}" type="image/webp">
          <img src="images/covers/${img}" alt="" loading="lazy">
        </picture>
      </div>
    `;
    }).join('');
  }

  /**
   * Initialize all dynamic content
   */
  function init() {
    // Render albums if present
    renderAlbums('albums-grid');
  }

  // Public API
  return {
    init,
    ALBUMS,
    renderAlbums
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', BentoSystem.init);
