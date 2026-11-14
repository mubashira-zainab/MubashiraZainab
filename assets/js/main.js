/**
 * Mubashira Zainab — Premium Portfolio
 * Core Interactive Scripts
 */

// Global Configuration
const CONFIG = {
  // Professional Contact Information
  email: "mubashirazainab2418@gmail.com",
  github: "https://github.com/mubashira-zainab",
  linkedin: "https://www.linkedin.com/in/mubashira-zainab-a8a4a8354",
  portfolio: "https://mubashira-zainab.github.io/My-Portfolio-Website/",
  roles: [
    "Mathematics-Driven Developer",
    "AI & Data Enthusiast",
    "Python Developer",
    "Software Solutions Builder"
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initSkillsFilter();
  initContactForm();
  initBackToTop();
  initDynamicLinks();
});

/**
 * Navbar scroll behavior & mobile toggle
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky nav on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    highlightActiveSection();
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/**
 * Animated Hero Typing Effect
 */
function initTypingEffect() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const roles = CONFIG.roles;
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of text
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  // Check prefers-reduced-motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    type();
  } else {
    typedTarget.textContent = roles[0];
  }
}

/**
 * Skills Category Filter
 */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/**
 * Contact Form Handler (Genuine Mailto fallback)
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const subject = document.getElementById('subject')?.value || 'Portfolio Contact';
    const message = document.getElementById('message')?.value || '';

    const mailtoUrl = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject + " - " + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

    // Open mail client
    window.location.href = mailtoUrl;

    const feedback = document.getElementById('formFeedback');
    if (feedback) {
      feedback.style.display = 'block';
      feedback.textContent = 'Opening your email client to send message...';
      feedback.style.color = '#E4C59E';
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 6000);
    }
  });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Ensure dynamic configuration applies to all placeholder links
 */
function initDynamicLinks() {
  const emailLinks = document.querySelectorAll('[data-config="email"]');
  emailLinks.forEach(el => {
    el.setAttribute('href', `mailto:${CONFIG.email}`);
    if (el.classList.contains('display-value')) {
      el.textContent = CONFIG.email;
    }
  });

  const yearTarget = document.getElementById('currentYear');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
}
