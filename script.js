// Toggle Dark/Light Mode with Smooth Animation
const toggleModeBtn = document.querySelector('.toggle-mode');
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');

  // Update button text/icon dynamically
  if (document.body.classList.contains('dark-mode')) {
    toggleModeBtn.textContent = '☀️ Toggle Light Mode';
  } else {
    toggleModeBtn.textContent = '🌙 Toggle Dark Mode';
  }

  // Add a subtle transition effect
  document.body.style.transition = 'background-color 0.5s, color 0.5s';
});

// Scrollytelling Animations with Delays and Enhanced Visibility
const storyCards = document.querySelectorAll('.story-card');
window.addEventListener('scroll', () => {
  storyCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Add staggered animation for better visual appeal
      card.style.transition = `transform 0.5s ease ${index * 0.1}s, opacity 0.5s ease`;
      card.style.transform = `translateX(${index % 2 === 0 ? '-' : ''}20px)`;
      card.style.opacity = 1;
    } else {
      // Reset styles when the card is out of view
      card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      card.style.transform = 'translateX(0)';
      card.style.opacity = 0.3;
    }
  });
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1); // Get the section ID
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50, // Offset for sticky header
        behavior: 'smooth',
      });
    }
  });
});

// Password-Free Login Feedback Simulation
const loginButtons = document.querySelectorAll('.login-button');
loginButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Create a temporary feedback message
    const feedback = document.createElement('div');
    feedback.textContent = `${button.textContent} Attempting...`;
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.right = '20px';
    feedback.style.padding = '10px 20px';
    feedback.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    feedback.style.color = '#fff';
    feedback.style.borderRadius = '10px';
    feedback.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    feedback.style.zIndex = '1000';
    feedback.style.transition = 'opacity 0.5s ease';

    document.body.appendChild(feedback);

    // Fade out and remove the feedback message
    setTimeout(() => {
      feedback.style.opacity = 0;
      setTimeout(() => feedback.remove(), 500);
    }, 2000);
  });
});

// Responsive Animation for Hero Section Background
const heroSection = document.querySelector('.hero-section');
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  heroSection.style.backgroundSize = width > 768 ? '150% 150%' : '200% 200%';
});
