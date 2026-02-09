// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== HEXAGON GRID GENERATION =====
function createHexagonNetwork() {
    const svg = document.querySelector('.hexagon-network');
    if (!svg) return;

    const hexagons = [
        { cx: 250, cy: 100, icon: '🏛️', label: 'Government' },
        { cx: 100, cy: 200, icon: '🏘️', label: 'Community' },
        { cx: 250, cy: 200, icon: '🤝', label: 'Services' },
        { cx: 400, cy: 200, icon: '👨‍👩‍👧‍👦', label: 'Residents' },
        { cx: 175, cy: 300, icon: '📊', label: 'Data' },
        { cx: 325, cy: 300, icon: '💼', label: 'Projects' },
    ];

    const hexSize = 40;

    hexagons.forEach((hex, index) => {
        // Create hexagon
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        // Hexagon polygon
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const points = generateHexagonPoints(hex.cx, hex.cy, hexSize);
        polygon.setAttribute('points', points);
        polygon.setAttribute('fill', 'rgba(13, 71, 161, 0.8)');
        polygon.setAttribute('stroke', 'rgba(0, 188, 212, 0.6)');
        polygon.setAttribute('stroke-width', '2');
        polygon.style.transition = 'all 0.3s ease';
        
        // Add hover effect
        polygon.addEventListener('mouseenter', () => {
            polygon.setAttribute('fill', 'rgba(13, 71, 161, 1)');
            polygon.setAttribute('filter', 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))');
        });
        
        polygon.addEventListener('mouseleave', () => {
            polygon.setAttribute('fill', 'rgba(13, 71, 161, 0.8)');
            polygon.setAttribute('filter', 'none');
        });

        // Icon text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', hex.cx);
        text.setAttribute('y', hex.cy + 6);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '24');
        text.setAttribute('fill', 'rgba(0, 188, 212, 1)');
        text.textContent = hex.icon;

        g.appendChild(polygon);
        g.appendChild(text);
        svg.appendChild(g);
    });
}

function generateHexagonPoints(cx, cy, size) {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 30) * (Math.PI / 180);
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        points.push([x, y]);
    }
    return points.map(p => p.join(',')).join(' ');
}

// ===== CONTACT FORM HANDLER =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email });
        
        alert('Thank you for your message! We will get back to you shortly.');
        contactForm.reset();
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SEARCH FUNCTIONALITY =====
const searchBtn = document.querySelector('.btn-search');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Search feature coming soon!');
    });
}

// ===== LOGIN BUTTON =====
const loginBtn = document.querySelector('.btn-login');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        // Redirect to login page or show modal
        alert('Redirecting to login page...');
        // window.location.href = '/login';
    });
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    createHexagonNetwork();
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .news-card, .official-card').forEach(el => {
        observer.observe(el);
    });
});

// ===== FADE-IN-UP ANIMATION =====
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