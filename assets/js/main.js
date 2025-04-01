// Main JavaScript for JungleCode website
document.addEventListener('DOMContentLoaded', () => {
    // Initialize nav scroll progress
    initNavScrollProgress();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize Feather Icons
    initFeatherIcons();
});

// Navigation scroll progress
function initNavScrollProgress() {
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const navbar = document.querySelector('.navbar');
    
    // Initial call to set scroll position on page load
    updateScrollProgress();
    
    window.addEventListener('scroll', () => {
        // Update scroll progress bar
        updateScrollProgress();
        
        // Add scrolled class to navbar for styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    function updateScrollProgress() {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgressBar.style.width = `${progress}%`;
    }
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuButton.classList.remove('active');
            navbarMenu.classList.remove('active');
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
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const targetPosition = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const company = document.getElementById('company').value.trim();
        const website = document.getElementById('website').value.trim();
        const industry = document.getElementById('industry').value.trim();
        const marketPresence = document.getElementById('marketPresence').value;
        const timeline = document.getElementById('timeline').value;
        const objectives = document.getElementById('objectives').value.trim();
        
        // Reset any previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        let isValid = true;
        
        // Name validation
        if (name === '') {
            showError('name', 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        if (email === '') {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Company validation
        if (company === '') {
            showError('company', 'Please enter your company name');
            isValid = false;
        }
        
        // Website validation
        if (website === '') {
            showError('website', 'Please enter your company website');
            isValid = false;
        } else if (!isValidUrl(website)) {
            showError('website', 'Please enter a valid URL');
            isValid = false;
        }
        
        // Industry validation
        if (industry === '') {
            showError('industry', 'Please enter your AI industry focus');
            isValid = false;
        }
        
        // Market presence validation
        if (marketPresence === '' || marketPresence === null) {
            showError('marketPresence', 'Please select your current market presence');
            isValid = false;
        }
        
        // Timeline validation
        if (timeline === '' || timeline === null) {
            showError('timeline', 'Please select your target entry timeline');
            isValid = false;
        }
        
        // Objectives validation
        if (objectives === '') {
            showError('objectives', 'Please enter your primary objectives');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = 'var(--accent)';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '0.3rem';
        
        input.parentNode.appendChild(errorMessage);
        input.style.borderColor = 'var(--accent)';
        
        input.addEventListener('input', function() {
            errorMessage.remove();
            input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    function submitForm() {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Prepare form data
        const formData = new FormData(contactForm);
        
        // Submit to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccess();
                contactForm.reset();
            } else {
                showFailure();
            }
        })
        .catch(() => {
            showFailure();
        })
        .finally(() => {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        });
    }
    
    function showSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); padding: var(--spacing-md); text-align: center; margin-top: var(--spacing-md);">
                <h3 style="color: white; margin-bottom: var(--spacing-sm);">Thank You!</h3>
                <p style="margin-bottom: 0;">Your message has been sent successfully. We'll be in touch with you shortly.</p>
            </div>
        `;
        
        contactForm.style.display = 'none';
        contactForm.parentNode.appendChild(successMessage);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    function showFailure() {
        const failureMessage = document.createElement('div');
        failureMessage.className = 'failure-message';
        failureMessage.innerHTML = `
            <div style="background-color: rgba(255, 77, 77, 0.1); border-radius: var(--radius-md); padding: var(--spacing-md); text-align: center; margin-bottom: var(--spacing-md);">
                <h3 style="color: var(--accent); margin-bottom: var(--spacing-sm);">Oops!</h3>
                <p style="margin-bottom: var(--spacing-sm);">Something went wrong. Please try again or contact us directly at contact@junglecode.com</p>
                <button class="dismiss-button" style="background: var(--accent); color: white; border: none; padding: 0.5rem 1rem; border-radius: var(--radius-sm); cursor: pointer;">Dismiss</button>
            </div>
        `;
        
        contactForm.parentNode.insertBefore(failureMessage, contactForm);
        
        // Add event listener to dismiss button
        failureMessage.querySelector('.dismiss-button').addEventListener('click', function() {
            failureMessage.remove();
        });
    }
}

// Initialize animations
function initAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.key-point-card, .challenge-card, .service-card, .process-step, .team-member, .step-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        observer.observe(element);
    });
}

// Pulse animation
document.addEventListener('DOMContentLoaded', function() {
  // Remove any existing pulse animations
  const oldPulses = document.querySelectorAll('.new-pulse-circle');
  oldPulses.forEach(el => el.remove());
  
  // Create new pulse element
  const pulseEl = document.createElement('div');
  pulseEl.className = 'new-pulse-circle';
  
  // Add it to the container
  const container = document.querySelector('.animated-graphic');
  if (container) {
    container.appendChild(pulseEl);
  }
});