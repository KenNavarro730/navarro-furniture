/* ===================================
   Navarro Furniture - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Load inventory from config
    loadInventory();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Scroll animations
    initScrollAnimations();

    // Navbar scroll effect
    initNavbarEffect();

    // Mobile navigation
    initMobileNav();

    // FAQ accordion
    initFaqAccordion();
});

// Load and Render Inventory from inventory.js
function loadInventory() {
    const grid = document.getElementById('inventory-grid');

    if (!grid || typeof COUCHES === 'undefined') {
        console.error('Inventory grid or COUCHES data not found');
        return;
    }

    // Clear existing content
    grid.innerHTML = '';

    // Filter to only available couches
    const availableCouches = COUCHES.filter(couch => couch.available !== false);

    if (availableCouches.length === 0) {
        grid.innerHTML = '<p class="no-inventory">No couches currently available. Check back soon!</p>';
        return;
    }

    // Render each couch
    availableCouches.forEach(couch => {
        const card = createCouchCard(couch);
        grid.appendChild(card);
    });

    // Re-initialize scroll animations for new elements
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
}

// Create a couch card element
function createCouchCard(couch) {
    const article = document.createElement('article');
    article.className = 'couch-card';
    article.id = couch.id;

    const smsMessage = encodeURIComponent(`Hi! I'm interested in the ${couch.name} ($${couch.price})`);
    const smsLink = `sms:${PHONE_NUMBER}?body=${smsMessage}`;

    // Price display with optional retail price anchoring
    let priceHTML = '';
    if (couch.retailPrice && couch.retailPrice > couch.price) {
        const savings = couch.retailPrice - couch.price;
        priceHTML = `
            <div class="couch-pricing">
                <span class="retail-price">Retail: $${couch.retailPrice}</span>
                <span class="couch-price">$${couch.price}</span>
                <span class="savings-badge">Save $${savings}</span>
            </div>
        `;
    } else {
        priceHTML = `<p class="couch-price">$${couch.price}</p>`;
    }

    // Scarcity badge
    const scarcityHTML = couch.quantity && couch.quantity <= 2
        ? `<span class="scarcity-badge">Only ${couch.quantity} available!</span>`
        : '';

    article.innerHTML = `
        <div class="couch-image">
            <img src="${couch.image}" alt="${couch.name}" onerror="this.src='images/placeholder.jpg'">
            <span class="availability-badge available">Ready for Delivery</span>
            ${scarcityHTML}
        </div>
        <div class="couch-details">
            <h3>${couch.name}</h3>
            ${priceHTML}
            <p class="couch-dimensions">📐 ${couch.dimensions}</p>
            <p class="couch-delivery">🚚 ${couch.deliveryNote}</p>
            <a href="${smsLink}" class="btn btn-reserve">Text to Reserve</a>
        </div>
    `;

    return article;
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                const mobileNav = document.getElementById('mobile-nav');
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.step-card, .couch-card:not(.scroll-animate), .sanitation-step, .before-after-card, .auth-image, .delivery-card, .service-card, .pickup-option, .criteria-card, .service-info-card, .faq-item'
    );

    // Add scroll-animate class to elements that don't have it
    animatedElements.forEach(el => {
        if (!el.classList.contains('scroll-animate')) {
            el.classList.add('scroll-animate');
        }
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.scroll-animate:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}

// Navbar Background Effect on Scroll
function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

// Mobile Navigation Toggle
function initMobileNav() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (!mobileMenuBtn || !mobileNav) return;

    mobileMenuBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Helper function to format phone number for SMS
function formatSmsLink(phone, message) {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `sms:${cleanPhone}?body=${encodedMessage}`;
}
