// ========================================
// Glothm Careers Page - JavaScript
// ========================================

// File Upload Handler
const fileInput = document.getElementById('resume');
const fileLabel = document.querySelector('.file-upload label span');

if (fileInput) {
    fileInput.addEventListener('change', function(e) {
        const fileName = e.target.files[0]?.name;
        if (fileName) {
            fileLabel.textContent = `Selected: ${fileName}`;
            fileLabel.style.color = 'var(--primary-green)';
        } else {
            fileLabel.textContent = 'Upload Your Resume (PDF, DOC)';
            fileLabel.style.color = 'inherit';
        }
    });
}

// Talent Network Form Handler
const talentForm = document.querySelector('.talent-form');
if (talentForm) {
    talentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        
        // Basic validation
        let isValid = true;
        const inputs = this.querySelectorAll('input[required], select');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                showNotification('Please fill in all required fields', 'error');
            } else {
                input.classList.remove('error');
            }
        });
        
        // Check if file is uploaded
        const resumeFile = fileInput?.files[0];
        if (!resumeFile) {
            showNotification('Please upload your resume', 'error');
            return;
        }
        
        // Check file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (resumeFile.size > maxSize) {
            showNotification('Resume file size must be less than 5MB', 'error');
            return;
        }
        
        // Check file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(resumeFile.type)) {
            showNotification('Please upload a PDF or DOC/DOCX file', 'error');
            return;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Thank you for joining our talent network! We\'ll notify you when new opportunities arise.', 'success');
                
                // Reset form
                this.reset();
                fileLabel.textContent = 'Upload Your Resume (PDF, DOC)';
                fileLabel.style.color = 'inherit';
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate Timeline on Scroll
const observeTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
};

// Initialize timeline animation
if (document.querySelector('.process-timeline')) {
    observeTimeline();
}

// Scroll Indicator Click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('.why-join-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Life Cards Hover Effect
const lifeCards = document.querySelectorAll('.life-card');
lifeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

// FAQ Accordion Enhancement
const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'accordion-ripple';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles for accordion
const accordionRippleStyles = `
    <style>
    .accordion-button {
        position: relative;
        overflow: hidden;
    }
    
    .accordion-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.3);
        transform: translate(-50%, -50%);
        animation: accordionRippleEffect 0.6s ease-out;
    }
    
    @keyframes accordionRippleEffect {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', accordionRippleStyles);

// Culture Cards Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cultureCards = document.querySelectorAll('.culture-card');
    
    cultureCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// Role Tags Interactive Effect
const roleTags = document.querySelectorAll('.role-tag');
roleTags.forEach(tag => {
    tag.addEventListener('click', function() {
        // Toggle selected state
        this.classList.toggle('selected');
        
        // If selected, add to expertise field
        const expertiseSelect = document.querySelector('select');
        if (this.classList.contains('selected')) {
            this.style.background = 'var(--primary-green)';
            this.style.color = 'var(--dark-bg)';
        } else {
            this.style.background = 'rgba(0, 255, 0, 0.1)';
            this.style.color = 'var(--primary-green)';
        }
    });
});

// Counter Animation for Career Stats
function animateCareerCounters() {
    const counters = document.querySelectorAll('.career-stats h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current) + (counter.innerText.includes('+') ? '+' : counter.innerText.includes('%') ? '%' : '');
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : counter.innerText.includes('%') ? '%' : '');
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

// Initialize career counters
document.addEventListener('DOMContentLoaded', animateCareerCounters);

// Benefit Cards Tilt Effect
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console Message for Developers
console.log('%c 🚀 Interested in joining Glothm?', 'color: #00ff00; font-size: 20px; font-weight: bold;');
console.log('%c We love developers who inspect code!', 'color: #00ff00; font-size: 14px;');
console.log('%c Send us your resume at: klinsmannjurgenagyei@gmail.com', 'color: #ffffff; font-size: 12px;');
console.log('%c Include "Console Explorer" in your subject line for bonus points! 😉', 'color: #00ff00; font-size: 12px;');

// Easter Egg: Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    showNotification('🎮 Achievement Unlocked: Code Ninja! You found our easter egg!', 'success');
    
    // Add special effects
    document.body.style.animation = 'rainbow 3s ease-in-out';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}

// Add rainbow animation for easter egg
const rainbowStyles = `
    <style>
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', rainbowStyles);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Glothm Careers page initialized successfully!');
});