// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const scrollToTopBtn = document.getElementById('scrollToTop');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.style.animation = 'none';
    
    // Animate hamburger menu
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== SMOOTH SCROLL OFFSET FOR FIXED NAVBAR =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.backgroundColor = 'rgba(30, 58, 138, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(30, 58, 138, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
    '.service-card, .why-card, .info-card, .about-content'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach((element) => {
    element.style.animation = 'none';
    observer.observe(element);
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;

        // Create email link (alternative approach)
        const emailSubject = `New Service Request from ${name}`;
        const emailBody = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}
        `.trim();

        const mailtoLink = `mailto:Miliyasugarba@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message sent! Opening email client...';
        submitBtn.style.backgroundColor = '#10b981';

        // Open email client
        window.location.href = mailtoLink;

        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
        }, 2000);
    });
}

// ===== CONTACT SECTION SCROLL HELPER =====
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = contactSection.offsetTop - navHeight;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Make scrollToContact available globally for onclick handlers
window.scrollToContact = scrollToContact;

// ===== SERVICE CARD COUNTER ANIMATION =====
let hasAnimated = false;

const animateServiceCards = () => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
};

// Trigger animation when services section is visible
const servicesSection = document.getElementById('services');
if (servicesSection) {
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
                animateServiceCards();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.1 });

    servicesObserver.observe(servicesSection);
}

// ===== PARALLAX EFFECT FOR HERO BACKGROUND =====
const hero = document.querySelector('.hero');
const techGrid = document.querySelector('.tech-grid');

if (hero && techGrid) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset < hero.offsetHeight) {
            techGrid.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
        }
    });
}

// ===== INTERSECTION OBSERVER FOR FADE-IN EFFECTS =====
const fadeInElements = document.querySelectorAll(
    '.section-title, .section-subtitle'
);

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeInElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    fadeInObserver.observe(element);
});

// ===== STAGGER ANIMATION FOR WHY CHOOSE CARDS =====
const whyCards = document.querySelectorAll('.why-card');
whyCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(card);
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section');

const highlightNavLink = () => {
    let current = '';
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.style.color = '#3b82f6';
        } else {
            link.style.color = 'white';
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ===== ABOUT CARD HOVER ANIMATION =====
const aboutCard = document.querySelector('.about-card');
if (aboutCard) {
    aboutCard.addEventListener('mousemove', (e) => {
        const rect = aboutCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        aboutCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    aboutCard.addEventListener('mouseleave', () => {
        aboutCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ===== FORM INPUT FOCUS ANIMATION =====
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.parentElement.style.animation = 'none';
        input.style.transform = 'translateY(-5px)';
        input.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.2)';
    });
    
    input.addEventListener('blur', () => {
        input.style.transform = 'translateY(0)';
        input.style.boxShadow = 'none';
    });
});

// ===== DEFER NON-CRITICAL CSS AND JS =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('MGIsoft Tech Website Loaded Successfully!');
});

// ===== SERVICE CARD CLICK HANDLER =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card) => {
    card.addEventListener('click', () => {
        scrollToContact();
    });
});

// ===== TYPEWRITER EFFECT FOR HERO TITLE =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;

    const typeWriter = () => {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start animation after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 300);
    });
}

// ===== SMOOTH SECTION TRANSITIONS =====
window.addEventListener('load', () => {
    const allSections = document.querySelectorAll('section');
    allSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeInUp 0.8s ease forwards`;
        section.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add keyframe animation to head
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== ERROR HANDLING FOR DYNAMIC ELEMENTS =====
try {
    const dynamicElements = document.querySelectorAll('[data-animate]');
    dynamicElements.forEach((el) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
    });
} catch (err) {
    console.log('Animation elements not found');
}

// ===== UTILITY: MARK ACTIVE MENU ITEM =====
document.addEventListener('scroll', () => {
    highlightNavLink();
}, { passive: true });
