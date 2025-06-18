// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.remove('active');
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll Animation
const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length) {
  const fadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => fadeInObserver.observe(el));
}

// Dark Mode Toggle & Persist
const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = themeSwitch.querySelector('i');
function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  themeIcon.classList.replace(dark ? 'fa-moon' : 'fa-sun', dark ? 'fa-sun' : 'fa-moon');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
themeSwitch.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});
if (localStorage.getItem('theme') === 'dark') setTheme(true);

// Typing animation for About section
const preNameText = "Hello! I'm ";
const nameText = "Rudra Rokaya";
const postNameText = " - ";
let typeIndex = 0, fullText = preNameText + nameText + postNameText;
function typeIntro() {
  const target = document.getElementById("typed-intro");
  if (!target) return;
  if (typeIndex <= fullText.length) {
    let current = fullText.slice(0, typeIndex);
    if (typeIndex <= preNameText.length) {
      target.innerHTML = current;
    } else if (typeIndex <= preNameText.length + nameText.length) {
      target.innerHTML = preNameText + `<span class='highlight-name'>${nameText.slice(0, typeIndex - preNameText.length)}</span>`;
    } else {
      target.innerHTML = preNameText + `<span class='highlight-name'>${nameText}</span>` + postNameText.slice(0, typeIndex - (preNameText.length + nameText.length));
    }
    typeIndex++;
    setTimeout(typeIntro, 40);
  }
}

// Counter animation for About section
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const options = {
    threshold: 1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.closest('.highlight-item').dataset.count || counter.textContent);
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        counter.classList.add('visible');
        
        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target;
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));
}

// Combine DOMContentLoaded events
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeIntro, 400);
  animateCounters();

  // AJAX form submission and notification
  const form = document.getElementById('contactForm');
  const notification = document.getElementById('notification');
  if (form && notification) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch('https://formspree.io/f/mnndonbg', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
      .then(res => {
        const msg = res.ok ? 'Thank you! Your message has been received.' : 'Try again.';
        notification.textContent = msg;
        notification.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { notification.style.display = 'none'; }, 5000);
        if (res.ok) form.reset();
      })
      .catch(() => {
        notification.textContent = 'Error sending message.';
        notification.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { notification.style.display = 'none'; }, 5000);
      });
    });
  }

  // Form Interactions
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Handle form input animations
    document.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      try {
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const response = await fetch('https://formspree.io/f/mnndonbg', {
          method: 'POST',
          body: new FormData(form)
        });

        if (!response.ok) throw new Error('Submission failed');
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#28a745';
        form.reset();
        
      } catch (error) {
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Try Again';
        submitBtn.style.background = '#dc3545';
      }
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.removeAttribute('style');
      }, 3000);
    });
  });
});