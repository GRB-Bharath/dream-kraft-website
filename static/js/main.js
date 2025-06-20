// Design Kraft - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initPortfolioFilter();
    initSmoothScrolling();
    initAnimations();
    initFormValidation();
    initScrollToTop();
    
    // Navbar scroll effect
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            });
        });
    }
    
    // Portfolio filtering
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.classList.add('animate-fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animate-fade-in');
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Scroll animations
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, observerOptions);
        
        // Observe elements for animations
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .process-step');
        animatedElements.forEach(el => {
            el.classList.add('loading');
            observer.observe(el);
        });
    }
    
    // Form validation and enhancement
    function initFormValidation() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Add loading state to submit button
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Form will submit normally, but we add visual feedback
                setTimeout(() => {
                    if (!this.checkValidity()) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                }, 100);
            });
            
            // Add real-time validation feedback
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.hasAttribute('required') && !this.value.trim()) {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('is-invalid') && this.value.trim()) {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                });
            });
        }
    }
    
    // Scroll to top functionality
    function initScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'btn btn-primary scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            border: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Smooth scroll to top
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Parallax effect for hero section
    function initParallax() {
        const hero = document.querySelector('.hero-section');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && heroImage) {
            window.addEventListener('scroll', function() {
                const scrolled = window.scrollY;
                const rate = scrolled * -0.5;
                heroImage.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    // Initialize parallax
    initParallax();
    
    // Preload critical images
    function preloadImages() {
        const criticalImages = [
            'https://pixabay.com/get/g78281b596d85263f4cfb5101647bd1a79e4d0ed938424f5b523593af3970e77fd8c93305f6628df8f37236386aa22ca045450edb6b9a26a668f0dfa245dfcd40_1280.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Auto-dismiss flash messages
    setTimeout(function() {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            if (alert.classList.contains('show')) {
                new bootstrap.Alert(alert).close();
            }
        });
    }, 5000);
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click tracking for analytics (placeholder)
    function trackEvent(action, category, label) {
        // Placeholder for analytics tracking
        console.log(`Event tracked: ${action} - ${category} - ${label}`);
        
        // You can integrate with Google Analytics or other services here
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    }
    
    // Track consultation button clicks
    const consultationBtns = document.querySelectorAll('.btn-consultation');
    consultationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('click', 'consultation', 'header_cta');
        });
    });
    
    // Track service card interactions
    const serviceCTAs = document.querySelectorAll('.service-cta');
    serviceCTAs.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
            trackEvent('click', 'service_inquiry', serviceTitle);
        });
    });
    
    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Failed to load image:', this.src);
            // You could set a fallback image here
            // this.src = '/static/images/fallback.jpg';
        });
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                }
            }, 1000);
        });
    }
    
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(function() {
    // Any scroll-based logic here
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);
