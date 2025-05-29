/* Component-Specific JavaScript Functions */

// Header Component Class
class HeaderComponent {
  constructor() {
    this.header = document.getElementById('header');
    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.themeToggle = document.getElementById('theme-toggle');
    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupThemeToggle();
    this.setupDropdowns();
    this.setupActiveLinks();
  }

  setupScrollEffect() {
    if (!this.header) return;

    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        this.header.classList.add('scrolled');
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          this.header.style.transform = 'translateY(-100%)';
        } else {
          this.header.style.transform = 'translateY(0)';
        }
      } else {
        this.header.classList.remove('scrolled');
        this.header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  setupMobileMenu() {
    if (!this.mobileToggle || !this.navMenu) return;

    this.mobileToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Animate hamburger icon
      this.mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.header.contains(e.target) && this.navMenu.classList.contains('active')) {
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        this.mobileToggle.classList.remove('active');
      }
    });
  }

  setupThemeToggle() {
    if (!this.themeToggle) return;

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);

    this.themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.updateThemeIcon(newTheme);
      
      // Add transition effect
      document.body.style.transition = 'background-color 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }

  updateThemeIcon(theme) {
    if (this.themeToggle) {
      this.themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  setupDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-menu-item');
    
    dropdownItems.forEach(item => {
      const dropdown = item.querySelector('.nav-dropdown');
      if (!dropdown) return;

      item.addEventListener('mouseenter', () => {
        dropdown.style.display = 'block';
        setTimeout(() => {
          dropdown.classList.add('show');
        }, 10);
      });

      item.addEventListener('mouseleave', () => {
        dropdown.classList.remove('show');
        setTimeout(() => {
          dropdown.style.display = 'none';
        }, 300);
      });
    });
  }

  setupActiveLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

// Footer Component Class
class FooterComponent {
  constructor() {
    this.footer = document.querySelector('.footer');
    this.init();
  }

  init() {
    this.setupNewsletterForm();
    this.setupSocialLinks();
    this.addCurrentYear();
  }

  setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('.newsletter-input').value;
      
      if (this.validateEmail(email)) {
        this.showNotification('Thank you for subscribing!', 'success');
        newsletterForm.reset();
      } else {
        this.showNotification('Please enter a valid email address.', 'error');
      }
    });
  }

  setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.dataset.platform;
        this.trackSocialClick(platform);
        // Open social link in new tab
        window.open(link.href, '_blank');
      });
    });
  }

  addCurrentYear() {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  trackSocialClick(platform) {
    // Analytics tracking for social media clicks
    console.log(`Social link clicked: ${platform}`);
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      background: ${type === 'success' ? '#28a745' : '#dc3545'};
      color: white;
      border-radius: 8px;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Search Component Class
class SearchComponent {
  constructor() {
    this.searchInput = document.querySelector('.search-input');
    this.searchResults = document.querySelector('.search-results');
    this.init();
  }

  init() {
    if (!this.searchInput) return;
    
    this.setupSearch();
    this.setupKeyboardNavigation();
  }

  setupSearch() {
    let searchTimeout;
    
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        this.hideResults();
        return;
      }
      
      searchTimeout = setTimeout(() => {
        this.performSearch(query);
      }, 300);
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-component')) {
        this.hideResults();
      }
    });
  }

  setupKeyboardNavigation() {
    this.searchInput.addEventListener('keydown', (e) => {
      const results = this.searchResults.querySelectorAll('.search-result-item');
      const activeResult = this.searchResults.querySelector('.search-result-item.active');
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.navigateResults(results, activeResult, 'down');
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.navigateResults(results, activeResult, 'up');
          break;
        case 'Enter':
          e.preventDefault();
          if (activeResult) {
            activeResult.click();
          }
          break;
        case 'Escape':
          this.hideResults();
          break;
      }
    });
  }

  performSearch(query) {
    // Simulate search results (replace with actual search logic)
    const mockResults = [
      { title: 'Cybersecurity Services', url: 'services.html#cybersecurity' },
      { title: 'AI & Machine Learning', url: 'services.html#ai' },
      { title: 'Cloud Computing', url: 'services.html#cloud' },
      { title: 'About TechVision', url: 'about.html' },
      { title: 'Contact Us', url: 'contact.html' }
    ];

    const filteredResults = mockResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    this.displayResults(filteredResults);
  }

  displayResults(results) {
    if (!this.searchResults) return;

    this.searchResults.innerHTML = '';
    
    if (results.length === 0) {
      this.searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
      results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `<strong>${result.title}</strong>`;
        item.addEventListener('click', () => {
          window.location.href = result.url;
        });
        this.searchResults.appendChild(item);
      });
    }
    
    this.searchResults.style.display = 'block';
  }

  navigateResults(results, activeResult, direction) {
    if (results.length === 0) return;

    // Remove active class from current result
    if (activeResult) {
      activeResult.classList.remove('active');
    }

    let newIndex = 0;
    if (activeResult) {
      const currentIndex = Array.from(results).indexOf(activeResult);
      newIndex = direction === 'down' 
        ? (currentIndex + 1) % results.length
        : (currentIndex - 1 + results.length) % results.length;
    }

    results[newIndex].classList.add('active');
    results[newIndex].scrollIntoView({ block: 'nearest' });
  }

  hideResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'none';
    }
  }
}

// Back to Top Component
class BackToTopComponent {
  constructor() {
    this.createButton();
    this.setupScrollListener();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.className = 'back-to-top';
    this.button.innerHTML = '↑';
    this.button.setAttribute('aria-label', 'Back to top');
    
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    document.body.appendChild(this.button);
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });
  }
}

// Progress Bar Component
class ProgressBarComponent {
  constructor() {
    this.createProgressBar();
    this.setupScrollListener();
  }

  createProgressBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'progress-bar';
    document.body.appendChild(this.progressBar);
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      this.progressBar.style.width = `${scrollPercent}%`;
    });
  }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HeaderComponent();
  new FooterComponent();
  new SearchComponent();
  new BackToTopComponent();
  new ProgressBarComponent();
});

// Utility functions for components
const ComponentUtils = {
  // Smooth scroll to element
  scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  },

  // Add animation class to element
  animateElement(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => {
      element.classList.remove(animationClass);
    }, { once: true });
  },

  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    BackToTopComponent,
    ProgressBarComponent,
    ComponentUtils
  };
}
