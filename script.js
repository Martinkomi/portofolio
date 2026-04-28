// ===== LANGUAGE MANAGEMENT (FR / EN) =====
let currentLanguage = localStorage.getItem('language-martin') || 'fr';

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
    updateLanguageButtons();
    renderDynamicContent();
});

// Language switcher buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentLanguage = e.target.dataset.lang;
        localStorage.setItem('language-martin', currentLanguage);
        setLanguage(currentLanguage);
        updateLanguageButtons();
        renderDynamicContent();
    });
});

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });
}

function setLanguage(lang) {
    const trans = translations[lang];
    if (!trans) return;

    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const keys = el.getAttribute('data-i18n').split('.');
        let value = trans;
        for (let key of keys) {
            value = value ? value[key] : undefined;
        }
        if (value) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else {
                el.innerHTML = value;
            }
        }
    });
}

function renderDynamicContent() {
    const trans = translations[currentLanguage];

    // Render Experience
    const experienceContainer = document.getElementById('experienceTimeline');
    if (experienceContainer) {
        experienceContainer.innerHTML = '';
        const experiences = experienceTranslations[currentLanguage].experiences;
        experiences.forEach((exp, index) => {
            const isFirst = index === 0;
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item reveal visible';
            timelineItem.innerHTML = `
                <div class="timeline-marker">
                    <div class="timeline-dot ${isFirst ? 'active' : ''}"></div>
                    ${index < experiences.length - 1 ? '<div class="timeline-line"></div>' : ''}
                </div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <div>
                            <span class="timeline-date">${exp.date}</span>
                            <h3 class="timeline-role">${exp.role}</h3>
                            <p class="timeline-company">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                ${exp.company}
                            </p>
                        </div>
                        ${isFirst ? `<span class="timeline-badge current">${trans.experience.current}</span>` : ''}
                    </div>
                    <ul class="timeline-details">
                        ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                    <div class="timeline-tags">
                        ${exp.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            experienceContainer.appendChild(timelineItem);
        });
    }

    // Render Education
    const educationContainer = document.getElementById('educationGrid');
    if (educationContainer) {
        educationContainer.innerHTML = '';
        const educations = educationTranslations[currentLanguage].educations;
        educations.forEach(edu => {
            const eduCard = document.createElement('div');
            eduCard.className = 'education-card reveal visible';
            eduCard.innerHTML = `
                <div class="education-year">${edu.year}</div>
                <div class="education-content">
                    <div class="education-degree">${edu.degree}</div>
                    <div class="education-school">${edu.school}</div>
                    <p class="education-desc">${edu.desc}</p>
                </div>
            `;
            educationContainer.appendChild(eduCard);
        });
    }

    // Render Expertise
    const expertiseContainer = document.getElementById('expertiseGrid');
    if (expertiseContainer) {
        expertiseContainer.innerHTML = '';
        const expertise = expertiseTranslations[currentLanguage];
        const expertiseIcons = [
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 20V10M12 20V4M6 20v-6"></path></svg>',
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"></circle><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"></path></svg>',
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path></svg>',
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>',
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>',
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13" rx="2"></rect><path d="M16 8h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-4"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>'
        ];

        expertise.forEach((item, index) => {
            const expertiseItem = document.createElement('div');
            expertiseItem.className = 'expertise-item';
            expertiseItem.innerHTML = `
                <div class="expertise-icon">
                    ${expertiseIcons[index] || expertiseIcons[0]}
                </div>
                <span>${item}</span>
            `;
            expertiseContainer.appendChild(expertiseItem);
        });
    }
    // Render skill tags
    const lang = translations[currentLanguage];
    if (lang && lang.skillTagSets) {
        Object.entries(lang.skillTagSets).forEach(([key, tags]) => {
            const container = document.getElementById(`skill-tags-${key}`);
            if (container) {
                container.innerHTML = tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
            }
        });
    }

    // Update page title
    if (lang && lang.pageTitle) {
        document.title = lang.pageTitle;
    }}

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 40);
}

// ===== LANGUAGE BARS =====
const languageFills = document.querySelectorAll('.language-fill');

const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.dataset.width;
            entry.target.style.width = width + '%';
            langObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

languageFills.forEach(el => langObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + id) {
                    link.style.color = 'var(--accent)';
                }
            });
        }
    });
}, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(section => activeObserver.observe(section));

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    animationId = requestAnimationFrame(animate);
}

animate();

// Stop animation when not visible
const heroSection = document.getElementById('hero');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!animationId) animate();
        } else {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    });
}, { threshold: 0 });

heroObserver.observe(heroSection);
