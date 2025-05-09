// Modern JavaScript for website interactions

// Smooth scrolling and mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            // Scrolling down
            header.classList.remove('scrolled');
        } else if (currentScroll < lastScroll && !header.classList.contains('scrolled')) {
            // Scrolling up
            header.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const sectionsToObserve = document.querySelectorAll('section, .research-item, .publication-item, .teaching-item');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });

    // Add download functionality for CV
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Add download analytics if needed
            console.log('CV download initiated');
        });
    }
});

// Add hover effects for social icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        const iconElement = icon.querySelector('i');
        iconElement.style.transform = 'scale(1.2)';
    });

    icon.addEventListener('mouseleave', () => {
        const iconElement = icon.querySelector('i');
        iconElement.style.transform = 'scale(1)';
    });
});

// Add copy to clipboard functionality for email
const email = document.querySelector('.contact-item i.fa-envelope').parentElement.querySelector('p');
if (email) {
    email.addEventListener('click', () => {
        const emailAddress = email.textContent.split(':')[1].trim();
        navigator.clipboard.writeText(emailAddress).then(() => {
            email.textContent = 'Email copied!';
            setTimeout(() => {
                email.textContent = `Email: ${emailAddress}`;
            }, 2000);
        });
    });
}