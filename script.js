// Later, you'll add interactivity (e.g., project filtering, animations, form handling)
console.log("Portfolio script loaded!");

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }
  
  console.log("Portfolio script loaded!");

  function openModal(projectId) {
    document.getElementById(`modal-${projectId}`).style.display = 'block';
  }
  
  function closeModal(projectId) {
    document.getElementById(`modal-${projectId}`).style.display = 'none';
  }
  
  // Close modal when clicking outside of the modal content
  window.onclick = function(event) {
    const modal = document.querySelector('.modal');
    if (modal && event.target === modal) {
      modal.style.display = "none";
    }
  };
  
  console.log("Portfolio script loaded with modals!");

  // Smooth scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute('href'));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

// Animation on scroll for fade-in and slide-in elements
function revealOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  const windowHeight = window.innerHeight;
  fadeEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

  

