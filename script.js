const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const scrollTopButton = document.getElementById('scroll-top');
const preloader = document.getElementById('preloader');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopButton.classList.add('show');
  } else {
    scrollTopButton.classList.remove('show');
  }
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

window.addEventListener('load', () => {
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 600);
  }
});

const cards = document.querySelectorAll('.animate-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2,
});

cards.forEach(card => observer.observe(card));

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    contactForm.querySelector('button').textContent = 'Message Sent';
    contactForm.reset();
    setTimeout(() => {
      contactForm.querySelector('button').textContent = 'Send Message';
    }, 2500);
  });
}
