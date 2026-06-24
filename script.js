// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('[data-nav]');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            card.classList.remove('hidden');
            if (filter !== 'all' && !card.classList.contains(filter) && card.getAttribute('data-category') !== filter) {
                card.classList.add('hidden');
            }
        });
    });
});

// Form Submission
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name') || 'User';
    
    // Show success message
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '✓ Message Sent Successfully!';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
    }, 2000);
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.expertise-card, .project-card, .testimonial-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Skills progress bar animation
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shape');
    parallaxElements.forEach((el, index) => {
        el.style.transform = `translateY(${scrolled * (0.5 + index * 0.1)}px)`;
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '1px';
        ripple.style.height = '1px';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const animate = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(animate);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    
    animate();
}

// Trigger counter on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const text = item.textContent;
                const number = parseInt(text);
                animateCounter(item, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add cursor follow effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.display = 'block';
    cursor.style.left = (mouseX - 10) + 'px';
    cursor.style.top = (mouseY - 10) + 'px';
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

// Log portfolio loaded
console.log('%cWelcome to Gaurav Kumar\'s Portfolio! 🚀', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cLet\'s transform data into insights! 📊', 'font-size: 16px; color: #764ba2;');