// Smooth page transitions
document.addEventListener('DOMContentLoaded', function() {
  // Add click handlers to all internal links
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    
    // Only handle internal links (not external, not anchors, not javascript)
    if (href && 
        !href.startsWith('http') && 
        !href.startsWith('#') && 
        !href.startsWith('javascript') &&
        !href.startsWith('mailto')) {
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const destination = this.getAttribute('href');
        
        // Add fade-out class to body
        document.body.classList.add('fade-out');
        
        // Navigate after fade-out animation
        setTimeout(function() {
          window.location.href = destination;
        }, 200);
      });
    }
  });
});
