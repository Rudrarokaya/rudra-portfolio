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
    labels: ['SQL', 'Python', 'R', 'Data Visualization', 'Statistical Analysis', 'Machine Learning', 'Excel', 'Power BI'],
    datasets: [{
      label: 'Skill Level',
      data: [70, 65, 65, 75, 75, 70, 75, 75],
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
  skillsChart.options.scales.r.pointLabels.color = isDark ? '#fff' : '#000';
  skillsChart.options.scales.r.grid.color = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  skillsChart.options.scales.r.angleLines.color = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  skillsChart.update();
}
updateChartTheme();

// Scroll Animation
const fadeElements = document.querySelectorAll('.fade-in');
const fadeInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => fadeInObserver.observe(el));

// Dark Mode Toggle & Persist
const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = themeSwitch.querySelector('i');
themeSwitch.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const dark = document.body.classList.contains('dark-mode');
  themeIcon.classList.toggle('fa-moon', !dark);
  themeIcon.classList.toggle('fa-sun', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  updateChartTheme();
});
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.replace('fa-moon','fa-sun');
  updateChartTheme();
}

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
const postNameText = " - a data analyst and software engineer passionate about uncovering insights from complex datasets.";
let typeIndex = 0, fullText = preNameText + nameText + postNameText;
function typeIntro() {
  const target = document.getElementById("typed-intro");
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
document.addEventListener("DOMContentLoaded", () => setTimeout(typeIntro, 400));

// AJAX form submission and notification
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const notification = document.getElementById('notification');
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('https://formspree.io/f/mnndonbg', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
    .then(res => {
      const msg = res.ok ? 'Thank you! Your message has been received. I will get back to you shortly.' : 'There was an eror sending your message. Please try again later.';
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
});