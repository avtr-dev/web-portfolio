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
  // All archive images - auto-generated from images/archive directory
  const ARCHIVE = [
    '0001 (16).png',
    '0001 (39).jpeg',
    '0001 (45).png',
    '0001 (64).png',
    '0001 - 2023-02-23T002643.808.png',
    '0001 - 2023-02-24T003000.468.png',
    '0009 (37) 2-min.png',
    '0020.png',
    '0900 (1).png',
    '0915 (3).png',
    '077E9ADF9-740F-4C20-8B13-50B7ED00EB3F_1_201_a.jpeg',
    '7C3FA185-E077-4084-AF02-8206596414F6.jpg',
    'AFAEB296-976E-4B29-8277-B7D5B7A15A1D.jpeg',
    'BF COV.png',
    'Creative Map of the Covid University Experience.jpg',
    'D6AABE9C-CCC5-4CBB-A00A-2EE2312B6C28_1_201_a.jpeg',
    'D2770132-AF2B-4B28-BC90-2A31AA2C2451_1_105_c.jpeg',
    'Eventbrite Final Hero V1 1.png',
    'Eventbrite Final Hero V1.png',
    'Group 1.png',
    'Group 11.png',
    'Group 2-min.png',
    'IMG_0052.PNG',
    'IMG_0055.PNG',
    'IMG_0056.PNG',
    'IMG_0454.jpeg',
    'IMG_0605.jpeg',
    'IMG_20200720_143958_316.jpg',
    'IMG_20221008_120020.jpg',
    'IMG_2477 1.png',
    'IMG_3225.jpeg',
    'IMG_3671.PNG',
    'IMG_3963.jpeg',
    'IMG_4507.png',
    'IMG_5158.jpg',
    'IMG_5413.JPG',
    'IMG_5414.JPG',
    'IMG_5999.JPG',
    'IMG_6063.jpeg',
    'IMG_6069.JPG',
    'IMG_6238.JPG',
    'IMG_6244.JPG',
    'IMG_6263.JPG',
    'IMG_6264.JPG',
    'IMG_6265.JPG',
    'IMG_6306.jpg',
    'IMG_6451.JPG',
    'IMG_6595.jpg',
    'IMG_6596.jpg',
    'IMG_6769.JPG',
    'IMG_6789.PNG',
    'IMG_6794.PNG',
    'IMG_6796.PNG',
    'IMG_6810.JPG',
    'IMG_6916.PNG',
    'IMG_6965.PNG',
    'IMG_6970.PNG',
    'IMG_6996.PNG',
    'IMG_7039.PNG',
    'IMG_7046.PNG',
    'Iso 3.JPG',
    'NNN.jpeg',
    'Rectangle 24.png',
    'Screenshot 2022-12-12 013251.png',
    'Screenshot 2023-01-05 002437.png',
    'Screenshot 2023-01-05 003058.png',
    'Sopabox Final.png',
    'Snapchat-471707384.jpg',
    'Untitled4.JPG',
    'WF.png',
    'anouncemnt post.png',
    'app des butterfly.png',
    'back-view-mockup-of-a-man-wearing-a-sweatshirt-and-posing-with-a-hand-in-his-pocket-m837_Original.PNG',
    'colour grade 1.mp4', // (remove if not image)
    'dl button.png',
    'dt wb fn.png',
    'dt wb.png',
    'dt ws id.png',
    'full thng.5.jpg',
    'full thng.6.jpg',
    'group 1.png',
    'image 15.png',
    'image_Original.png',
    'like me cover.jpeg',
    'render_output (25) (1) (1) (2).png',
    'render_output (25) (1) (1).png',
    'render_output (25).png',
    'render_output (5) (1).jpeg',
    'seat cover.png',
    'spot logs.png',
    'spot mockup.png',
    'test 5.png',
    'test X_Original.png',
    'updated promo.png',
    'web des.png',
    'whiteboarddd.JPG',
    'woahbm.png'
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
