// ===============================
// Navigation & Scroll Effects
// ===============================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const themeToggle = document.getElementById('themeToggle');

// ===============================
// Dark Theme Toggle
// ===============================

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Add a little animation
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
});

// Navbar scroll effect
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;
    
    // Add scrolled class when past the hero section
    if (window.scrollY > heroHeight - 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===============================
// Typing Effect
// ===============================

const typingText = document.querySelector('.typing-text');
const texts = [
    'Full Stack Developer',
    'Java Spring Boot Developer',
    'React Developer',
    'Freelance Developer',
    'Cloud Enthusiast',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ===============================
// Intersection Observer for Animations
// ===============================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe section headers with special animation
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            headerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(header => {
    headerObserver.observe(header);
});

// Observe all sections and cards
const animateElements = document.querySelectorAll(`
    .skill-category,
    .project-card,
    .timeline-item,
    .education-card,
    .certifications-card,
    .achievements-card,
    .contact-card
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===============================
// Contact Form Handling
// ===============================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission (replace with actual backend API)
    const formData = {
        name,
        email,
        subject,
        message
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send this data to your backend:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
    */
});

// ===============================
// Active Navigation Link
// ===============================

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===============================
// Parallax Effect for Hero Section
// ===============================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ===============================
// Dynamic Year in Footer
// ===============================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear.toString());
}

// ===============================
// Skill Tags Hover Effect
// ===============================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===============================
// Lazy Loading for Images
// ===============================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===============================
// Cursor Trail Effect (Optional Enhancement)
// ===============================

class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        for (let i = 0; i < 12; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${12 - i}px;
                height: ${12 - i}px;
                background: rgba(99, 102, 241, ${1 - i * 0.08});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease;
            `;
            document.body.appendChild(dot);
            this.dots.push({ el: dot, x: 0, y: 0 });
        }
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.animate();
    }
    
    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;
        
        this.dots.forEach((dot, index) => {
            dot.el.style.left = x + 'px';
            dot.el.style.top = y + 'px';
            
            const nextDot = this.dots[index + 1] || this.dots[0];
            dot.x = x;
            dot.y = y;
            
            x += (nextDot.x - x) * 0.3;
            y += (nextDot.y - y) * 0.3;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Uncomment to enable cursor trail effect (desktop only)
// if (window.innerWidth > 768) {
//     new CursorTrail();
// }

// ===============================
// Console Message
// ===============================

console.log('%c👋 Welcome to my Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c💼 Looking for developers? Let\'s connect!', 'color: #ec4899; font-size: 14px;');
console.log('%c🌐 Check out the code on GitHub', 'color: #14b8a6; font-size: 14px;');

// ===============================
// Performance Monitoring
// ===============================

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
});

// ===============================
// Expandable Project Cards
// ===============================

class ProjectCardExpander {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.modalOverlay = null;
        this.currentModal = null;
        this.init();
    }

    init() {
        // Create modal overlay container
        this.createModalOverlay();
        
        this.projectCards.forEach(card => {
            const expandBtn = card.querySelector('.expand-btn');
            
            // Make entire card clickable
            card.addEventListener('click', (e) => {
                // Don't expand if clicking on links or buttons
                if (e.target.closest('.project-btn') || 
                    e.target.closest('.carousel-btn') ||
                    e.target.closest('.indicator')) {
                    return;
                }
                this.openModal(card);
            });
            
            if (expandBtn) {
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openModal(card);
                });
            }
        });
    }

    createModalOverlay() {
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.className = 'project-modal-overlay';
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeModal();
            }
        });
        document.body.appendChild(this.modalOverlay);
    }

    openModal(card) {
        // Close any existing modal
        if (this.currentModal) {
            this.closeModal();
        }

        // Extract data from card
        const title = card.querySelector('.project-header h3').textContent;
        const type = card.querySelector('.project-type').textContent;
        const description = card.querySelector('.project-description').textContent;
        const techStack = Array.from(card.querySelectorAll('.project-tech span')).map(span => span.textContent);
        const buttons = Array.from(card.querySelectorAll('.project-btn'));
        
        // Get expanded content
        const expandedContent = card.querySelector('.project-expanded');
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        
        // Build modal content
        let modalHTML = `
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <span class="modal-project-type">${type}</span>
                <p class="modal-description">${description}</p>
                <div class="modal-tech">
                    ${techStack.map(tech => `<span>${tech}</span>`).join('')}
                </div>
        `;
        
        // Add action buttons
        if (buttons.length > 0) {
            modalHTML += `<div class="modal-actions">`;
            buttons.forEach(btn => {
                const href = btn.getAttribute('href');
                const className = btn.className;
                const innerHTML = btn.innerHTML;
                modalHTML += `<a href="${href}" class="${className}" target="_blank" onclick="event.stopPropagation()">${innerHTML}</a>`;
            });
            modalHTML += `</div>`;
        }
        
        // Add carousel and details if expanded content exists
        if (expandedContent) {
            const carousel = expandedContent.querySelector('.project-carousel');
            const details = expandedContent.querySelector('.project-details');
            
            if (carousel) {
                modalHTML += carousel.outerHTML;
            }
            
            if (details) {
                modalHTML += details.outerHTML;
            }
        }
        
        modalHTML += `</div>`;
        
        modal.innerHTML = modalHTML;
        
        // Add to overlay
        this.modalOverlay.innerHTML = '';
        this.modalOverlay.appendChild(modal);
        this.currentModal = modal;
        
        // Setup close button
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal());
        
        // Initialize carousel for this modal
        this.initCarousel(modal);
        
        // Show modal with animation
        setTimeout(() => {
            this.modalOverlay.classList.add('active');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // ESC key to close
        this.escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        };
        document.addEventListener('keydown', this.escHandler);
    }

    closeModal() {
        this.modalOverlay.classList.remove('active');
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        
        // Remove ESC handler
        if (this.escHandler) {
            document.removeEventListener('keydown', this.escHandler);
        }
        
        // Clear modal after animation
        setTimeout(() => {
            if (this.modalOverlay) {
                this.modalOverlay.innerHTML = '';
            }
            this.currentModal = null;
        }, 400);
    }

    initCarousel(container) {
        const carousel = container.querySelector('.project-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        
        if (slides.length <= 1) {
            // Hide carousel controls if only one image
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (indicators.length > 0) {
                indicators.forEach(ind => ind.style.display = 'none');
            }
            return;
        }

        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.add('active');
            }
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentSlide - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentSlide + 1);
            });
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(index);
            });
        });

        // Keyboard navigation
        const keyHandler = (e) => {
            if (e.key === 'ArrowLeft') {
                showSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(currentSlide + 1);
            }
        };
        
        document.addEventListener('keydown', keyHandler);
        
        // Clean up on modal close
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (!document.body.contains(carousel)) {
                    document.removeEventListener('keydown', keyHandler);
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Initialize project card expander
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCardExpander();
});
