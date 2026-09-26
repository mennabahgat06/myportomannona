/**
 * ==========================================================================
 * MENNA BAHGAT - PORTFOLIO SCRIPT
 * Vanilla JavaScript (No Frameworks)
 * Clean, Modular, and Robust Implementation
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initTypewriter();
  initScrollSpy();
  initNavbarScroll();
  initScrollReveal();
  initSkillProgress();
  initTestimonialCarousel();
  initContactForm();
  initScrollTop();
  initCurrentYear();
  initCvDownload();
});

/* --------------------------------------------------------------------------
 * 1. THEME TOGGLE (DARK / LIGHT MODE)
 * -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Retrieve saved theme or check system preference
  const savedTheme = localStorage.getItem('menna_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('menna_theme', newTheme);
    });
  }

  // Listen to OS-level preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('menna_theme')) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

/* --------------------------------------------------------------------------
 * 2. MOBILE HAMBURGER MENU
 * -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    navMenu.classList.add('open');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', toggleMenu);

  // Close when clicking nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Reset overflow on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
 * 3. TYPEWRITER EFFECT
 * -------------------------------------------------------------------------- */
function initTypewriter() {
  const targetElement = document.getElementById('typewriter');
  if (!targetElement) return;

  // Words to cycle through as requested in prompt
  const phrases = [
    'Mobile App Developer',
    'Flutter Specialist',
    'Clean Architecture Advocate'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseEnd = 2000;
  const pauseStart = 500;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of word
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  type();
}

/* --------------------------------------------------------------------------
 * 4. ACTIVE NAVIGATION LINK (SCROLL SPY)
 * -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

/* --------------------------------------------------------------------------
 * 5. NAVBAR SCROLL EFFECT
 * -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function checkScroll() {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

/* --------------------------------------------------------------------------
 * 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
 * -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
 * 7. ANIMATED SKILL PROGRESS BARS ON SCROLL
 * -------------------------------------------------------------------------- */
function initSkillProgress() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  if (!('IntersectionObserver' in window)) {
    progressBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-progress');
    });
    return;
  }

  const skillsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = targetWidth;
        obs.unobserve(bar);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.2
  });

  progressBars.forEach(bar => skillsObserver.observe(bar));
}

/* --------------------------------------------------------------------------
 * 8. TESTIMONIALS CAROUSEL / SLIDER
 * -------------------------------------------------------------------------- */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('#carousel-dots .dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const wrapper = document.querySelector('.testimonial-carousel-wrapper');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 5000;

  function showSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      startAutoplay();
    });
  });

  // Pause on hover
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  }

  startAutoplay();
}

/* --------------------------------------------------------------------------
 * 9. CONTACT FORM VALIDATION & SUBMISSION
 * -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(input, errorElementId, message) {
    input.style.borderColor = '#ef4444';
    const errorEl = document.getElementById(errorElementId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function clearError(input, errorElementId) {
    input.style.borderColor = '';
    const errorEl = document.getElementById(errorElementId);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  [nameInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      clearError(input, `${input.id}-error`);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, 'name-error', 'Please enter your name.');
      isValid = false;
    } else {
      clearError(nameInput, 'name-error');
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      showError(emailInput, 'email-error', 'Please enter your email.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'email-error', 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, 'email-error');
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput, 'message-error', 'Please enter a message.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'message-error', 'Message must be at least 10 characters long.');
      isValid = false;
    } else {
      clearError(messageInput, 'message-error');
    }

    if (!isValid) return;

    // Simulate sending with loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;

      formStatus.className = 'form-status success';
      formStatus.textContent = 'Thank you! Your message has been received successfully.';

      form.reset();

      setTimeout(() => {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
      }, 6000);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
 * 10. SCROLL TO TOP BUTTON
 * -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
 * 11. FOOTER DYNAMIC CURRENT YEAR
 * -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
 * 12. CV DOWNLOAD PLACEHOLDER HELPER
 * -------------------------------------------------------------------------- */
function initCvDownload() {
  const cvBtn = document.getElementById('cv-download-btn');
  if (!cvBtn) return;

  cvBtn.addEventListener('click', (e) => {
    // If href is just #contact or placeholder, open mailto or prompt user
    const href = cvBtn.getAttribute('href');
    if (href === '#contact') {
      // Allow smooth scroll to contact section
      return;
    }
  });
}
