// Dynamic sidebar color tint based on visible content
(function() {
  const sidebar = document.querySelector('.primary-header');
  if (!sidebar) return;

  // Create a color overlay element for smooth transitions
  const tintOverlay = document.createElement('div');
  tintOverlay.className = 'sidebar-tint-overlay';
  sidebar.insertBefore(tintOverlay, sidebar.firstChild);

  // Get computed CSS variable value
  const rootStyles = getComputedStyle(document.documentElement);

  // Map accent classes to CSS variable names
  const accentMap = {
    'bento-accent--patentspace': '--accent-patentspace',
    'bento-accent--setmixer': '--accent-setmixer',
    'bento-accent--imperial': '--accent-imperial',
    'bento-accent--personal': '--accent-personal',
    'bento-accent--nexus': '--accent-imperial',
    'bento-accent--music': '--accent-setmixer',
    'bento-accent--3d': '--accent-personal'
  };

  // Default subtle dark tint
  let currentColor = 'transparent';
  let currentSkills = [];

  function getAccentColor(element) {
    // Find which accent class the element has
    for (const [className, cssVar] of Object.entries(accentMap)) {
      if (element.classList.contains(className)) {
        const color = rootStyles.getPropertyValue(cssVar).trim();
        // Return color with 50% alpha for the tint effect
        return hexToRgba(color, 0.5);
      }
    }
    return 'transparent';
  }

  function hexToRgba(hex, alpha) {
    if (!hex || hex === 'transparent') return 'transparent';
    // Remove # if present
    hex = hex.replace('#', '');
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function updateSidebarTint() {
    const projectCards = document.querySelectorAll('.project-bento');
    const videoElement = document.querySelector('.video');
    const viewportCenter = window.innerHeight / 2;

    let closestElement = null;
    let closestDistance = Infinity;

    // Check video first
    if (videoElement) {
      const rect = videoElement.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        closestDistance = distance;
        closestElement = videoElement;
      }
    }

    // Check project cards
    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      // Only consider if element is in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = card;
        }
      }
    });

    // Get the color and skills from the closest element
    let newColor = 'transparent';
    let newSkills = [];

    if (closestElement) {
      newColor = getAccentColor(closestElement);
      const skills = closestElement.getAttribute('data-skills');
      if (skills) {
        newSkills = skills.split(',');
      }
    }

    // Only update color if changed
    if (newColor !== currentColor) {
      currentColor = newColor;
      tintOverlay.style.background = `radial-gradient(ellipse at 100% 50%, ${currentColor} 0%, transparent 45%)`;
    }

    // Only update skills if changed
    if (JSON.stringify(newSkills) !== JSON.stringify(currentSkills)) {
      currentSkills = newSkills;
      updateSkillHighlights(newSkills, newColor);
    }
  }

  function updateSkillHighlights(activeSkills, tintColor) {
    const skillTags = document.querySelectorAll('.skill-tag[data-skill]');

    skillTags.forEach(tag => {
      const skillId = tag.getAttribute('data-skill');
      if (activeSkills.includes(skillId)) {
        tag.classList.add('active');
      } else {
        tag.classList.remove('active');
      }
    });
  }

  // Throttled scroll handler for performance
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateSidebarTint();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateSidebarTint);

  // Initial call
  updateSidebarTint();
})();
