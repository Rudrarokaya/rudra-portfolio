/**
 * Professional Portfolio - Enhanced JavaScript
 * Modern interactions, smooth animations, and form handling
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initThemeToggle();
  initTypingAnimation();
  initCounterAnimation();
  initFormValidation();
});

/**
 * Navigation Functionality
 */
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');

  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }
}

/**
 * Scroll-based Effects and Animations
 */
function initScrollEffects() {
  // Fade-in elements on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  // Parallax effect for hero shapes
  const heroShapes = document.querySelectorAll('.hero-shape');
  if (heroShapes.length > 0) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
      });
    }, { passive: true });
  }
}

/**
 * Theme Toggle (Dark/Light Mode)
 */
function initThemeToggle() {
  const themeSwitch = document.querySelector('.theme-switch');
  if (!themeSwitch) return;

  const themeIcon = themeSwitch.querySelector('i');

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme(true);
  }

  function setTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon', 'fa-sun');
      themeIcon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  themeSwitch.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-mode'));
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
    }
  });
}

/**
 * Typing Animation for About Section
 */
function initTypingAnimation() {
  const typedElement = document.getElementById('typed-intro');
  if (!typedElement) return;

  const preNameText = "Hello! I'm ";
  const nameText = "Rudra Rokaya";
  const postNameText = " — ";
  const fullText = preNameText + nameText + postNameText;

  let index = 0;
  const typingSpeed = 50;
  const startDelay = 500;

  function typeCharacter() {
    if (index <= fullText.length) {
      let displayText = '';

      if (index <= preNameText.length) {
        displayText = fullText.slice(0, index);
      } else if (index <= preNameText.length + nameText.length) {
        const nameProgress = index - preNameText.length;
        displayText = preNameText +
          `<span class="highlight-name">${nameText.slice(0, nameProgress)}</span>`;
      } else {
        const postProgress = index - preNameText.length - nameText.length;
        displayText = preNameText +
          `<span class="highlight-name">${nameText}</span>` +
          postNameText.slice(0, postProgress);
      }

      typedElement.innerHTML = displayText;
      index++;
      setTimeout(typeCharacter, typingSpeed);
    }
  }

  // Start typing after delay
  setTimeout(typeCharacter, startDelay);
}

/**
 * Counter Animation for Stats
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const parent = counter.closest('.highlight-item');
        const target = parent ? parseInt(parent.dataset.count) : parseInt(counter.textContent);

        if (isNaN(target)) return;

        animateCounter(counter, target);
        counter.classList.add('visible');
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
  const duration = 2000;
  const startTime = performance.now();
  const startValue = 0;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.round(startValue + (target - startValue) * easeOutQuart);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

/**
 * Enhanced Form Validation and Submission
 */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const formValidator = new FormValidator(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!formValidator.validateAll()) {
      formValidator.showFirstError();
      return;
    }

    await submitForm(form);
  });
}

class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = form.querySelectorAll('.form-control');
    this.rules = {
      'contact-name': {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
        messages: {
          required: 'Name is required',
          minLength: 'Name must be at least 2 characters',
          maxLength: 'Name must be less than 50 characters',
          pattern: 'Please enter a valid name'
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

    this.initRealTimeValidation();
  }

  initRealTimeValidation() {
    this.fields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          this.validateField(field);
        }
      });
    });
  }

  validateField(field) {
    const rules = this.rules[field.id];
    if (!rules) return true;

    const value = field.value.trim();
    this.clearError(field);

    // Required check
    if (rules.required && !value) {
      this.showError(field, rules.messages.required);
      return false;
    }

    // Min length check
    if (rules.minLength && value.length < rules.minLength) {
      this.showError(field, rules.messages.minLength);
      return false;
    }

    // Max length check
    if (rules.maxLength && value.length > rules.maxLength) {
      this.showError(field, rules.messages.maxLength);
      return false;
    }

    // Pattern check
    if (rules.pattern && value && !rules.pattern.test(value)) {
      this.showError(field, rules.messages.pattern);
      return false;
    }

    this.showSuccess(field);
    return true;
  }

  validateAll() {
    let isValid = true;
    this.fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  }

  showError(field, message) {
    field.classList.remove('success');
    field.classList.add('error');

    let errorEl = field.parentNode.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      field.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }

  showSuccess(field) {
    field.classList.remove('error');
    field.classList.add('success');
    this.clearError(field);
  }

  clearError(field) {
    const errorEl = field.parentNode.querySelector('.error-message');
    if (errorEl) {
      errorEl.style.display = 'none';
    }
  }

  showFirstError() {
    const firstError = this.form.querySelector('.error');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  reset() {
    this.fields.forEach(field => {
      field.classList.remove('error', 'success');
      this.clearError(field);
    });
  }
}

async function submitForm(form) {
  const submitBtn = form.querySelector('.btn-submit');
  const originalContent = submitBtn.innerHTML;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

  try {
    const response = await fetch('https://formspree.io/f/mnndonbg', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success
      submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
      submitBtn.style.background = '#22c55e';

      showNotification('Thank you! Your message has been sent successfully.', 'success');
      form.reset();

      // Reset form validator state
      const fields = form.querySelectorAll('.form-control');
      fields.forEach(field => {
        field.classList.remove('error', 'success');
        const errorEl = field.parentNode.querySelector('.error-message');
        if (errorEl) errorEl.style.display = 'none';
      });
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    // Error
    submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span>Failed to send</span>';
    submitBtn.style.background = '#ef4444';
    showNotification('Sorry, there was an error. Please try again.', 'error');
  }

  // Reset button after delay
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalContent;
    submitBtn.style.background = '';
  }, 3000);
}

function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  if (!notification) return;

  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';

  // Auto hide after 5 seconds
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Throttle function for scroll events
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
