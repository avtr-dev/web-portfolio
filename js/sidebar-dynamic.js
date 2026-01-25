// Fade in sidebar and first content on load
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.primary-header');
  const firstBento = document.querySelector('.project-bento');
  if (sidebar) sidebar.classList.add('fade-in-onload');
  if (firstBento) firstBento.classList.add('fade-in-onload');
  setTimeout(() => {
    if (sidebar) sidebar.classList.add('visible-onload');
    if (firstBento) firstBento.classList.add('visible-onload');
  }, 100);
});
// Fade in each .project-bento as it enters the viewport
document.addEventListener('DOMContentLoaded', function () {
  const bentos = document.querySelectorAll('.project-bento');
  bentos.forEach(bento => bento.classList.add('bento-fade-in'));
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('bento-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  bentos.forEach(bento => observer.observe(bento));
});
// Change sidebar text when scrolled to the bottom (showreel section)
// Change sidebar text only when scrolled to the very bottom of the page
// (not just when showreel is in view)
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.primary-header');

  function atPageBottom() {
    // Allow a 2px threshold for floating point errors
    return (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2);
  }

  function updateSidebar() {
    if (!sidebar) return;
    if (atPageBottom()) {
      sidebar.classList.add('sidebar-fade-out');
    } else {
      sidebar.classList.remove('sidebar-fade-out');
    }
  }

  window.addEventListener('scroll', updateSidebar);
  window.addEventListener('resize', updateSidebar);
});
