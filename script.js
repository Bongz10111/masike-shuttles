// Navigation active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature-card').forEach(el => {
    observer.observe(el);
});

// Form submission
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    // FormSubmit will handle the actual submission
    // We just need to store data for checkout
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    localStorage.setItem('bookingData', JSON.stringify(data));
});

// Button click handlers
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!btn.getAttribute('href')) {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize on load
window.addEventListener('load', () => {
    // Trigger initial animations
    document.querySelectorAll('.service-card, .feature-card').forEach(card => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 100);
    });
    
    // Set min date to today for date pickers
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.setAttribute('min', today);
    });
});

// WhatsApp booking function
function bookViaWhatsApp() {
    const name = document.querySelector('input[name="name"]')?.value || '';
    const phone = document.querySelector('input[name="phone"]')?.value || '';
    const service = document.querySelector('select[name="service"]')?.value || '';
    const date = document.querySelector('input[name="date"]')?.value || '';
    
    const message = `Hello Masike Motion! I would like to book a service.
    
Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${date}

Please contact me to confirm.`;
    
    const whatsappUrl = `https://wa.me/27716169144?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}