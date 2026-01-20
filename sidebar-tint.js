// Dynamic sidebar color tint based on visible content
(function() {
  const sidebar = document.querySelector('.primary-header');
  if (!sidebar) return;

  // Create a color overlay element for smooth transitions
  const tintOverlay = document.createElement('div');
  tintOverlay.className = 'sidebar-tint-overlay';
  sidebar.insertBefore(tintOverlay, sidebar.firstChild);

  // Default subtle dark tint
  let currentColor = 'rgba(20, 20, 20, 0)';
  let currentSkills = [];
  
  function updateSidebarTint() {
    const projectCards = document.querySelectorAll('[data-tint]');
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
    let newColor = 'rgba(20, 20, 20, 0)';
    let newSkills = [];
    
    if (closestElement) {
      const tint = closestElement.getAttribute('data-tint');
      const skills = closestElement.getAttribute('data-skills');
      
      if (tint) {
        newColor = tint;
      }
      if (skills) {
        newSkills = skills.split(',');
      }
    }
    
    // Only update color if changed
    if (newColor !== currentColor) {
      currentColor = newColor;
      tintOverlay.style.background = `radial-gradient(ellipse at 100% 50%, ${currentColor} 0%, transparent 60%)`;
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
