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
                angleLines: {
                    display: true
                },
                suggestedMin: 50,
                suggestedMax: 100,
                pointLabels: {
                  font: {
                    weight: 'bold',
                    size: 14
                  },
                  color: '#000'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

function updateChartTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  skillsChart.options.scales.r.pointLabels.color = isDark ? '#fff' : '#000';
  skillsChart.options.scales.r.grid = {
    color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
  };
  skillsChart.options.scales.r.angleLines.color = isDark? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  skillsChart.update()
  
}

updateChartTheme();

// Scroll Animation
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Contact Form
/*const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically handle the form submission with AJAX
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
}); */

// Dark Mode Toggle
const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = themeSwitch.querySelector('i');

themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
    updateChartTheme();
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    updateChartTheme();
}

// Scroll-to-top button functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Typing animation for About section intro
const preNameText = "Hello! I'm ";
const nameText = "Rudra Rokaya";
const postNameText = " - a data analyst and software engineer passionate about uncovering insights from complex datasets.";
let fullText = preNameText + nameText + postNameText;
let index = 0;
const typingSpeed = 40;

function typeIntro() {
  const target = document.getElementById("typed-intro");

  if (index <= fullText.length) {
    let current = fullText.slice(0, index);

    if (index <= preNameText.length) {
      target.innerHTML = current;
    } else if (index <= preNameText.length + nameText.length) {
      target.innerHTML = preNameText + `<span class='highlight-name'>${nameText.slice(0, index - preNameText.length)}</span>`;
    } else {
      const nameWrapped = `<span class='highlight-name'>${nameText}</span>`;
      const post = postNameText.slice(0, index - (preNameText.length + nameText.length));
      target.innerHTML = preNameText + nameWrapped + post;
    }

    index++;
    setTimeout(typeIntro, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeIntro, 400)
});

document.getElementById("logo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});