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

// Enhanced Form Validation System
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.fields = {};
    this.errors = {};
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    // Define validation rules
    this.validationRules = {
      'contact-name': {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        messages: {
          required: 'Name is required',
          minLength: 'Name must be at least 2 characters',
          maxLength: 'Name must be less than 50 characters',
          pattern: 'Name can only contain letters and spaces'
        }
      },
      'contact-email': {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messages: {
          required: 'Email is required',
          pattern: 'Please enter a valid email address'
        }
      },
      'contact-message': {
        required: true,
        minLength: 10,
        maxLength: 1000,
        messages: {
          required: 'Message is required',
          minLength: 'Message must be at least 10 characters',
          maxLength: 'Message must be less than 1000 characters'
        }
      }
    };

    // Add event listeners
    this.addEventListeners();
  }

  addEventListeners() {
    // Real-time validation on input
    this.form.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', (e) => {
        this.validateField(e.target);
      });

      field.addEventListener('blur', (e) => {
        this.validateField(e.target);
      });

      field.addEventListener('focus', (e) => {
        this.clearFieldError(e.target);
      });
    });

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.submitForm();
      } else {
        this.showFormErrors();
      }
    });
  }

  validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const rules = this.validationRules[fieldId];

    if (!rules) return true;

    // Clear previous errors
    this.clearFieldError(field);

    // Check required
    if (rules.required && !value) {
      this.showFieldError(field, rules.messages.required);
      return false;
    }

    // Check min length
    if (rules.minLength && value.length < rules.minLength) {
      this.showFieldError(field, rules.messages.minLength);
      return false;
    }

    // Check max length
    if (rules.maxLength && value.length > rules.maxLength) {
      this.showFieldError(field, rules.messages.maxLength);
      return false;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      this.showFieldError(field, rules.messages.pattern);
      return false;
    }

    // Field is valid
    this.showFieldSuccess(field);
    return true;
  }

  validateForm() {
    let isValid = true;
    this.form.querySelectorAll('.form-control').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  clearFieldError(field) {
    field.classList.remove('error', 'success');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  showFormErrors() {
    // Scroll to first error
    const firstError = this.form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  async submitForm() {
    const submitBtn = this.form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    try {
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      const response = await fetch('https://formspree.io/f/mnndonbg', {
        method: 'POST',
        body: new FormData(this.form)
      });

      if (!response.ok) throw new Error('Submission failed');
      
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = '#28a745';
      this.form.reset();
      
      // Clear all validation states
      this.form.querySelectorAll('.form-control').forEach(field => {
        this.clearFieldError(field);
      });
      
    } catch (error) {
      submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Try Again';
      submitBtn.style.background = '#dc3545';
    }
    
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.removeAttribute('style');
    }, 3000);
  }
}

// Combine DOMContentLoaded events
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeIntro, 400);
  animateCounters();

  // Initialize enhanced form validation
  new FormValidator('contactForm');

  // AJAX form submission and notification
  const form = document.getElementById('contactForm');
  const notification = document.getElementById('notification');
  if (form && notification) {
    form.addEventListener('submit', e => {
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
});