document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('#navbar ul');
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust for sticky nav height
                behavior: 'smooth'
            });

            // Close mobile menu on link click
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Active link highlighting on scroll
    function highlightNav() {
        let scrollPos = window.scrollY + 80; // Offset for better accuracy

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (section.id === link.getAttribute('href').substring(1)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Event listeners
    window.addEventListener('scroll', highlightNav);
});