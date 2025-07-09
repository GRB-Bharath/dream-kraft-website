// Dream Kraft - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Handle page loading
    initPageLoader();
    
    // Initialize all components
    initNavigation();
    initPortfolioFilter();
    initSmoothScrolling();
    initAnimations();
    initFormValidation();
    initScrollToTop();
    initParallax();
    initLazyVideoLoading();

    // Page loader function - optimized for speed
    function initPageLoader() {
        const loader = document.getElementById('page-loader');
        if (!loader) return;

        // Prevent flash of green by setting explicit background color
        loader.style.backgroundColor = '#ffffff';
        
        // Add loaded class immediately to ensure it's styled correctly
        document.body.classList.add('loading');

        // Hide loader after all content is loaded
        window.addEventListener('load', function() {
            // Immediate transition for faster user experience
            document.body.classList.remove('loading');
            loader.classList.add('loaded');
            // Remove from DOM after animation completes
            setTimeout(function() {
                loader.style.display = 'none';
            }, 300);
        });

        // If page takes too long to load, hide loader after 2 seconds (faster fallback)
        setTimeout(function() {
            if (!loader.classList.contains('loaded')) {
                document.body.classList.remove('loading');
                loader.classList.add('loaded');
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 300);
            }
        }, 2000);
    }

    // Lazy video loading function
    function initLazyVideoLoading() {
        const video = document.getElementById('hero-video');
        const videoSource = document.getElementById('video-source');
        
        if (!video || !videoSource) return;
        
        // Get video source from data attribute
        const videoSrc = video.getAttribute('data-src');
        
        if (!videoSrc) return;
        
        // Function to load video - optimized to prevent errors
        function loadVideo() {
            videoSource.src = videoSrc;
            video.load();
            
            // Improved video loading with better error handling
            video.addEventListener('canplaythrough', function() {
                // Only attempt to play video when it's fully loaded
                try {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            // Silent error handling - don't log errors to console
                            // Create muted autoplay as fallback
                            video.muted = true;
                            video.play();
                        });
                    }
                } catch (e) {
                    // Fallback for browsers with inconsistent Promise implementation
                    video.muted = true;
                    video.play();
                }
            }, { once: true });
        }
        
        // Use Intersection Observer to load video when it's in viewport
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadVideo();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(video);
        } else {
            // Fallback for browsers without Intersection Observer
            loadVideo();
        }
    }

    // Navbar scroll effect
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
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
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            });
        });
    }

    // Portfolio filtering
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.portfolio-filter button');
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
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
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
                const targetId = this.getAttribute('href');
                if (targetId.length > 1 && document.querySelector(targetId)) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
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
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top-btn';
        scrollToTopBtn.setAttribute('aria-label', 'Back to top');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            border: none;
            cursor: pointer;
            transform: translateY(20px);
        `;
        document.body.appendChild(scrollToTopBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
                scrollToTopBtn.style.transform = 'translateY(20px)';
            }
        });

        // Smooth scroll to top with animation
        scrollToTopBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for hero section
    function initParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            window.addEventListener('scroll', function() {
                const scrolled = window.scrollY;
                const rate = scrolled * -0.5;
                heroImage.style.transform = `translateY(${rate}px)`;
            });
        }
    }

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

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Failed to load image:', this.src);
            // Optionally set a fallback image here
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

    // Analytics tracking (placeholder)
    function trackEvent(action, category, label) {
        // Placeholder for analytics tracking
        console.log(`Event tracked: ${action} - ${category} - ${label}`);
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