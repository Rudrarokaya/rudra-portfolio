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

// Skills Chart
const ctx = document.getElementById('skills-chart').getContext('2d');
const skillsChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: [
      'SQL', 
      'Python',
      'Excel',
      'Power BI / Tableau',
      'Problem Solving',
      'Statistical Analysis',
      'Analytical Thinking'
    ],
    datasets: [{
      label: 'Skill Level',
      data: [85, 80, 85, 75, 85, 80, 85],
      backgroundColor: 'rgba(4, 102, 200, 0.2)',
      borderColor: 'rgba(4, 102, 200, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(4, 102, 200, 1)',
      pointRadius: 4
    }]
  },
  options: {
    scales: {
      r: {
        angleLines: { display: true },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        suggestedMin: 50,
        suggestedMax: 100,
        pointLabels: {
          font: { weight: 'bold', size: 14 },
          color: '#000'
        }
      }
    },
    plugins: { legend: { display: false } }
  }
});

function updateChartTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  const color = isDark ? '#fff' : '#000';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  skillsChart.options.scales.r.pointLabels.color = color;
  skillsChart.options.scales.r.grid.color = gridColor;
  skillsChart.options.scales.r.angleLines.color = gridColor;
  skillsChart.update();
}
updateChartTheme();

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
  updateChartTheme();
}
themeSwitch.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});
if (localStorage.getItem('theme') === 'dark') setTheme(true);

// Scroll-to-top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

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

// Combine DOMContentLoaded events
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeIntro, 400);

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