/**
 * main.js - Portfolio Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        } else {
            navbar.style.padding = '0';
            navbar.style.background = 'rgba(13, 17, 23, 0.8)';
        }
    };
    window.addEventListener('scroll', handleNavScroll);

    // 3. Scroll Spy (Active Link)
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    const scrollSpy = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        // Simple toggle for mobile - could be expanded to a full mobile overlay
        const isVisible = navLinksContainer.style.display === 'flex';
        navLinksContainer.style.display = isVisible ? 'none' : 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '100%';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = 'var(--bg-alt)';
        navLinksContainer.style.padding = '2rem';
    });

    // 5. Circuits Background Animation (Canvas)
    const initCircuitBg = () => {
        const container = document.getElementById('circuit-bg');
        if (!container) return;

        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let width, height;
        const particles = [];

        const resize = () => {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.history = [];
                this.maxHistory = 15;
                this.color = Math.random() > 0.5 ? '#58a6ff' : '#3fb950';
            }

            update() {
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxHistory) this.history.shift();

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.2;
                
                if (this.history.length > 0) {
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let point of this.history) {
                        ctx.lineTo(point.x, point.y);
                    }
                }
                ctx.stroke();

                // Draw "node" at the end
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.5;
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();
    };

    initCircuitBg();

    // 6. Form Submission Mockup
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = 'var(--success)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = 'var(--accent)';
                }, 3000);
            }, 1500);
        });
    }
});
