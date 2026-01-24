/**
 * Bento Portfolio System
 * A modular, data-driven approach to rendering portfolio content
 */

const BentoSystem = (function() {
  'use strict';

  // ===== TOOL DEFINITIONS =====
  // Single source of truth for all tools - add new tools here
  const TOOLS = {
    fusion360:    { name: 'Fusion 360',    icon: 'images/tools/fusion360.png' },
    blender:      { name: 'Blender',       icon: 'images/tools/blender.png' },
    figma:        { name: 'Figma',         icon: 'images/tools/figma.png' },
    aftereffects: { name: 'After Effects', icon: 'images/tools/aftereffects.png' },
    arduino:      { name: 'Arduino',       icon: 'images/tools/arduino.png' },
    ableton:      { name: 'Ableton',       icon: 'images/tools/ableton.png' },
    photoshop:    { name: 'Photoshop',     icon: 'images/tools/photoshop.png' }
  };

  // ===== ARCHIVE DATA =====
  // All archive images - add new images here
  const ARCHIVE = [
    '0001 (45).png',
    'render_output (25) (1) (1).png',
    'seat cover.png',
    '0001 (64).png',
    'Sopabox Final.png',
    'spot mockup.png',
    'app des butterfly.png',
    'anouncemnt post.png',
    '0001 (16).png',
    'Eventbrite Final Hero V1 1-min.png',
    'spot dev.png',
    'spot logs.png',
    'updated promo.png',
    'web des.png',
    'wf.png',
    'full thng.5.jpg',
    'full thng.51.jpg',
    'full thng.6.jpg',
    '0001 - 2023-02-23T002643.808.png',
    '0001 - 2023-02-24T003000.468.png',
    '0009 (37) 2-min.png',
    '0020.png',
    '0900 (1).png',
    '0915 (3).png',
    'BF COV.png',
    'Group 1.png',
    'Group 2-min.png',
    'Group 11.png',
    'IMG_2477 1.png',
    'IMG_5414.JPG',
    'IMG_6306.jpg',
    'IMG_6595.jpg',
    'IMG_6596.jpg',
    'Iso 3.JPG',
    'Rectangle 24.png',
    'Screenshot 2022-12-12 013251.png',
    'Screenshot 2023-01-05 002437.png',
    'Screenshot 2023-01-05 003058.png',
    'The Smart Dealer Poster-min.jpg',
    'Untitled4.JPG',
    'dt wb fn.png',
    'dt wb.png',
    'dt ws id.png',
    'image 15.png',
    'render_output (5) (1).jpeg',
    'whiteboarddd.JPG',
    'woahbm.png',
    '77E9ADF9-740F-4C20-8B13-50B7ED00EB3F_1_201_a.jpeg',
    'D6AABE9C-CCC5-4CBB-A00A-2EE2312B6C28_1_201_a.jpeg',
    'IMG_20221008_120020.jpg',
    'IMG_5158.jpg',
    'IMG_5159.jpg',
    '729a985b-8418-432b-accb-5e940446c2ba.jpg'
  ];

  // ===== ALBUMS DATA =====
  // Top 9 albums - add/edit albums here
  const ALBUMS = [
    'album1.jpg',
    'album2.jpg',
    'album3.jpg',
    'album4.jpg',
    'album5.jpg',
    'album6.jpg',
    'album7.jpg',
    'album8.jpg',
    'album9.jpg'
  ];

  // ===== RENDER FUNCTIONS =====

  /**
   * Render tool tags from data-tools attribute
   * Usage: <div class="bento-tools" data-tools="fusion360,blender,figma"></div>
   */
  function renderToolTags(container) {
    const toolsAttr = container.getAttribute('data-tools');
    if (!toolsAttr) return;

    const toolIds = toolsAttr.split(',').map(t => t.trim());
    container.innerHTML = toolIds.map(id => {
      const tool = TOOLS[id];
      if (!tool) {
        console.warn(`BentoSystem: Unknown tool "${id}"`);
        return '';
      }
      return `
        <div class="tool-tag">
          <img src="${tool.icon}" alt="${tool.name}">
          <span>${tool.name}</span>
        </div>
      `;
    }).join('');
  }

  /**
   * Render archive grid from data array
   * Usage: <div id="archive-grid" class="archive-grid"></div>
   */
  function renderArchive(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ARCHIVE.map(img => `
      <div class="archive-item">
        <img src="images/archive/${img}" alt="" loading="lazy">
      </div>
    `).join('');
  }

  /**
   * Render albums grid from data array
   * Usage: <div id="albums-grid" class="albums-grid"></div>
   */
  function renderAlbums(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ALBUMS.map(img => `
      <div class="album-cover">
        <img src="images/albums/${img}" alt="" loading="lazy">
      </div>
    `).join('');
  }

  /**
   * Initialize all dynamic content
   */
  function init() {
    // Render all tool containers
    document.querySelectorAll('.bento-tools[data-tools]').forEach(renderToolTags);

    // Render archive if present
    renderArchive('archive-grid');

    // Render albums if present
    renderAlbums('albums-grid');
  }

  // Public API
  return {
    init,
    TOOLS,
    ARCHIVE,
    ALBUMS,
    renderToolTags,
    renderArchive,
    renderAlbums
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', BentoSystem.init);
