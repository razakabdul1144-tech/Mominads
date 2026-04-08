// ===== GLOBAL VARIABLES =====

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APP =====
function initializeApp() {
    // Initialize all components
    initPreloader();
    initDarkMode();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initBackToTop();
    initSmoothScrolling();
    initMobileMenu();
    initHeroTheme();
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleScroll);
}

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// ===== DARK MODE TOGGLE =====
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateDarkModeIcon(currentTheme);
    
    // Sync hero section with main theme
    syncHeroWithMainTheme(currentTheme);
    
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme change
        body.classList.add('theme-transition');
        
        // Update theme
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);
        
        // Sync hero section with new theme
        syncHeroWithMainTheme(newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 300);
    });
}

// ===== SYNC HERO WITH MAIN THEME =====
function syncHeroWithMainTheme(theme) {
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    if (theme === 'dark') {
        // Set hero to dark mode
        heroSection.classList.remove('light-theme');
        localStorage.setItem('heroTheme', 'dark');
    } else {
        // Set hero to light mode
        heroSection.classList.add('light-theme');
        localStorage.setItem('heroTheme', 'light');
    }
}

function updateDarkModeIcon(theme) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavLink);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.about-card, .service-card, .contact-item, .stat-item');
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(statItem) {
    const statNumber = statItem.querySelector('.stat-number');
    if (!statNumber || statNumber.classList.contains('animated')) return;
    
    statNumber.classList.add('animated');
    
    // Get the target number based on the stat label
    const statLabel = statItem.querySelector('.stat-label').textContent;
    let targetNumber;
    let suffix = '';
    
    if (statLabel.includes('Projects Completed')) {
        targetNumber = 500;
        suffix = '+';
    } else if (statLabel.includes('Years Experience')) {
        targetNumber = 11;
        suffix = '+';
    } else if (statLabel.includes('Client Satisfaction')) {
        targetNumber = 100;
        suffix = '%';
    } else {
        return;
    }
    
    // Animate the counter
    let currentNumber = 0;
    const increment = targetNumber / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 60;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(counter);
        }
        
        // Update the display
        statNumber.textContent = Math.floor(currentNumber) + suffix;
    }, stepTime);
}



// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const serviceSelect = document.getElementById('service');
    const otherServiceGroup = document.getElementById('otherServiceGroup');
    const otherServiceInput = document.getElementById('otherService');
    
    // Toggle other service field
    serviceSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherServiceGroup.style.display = 'block';
            otherServiceInput.required = true;
            otherServiceInput.focus();
        } else {
            otherServiceGroup.style.display = 'none';
            otherServiceInput.required = false;
        }
    });
    
    // Restrict phone input to numeric digits only
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            
            // Add additional form data
            formData.append('website', 'Momin Ads');
            formData.append('company', 'Momin Ads');
            
            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu on window resize (if mobile menu is open)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ===== SCROLL HANDLER =====
function handleScroll() {
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events for better performance
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleScroll, 16));

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Skip to main content
    if (e.key === 'Tab' && e.target === document.body) {
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send error reports to a logging service here
});

// ===== SERVICE WORKER REGISTRATION (for future PWA features) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}


// ===== INITIALIZE HERO THEME =====
function initHeroTheme() {
    const heroSection = document.querySelector('.hero');
    const body = document.body;
    
    if (!heroSection) return;
    
    // Get the main theme preference
    const mainTheme = body.getAttribute('data-theme') || 'light';
    
    // Sync hero with main theme
    syncHeroWithMainTheme(mainTheme);
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;
