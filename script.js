// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .gallery-item, .feature, .contact-item').forEach(el => {
        observer.observe(el);
    });

    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-img');
            const src = img.src;
            const alt = img.alt;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${src}" alt="${alt}" class="lightbox-img">
                </div>
            `;
            
            // Add lightbox styles
            const lightboxStyles = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .lightbox-img {
                    max-width: 100%;
                    max-height: 100%;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: #fff;
                    font-size: 2rem;
                    cursor: pointer;
                    background: rgba(255, 107, 53, 0.8);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;
                }
                .lightbox-close:hover {
                    background: rgba(255, 107, 53, 1);
                }
            `;
            
            // Add styles to head if not already added
            if (!document.querySelector('#lightbox-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'lightbox-styles';
                styleSheet.textContent = lightboxStyles;
                document.head.appendChild(styleSheet);
            }
            
            document.body.appendChild(lightbox);
            
            // Fade in lightbox
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close lightbox functionality
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            };
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close with Escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles
        const notificationStyles = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: #fff;
                font-weight: 500;
                z-index: 10001;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 300px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            .notification-success {
                background: linear-gradient(45deg, #28a745, #20c997);
            }
            .notification-error {
                background: linear-gradient(45deg, #dc3545, #e74c3c);
            }
            .notification-info {
                background: linear-gradient(45deg, #17a2b8, #6f42c1);
            }
        `;
        
        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = notificationStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded styles
        const loadedStyles = `
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            body.loaded {
                opacity: 1;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = loadedStyles;
        document.head.appendChild(styleSheet);
    });

    // Counter animation for statistics (if needed)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    // WhatsApp integration
    function openWhatsApp(message = '') {
        const phoneNumber = '5511941814780'; // Gelatti's WhatsApp number
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Add WhatsApp buttons to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        const whatsappBtn = document.createElement('button');
        whatsappBtn.className = 'btn btn-whatsapp';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Orçar via WhatsApp';
        whatsappBtn.style.cssText = `
            background: #25d366;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 0.85rem;
            cursor: pointer;
            margin-top: 1.5rem;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
            white-space: nowrap;
        `;
        
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.background = '#128c7e';
            this.style.transform = 'translateY(-2px)';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.background = '#25d366';
            this.style.transform = 'translateY(0)';
        });
        
        whatsappBtn.addEventListener('click', function() {
            const serviceName = card.querySelector('h3').textContent;
            const message = `Olá! Gostaria de saber mais sobre o serviço: ${serviceName}`;
            openWhatsApp(message);
        });
        
        card.appendChild(whatsappBtn);
    });

    // Floating WhatsApp button is now handled in HTML/CSS only

    // ===== FIREWORKS ANIMATION SYSTEM =====
    class FireworksSystem {
        constructor() {
            this.fireworksContainer = document.getElementById('fireworksContainer');
            this.heroFireworks = document.getElementById('heroFireworks');
            this.isActive = false;
            this.fireworkCount = 0;
            this.maxFireworks = 50;
            this.colors = [
                '#ff6b35', '#ff8c42', '#ff4757', '#ffa502', 
                '#2ed573', '#3742fa', '#ff3838', '#ff9ff3',
                '#ffd700', '#ff1493', '#00bfff', '#32cd32'
            ];
            this.init();
        }

        init() {
            this.startFireworks();
            this.createContinuousFireworks();
        }

        startFireworks() {
            this.isActive = true;
            this.createFireworkBurst();
        }

        createFireworkBurst() {
            if (!this.isActive || this.fireworkCount >= this.maxFireworks) return;

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.7) + (window.innerHeight * 0.3);
            
            this.createFirework(x, y);
            this.fireworkCount++;

            // Schedule next firework
            const delay = Math.random() * 2000 + 500; // 0.5 to 2.5 seconds
            setTimeout(() => {
                this.createFireworkBurst();
            }, delay);
        }

        createFirework(x, y) {
            // Main firework
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.background = this.colors[Math.floor(Math.random() * this.colors.length)];
            firework.style.boxShadow = `0 0 20px ${firework.style.background}`;

            this.fireworksContainer.appendChild(firework);

            // Create trail
            this.createTrail(x, y, firework.style.background);

            // Create explosion after delay
            setTimeout(() => {
                this.createExplosion(x, y, firework.style.background);
                this.createSparkles(x, y);
                this.createBurstEffect(x, y);
            }, 800);

            // Remove firework after animation
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
                this.fireworkCount--;
            }, 3000);
        }

        createTrail(x, y, color) {
            const trail = document.createElement('div');
            trail.className = 'firework-trail';
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            trail.style.background = `linear-gradient(to bottom, transparent, ${color})`;

            this.fireworksContainer.appendChild(trail);

            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 1000);
        }

        createExplosion(x, y, color) {
            const particleCount = 12;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.background = color;
                particle.style.boxShadow = `0 0 10px ${color}`;

                // Random direction and distance
                const angle = (i / particleCount) * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                const endX = x + Math.cos(angle) * distance;
                const endY = y + Math.sin(angle) * distance;

                particle.style.setProperty('--end-x', endX + 'px');
                particle.style.setProperty('--end-y', endY + 'px');

                // Add custom animation
                particle.style.animation = `particleExplosion 2s ease-out forwards`;
                particle.style.setProperty('--end-x', endX + 'px');
                particle.style.setProperty('--end-y', endY + 'px');

                this.fireworksContainer.appendChild(particle);

                // Animate particle
                requestAnimationFrame(() => {
                    particle.style.transform = `translate(${endX - x}px, ${endY - y}px) scale(0)`;
                });

                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 2000);
            }
        }

        createSparkles(x, y) {
            const sparkleCount = 8;
            for (let i = 0; i < sparkleCount; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
                sparkle.style.top = (y + (Math.random() - 0.5) * 100) + 'px';

                this.fireworksContainer.appendChild(sparkle);

                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
            }
        }

        createBurstEffect(x, y) {
            const burst = document.createElement('div');
            burst.className = 'firework-burst';
            burst.style.left = (x - 50) + 'px';
            burst.style.top = (y - 50) + 'px';

            this.fireworksContainer.appendChild(burst);

            setTimeout(() => {
                if (burst.parentNode) {
                    burst.parentNode.removeChild(burst);
                }
            }, 1500);
        }

        createContinuousFireworks() {
            // Create smaller, continuous fireworks in the background
            setInterval(() => {
                if (this.isActive && this.fireworkCount < this.maxFireworks) {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    this.createSmallFirework(x, y);
                }
            }, 300);
        }

        createSmallFirework(x, y) {
            const smallFirework = document.createElement('div');
            smallFirework.style.position = 'absolute';
            smallFirework.style.left = x + 'px';
            smallFirework.style.top = y + 'px';
            smallFirework.style.width = '3px';
            smallFirework.style.height = '3px';
            smallFirework.style.background = this.colors[Math.floor(Math.random() * this.colors.length)];
            smallFirework.style.borderRadius = '50%';
            smallFirework.style.boxShadow = `0 0 15px ${smallFirework.style.background}`;
            smallFirework.style.animation = 'fireworkExplosion 2s ease-out forwards';

            this.fireworksContainer.appendChild(smallFirework);

            setTimeout(() => {
                if (smallFirework.parentNode) {
                    smallFirework.parentNode.removeChild(smallFirework);
                }
            }, 2000);
        }

        stop() {
            this.isActive = false;
        }

        resume() {
            this.isActive = true;
        }
    }

    // Video loop control - continuous loop
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Ensure video starts playing when loaded
        heroVideo.addEventListener('canplay', function() {
            console.log('Vídeo carregado, iniciando loop contínuo');
            this.play();
        });
        
        // Ensure video loops when it ends
        heroVideo.addEventListener('ended', function() {
            console.log('Vídeo terminou, reiniciando automaticamente');
            this.currentTime = 0;
            this.play();
        });
        
        // Handle video errors
        heroVideo.addEventListener('error', function() {
            console.log('Erro no vídeo');
        });
    }

    // Initialize fireworks system
    const fireworks = new FireworksSystem();

    // Pause fireworks when user scrolls away from hero section
    let heroSection = document.getElementById('home');
    let heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fireworks.resume();
            } else {
                fireworks.stop();
            }
        });
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);

    // Add mouse interaction for fireworks
    document.addEventListener('click', (e) => {
        if (e.target.closest('#home')) {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            fireworks.createExplosion(x, y, fireworks.colors[Math.floor(Math.random() * fireworks.colors.length)]);
        }
    });

    // Newsletter functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            
            if (!email) {
                showNotification('Por favor, insira seu e-mail.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            const originalText = button.textContent;
            button.textContent = 'Inscrevendo...';
            button.disabled = true;
            
            setTimeout(() => {
                showNotification('Inscrição realizada com sucesso! Obrigado por se inscrever.', 'success');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        });
    }

    // Social links functionality
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split('-')[1];
            showNotification(`Redirecionando para ${platform}...`, 'info');
        });
    });
});
