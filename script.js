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

    article.innerHTML = `
        <div class="couch-image">
            <img src="${couch.image}" alt="${couch.name}" onerror="this.src='images/placeholder.jpg'">
            <span class="availability-badge available">Ready for Delivery</span>
        </div>
        <div class="couch-details">
            <h3>${couch.name}</h3>
            <p class="couch-price">$${couch.price}</p>
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
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.step-card, .couch-card:not(.scroll-animate), .sanitation-step, .before-after-card, .auth-image, .delivery-card'
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

// Helper function to format phone number for SMS
function formatSmsLink(phone, message) {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `sms:${cleanPhone}?body=${encodedMessage}`;
}
