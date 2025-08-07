// ========================================
// Glothm - Professional Website JavaScript
// ========================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00ff00'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff00',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Navbar Scroll Effect
let navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typed.js for Hero Section (Dynamic Text)
document.addEventListener('DOMContentLoaded', function() {
    // Add dynamic typing effect to hero title if needed
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Optional: Add typing effect for dynamic text
    }
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        
        // Basic validation
        let isValid = true;
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles dynamically
const notificationStyles = `
    <style>
    .notification {
        position: fixed;
        top: 100px;
        right: -400px;
        background: var(--card-bg);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 16px 24px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        transition: right 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        right: 20px;
    }
    
    .notification.success {
        border-color: var(--primary-green);
        background: rgba(0, 255, 0, 0.1);
    }
    
    .notification.success i {
        color: var(--primary-green);
    }
    
    .notification.error {
        border-color: #ff4444;
        background: rgba(255, 68, 68, 0.1);
    }
    
    .notification.error i {
        color: #ff4444;
    }
    
    .form-control.error {
        border-color: #ff4444 !important;
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.hero-stats h3, .stat-item span');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current) + (counter.innerText.includes('+') ? '+' : '');
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counters when DOM is loaded
document.addEventListener('DOMContentLoaded', animateCounters);

// Portfolio Card Hover Effects
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service Cards Interactive Effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyles = `
    <style>
    .service-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.3);
        transform: translate(-50%, -50%);
        animation: rippleEffect 0.6s ease-out;
    }
    
    @keyframes rippleEffect {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', rippleStyles);

// Mobile Menu Toggle Enhancement
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-visual');
    
    if (parallax) {
        const speed = 0.5;
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hide');
        }, 1000);
    }
});

// Add Loading Screen HTML
const loaderHTML = `
    <div class="loader">
        <div class="loader-content">
            <div class="loader-logo">
                <span class="green">&lt;g/&gt;</span>lothm
            </div>
            <div class="spinner"></div>
        </div>
    </div>
`;

// Add spinner styles
const spinnerStyles = `
    <style>
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(0, 255, 0, 0.1);
        border-top: 3px solid var(--primary-green);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loader-logo .green {
        color: var(--primary-green);
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', spinnerStyles);
document.body.insertAdjacentHTML('afterbegin', loaderHTML);

// Intersection Observer for Fade In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add fade-in animation styles
const fadeInStyles = `
    <style>
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out;
    }
    
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
    </style>
`;

document.head.insertAdjacentHTML('beforeend', fadeInStyles);

// Mouse Follow Effect for Hero Section
document.addEventListener('mousemove', (e) => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const floatingCard = document.querySelector('.floating-card');
        if (floatingCard) {
            floatingCard.style.transform = `
                translateX(${x * 20 - 10}px) 
                translateY(${y * 20 - 10}px)
            `;
        }
    }
});

// Get Started Button Actions
document.querySelectorAll('.btn-cta, .btn-primary-custom').forEach(btn => {
    if (btn.textContent.includes('Get Started') || btn.textContent.includes('Start')) {
        btn.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Watch Demo Button
document.querySelectorAll('.btn-secondary-custom').forEach(btn => {
    if (btn.textContent.includes('Watch Demo')) {
        btn.addEventListener('click', () => {
            // You can add a modal with video demo here
            showNotification('Demo video coming soon!', 'success');
        });
    }
});

// Console Easter Egg
console.log('%c Welcome to Glothm! 🚀', 'color: #00ff00; font-size: 24px; font-weight: bold;');
console.log('%c We\'re hiring! Join our team of innovators.', 'color: #00ff00; font-size: 14px;');
console.log('%c Contact us at careers@glothm.com', 'color: #ffffff; font-size: 12px;');

// Performance Optimization - Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Glothm website initialized successfully!');
});